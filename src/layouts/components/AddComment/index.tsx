import { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { Button, Flex, Image, Text, Textarea } from '@chakra-ui/react';
import { CommentContainer } from '../../containers/CommentContainer';
import { useReplyCommentContext } from '../../../context/ReplyComment';
import { loggedUserData } from '../../../data';

export const AddComment = () => {
  const [commentText, setCommentText] = useState<string>('');
  const {
    setReplyAnswerId,
    replyAnswerId,
    setComments,
    comments,
    replyUser,
    setReplyUser,
  } = useReplyCommentContext();

  const onClickReply = () => {
    const comment = comments.find(({ id }: any) => id === replyAnswerId);

    const newComment = {
      id: Math.floor(Math.random() * 10000),
      username: 'me',
      date: 'now',
      counter: 0,
      text: commentText,
    };

    comment.repplies = [...comment.repplies, newComment];

    setComments([...comments]);
    setReplyAnswerId(null);
    setReplyUser('');
    setCommentText('');
    return;
  };

  const onClickAdd = () => {
    const newComment = {
      id: Math.floor(Math.random() * 10000),
      username: loggedUserData.username,
      image: loggedUserData.image,
      date: 'now',
      counter: 0,
      text: commentText,
      repplies: [],
    };

    setComments((prevValue: any) => [...prevValue, newComment]);
    setCommentText('');
    setReplyUser('');
    return;
  };

  return (
    <>
      {replyUser && (
        <CommentContainer
          py='0.5rem'
          justifyContent='space-between'
          alignItems='center'
        >
          <Text>
            Answering <span style={{ fontWeight: '600' }}>@{replyUser}</span>...
          </Text>
          <CloseIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => setReplyUser('')}
          />
        </CommentContainer>
      )}

      <CommentContainer>
        <Image
          src={loggedUserData.image}
          width='2rem'
          height='2rem'
          borderRadius='50%'
        />

        <Flex width='100%' flexDirection='column'>
          <Textarea
            placeholder='Add a comment...'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Flex>

        <Button
          bgColor='#8835D3'
          color='#fff'
          size='md'
          onClick={replyAnswerId ? onClickReply : onClickAdd}
        >
          Send
        </Button>
      </CommentContainer>
    </>
  );
};
