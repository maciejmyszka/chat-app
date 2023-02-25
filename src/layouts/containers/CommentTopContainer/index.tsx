import { Flex } from '@chakra-ui/react';
import { ChildrenProps } from '../../../types/ChildrenProps';

export const CommentTopContainer = ({ children }: ChildrenProps) => (
  <Flex justifyContent='space-between' alignItems='center' mb='0.5rem'>
    {children}
  </Flex>
);
