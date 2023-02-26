import { useRef } from 'react';
import { MainContainer } from '../../layouts/containers/MainContainer';
import { Comment } from '../../layouts/components/Comment';
import { AddComment } from '../../layouts/components/AddComment';
import { useReplyCommentContext } from '../../context/ReplyComment';
import { CommentType } from '../../types/Comment';
import { SingleCommentProvider } from '../../context/SingleComment';

export const MainView = () => {
  const { comments } = useReplyCommentContext();

  const addRef = useRef<HTMLButtonElement>(null);

  const scrollToAdd = () => {
    if (addRef.current) {
      addRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainContainer>
      {comments.map(({ id, ...rest }: CommentType) => (
        <SingleCommentProvider key={id} id={id} {...rest}>
          <Comment scrollToAdd={scrollToAdd} />
        </SingleCommentProvider>
      ))}

      <AddComment addRef={addRef} />
    </MainContainer>
  );
};
