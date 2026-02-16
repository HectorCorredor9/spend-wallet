'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography, CircularProgress, Stack } from '@mui/material';

/**
 *
 * Component that displays a dynamic CVV that changes every minute, accompanied by a progress bar that indicates the time remaining for the change.
 *
 * @param param0 - initialValue: Initial CVV value, default is 123.
 * @returns JSX.Element
 */
export default function MinuteProgressCvv({ initialValue = 123 }: { initialValue?: number }) {
  const [progress, setProgress] = useState(0);
  const [cvv, setCvv] = useState(initialValue);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / 20000) * 100, 100);
      setProgress(percent);
      if (percent === 100) {
        setCvv(Math.floor(100 + Math.random() * 900));
        start = Date.now();
        setProgress(0);
      }
    }, 200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body2" color="white" fontWeight={700}>
        Cvv2
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <Typography variant="h3" fontWeight={600} color="white">
          {cvv}
        </Typography>
        <CircularProgress
          size="24px"
          variant="determinate"
          value={progress}
          thickness={20}
          sx={{ borderRadius: 8, backgroundColor: 'white' }}
        />
      </Stack>
    </Box>
  );
}
