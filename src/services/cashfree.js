// Cashfree Payment Gateway Integration
import { load } from '@cashfreepayments/cashfree-js';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

const CASHFREE_APP_ID = import.meta.env.VITE_CASHFREE_APP_ID;
const CASHFREE_ENV = import.meta.env.VITE_CASHFREE_ENV || 'PROD';

let cashfree;

// Initialize Cashfree SDK
const initializeCashfree = async () => {
  if (!cashfree) {
    cashfree = await load({
      mode: CASHFREE_ENV === 'PROD' ? 'production' : 'sandbox'
    });
  }
  return cashfree;
};

// Create payment order
export const createPaymentOrder = async (hackathonData, userData) => {
  try {
    const orderData = {
      hackathonId: hackathonData.id,
      hackathonName: hackathonData.name,
      amount: hackathonData.registrationFee,
      currency: 'INR',
      userId: userData.uid,
      userEmail: userData.email,
      userName: userData.displayName || 'User',
      userPhone: userData.phoneNumber || '9999999999',
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    // Save order to Firestore
    const orderRef = await addDoc(collection(db, 'payments'), orderData);
    const orderId = `ORDER_${Date.now()}_${orderRef.id.slice(0, 8)}`;

    // Create Cashfree checkout session
    const checkoutData = {
      orderId: orderId,
      orderAmount: hackathonData.registrationFee,
      orderCurrency: 'INR',
      orderNote: `Registration for ${hackathonData.name}`,
      customerName: userData.displayName || 'User',
      customerEmail: userData.email,
      customerPhone: userData.phoneNumber || '9999999999',
      returnUrl: `${window.location.origin}/payment/success?orderId=${orderId}`,
      notifyUrl: `${window.location.origin}/api/payment/webhook`
    };

    return {
      orderId,
      orderRef: orderRef.id,
      checkoutData
    };
  } catch (error) {
    console.error('Error creating payment order:', error);
    throw error;
  }
};

// Process payment
export const processPayment = async (checkoutData) => {
  try {
    const cf = await initializeCashfree();
    
    const paymentSessionId = await getPaymentSessionId(checkoutData);
    
    const checkoutOptions = {
      paymentSessionId: paymentSessionId,
      returnUrl: checkoutData.returnUrl,
      redirectTarget: '_self'
    };

    await cf.checkout(checkoutOptions);
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
};

// Get payment session ID from backend
const getPaymentSessionId = async (orderData) => {
  // Note: In production, this should call your backend API
  // For now, we'll use Cashfree's direct API
  try {
    const response = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': import.meta.env.VITE_CASHFREE_SECRET_KEY
      },
      body: JSON.stringify({
        order_id: orderData.orderId,
        order_amount: orderData.orderAmount,
        order_currency: orderData.orderCurrency,
        customer_details: {
          customer_id: Date.now().toString(),
          customer_name: orderData.customerName,
          customer_email: orderData.customerEmail,
          customer_phone: orderData.customerPhone
        },
        order_meta: {
          return_url: orderData.returnUrl,
          notify_url: orderData.notifyUrl
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create payment session');
    }

    return data.payment_session_id;
  } catch (error) {
    console.error('Error getting payment session:', error);
    throw error;
  }
};

// Verify payment status
export const verifyPayment = async (orderId) => {
  try {
    const response = await fetch(`https://api.cashfree.com/pg/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'x-api-version': '2022-09-01',
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': import.meta.env.VITE_CASHFREE_SECRET_KEY
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

export default {
  createPaymentOrder,
  processPayment,
  verifyPayment
};
