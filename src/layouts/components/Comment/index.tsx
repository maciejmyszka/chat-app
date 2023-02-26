import { useState } from 'react';
import { Button, Flex, Text, Textarea, useToast } from '@chakra-ui/react';
import { CommentContainer } from '../../containers/CommentContainer';
import { CommentVotes } from '../CommentVotes';
import { useReplyCommentContext } from '../../../context/ReplyComment';
import { loggedUserData } from '../../../data';
import { CommentActions } from '../CommentActions';
import { CommentContentContainer } from '../../containers/CommentContentContainer';
import { CommentAuthorInfo } from '../CommentAuthorInfo';
import { CommentTopContainer } from '../../containers/CommentTopContainer';
import { CommentType } from '../../../types/Comment';

interface Props {
  username: string;
  date: string;
  counter: number;
  text: string;
  replies?: CommentType[];
  id: number;
  originId?: number;
  image: string;
  scrollToAdd?: () => void;
}

export const Comment = ({
  counter,
  text,
  replies,
  username,
  date,
  id,
  originId,
  image,
  scrollToAdd,
}: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>(text);

  const toast = useToast();

  const [isRepliesVisible, setIsRepliesVisible] = useState<boolean>(false);

  const { setReplyAnswerId, setReplyUser, comments, setComments } =
    useReplyCommentContext();

  const isLoggedUser = username === loggedUserData.username;

  const onClickReply = () => {
    if (!originId) {
      setReplyAnswerId(id);
      setReplyUser(username);
      scrollToAdd?.();
      return;
    }

    setReplyAnswerId(originId);
    setReplyUser(username);
    scrollToAdd?.();
    return;
  };

  const onClickDelete = () => {
    if (!originId) {
      const newComments = comments.filter(
        ({ id: commentId }) => commentId !== id
      );

      setComments(newComments);
      toast({
        title: 'Comment deleted',
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const currentComment = comments.find(
      ({ id: commentId }) => commentId === originId
    );

    if (currentComment?.replies) {
      currentComment.replies = currentComment.replies.filter(
        ({ id: replyId }) => replyId !== id
      );

      setComments([...comments]);
      toast({
        title: 'Comment deleted',
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      return;
    }
  };

  const onClickEdit = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const onClickSave = () => {
    if (!originId) {
      const currentComment = comments.find(
        ({ id: commentId }) => commentId === id
      );

      if (currentComment) {
        currentComment.text = commentText;
        setComments([...comments]);
        setIsEditMode(false);
        toast({
          title: 'Comment updated',
          status: 'info',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
      }
      return;
    }

    const currentComment = comments.find(
      ({ id: commentId }) => commentId === originId
    );

    if (currentComment?.replies) {
      const currentCommentReply = currentComment.replies.find(
        ({ id: replyId }) => replyId === id
      );

      if (currentCommentReply) {
        currentCommentReply.text = commentText;
      }

      toast({
        title: 'Comment updated',
        status: 'info',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      setComments([...comments]);
      setIsEditMode(false);
    }
    return;
  };

  return (
    <>
      <CommentContainer setIsHovering={setIsHovering}>
        <CommentVotes counter={counter} />

        <CommentContentContainer>
          <CommentTopContainer>
            <CommentAuthorInfo
              username={username}
              date={date}
              image={image}
              isLoggedUser={isLoggedUser}
            />

            <CommentActions
              username={username}
              isHovering={isHovering}
              onClickDelete={onClickDelete}
              onClickEdit={onClickEdit}
              onClickReply={onClickReply}
            />
          </CommentTopContainer>

          {isEditMode ? (
            <Flex flexDirection='column' gap='1rem' alignItems='flex-start'>
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button onClick={onClickSave} isDisabled={!commentText}>
                Save
              </Button>
            </Flex>
          ) : (
            <Text>{text}</Text>
          )}
        </CommentContentContainer>
      </CommentContainer>

      {replies?.slice(0, 1).map(({ id: replyId, ...rest }) => (
        <Flex key={replyId} width='100%' position='relative'>
          <Flex width='7%' justifyContent='center'>
            <Flex border='0.5px solid #fff' />
          </Flex>

          <Flex width='93%'>
            <Comment
              id={replyId}
              {...rest}
              originId={id}
              scrollToAdd={scrollToAdd}
            />
          </Flex>
        </Flex>
      ))}

      {!isRepliesVisible && !originId && replies && replies.length > 1 && (
        <Flex width='100%' position='relative'>
          <Flex width='7%' justifyContent='center'>
            <Flex border='0.5px solid #fff' />
          </Flex>

          <Flex width='93%'>
            <Text
              fontWeight='600'
              onClick={() => setIsRepliesVisible(true)}
              sx={{
                cursor: 'pointer',

                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >{`Show all answers... (${replies?.length})`}</Text>
          </Flex>
        </Flex>
      )}

      {isRepliesVisible &&
        !originId &&
        replies?.map(({ id: replyId, ...rest }, index) => (
          <Flex key={replyId} width='100%' position='relative'>
            <Flex width='7%' justifyContent='center'>
              <Flex border='0.5px solid #fff' />
            </Flex>

            <Flex width='93%' flexDirection='column'>
              <Comment
                id={replyId}
                {...rest}
                originId={id}
                scrollToAdd={scrollToAdd}
              />

              {index === replies.length - 1 && (
                <Text
                  fontWeight='600'
                  onClick={() => setIsRepliesVisible(false)}
                  sx={{
                    cursor: 'pointer',

                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Show less answers...
                </Text>
              )}
            </Flex>
          </Flex>
        ))}
    </>
  );
};
