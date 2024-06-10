import { MainView } from './views/Main';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { ReplyCommentProvider } from './context/ReplyComment';
import { useWebgazer } from './config/useWebgazer';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    (async () => {
      const startWebGazer = async () => {
        const webgazer = await useWebgazer();
        await webgazer
          .setGazeListener((data: any) => {
            if (!data) return;
            console.log(data);
          })
          .begin();
      };

      await startWebGazer();
    })();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <ReplyCommentProvider>
        <MainView />
      </ReplyCommentProvider>
    </ChakraProvider>
  );
}

export default App;
