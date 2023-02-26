import { Button, Flex, Text, Textarea } from '@chakra-ui/react';
import { useSingleCommentContext } from '../../../context/SingleComment';
import { memo } from 'react';

interface Props {
  onClickSave: () => void;
}

export const CommentContent = memo(({ onClickSave }: Props) => {
  const { isEditMode, text, commentText, setCommentText } =
    useSingleCommentContext();

  if (isEditMode)
    return (
      <Flex flexDirection='column' gap='1rem' alignItems='flex-start'>
        <Textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button onClick={onClickSave} isDisabled={!commentText}>
          Save
        </Button>
      </Flex>
    );

  return <Text>{text}</Text>;
});
