import { Box } from '@chakra-ui/react';
import { memo, ReactNode } from 'react';

interface Props {
  children: ReactNode | ReactNode[];
}

export const MainContainer = memo(({ children }: Props) => (
  <Box width='60%' margin='5% auto'>
    {children}
  </Box>
));
