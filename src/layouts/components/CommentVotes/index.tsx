import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

export const CommentVotes = ({ counter }: any) => {
  const [likes, setLikes] = useState<number>(counter);

  return (
    <Flex
      flexDirection='column'
      justifyContent='space-between'
      bgColor='#EBF4FF'
      p='0.5rem 0.5rem'
      alignItems='center'
      borderRadius='0.5rem'
    >
      <AddIcon sx={{ cursor: 'pointer' }} onClick={() => setLikes(likes + 1)} />
      <Text>{likes}</Text>
      <MinusIcon
        sx={{ cursor: 'pointer' }}
        onClick={() => setLikes(likes - 1)}
      />
    </Flex>
  );
};
