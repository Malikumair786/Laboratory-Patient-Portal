import React from 'react';
import { Box } from '@chakra-ui/react';
import PNavbar from './PNavbar';
import { Outlet } from 'react-router-dom';
import Chatbox from 'components/Chatbox';
import Footer from 'components/Footer';

const PLayout = () => {
  return (
    <Box>
      <PNavbar />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet /> {/* This is where your nested components will be rendered */}
      </Box>
      <Chatbox />
      <Footer />
    </Box>
  );
};

export default PLayout;
