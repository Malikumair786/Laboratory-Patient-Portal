// FeedbackForm.jsx
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';

import './styles.css';
import StarRating from './Star';

const FeedbackForm = ({ userEmail, open, handleClose }) => {
  const [rating, setRating] = useState(0);
  const [feedbackData, setFeedbackData] = useState({
    email: String(userEmail),
    feedback: '',
  });

  const handleChange = field => event => {
    setFeedbackData(prevData => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      // Check if both rating and feedback are provided
      if (rating === 0 || feedbackData.feedback.trim() === '') {
        console.error('Please provide both rating and feedback');
        return;
      }

      // Use the rating state instead of feedbackData.rating
      await axios.post('http://localhost:8081/feedback/add', {
        ...feedbackData,
        rating,
      });
      handleClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <Modal isOpen={open} onClose={handleClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Feedback Form</ModalHeader>
        <ModalBody className="modal-body">
          <h1>Please provide your feedback below:</h1>

          <div className="star-container">
            <StarRating rating={rating} setRating={setRating} />
          </div>

          <Textarea
            className="feedback-textarea"
            placeholder="Feedback"
            rows={4}
            value={feedbackData.feedback}
            onChange={handleChange('feedback')}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSaveClick}>
            Submit Feedback
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FeedbackForm;
