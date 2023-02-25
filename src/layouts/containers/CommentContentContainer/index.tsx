import { Flex } from '@chakra-ui/react';
import { memo, ReactNode } from 'react';
import { ChildrenProps } from '../../../types/ChildrenProps';

export const CommentContentContainer = memo(({ children }: ChildrenProps) => (
  <Flex flexDirection='column' width='100%'>
    {children}
  </Flex>
));
