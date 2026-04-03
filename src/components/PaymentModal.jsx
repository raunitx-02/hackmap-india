import { useState } from 'react';
import { createPaymentOrder, processPayment } from '../services/cashfree';
import useAuthStore from '../store/authStore';

const PaymentModal = ({ hackathon, isOpen, onClose, onSuccess }) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (!user) {
      setError('Please sign in to register');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create payment order
      const { orderId, checkoutData } = await createPaymentOrder(hackathon, user);

      // Process payment with Cashfree
      await processPayment(checkoutData);

      // Payment initiated successfully
      onSuccess?.();
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Complete Registration</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">{hackathon.name}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>📍 {hackathon.location}</p>
            <p>📅 {new Date(hackathon.date).toLocaleDateString('en-IN')}</p>
            <p>👥 Team Size: {hackathon.teamSize.min}-{hackathon.teamSize.max} members</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Registration Fee:</span>
            <span className="text-2xl font-bold text-green-600">
              ₹{hackathon.registrationFee}
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Processing...' : `Pay ₹${hackathon.registrationFee}`}
          </button>

          <button
            onClick={onClose}
            disabled={loading}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secured by Cashfree Payments
        </p>
      </div>
    </div>
  );
};

export default PaymentModal;
