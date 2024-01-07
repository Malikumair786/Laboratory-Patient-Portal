import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useUser } from '@clerk/clerk-react';

import Axios from 'axios';

const HomeVisitRequest = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    street_address: '',
    preferred_date: '',
    preferred_time: '',
    test_type: '',
    additional_comments: '',
  });

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/tests/all');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const isValidPhone = phone => {
    const phoneRegex = /^\d{11}$/; // Adjust the phone number validation based on your requirements
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    if (
      !formData.phone ||
      !formData.street_address ||
      !formData.preferred_date ||
      !formData.preferred_time ||
      !formData.test_type
    ) {
      alert('All fields are required');
      return false;
    }

    if (!isValidPhone(formData.phone)) {
      alert('Enter a valid phone number');
      return false;
    }

    const currentDate = new Date();
    const selectedDate = new Date(formData.preferred_date);

    if (selectedDate < currentDate) {
      alert('Select a date today or in the future');
      return false;
    }

    return true;
  };

  const { user } = useUser();
  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      const requestData = {
        firstname: user.firstName,
        lastname: user.lastName,
        email: String(user.primaryEmailAddress),
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        street: formData.street_address,
        preferredDate: formData.preferred_date,
        preferredTime: formData.preferred_time,
        testType: formData.test_type,
        purpose: formData.additional_comments,
      };

      const response = await Axios.post(
        'http://localhost:8081/appointment/create',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Check if the slot is already booked
      if (response.data === 'Slot is already booked') {
        alert(
          'Please select another date or time, this slot is booked already'
        );
      } else {
        // Extract the appointment ID from the response
        const appointmentId = response.data.id;
        console.log('Appointment Id: ', appointmentId);

        // Update the route to include the user ID and appointment ID
        navigate(`/stripe-main/${user.id}/${appointmentId}`);
      }

      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="phone" fontWeight={'normal'}>
          Phone Number
        </FormLabel>
        <Input
          id="phone"
          type="tel"
          placeholder="03330000000"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl as="div" mt="2%" isRequired>
        <FormLabel htmlFor="country" fontWeight={'normal'}>
          Country / Region
        </FormLabel>
        <Select
          id="country"
          placeholder="Select country"
          onChange={handleChange}
        >
          <option>Pakistan</option>
        </Select>
      </FormControl>

      <FormControl as="div" mt="2%" isRequired>
        <FormLabel htmlFor="city" fontWeight={'normal'}>
          City
        </FormLabel>
        <Select id="city" placeholder="Select city" onChange={handleChange}>
          <option>Islamabad</option>
          <option>Rawalpindi</option>
          <option>Karachi</option>
          <option>Lahore</option>
        </Select>
      </FormControl>

      <FormControl as="div" mt="2%" isRequired>
        <FormLabel htmlFor="street_address" fontWeight={'normal'}>
          Street address
        </FormLabel>
        <Input
          id="street_address"
          type="text"
          placeholder="123 Main St"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="preferred_date" fontWeight={'normal'}>
          Preferred Date
        </FormLabel>
        <Input id="preferred_date" type="date" onChange={handleChange} />
      </FormControl>

      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="preferred_time" fontWeight={'normal'}>
          Preferred Time
        </FormLabel>
        <Select
          id="preferred_time"
          onChange={handleChange}
          placeholder="Select hour"
        >
          {[...Array(24)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="test_type" fontWeight={'normal'}>
          Test Type
        </FormLabel>
        <Select
          id="test_type"
          placeholder="Select test type"
          onChange={handleChange}
        >
          <option>Leukemia</option>
          <option>Malaria</option>
          <option>Others</option>
        </Select>
      </FormControl> */}
      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="test_type" fontWeight={'normal'}>
          Test Type
        </FormLabel>
        <Select
          id="test_type"
          placeholder="Select test type"
          onChange={handleChange}
        >
          {/* Map through the data array to dynamically render options */}
          {data.map(test => (
            <option key={test.id} value={test.testName}>
              {test.testName}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="additional_comments" fontWeight={'normal'}>
          Additional Comments
        </FormLabel>
        <Textarea
          id="additional_comments"
          placeholder="Any additional comments..."
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mt="2%">
        {/* Add the Submit button */}
        <Button
          w="100%"
          colorScheme="red"
          variant="solid"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormControl>
    </>
  );
};

export default HomeVisitRequest;
