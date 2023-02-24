import { Button, Image, Textarea } from '@chakra-ui/react';
import { CommentContainer } from '../../containers/CommentContainer';
import { useState } from 'react';

export const AddComment = ({ setComments }: any) => {
  const [commentText, setCommentText] = useState<string>('');

  const onClickAdd = () => {
    const newComment = {
      id: Math.floor(Math.random() * 10000),
      username: 'me',
      date: 'now',
      counter: 0,
      text: commentText,
      repplies: [],
    };

    setComments((prevValue: any) => [...prevValue, newComment]);
    setCommentText('');
  };

  return (
    <CommentContainer>
      <Image
        src='https://bit.ly/dan-abramov'
        width='2rem'
        height='2rem'
        borderRadius='50%'
      />

      <Textarea
        placeholder='Add a comment...'
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      <Button bgColor='#8835D3' color='#fff' size='md' onClick={onClickAdd}>
        Send
      </Button>
    </CommentContainer>
  );
};
