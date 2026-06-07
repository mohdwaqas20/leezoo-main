import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';

// ─── Load Razorpay script ──────────────────────────────────────────────────────
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_yourkeyhere';

// ─── Send confirmation email via EmailJS ──────────────────────────────────────
async function sendOrderEmail({ to_email, to_name, order_id, items, total, address, payment_method }) {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS not configured. Skipping email.');
    return;
  }

  const itemsSummary = items
    .map((i) => `${i.name} (${i.size}) × ${i.qty} — ₹${i.price * i.qty}`)
    .join('\n');

  const templateParams = {
    to_email,
    to_name,
    order_id,
    items_summary: itemsSummary,
    total: `₹${total}`,
    delivery_address: address,
    payment_method,
  };

  try {
    const { init, send } = await import('@emailjs/browser');
    init(EMAILJS_PUBLIC_KEY);
    await send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
  } catch (e) {
    console.error('Email send error:', e);
  }
}

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu',
  'Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry',
];

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: '1px solid rgba(191,160,106,0.3)',
  borderRadius: 0,
  padding: '0.9rem 1rem',
  fontFamily: "'Jost', sans-serif",
  fontSize: '0.8rem',
  fontWeight: 300,
  color: 'var(--dark)',
  letterSpacing: '0.05em',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.55rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--brown)',
  marginBottom: '0.45rem',
  opacity: 0.7,
};

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function FocusInput({ style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{
        ...inputStyle,
        ...style,
        borderColor: focused ? 'var(--accent)' : 'rgba(191,160,106,0.3)',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function FocusSelect({ style, children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...props}
      style={{
        ...inputStyle,
        ...style,
        borderColor: focused ? 'var(--accent)' : 'rgba(191,160,106,0.3)',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A5740' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        paddingRight: '2.5rem',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </select>
  );
}

export default function CheckoutPage({ onBack, onSuccess }) {
  const { items, total, count, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();

  const [form, setForm] = useState({
    firstName: user?.user_metadata?.full_name?.split(' ')[0] || '',
    lastName: user?.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' | 'cod'
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [successOrder, setSuccessOrder] = useState(null);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = '10-digit number required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state) e.state = 'Required';
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) e.pincode = '6-digit pincode required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildAddress = () =>
    [form.address, form.apartment, form.city, form.state, form.pincode, 'India']
      .filter(Boolean)
      .join(', ');

  const handleCOD = async () => {
    if (!validate()) return;
    setPlacing(true);
    try {
      const orderData = {
        user_id: user?.id || null,
        total_amount: total,
        status: 'pending',
        display_id: `LZ-${Date.now()}`,
        customer_email: form.email,
        customer_name: `${form.firstName} ${form.lastName}`.trim(),
        delivery_address: buildAddress(),
        phone: form.phone,
        payment_method: 'cod',
        payment_status: 'pending',
      };
      const orderItems = items.map((i) => ({
        productDbId: i.id,
        size: i.size,
        qty: i.qty,
        price: i.price,
      }));

      let order;
      if (user) {
        order = await placeOrder(items, total, {});
      } else {
        // Guest order — direct supabase insert
        const { createOrder } = await import('../lib/supabase');
        order = await createOrder(orderData, orderItems, {});
      }

      await sendOrderEmail({
        to_email: form.email,
        to_name: `${form.firstName} ${form.lastName}`.trim(),
        order_id: order?.display_id || orderData.display_id,
        items,
        total,
        address: buildAddress(),
        payment_method: 'Cash on Delivery',
      });

      await clearCart();
      setSuccessOrder({ ...order, ...orderData, payMode: 'Cash on Delivery' });
      setStep('success');
    } catch (e) {
      alert('Order failed: ' + e.message);
    } finally {
      setPlacing(false);
    }
  };

  const handleOnline = async () => {
    if (!validate()) return;
    setPlacing(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert('Failed to load payment gateway. Please check your connection.');
        setPlacing(false);
        return;
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: total * 100,
        currency: 'INR',
        name: 'LEEZOO',
        description: `Order of ${count} item${count !== 1 ? 's' : ''}`,
        prefill: {
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          contact: form.phone,
        },
        notes: {
          address: buildAddress(),
        },
        theme: { color: '#3C2A1E' },
        modal: {
          ondismiss: () => setPlacing(false),
        },
        handler: async (response) => {
          try {
            let order;
            if (user) {
              order = await placeOrder(items, total, {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              });
            } else {
              const { createOrder } = await import('../lib/supabase');
              const orderData = {
                user_id: null,
                total_amount: total,
                status: 'confirmed',
                display_id: `LZ-${Date.now()}`,
                customer_email: form.email,
                customer_name: `${form.firstName} ${form.lastName}`.trim(),
                delivery_address: buildAddress(),
                phone: form.phone,
                payment_method: 'online',
                payment_status: 'paid',
                payment_id: response.razorpay_payment_id,
              };
              const orderItems = items.map((i) => ({
                productDbId: i.id,
                size: i.size,
                qty: i.qty,
                price: i.price,
              }));
              order = await createOrder(orderData, orderItems, {
                razorpay_payment_id: response.razorpay_payment_id,
              });
            }

            await sendOrderEmail({
              to_email: form.email,
              to_name: `${form.firstName} ${form.lastName}`.trim(),
              order_id: order?.display_id || `LZ-${Date.now()}`,
              items,
              total,
              address: buildAddress(),
              payment_method: `Online (Payment ID: ${response.razorpay_payment_id})`,
            });

            await clearCart();
            setSuccessOrder({ ...order, payMode: 'Online Payment', paymentId: response.razorpay_payment_id });
            setStep('success');
          } catch (e) {
            alert('Payment received but order save failed. Payment ID: ' + response.razorpay_payment_id);
          } finally {
            setPlacing(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (r) => {
        alert('Payment failed: ' + (r.error?.description || 'Unknown error'));
        setPlacing(false);
      });
      rzp.open();
    } catch (e) {
      alert('Error initiating payment: ' + e.message);
      setPlacing(false);
    }
  };

  const handleSubmit = () => {
    if (paymentMethod === 'cod') handleCOD();
    else handleOnline();
  };

  // ─── Success screen ──────────────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--sand)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}>
        <div style={{
          maxWidth: 520, width: '100%', textAlign: 'center',
          animation: 'fadeIn 0.5s ease forwards',
        }}>
          {/* Checkmark */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            border: '2px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem',
            fontSize: '1.8rem',
          }}>✓</div>

          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 6vw, 3rem)', letterSpacing: '0.08em', color: 'var(--dark)', marginBottom: '0.5rem' }}>
            ORDER CONFIRMED
          </div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '2rem' }}>
            A confirmation has been sent to {form.email}
          </p>

          {/* Order details box */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            padding: '1.5rem 2rem', textAlign: 'left', marginBottom: '2rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', opacity: 0.5 }}>ORDER ID</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.08em', color: 'var(--accent)' }}>
                {successOrder?.display_id || 'LZ-' + Date.now()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', opacity: 0.5 }}>PAYMENT</span>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>{successOrder?.payMode}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', opacity: 0.5 }}>DELIVERING TO</span>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', textAlign: 'right', maxWidth: '60%' }}>{buildAddress()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', opacity: 0.5 }}>TOTAL</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem', color: 'var(--accent)' }}>₹{total}</span>
            </div>
          </div>

          <button
            onClick={onBack}
            style={{
              background: 'var(--dark)', color: 'var(--ink)',
              border: 'none', cursor: 'pointer',
              padding: '1rem 3rem',
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ─── Checkout form ───────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--sand)', fontFamily: "'Jost', sans-serif" }}>
      {/* Back bar */}
      <div style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '0.8rem',
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--brown)',
            textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}
        >
          ← Back to Cart
        </button>
      </div>

      {/* Main layout: left form | right summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.2fr) minmax(280px,0.8fr)',
        minHeight: 'calc(100vh - 60px)',
      }}
        className="checkout-grid"
      >
        {/* ── LEFT: Form ────────────────────────────────────────────────────── */}
        <div style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', borderRight: '1px solid var(--border)' }}>
          {/* Contact */}
          <section style={{ marginBottom: '2.5rem' }}>
            <SectionTitle>Contact</SectionTitle>
            <Field label="Email">
              <FocusInput
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={set('email')}
              />
              {errors.email && <ErrMsg>{errors.email}</ErrMsg>}
            </Field>
            <Field label="Phone Number">
              <FocusInput
                type="tel"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={set('phone')}
                maxLength={10}
              />
              {errors.phone && <ErrMsg>{errors.phone}</ErrMsg>}
            </Field>
          </section>

          {/* Delivery */}
          <section style={{ marginBottom: '2.5rem' }}>
            <SectionTitle>Delivery Address</SectionTitle>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <FocusInput placeholder="First name" value={form.firstName} onChange={set('firstName')} />
                {errors.firstName && <ErrMsg>{errors.firstName}</ErrMsg>}
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <FocusInput placeholder="Last name" value={form.lastName} onChange={set('lastName')} />
                {errors.lastName && <ErrMsg>{errors.lastName}</ErrMsg>}
              </div>
            </div>

            <Field label="Address">
              <FocusInput placeholder="Street address" value={form.address} onChange={set('address')} />
              {errors.address && <ErrMsg>{errors.address}</ErrMsg>}
            </Field>

            <Field label="Apartment, suite, etc. (optional)">
              <FocusInput placeholder="Flat / floor / building name" value={form.apartment} onChange={set('apartment')} />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={labelStyle}>City</label>
                <FocusInput placeholder="City" value={form.city} onChange={set('city')} />
                {errors.city && <ErrMsg>{errors.city}</ErrMsg>}
              </div>
              <div>
                <label style={labelStyle}>State</label>
                <FocusSelect value={form.state} onChange={set('state')}>
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </FocusSelect>
                {errors.state && <ErrMsg>{errors.state}</ErrMsg>}
              </div>
              <div>
                <label style={labelStyle}>PIN Code</label>
                <FocusInput placeholder="6-digit PIN" value={form.pincode} onChange={set('pincode')} maxLength={6} />
                {errors.pincode && <ErrMsg>{errors.pincode}</ErrMsg>}
              </div>
            </div>
          </section>

          {/* Payment method */}
          <section style={{ marginBottom: '2.5rem' }}>
            <SectionTitle>Payment Method</SectionTitle>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.12em', opacity: 0.4, marginBottom: '1.2rem' }}>
              All transactions are secure and encrypted.
            </p>

            {/* Online */}
            <PayOption
              selected={paymentMethod === 'online'}
              onClick={() => setPaymentMethod('online')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                <Radio selected={paymentMethod === 'online'} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.08em', fontWeight: 400 }}>
                    Pay Online
                  </div>
                  <div style={{ fontSize: '0.55rem', letterSpacing: '0.1em', opacity: 0.5, marginTop: 2 }}>
                    UPI · Cards · Net Banking · Wallets via Razorpay
                  </div>
                </div>
                {/* Card logos */}
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  {['UPI', 'VISA', 'MC'].map((b) => (
                    <div key={b} style={{
                      padding: '2px 6px', border: '1px solid var(--border-light)',
                      fontSize: '0.45rem', letterSpacing: '0.08em', background: 'var(--surface)',
                      color: 'var(--brown)',
                    }}>{b}</div>
                  ))}
                </div>
              </div>
              {paymentMethod === 'online' && (
                <div style={{
                  marginTop: '1rem', padding: '1rem',
                  background: 'var(--surface)', borderTop: '1px solid var(--border-light)',
                  fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.6, textAlign: 'center',
                }}>
                  You'll be redirected to Razorpay's secure payment page to complete your purchase.
                </div>
              )}
            </PayOption>

            {/* COD */}
            <PayOption
              selected={paymentMethod === 'cod'}
              onClick={() => setPaymentMethod('cod')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Radio selected={paymentMethod === 'cod'} />
                <div>
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.08em', fontWeight: 400 }}>
                    Cash on Delivery
                  </div>
                  <div style={{ fontSize: '0.55rem', letterSpacing: '0.1em', opacity: 0.5, marginTop: 2 }}>
                    Pay at your doorstep when your order arrives
                  </div>
                </div>
              </div>
              {paymentMethod === 'cod' && (
                <div style={{
                  marginTop: '1rem', padding: '1rem',
                  background: 'var(--surface)', borderTop: '1px solid var(--border-light)',
                  fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.6, textAlign: 'center',
                }}>
                  Have the exact amount ready. COD available across India.
                </div>
              )}
            </PayOption>
          </section>

          {/* Place Order button */}
          <button
            onClick={handleSubmit}
            disabled={placing}
            style={{
              width: '100%',
              background: placing ? 'var(--brown)' : 'var(--dark)',
              color: 'var(--ink)',
              border: 'none',
              cursor: placing ? 'wait' : 'pointer',
              padding: '1.2rem',
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              transition: 'background 0.25s, transform 0.1s',
              marginBottom: '1.5rem',
            }}
            onMouseEnter={(e) => { if (!placing) e.currentTarget.style.background = 'var(--accent)'; }}
            onMouseLeave={(e) => { if (!placing) e.currentTarget.style.background = 'var(--dark)'; }}
          >
            {placing
              ? (paymentMethod === 'cod' ? 'Placing Order…' : 'Opening Payment…')
              : (paymentMethod === 'cod' ? 'Place Order — Cash on Delivery' : `Pay ₹${total} Online`)}
          </button>

          <p style={{ fontSize: '0.55rem', letterSpacing: '0.12em', opacity: 0.3, textAlign: 'center' }}>
            By placing your order, you agree to our Terms of Service & Privacy Policy
          </p>
        </div>

        {/* ── RIGHT: Order Summary ───────────────────────────────────────────── */}
        <div style={{
          background: 'var(--surface)',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          borderTop: 'none',
        }}>
          <div style={{ position: 'sticky', top: '1.5rem' }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.4rem', letterSpacing: '0.1em',
              marginBottom: '1.5rem', paddingBottom: '1rem',
              borderBottom: '1px solid var(--border-light)',
            }}>
              Order Summary
            </div>

            {/* Items */}
            <div style={{ marginBottom: '1.5rem' }}>
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} style={{
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  marginBottom: '1.2rem', paddingBottom: '1.2rem',
                  borderBottom: '1px solid var(--border-light)',
                }}>
                  {/* Image with qty badge */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: 64, height: 64, background: 'var(--mid)',
                      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {item.image
                        ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                        : <span style={{ fontSize: '0.45rem', opacity: 0.3 }}>IMG</span>}
                    </div>
                    <div style={{
                      position: 'absolute', top: -6, right: -6,
                      width: 20, height: 20, borderRadius: '50%',
                      background: 'var(--dark)', color: 'var(--ink)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.55rem', fontWeight: 500,
                    }}>{item.qty}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.06em' }}>{item.name}</div>
                    <div style={{ fontSize: '0.55rem', opacity: 0.4, letterSpacing: '0.12em', marginTop: 2 }}>SIZE: {item.size}</div>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', color: 'var(--accent)' }}>
                    ₹{item.price * item.qty}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', opacity: 0.6 }}>
                <span>Subtotal ({count} item{count !== 1 ? 's' : ''})</span>
                <span>₹{total}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', opacity: 0.6 }}>
                <span>Shipping</span>
                <span style={{ color: 'green', fontSize: '0.65rem' }}>{total >= 499 ? 'Free' : '₹49'}</span>
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                paddingTop: '1rem', borderTop: '1px solid var(--border-light)',
              }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.1rem', letterSpacing: '0.08em' }}>Total</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', color: 'var(--accent)' }}>
                  ₹{total >= 499 ? total : total + 49}
                </span>
              </div>
              {total >= 499 && (
                <p style={{ fontSize: '0.55rem', letterSpacing: '0.1em', opacity: 0.4, textAlign: 'right', marginTop: '0.4rem' }}>
                  Free shipping applied
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: '1.3rem', letterSpacing: '0.1em',
      color: 'var(--dark)', marginBottom: '1.2rem',
      paddingBottom: '0.6rem',
      borderBottom: '1px solid var(--border-light)',
    }}>{children}</h2>
  );
}

function ErrMsg({ children }) {
  return (
    <div style={{
      fontSize: '0.55rem', letterSpacing: '0.1em',
      color: '#c0392b', marginTop: '0.3rem',
    }}>{children}</div>
  );
}

function Radio({ selected }) {
  return (
    <div style={{
      width: 18, height: 18, borderRadius: '50%',
      border: `2px solid ${selected ? 'var(--accent)' : 'var(--border-light)'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, transition: 'border-color 0.2s',
    }}>
      {selected && (
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--accent)',
        }} />
      )}
    </div>
  );
}

function PayOption({ selected, onClick, children }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: `1px solid ${selected ? 'var(--accent)' : 'var(--border-light)'}`,
        marginBottom: '0.8rem',
        cursor: 'pointer',
        background: selected ? 'rgba(191,160,106,0.05)' : 'transparent',
        transition: 'border-color 0.2s, background 0.2s',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '1rem 1.2rem' }}>
        {children}
      </div>
    </div>
  );
}