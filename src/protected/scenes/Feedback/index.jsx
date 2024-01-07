
import React, { useEffect, useState } from "react";
import { Box, Text, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const {user} = useUser();
  const userEmail = String(user.primaryEmailAddress.emailAddress);
  // console.log(user.primaryEmailAddress.emailAddress)


  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/feedback/${userEmail}`);
        setFeedbackList(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [userEmail]);

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Feedback List for {user.fullName}
      </Text>
      {feedbackList.length === 0 ? (
        <Text>No feedback available for this user.</Text>
      ) : (
        <Stack spacing={4}>
          {feedbackList.map((feedback) => (
            <Box key={feedback.id} p={4} borderWidth="1px" borderRadius="md">
              <Text fontSize="lg" fontWeight="semibold">Date: {feedback.date}</Text>
              <Text fontSize="lg" fontWeight="semibold">Rating: {feedback.rating}</Text>
              <Text mt={2}>{feedback.feedback}</Text>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Feedback;
