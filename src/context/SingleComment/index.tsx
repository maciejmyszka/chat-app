import { createContext, memo, ReactNode, useContext, useState } from 'react';
import { loggedUserData } from '../../data';
import { CommentType } from '../../types/Comment';

export const singleCommentContext = createContext<any | null>(null);
const { Provider } = singleCommentContext;

interface Props {
  username: string;
  date: string;
  counter: number;
  text: string;
  replies?: CommentType[];
  id: number;
  image: string;
  children: ReactNode | ReactNode[];
}

export const SingleCommentProvider = memo(
  ({ children, id, image, date, username, text, replies, counter }: Props) => {
    const isLoggedUser = username === loggedUserData.username;

    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [commentText, setCommentText] = useState<string>(text);
    const [isRepliesVisible, setIsRepliesVisible] = useState<boolean>(false);

    return (
      <Provider
        value={{
          isLoggedUser,
          id,
          image,
          date,
          username,
          text,
          replies,
          counter,
          isHovering,
          setIsHovering,
          isEditMode,
          setIsEditMode,
          commentText,
          setCommentText,
          isRepliesVisible,
          setIsRepliesVisible,
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
    image,
    date,
    username,
    text,
    replies,
    counter,
    isHovering,
    setIsHovering,
    isEditMode,
    setIsEditMode,
    commentText,
    setCommentText,
    isRepliesVisible,
    setIsRepliesVisible,
  } = commentState;

  return {
    isLoggedUser,
    id,
    image,
    date,
    username,
    text,
    replies,
    counter,
    isHovering,
    setIsHovering,
    isEditMode,
    setIsEditMode,
    commentText,
    setCommentText,
    isRepliesVisible,
    setIsRepliesVisible,
  };
};
