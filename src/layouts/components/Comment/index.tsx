import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { CommentContainer } from '../../containers/CommentContainer';
import { CommentVotes } from '../CommentVotes';
import { useReplyCommentContext } from '../../../context/ReplyComment';

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
  const { setReplyAnswerId, setReplyUser } = useReplyCommentContext();

  const onClickReply = () => {
    if (!originId) {
      setReplyAnswerId(id);
      setReplyUser(username);
      return;
    }

    setReplyAnswerId(originId);
    setReplyUser(username);
  };

  return (
    <>
      <CommentContainer>
        <CommentVotes counter={counter} />

        <Flex flexDirection='column' width='100%'>
          <Flex justifyContent='space-between' alignItems='flex-start'>
            <Flex gap='1rem' mb='0.5rem'>
              <Image
                src={image}
                alt='Dan Abramov'
                sx={{ width: '2rem', height: '2rem' }}
                borderRadius='50%'
              />
              <Text fontWeight='600'>{username}</Text>
              <Text color='#A7A7A7'>{date}</Text>
            </Flex>

            <Flex justifyContent='center' gap='0.4rem' alignItems='center'>
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
            </Flex>
          </Flex>

          <Text>{text}</Text>
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
