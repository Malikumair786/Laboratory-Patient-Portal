import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(user.fullName);
  console.log(String(user.primaryEmailAddress.emailAddress));
  console.log(props.appointmentId);

  // const [email, setEmail] = useState('');

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      // Use axios to make a POST request to your backend
      const response = await axios.post(
        'http://localhost:8081/payments/create',
        {
          appointmentId: props.appointmentId,
          username: user.fullName,
          email: String(user.primaryEmailAddress.emailAddress),
        }
      );

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3001/dashboard',
        },
      });

      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      setMessage('Error confirming payment.');
    }

    setIsLoading(false);
  };
  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <button
        style={{
          backgroundColor: 'blue', // Set the background color to blue
          color: 'white', // Set the text color to white
          margin: '5px',
          padding: '5px',
          // fontSize: 'bold',
          border: '1px solid black',
          borderRadius: '5px',
          // Add any additional inline styles you need
          // For example, padding, border-radius, etc.
        }}
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </button>

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
