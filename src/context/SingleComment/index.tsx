import { createContext, memo, ReactNode, useContext } from 'react';
import { loggedUserData } from '../../data';

export const singleCommentContext = createContext<any | null>(null);
const { Provider } = singleCommentContext;

interface Props {
  username: string;
  date: string;
  counter: number;
  text: string;
  replies: any[];
  id: number;
  originId?: number;
  image: string;
  children: ReactNode | ReactNode[];
}

export const SingleCommentProvider = memo(
  ({
    children,
    id,
    originId,
    image,
    date,
    username,
    text,
    replies,
    counter,
  }: Props) => {
    const isLoggedUser = username === loggedUserData.username;

    return (
      <Provider
        value={{
          isLoggedUser,
          id,
          originId,
          image,
          date,
          username,
          text,
          replies,
          counter,
        }}
      >
        {children}
      </Provider>
    );
  }
);

export const useSingleCommentContext = () => {
  const commentState = useContext(singleCommentContext);

  if (!commentState) {
    throw new Error('You have to add SingleCommentProvider');
  }
  const {
    isLoggedUser,
    id,
    originId,
    image,
    date,
    username,
    text,
    replies,
    counter,
  } = commentState;

  return {
    isLoggedUser,
    id,
    originId,
    image,
    date,
    username,
    text,
    replies,
    counter,
  };
};
