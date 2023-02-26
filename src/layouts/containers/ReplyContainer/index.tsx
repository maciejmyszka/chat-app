import { ChildrenProps } from '../../../types/ChildrenProps';
import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

export const ReplyContainer = memo(({ children }: ChildrenProps) => (
  <Flex width='100%' position='relative'>
    {children}
  </Flex>
));
