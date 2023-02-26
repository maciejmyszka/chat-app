import { memo } from 'react';
import { useToast } from '@chakra-ui/react';
import { CommentContainer } from '../../containers/CommentContainer';
import { CommentVotes } from '../CommentVotes';
import { useReplyCommentContext } from '../../../context/ReplyComment';
import { CommentActions } from '../CommentActions';
import { CommentContentContainer } from '../../containers/CommentContentContainer';
import { CommentAuthorInfo } from '../CommentAuthorInfo';
import { CommentTopContainer } from '../../containers/CommentTopContainer';
import { Replies } from '../Replies';
import { useSingleCommentContext } from '../../../context/SingleComment';
import { CommentContent } from '../CommentContent';

interface Props {
  originId?: number;
  scrollToAdd?: () => void;
}

export const Comment = memo(({ originId, scrollToAdd }: Props) => {
  const toast = useToast();

  const { id, username, commentText, setIsEditMode, setIsHovering } =
    useSingleCommentContext();

  const { setReplyAnswerId, setReplyUser, comments, setComments } =
    useReplyCommentContext();

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
    setIsEditMode((prevState: boolean) => !prevState);
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
        <CommentVotes />

        <CommentContentContainer>
          <CommentTopContainer>
            <CommentAuthorInfo />
            <CommentActions
              onClickDelete={onClickDelete}
              onClickEdit={onClickEdit}
              onClickReply={onClickReply}
            />
          </CommentTopContainer>

          <CommentContent onClickSave={onClickSave} />
        </CommentContentContainer>
      </CommentContainer>

      <Replies scrollToAdd={scrollToAdd} originId={originId} />
    </>
  );
});
