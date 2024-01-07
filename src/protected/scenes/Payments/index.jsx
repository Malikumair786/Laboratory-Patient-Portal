import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from '@chakra-ui/react';

const Payments = () => {
  const { user } = useUser();
  const location = useLocation();
  const [alertShown, setAlertShown] = useState(false);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const email = String(user.emailAddresses[0].emailAddress);
    axios
      .get(`http://localhost:8081/payments/specificmail/${email}`, {})
      .then(response => {
        setPayments(response.data);
      })
      .catch(error => {
        console.error('Error fetching Payments:', error);
      });

    const urlSearchParams = new URLSearchParams(location.search);
    const paymentIntentStatus = urlSearchParams.get('redirect_status');

    if (paymentIntentStatus === 'succeeded' && !alertShown) {
      // Payment succeeded, show dialog box and save paymentData
      alert('Your payment is done successfully!');
      setAlertShown(true);

      const paymentData = {
        username: user.fullName,
        email: String(user.emailAddresses[0].emailAddress),
        status: 'successful',
        date: new Date().toISOString(),
      };

      console.log('Payment data', paymentData);
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [location.search, user.fullName, user.emailAddresses, alertShown]);

  // Function to format date to "YYYY-MM-DD"
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <Box>
      <Box m={30}>
        <Heading mb={10}>Your Payments</Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>UserName</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {payments.map(payment => (
              <Tr key={payment.id}>
                <Td>{payment.username}</Td>
                <Td>{payment.email}</Td>
                <Td>{payment.status}</Td>
                {/* Apply the formatDate function to format the date */}
                <Td>{formatDate(payment.date)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Payments;
