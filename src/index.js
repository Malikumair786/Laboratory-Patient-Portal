import ClerkWithRoutes from 'ClerkWithRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <ColorModeScript />

        <ClerkWithRoutes />
      </ChakraProvider>
    </Router>
  </StrictMode>
);
