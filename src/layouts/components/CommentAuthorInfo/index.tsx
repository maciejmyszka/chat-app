import { Flex, Image, Text } from '@chakra-ui/react';
import { YouLabel } from '../YouLabel';
import { useSingleCommentContext } from '../../../context/SingleComment';

export const CommentAuthorInfo = () => {
  const { username, image, date, isLoggedUser } = useSingleCommentContext();

  return (
    <Flex
      gap='1rem'
      alignItems='center'
      flexWrap='wrap'
      justifyContent='center'
    >
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
};
