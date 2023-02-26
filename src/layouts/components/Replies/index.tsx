import { Flex, Text } from '@chakra-ui/react';
import { VerticalDivider } from '../VerticalDivider';
import { Comment } from '../Comment';
import { CommentType } from '../../../types/Comment';
import {
  SingleCommentProvider,
  useSingleCommentContext,
} from '../../../context/SingleComment';
import { ReplyContainer } from '../../containers/ReplyContainer';
import { memo } from 'react';

interface Props {
  originId?: number;
  scrollToAdd?: () => void;
}

export const Replies = memo(({ originId, scrollToAdd }: Props) => {
  const { id, replies, isRepliesVisible, setIsRepliesVisible } =
    useSingleCommentContext();

  if (!replies) return null;
  return (
    <>
      {replies?.slice(0, 1).map(({ id: replyId, ...rest }: CommentType) => (
        <ReplyContainer key={replyId}>
          <VerticalDivider />

          <Flex width='93%'>
            <SingleCommentProvider id={replyId} {...rest}>
              <Comment originId={id} scrollToAdd={scrollToAdd} />
            </SingleCommentProvider>
          </Flex>
        </ReplyContainer>
      ))}

      {!isRepliesVisible && !originId && replies && replies.length > 1 && (
        <ReplyContainer>
          <VerticalDivider />

          <Flex width='93%'>
            <Text
              fontWeight='600'
              onClick={() => setIsRepliesVisible(true)}
              sx={{
                cursor: 'pointer',

                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >{`Show all answers... (${replies?.length})`}</Text>
          </Flex>
        </ReplyContainer>
      )}

      {isRepliesVisible &&
        !originId &&
        replies
          ?.slice(1)
          .map(({ id: replyId, ...rest }: CommentType, index: number) => (
            <ReplyContainer key={replyId}>
              <VerticalDivider />

              <Flex width='93%' flexDirection='column'>
                <SingleCommentProvider id={replyId} {...rest}>
                  <Comment originId={id} scrollToAdd={scrollToAdd} />
                </SingleCommentProvider>

                {index === replies.length - 2 && (
                  <Text
                    fontWeight='600'
                    onClick={() => setIsRepliesVisible(false)}
                    sx={{
                      cursor: 'pointer',

                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Show less answers...
                  </Text>
                )}
              </Flex>
            </ReplyContainer>
          ))}
    </>
  );
});
