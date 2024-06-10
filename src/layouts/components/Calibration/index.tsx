import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { CalibrationPoint } from '../CalibrationPoint';
import { useWebgazer } from '../../../config/useWebgazer';

export const Calibration = ({ onComplete }: { onComplete: () => void }) => {
  const [calibrationPoints] = useState([
    { top: '10%', left: '10%' },
    { top: '10%', left: '30%' },
    { top: '10%', left: '50%' },
    { top: '10%', left: '70%' },
    { top: '10%', left: '90%' },
    { top: '30%', left: '10%' },
    { top: '30%', left: '30%' },
    { top: '30%', left: '50%' },
    { top: '30%', left: '70%' },
    { top: '30%', left: '90%' },
    { top: '50%', left: '10%' },
    { top: '50%', left: '30%' },
    { top: '50%', left: '50%' },
    { top: '50%', left: '70%' },
    { top: '50%', left: '90%' },
    { top: '70%', left: '10%' },
    { top: '70%', left: '30%' },
    { top: '70%', left: '50%' },
    { top: '70%', left: '70%' },
    { top: '70%', left: '90%' },
    { top: '90%', left: '10%' },
    { top: '90%', left: '30%' },
    { top: '90%', left: '50%' },
    { top: '90%', left: '70%' },
    { top: '90%', left: '90%' },
  ]);
  const [currentPoint, setCurrentPoint] = useState(0);

  const handlePointClick = async () => {
    if (currentPoint < calibrationPoints.length - 1) {
      setCurrentPoint(currentPoint + 1);
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    (async () => {
      const webgazer = await useWebgazer();

      await webgazer.begin();
      return async () => {
        await webgazer.end();
      };
    })();
  }, []);

  return (
    <Box>
      {currentPoint < calibrationPoints.length && (
        <CalibrationPoint
          top={calibrationPoints[currentPoint].top}
          left={calibrationPoints[currentPoint].left}
          onClick={handlePointClick}
        />
      )}
    </Box>
  );
};
