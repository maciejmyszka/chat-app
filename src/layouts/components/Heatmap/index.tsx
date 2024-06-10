import React, { useEffect, useRef } from 'react';
import h337 from 'heatmap.js';
import { Box } from '@chakra-ui/react';

const HeatmapComponent = ({ children }: any) => {
  const heatmapContainerRef = useRef<any>(null);
  const heatmapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Inicjalizacja heatmap.js
    heatmapInstanceRef.current = h337.create({
      container: heatmapContainerRef.current,
      radius: 50, // Możesz dostosować promień punktów
      maxOpacity: 0.6,
      minOpacity: 0.1,
      blur: 0.75,
    });

    // Dodanie zdarzenia kliknięcia, aby rejestrować kliknięcia użytkowników
    const handleMouseMove = (event: any) => {
      const x = event.clientX;
      const y = event.clientY;

      heatmapInstanceRef.current.addData({
        x: x,
        y: y,
        value: 1,
      });
    };

    // Dodanie zdarzenia kliknięcia do kontenera
    heatmapContainerRef.current.addEventListener('mousemove', handleMouseMove);
    heatmapContainerRef.current.addEventListener('click', handleMouseMove);

    // Cleanup funkcji event listener
    return () => {
      heatmapContainerRef.current.removeEventListener(
        'mousemove',
        handleMouseMove
      );
      heatmapContainerRef.current.removeEventListener('click', handleMouseMove);
    };
  }, []);

  return (
    <Box
      ref={heatmapContainerRef}
      sx={{
        width: '100%',
        height: '100vh',
        position: 'relative',

        '.heatmap-canvas': {
          pointerEvents: 'none',
        },
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
        }}
      />

      {children}
    </Box>
  );
};

export default HeatmapComponent;
