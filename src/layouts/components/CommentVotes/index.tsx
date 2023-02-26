import { useState } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import { useSingleCommentContext } from '../../../context/SingleComment';
import { CommentVotesContainer } from '../../containers/CommentVotesContainer';

export const CommentVotes = () => {
  const { counter } = useSingleCommentContext();

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
    <CommentVotesContainer>
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
    </CommentVotesContainer>
  );
};
