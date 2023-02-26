import { Flex } from '@chakra-ui/react';
import { ChildrenProps } from '../../../types/ChildrenProps';
import { memo } from 'react';

export const CommentTopContainer = memo(({ children }: ChildrenProps) => (
  <Flex
    justifyContent='space-between'
    alignItems='center'
    mb='0.5rem'
    flexDirection={{ xs: 'column', sm: 'row' }}
  >
    {children}
  </Flex>
));
