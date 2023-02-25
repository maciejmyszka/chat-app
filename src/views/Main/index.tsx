import { MainContainer } from '../../layouts/containers/MainContainer';
import { Comment } from '../../layouts/components/Comment';
import { AddComment } from '../../layouts/components/AddComment';
import { useReplyCommentContext } from '../../context/ReplyComment';

export const MainView = () => {
  const { comments } = useReplyCommentContext();

  return (
    <MainContainer>
      {comments.map(({ id, ...rest }: any) => (
        <Comment key={id} id={id} {...rest} />
      ))}

      <AddComment />
    </MainContainer>
  );
};
