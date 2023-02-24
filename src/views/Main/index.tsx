import { MainContainer } from '../../layouts/containers/MainContainer';
import { useState } from 'react';
import { data } from '../../data';
import { Comment } from '../../layouts/components/Comment';
import { AddComment } from '../../layouts/components/AddComment';

export const MainView = () => {
  const [comments, setComments] = useState(data);

  return (
    <MainContainer>
      {comments.map(({ id, ...rest }) => (
        <Comment key={id} {...rest} />
      ))}

      <AddComment setComments={setComments} />
    </MainContainer>
  );
};
