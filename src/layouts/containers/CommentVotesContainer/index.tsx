import { Flex } from '@chakra-ui/react';
import { ChildrenProps } from '../../../types/ChildrenProps';
import { memo } from 'react';

export const CommentVotesContainer = memo(({ children }: ChildrenProps) => (
  <Flex
    flexDirection='column'
    justifyContent='space-between'
    bgColor='#EBF4FF'
    p='0.5rem 0.5rem'
    alignItems='center'
    borderRadius='0.5rem'
    gap='1rem'
  >
    {children}
  </Flex>
));
