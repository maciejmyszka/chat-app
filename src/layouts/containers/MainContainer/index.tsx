import { Box } from '@chakra-ui/react';
import { memo } from 'react';
import { ChildrenProps } from '../../../types/ChildrenProps';

export const MainContainer = memo(({ children }: ChildrenProps) => (
  <Box width={['90%', '85%', '82%', '82%', '60%', '60%']} margin='2% auto'>
    {children}
  </Box>
));
