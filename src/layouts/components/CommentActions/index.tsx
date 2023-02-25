import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { ChatIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { loggedUserData } from '../../../data';
import { DeleteModal } from '../DeleteModal';

interface Props {
  onClickDelete: () => void;
  onClickEdit: () => void;
  onClickReply: () => void;
  isHovering: boolean;
  username: string;
}

export const CommentActions = ({
  onClickDelete,
  onClickEdit,
  onClickReply,
  isHovering,
  username,
}: Props) => {
  const isLoggedUser = username === loggedUserData.username;

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
};
