import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  xs: '0',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};
export const theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: '#EBF4FF',
      },
    },
  },
});
