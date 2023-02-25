import { Button, Flex, Image, Text, Textarea } from '@chakra-ui/react';
import { ChatIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { CommentContainer } from '../../containers/CommentContainer';
import { CommentVotes } from '../CommentVotes';
import { useReplyCommentContext } from '../../../context/ReplyComment';
import { loggedUserData } from '../../../data';
import { useState } from 'react';

interface Props {
  username: string;
  date: string;
  counter: number;
  text: string;
  repplies: any[];
  id: number;
  originId?: number;
  image: string;
}

export const Comment = ({
  counter,
  text,
  repplies,
  username,
  date,
  id,
  originId,
  image,
}: Props) => {
  const { setReplyAnswerId, setReplyUser, comments, setComments } =
    useReplyCommentContext();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>(text);

  const isLoggedUser = username === loggedUserData.username;

  const onClickReply = () => {
    if (!originId) {
      setReplyAnswerId(id);
      setReplyUser(username);
      return;
    }

    setReplyAnswerId(originId);
    setReplyUser(username);
  };

  const onClickDelete = () => {
    if (!originId) {
      const newComments = comments.filter(
        ({ id: commentId }: any) => commentId !== id
      );

      setComments(newComments);
      return;
    }

    const currentComment = comments.find(
      ({ id: commentId }: any) => commentId === originId
    );

    currentComment.repplies = currentComment.repplies.filter(
      ({ id: repplyId }: any) => repplyId !== id
    );

    setComments([...comments]);
    return;
  };

  const onClickEdit = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const onClickSave = () => {
    if (!originId) {
      const currentComment = comments.find(
        ({ id: commentId }: any) => commentId === id
      );

      currentComment.text = commentText;
      setComments([...comments]);
      setIsEditMode(false);
    }

    const currentComment = comments.find(
      ({ id: commentId }: any) => commentId === originId
    );

    const currentCommentReply = currentComment.repplies.find(
      ({ id: repplyId }: any) => repplyId === id
    );

    currentCommentReply.text = commentText;

    setComments([...comments]);
    setIsEditMode(false);
    return;
  };

  return (
    <>
      <CommentContainer setIsHovering={setIsHovering}>
        <CommentVotes counter={counter} />

        <Flex flexDirection='column' width='100%'>
          <Flex justifyContent='space-between' alignItems='center' mb='0.5rem'>
            <Flex gap='1rem' alignItems='center'>
              <Image
                src={image}
                alt='Dan Abramov'
                sx={{ width: '2rem', height: '2rem' }}
                borderRadius='50%'
              />
              <Text fontWeight='600'>{username}</Text>
              {isLoggedUser && (
                <Flex bgColor='#8835D3' borderRadius='0.5rem'>
                  <Text color='#fff' p='5px 7px' lineHeight='1'>
                    you
                  </Text>
                </Flex>
              )}
              <Text color='#A7A7A7'>{date}</Text>
            </Flex>

            <Flex justifyContent='center' gap='0.4rem' alignItems='center'>
              {isLoggedUser ? (
                <>
                  <Button
                    leftIcon={<DeleteIcon color='#F87171' />}
                    color='#F87171'
                    fontWeight='600'
                    cursor='pointer'
                    border='none'
                    bgColor='transparent'
                    p='0.5rem'
                    borderRadius='0.5rem'
                    visibility={isHovering ? 'visible' : 'hidden'}
                    onClick={onClickDelete}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#FCE8E8',
                      },
                    }}
                  >
                    Delete
                  </Button>

                  <Button
                    leftIcon={<EditIcon color='#8835D3' />}
                    color='#8835D3'
                    fontWeight='600'
                    cursor='pointer'
                    border='none'
                    bgColor='transparent'
                    p='0.5rem'
                    borderRadius='0.5rem'
                    visibility={isHovering ? 'visible' : 'hidden'}
                    onClick={onClickEdit}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#F7EEFF',
                      },
                    }}
                  >
                    Edit
                  </Button>
                </>
              ) : (
                <Button
                  leftIcon={<ChatIcon color='#8835D3' />}
                  color='#8835D3'
                  fontWeight='600'
                  cursor='pointer'
                  border='none'
                  bgColor='transparent'
                  p='0.5rem'
                  borderRadius='0.5rem'
                  onClick={onClickReply}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F7EEFF',
                    },
                  }}
                >
                  Reply
                </Button>
              )}
            </Flex>
          </Flex>

          {isEditMode ? (
            <Flex flexDirection='column' gap='1rem' alignItems='flex-start'>
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button onClick={onClickSave}>Save</Button>
            </Flex>
          ) : (
            <Text>{text}</Text>
          )}
        </Flex>
      </CommentContainer>

      {repplies &&
        repplies.map(({ id: repplyId, ...rest }) => (
          <Flex key={repplyId} width='100%' position='relative'>
            <Flex width='7%' justifyContent='center'>
              <Flex border='0.5px solid #fff' />
            </Flex>

            <Flex width='93%'>
              <Comment id={repplyId} {...rest} originId={id} />
            </Flex>
          </Flex>
        ))}
    </>
  );
};
