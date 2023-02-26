import { RefObject, useState } from 'react';
import { Button, Flex, Image, Textarea, useToast } from '@chakra-ui/react';
import { CommentContainer } from '../../containers/CommentContainer';
import { useReplyCommentContext } from '../../../context/ReplyComment';
import { loggedUserData } from '../../../data';
import { ReplyInfo } from '../ReplyInfo';

interface Props {
  addRef: RefObject<HTMLButtonElement>;
}

export const AddComment = ({ addRef }: Props) => {
  const toast = useToast();

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
    const comment = comments.find(({ id }) => id === replyAnswerId);

    const newComment = {
      id: Math.floor(Math.random() * 10000),
      username: loggedUserData.username,
      image: loggedUserData.image,
      date: 'now',
      counter: 0,
      text: commentText,
    };

    if (comment?.replies) {
      comment.replies = [...comment.replies, newComment];

      setComments([...comments]);
      setReplyAnswerId(null);
      setReplyUser('');
      setCommentText('');

      toast({
        title: 'Comment added',
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    }
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
      replies: [],
    };

    setComments((prevValue) => [...prevValue, newComment]);
    setCommentText('');
    setReplyUser('');
    toast({
      title: 'Comment added',
      status: 'success',
      position: 'top-right',
      duration: 4000,
      isClosable: true,
    });
    return;
  };

  return (
    <>
      {replyUser && (
        <ReplyInfo replyUser={replyUser} setReplyUser={setReplyUser} />
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
          ref={addRef}
          bgColor='#8835D3'
          color='#fff'
          size='md'
          onClick={replyAnswerId ? onClickReply : onClickAdd}
          isDisabled={!commentText}
        >
          Send
        </Button>
      </CommentContainer>
    </>
  );
};
