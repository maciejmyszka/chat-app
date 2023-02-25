import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  counter: number;
}

export const CommentVotes = ({ counter }: Props) => {
  const [likes, setLikes] = useState<number>(counter);
  const [isVoted, setIsVoted] = useState<boolean>(false);

  const onClickAdd = () => {
    if (!isVoted) {
      setLikes(likes + 1);
      setIsVoted(true);
    }
  };

  const onClickMinus = () => {
    if (!isVoted) {
      setLikes(likes - 1);
      setIsVoted(true);
    }
  };

  return (
    <Flex
      flexDirection='column'
      justifyContent='space-between'
      bgColor='#EBF4FF'
      p='0.5rem 0.5rem'
      alignItems='center'
      borderRadius='0.5rem'
      gap='1rem'
    >
      <AddIcon
        sx={{
          cursor: !isVoted ? 'pointer' : 'not-allowed',
        }}
        onClick={onClickAdd}
      />
      <Text>{likes}</Text>
      <MinusIcon
        sx={{
          cursor: !isVoted ? 'pointer' : 'not-allowed',
        }}
        onClick={onClickMinus}
      />
    </Flex>
  );
};
