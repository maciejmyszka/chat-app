import { MainView } from './views/Main';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { ReplyCommentProvider } from './context/ReplyComment';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import webgazer from 'webgazer';

function App() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    webgazer
      .setGazeListener((data: any, elapsedTime: any) => {
        console.log(data);
        console.log(elapsedTime);

        if (data) {
          const { x, y } = data;
          drawGazeDot(x, y);
        }
      })
      .begin();

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      webgazer.end();
    };
  }, []);

  const drawGazeDot = (x: number, y: number) => {
    const dot = document.createElement('div');
    dot.style.position = 'absolute';
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.width = '5px';
    dot.style.height = '5px';
    dot.style.backgroundColor = 'red';
    dot.style.borderRadius = '50%';
    dot.style.opacity = '0.5';
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = '1000';

    document.body.appendChild(dot);

    // Usunięcie kropki po 1 sekundzie
    setTimeout(() => {
      document.body.removeChild(dot);
    }, 1000);
  };

  return (
    <ChakraProvider theme={theme}>
      <ReplyCommentProvider>
        {/*<HeatmapComponent>*/}
        <MainView />
        {/*</HeatmapComponent>*/}
      </ReplyCommentProvider>
    </ChakraProvider>
  );
}

export default App;
