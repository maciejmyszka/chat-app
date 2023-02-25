import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onClickDelete: () => void;
}

export const DeleteModal = ({ onClose, isOpen, onClickDelete }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Do you want to delete this comment?</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='red'
            mr={3}
            onClick={onClickDelete}
            leftIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button variant='ghost' onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
