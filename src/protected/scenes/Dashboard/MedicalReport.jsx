import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

import {
  Button,
  Box,
  Heading,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
} from '@chakra-ui/react';
import { RiDownloadLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

const MedicalReport = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an Axios GET request to your API endpoint
        const response = await axios.get(
          `http://localhost:8081/reports/get-report-data/${id}`
        );
        console.log(response);
        console.log(response.data);
        // Assuming your API response contains the data you want to display
        const apiData = response.data;
        console.log('apiData:', apiData);

        // Set the fetched data to the state
        setPatientData(apiData);

        console.log('setpatient:', patientData);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [id]);

  const downloadReport = async () => {
    // Make sure patientData is available before creating the PDF
    if (!patientData) {
      console.error('Patient data is not available');
      return;
    }

    const container = document.getElementById('pdf-container');

    try {
      // Use html2canvas to capture the content of the container
      const canvas = await html2canvas(container, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      // Create a new jsPDF instance
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 209;
      const pdfHeight = 270;

      // Add the captured image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Set background color for "Medical Report" text
      pdf.setFillColor(52, 152, 219); // Adjust color as needed
      pdf.rect(70, 50, 70, 15, 'F'); // Adjust dimensions as needed

      // Add "Medical Report" text to the PDF
      // pdf.setTextColor(255, 255, 255); // Set text color to white
      pdf.text('Medical Report', 110, 60, { align: 'center' });

      // Add patient data to the PDF
      pdf.text(`${patientData.id}`, 130, 90);
      pdf.text(` ${patientData.firstname}`, 130, 107);
      pdf.text(`${patientData.lastname}`, 130, 124);
      pdf.text(`${patientData.testName}`, 130, 142);
      pdf.text(`${patientData.result}`, 130, 155);

      // Long text with adjusted margins
      const longText = `After extensive testing and thorough analysis, CellScope Lab has determined
        that the patient, identified by the unique ID ${patientData.id}, has undergone
        a comprehensive medical examination. The results reveal that the patient
        ${patientData.testName} is ${patientData.result}. Our team of dedicated professionals at CellScope
        Lab, committed to providing accurate and reliable medical testing
        services, ensures that the information presented in this report reflects our
        commitment to precision and quality healthcare. Should you have any
        questions or require further clarification, please do not hesitate to contact
        us. Your health and well-being are our top priorities`;

      pdf.text(longText, 10, 195);

      // Add date after the long text, centered according to the width
      const dateText = `${new Date().toLocaleDateString()}`;
      // const dateTextWidth = pdf.getStringUnitWidth(dateText);
      const dateTextX = 10;
      pdf.text(dateText, dateTextX, pdfHeight - 6);

      // Save the PDF
      pdf.save(`Medical_Report_${id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  useEffect(() => {
    const downloadButton = document.getElementById('download-button');
    if (downloadButton) {
      downloadButton.addEventListener('click', downloadReport);
    }

    return () => {
      if (downloadButton) {
        downloadButton.removeEventListener('click', downloadReport);
      }
    };
  }, [downloadReport]);

  return (
    <Box>
      {patientData ? (
        <Box>
          <Button
            id="download-button"
            position="absolute"
            top="80px"
            right="10px"
            // backgroundColor="#ff6666"
            color="white"
            // border="none"
            padding="15px"
            borderRadius="10px"
            cursor="pointer"
            fontSize="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            Download
            <RiDownloadLine size={20} style={{ marginLeft: '5px' }} />
          </Button>
          <Box id="pdf-container">
            <Box
              background="#3498db"
              color="white"
              padding="20px"
              textAlign="center"
              fontSize="24px"
              fontWeight="bold"
              borderRadius="8px 8px 0 0"
            >
              <Heading as="h1">CELLSCOPE LAB</Heading>
              <Text>World-Renowned Laboratory</Text>
              <Text>Located at Pakistan</Text>
            </Box>
            <Heading as="h2" textAlign="center" marginTop="20px">
              Medical Report
            </Heading>
            <Table variant="simple" width="100%" marginTop="20px">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" background="#3498db" color="white">
                    ID:
                  </Td>
                  <Td>{patientData.id}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" background="#3498db" color="white">
                    First Name:
                  </Td>
                  <Td>{patientData.firstname}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" background="#3498db" color="white">
                    Last Name:
                  </Td>
                  <Td>{patientData.lastname}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" background="#3498db" color="white">
                    Test:
                  </Td>
                  <Td>{patientData.testName}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" background="#3498db" color="white">
                    Result:
                  </Td>
                  <Td>{patientData.result}</Td>
                </Tr>
              </Tbody>
            </Table>
            <Heading
              as="h3"
              style={{
                background: '#3498db',
                color: 'white',
                padding: '15px',
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                borderRadius: '8px',
                margin: '20px 0',
              }}
            >
              Detailed Result
            </Heading>
            <Text textAlign="justify" marginTop="20px">
              After extensive testing and thorough analysis, CellScope Lab has
              determined that the patient, identified by the unique ID{' '}
              {patientData.id}, has undergone a comprehensive medical
              examination. The results reveal that the patient's{' '}
              {patientData.testName} is {patientData.result}. Our team of
              dedicated professionals at CellScope Lab, committed to providing
              accurate and reliable medical testing services, ensures that the
              information presented in this report reflects our commitment to
              precision and quality healthcare. Should you have any questions or
              require further clarification, please do not hesitate to contact
              us. Your health and well-being are our top priorities, and we
              remain at your service for any additional assistance or guidance.
            </Text>
            <Text
              textAlign="center"
              marginTop="20px"
              fontSize="12px"
              fontStyle="italic"
              fontWeight="bold"
            >
              Date: {new Date().toLocaleDateString()}
            </Text>
            <Text
              style={{
                marginTop: '10px',
                border: '2px solid black',
                textAlign: 'center',
                color: '#555',
                padding: '20px',
                background: '#f0f0f0',
                borderRadius: '8px 8px 8px 8px',
              }}
            >
              CellScope Lab - Providing Reliable Medical Testing Services
            </Text>
          </Box>
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default MedicalReport;
