import { createContext, memo, useContext, useState } from 'react';
import { data } from '../../data';

export const replyCommentContext = createContext<any | null>(null);
const { Provider } = replyCommentContext;

export const ReplyCommentProvider = memo(({ children }: any) => {
  const [comments, setComments] = useState(data);
  const [replyAnswerId, setReplyAnswerId] = useState<number | null>(null);
  const [replyUser, setReplyUser] = useState<string>('');

  return (
    <Provider
      value={{
        comments,
        setComments,
        replyAnswerId,
        setReplyAnswerId,
        replyUser,
        setReplyUser,
      }}
    >
      {children}
    </Provider>
  );
});

export const useReplyCommentContext = () => {
  const replyState = useContext(replyCommentContext);

  if (!replyState) {
    throw new Error('You have to add ReplyCommentProvider');
  }
  const {
    comments,
    setComments,
    replyAnswerId,
    setReplyAnswerId,
    replyUser,
    setReplyUser,
  } = replyState;

  return {
    comments,
    setComments,
    replyAnswerId,
    setReplyAnswerId,
    replyUser,
    setReplyUser,
  };
};
