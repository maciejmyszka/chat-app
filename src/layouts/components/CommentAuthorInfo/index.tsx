import { Flex, Image, Text } from '@chakra-ui/react';
import { YouLabel } from '../YouLabel';

interface Props {
  username: string;
  image: string;
  date: string;
  isLoggedUser: boolean;
}

export const CommentAuthorInfo = ({
  username,
  image,
  date,
  isLoggedUser,
}: Props) => (
  <Flex gap='1rem' alignItems='center'>
    <Image
      src={image}
      alt='Dan Abramov'
      sx={{ width: '2rem', height: '2rem' }}
      borderRadius='50%'
    />
    <Text fontWeight='600'>{username}</Text>

    {isLoggedUser && <YouLabel />}

    <Text color='#A7A7A7'>{date}</Text>
  </Flex>
);
