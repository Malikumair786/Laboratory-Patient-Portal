import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Button,
} from '@chakra-ui/react';
import FeedbackForm from '../Feedback/FeedbackForm';
import MedicalReport from './MedicalReport';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [tests, setTests] = useState([]);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const handleFeedbackOpen = () => {
    setFeedbackOpen(true);
  };

  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
  };

  const handleViewReport = id => {
    // Navigate to the "medicalReport" page with the appointmentId
    navigate(`/dashboard/medicalReport/${id}`);
  };

  useEffect(() => {
    const email = String(user.emailAddresses[0].emailAddress);
    axios
      .get(`http://localhost:8081/appointment/specificmail/${email}`)
      .then(response => {
        setTests(response.data);
        // console.log(tests)
      })
      .catch(error => {
        console.error('Error fetching tests:', error);
      });
  }, [user.emailAddresses]);

  // Filter tests to only include those with status "Completed"
  const completedTests = tests.filter(test => test.status === 'completed');
  // console.log(completedTests)

  return (
    <Box>
      <Box>
        <Box m={30}>
          <Heading mb={10}>Completed Tests</Heading>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Test Name</Th>
                <Th>Status</Th>
                <Th>Download</Th>
                <Th>Feedback</Th>
              </Tr>
            </Thead>
            <Tbody>
              {completedTests.map(test => (
                <Tr key={test.id}>
                  <Td>{test.id}</Td>
                  <Td>
                    {test.firstname} {test.lastname}
                  </Td>
                  <Td>{test.preferredDate}</Td>
                  <Td>{test.preferredTime}</Td>
                  <Td>{test.testType}</Td>
                  <Td>{test.status}</Td>
                  <Td>
                    <Link href={test.downloadLink} isExternal>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handleViewReport(test.id)}
                      >
                        View Report
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="green"
                      size="sm"
                      onClick={handleFeedbackOpen}
                    >
                      Leave Feedback
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        {selectedTest && (
          <MedicalReport
            id={selectedTest.id}
            firstName={selectedTest.firstName}
            lastName={selectedTest.lastName}
            test={selectedTest.test}
            result={selectedTest.result}
          />
        )}

        <FeedbackForm
          userEmail={user.primaryEmailAddress}
          open={isFeedbackOpen}
          handleClose={handleFeedbackClose}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
