import { Box } from '@chakra-ui/react';

export const CalibrationPoint = ({
  top,
  left,
  onClick,
}: {
  top: string;
  left: string;
  onClick: () => void;
}) => (
  <Box
    sx={{
      position: 'absolute',
      top,
      left,
      width: '15px',
      height: '15px',
      backgroundColor: 'red',
      borderRadius: '50%',
      cursor: 'pointer',
      zIndex: 10000,
    }}
    onClick={onClick}
  />
);
