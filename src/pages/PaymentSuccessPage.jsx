import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyPayment } from '../services/cashfree';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (orderId) {
      verifyPaymentStatus();
    }
  }, [orderId]);

  const verifyPaymentStatus = async () => {
    try {
      const result = await verifyPayment(orderId);
      if (result.order_status === 'PAID') {
        setStatus('success');
      } else {
        setStatus('failed');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Verifying Payment...</h2>
            <p className="text-gray-600">Please wait while we confirm your payment</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your registration has been confirmed. You will receive a confirmation email shortly.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/explore')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Explore More Hackathons
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Go to Home
              </button>
            </div>
          </>
        )}

        {(status === 'failed' || status === 'error') && (
          <>
            <div className="text-red-600 text-6xl mb-4">✗</div>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h2>
            <p className="text-gray-600 mb-6">
              Unfortunately, your payment could not be processed. Please try again.
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
