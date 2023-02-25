import { MainContainer } from '../../layouts/containers/MainContainer';
import { Comment } from '../../layouts/components/Comment';
import { AddComment } from '../../layouts/components/AddComment';
import { useReplyCommentContext } from '../../context/ReplyComment';
import { CommentType } from '../../types/Comment';
import { useRef } from 'react';

export const MainView = () => {
  const { comments } = useReplyCommentContext();
  const addRef = useRef<HTMLInputElement>(null);

  const scrollToAdd = () => {
    if (addRef.current) {
      addRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainContainer>
      {comments.map(({ id, ...rest }: CommentType) => (
        <Comment key={id} id={id} {...rest} scrollToAdd={scrollToAdd} />
      ))}

      <AddComment addRef={addRef} />
    </MainContainer>
  );
};
