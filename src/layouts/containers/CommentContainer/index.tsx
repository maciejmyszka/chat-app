import { Flex, FlexProps } from '@chakra-ui/react';
import { memo, ReactNode } from 'react';

interface Props extends FlexProps {
  children: ReactNode | ReactNode[];
}

export const CommentContainer = memo(({ children, ...rest }: Props) => (
  <Flex
    bgColor='#fff'
    m='1rem 0'
    p='1.5rem'
    gap='1.5rem'
    borderRadius='0.5rem'
    alignItems='flex-start'
    width='100%'
    {...rest}
  >
    {children}
  </Flex>
));
