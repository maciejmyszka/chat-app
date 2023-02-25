import { MainView } from './views/Main';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { ReplyCommentProvider } from './context/ReplyComment';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ReplyCommentProvider>
        <MainView />
      </ReplyCommentProvider>
    </ChakraProvider>
  );
}

export default App;
