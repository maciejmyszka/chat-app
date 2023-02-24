import React from 'react';
import { MainView } from './views/Main';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainView />
    </ChakraProvider>
  );
}

export default App;
