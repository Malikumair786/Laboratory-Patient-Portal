import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbox from './Chatbox';
import Home from 'scenes/home';
const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Home />
      <Chatbox />
      <Footer />
    </Box>
  );
};

export default Layout;
