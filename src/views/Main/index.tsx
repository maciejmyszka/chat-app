import { MainContainer } from '../../layouts/containers/MainContainer';
import { useState } from 'react';
import { data } from '../../data';
import { Comment } from '../../layouts/components/Comment';

export const MainView = () => {
  const [comments, setComments] = useState(data);

  return (
    <MainContainer>
      {comments.map(({ id, ...rest }) => (
        <Comment key={id} {...rest} />
      ))}
    </MainContainer>
  );
};
