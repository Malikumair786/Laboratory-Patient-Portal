import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Heading } from '@chakra-ui/react';
import CheckoutForm from './CheckoutForm';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const stripePromise = loadStripe(
  'pk_test_51NsLcWJDH8KYpla9en11Mn90fRUFauvAD6KB892HOqtXY1p8DpwQHSSc4l07q8awujOxEl5oVAKzTdwlCTyego2u00AOS6iVqB'
);

function StripeMain() {
  const [clientSecret, setClientSecret] = useState('');
  const { userId, appointmentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `http://localhost:8081/payments/create-payment-intent/${appointmentId}`;
    axios
      .get(apiUrl)
      .then(response => {
        setClientSecret(response.data.clientSecret);
      })
      .catch(error => {
        console.error('Error fetching clientSecret:', error);
      });
  }, [appointmentId]);

  return (
    <div className="App">
      <Heading mb={10}>
        {' '}
        Make Payments for your Home Visit Request confirmation{' '}
      </Heading>{' '}
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
        >
          <CheckoutForm
            clientSecret={clientSecret}
            userId={userId}
            appointmentId={appointmentId}
            navigate={navigate}
          />{' '}
        </Elements>
      )}{' '}
      {!clientSecret && <p> Loading... </p>}{' '}
    </div>
  );
}

export default StripeMain;
