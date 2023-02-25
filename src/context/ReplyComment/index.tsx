import {
  createContext,
  Dispatch,
  memo,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { data } from '../../data';
import { CommentType } from '../../types/Comment';
import { ChildrenProps } from '../../types/ChildrenProps';

interface ReplyCommentState {
  comments: CommentType[];
  setComments: Dispatch<SetStateAction<CommentType[]>>;
  replyAnswerId: number | null;
  setReplyAnswerId: Dispatch<SetStateAction<number | null>>;
  replyUser: string;
  setReplyUser: Dispatch<SetStateAction<string>>;
}

export const replyCommentContext = createContext<ReplyCommentState | null>(
  null
);
const { Provider } = replyCommentContext;

export const ReplyCommentProvider = memo(({ children }: ChildrenProps) => {
  const [comments, setComments] = useState<CommentType[]>(data);
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
