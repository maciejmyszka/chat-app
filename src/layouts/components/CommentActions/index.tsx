import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { ChatIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { DeleteModal } from '../DeleteModal';
import { useSingleCommentContext } from '../../../context/SingleComment';
import { memo } from 'react';

interface Props {
  onClickDelete: () => void;
  onClickEdit: () => void;
  onClickReply: () => void;
}

export const CommentActions = memo(
  ({ onClickDelete, onClickEdit, onClickReply }: Props) => {
    const { isLoggedUser, isHovering } = useSingleCommentContext();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <DeleteModal
          isOpen={isOpen}
          onClose={onClose}
          onClickDelete={onClickDelete}
        />

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
                onClick={onOpen}
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
      </>
    );
  }
);
