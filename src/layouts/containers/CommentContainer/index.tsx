import { Flex, FlexProps } from '@chakra-ui/react';
import { Dispatch, memo, ReactNode, SetStateAction } from 'react';

interface Props extends FlexProps {
  children: ReactNode | ReactNode[];
  setIsHovering?: Dispatch<SetStateAction<boolean>>;
}

export const CommentContainer = memo(
  ({ children, setIsHovering, ...rest }: Props) => (
    <Flex
      bgColor='#fff'
      m='1rem 0'
      p='1.5rem'
      gap='1.5rem'
      borderRadius='0.5rem'
      alignItems='flex-start'
      width='100%'
      onMouseOver={() => setIsHovering && setIsHovering(true)}
      onMouseOut={() => setIsHovering && setIsHovering(false)}
      flexDirection={{ xxs: 'column', xs: 'row' }}
      {...rest}
    >
      {children}
    </Flex>
  )
);
