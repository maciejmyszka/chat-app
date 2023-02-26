import { Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { CommentContainer } from '../../containers/CommentContainer';
import { Dispatch, memo, SetStateAction } from 'react';

interface Props {
  replyUser: string;
  setReplyUser: Dispatch<SetStateAction<string>>;
}

export const ReplyInfo = memo(({ replyUser, setReplyUser }: Props) => (
  <CommentContainer
    py='0.5rem'
    justifyContent='space-between'
    alignItems='center'
  >
    <Text>
      Answering <span style={{ fontWeight: '600' }}>@{replyUser}</span>...
    </Text>
    <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => setReplyUser('')} />
  </CommentContainer>
));
