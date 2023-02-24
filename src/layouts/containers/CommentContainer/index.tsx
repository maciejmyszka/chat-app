import { Flex } from '@chakra-ui/react';
import { memo, ReactNode } from 'react';

interface Props {
  children: ReactNode | ReactNode[];
}

export const CommentContainer = memo(({ children }: Props) => (
  <Flex
    bgColor='#fff'
    m='1rem 0'
    p='1.5rem'
    gap='1.5rem'
    borderRadius='0.5rem'
    alignItems='flex-start'
  >
    {children}
  </Flex>
));
