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
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const InProgress = () => {
  const { user } = useUser();
  const [tests, setTests] = useState([]);

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
  const completedTests = tests.filter(
    // test => test.status === 'completed' || test.status === 'in-progress'
    test => test.status === 'in-progress'
  );
  // console.log(completedTests)

  return (
    <Box>
      <Box>
        <Box m={30}>
          <Heading mb={10}>In-Progress Tests</Heading>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Test Name</Th>
                <Th>Status</Th>
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
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default InProgress;
