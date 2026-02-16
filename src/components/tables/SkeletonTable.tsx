'use client';

import React from 'react';
import { Skeleton, Box, TableRow, TableCell, Stack } from '@mui/material';

export default function SkeletonTable() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, idx) => (
        <TableRow key={idx}>
          <TableCell>
            <Stack direction="row" spacing={1} alignItems="center">
              <Skeleton variant="circular" width={30} height={30} />
              <Box>
                <Skeleton variant="text" width={100} height={21} />
                <Skeleton variant="text" width={80} height={14} />
              </Box>
            </Stack>
          </TableCell>
          <TableCell>
            <Skeleton variant="rounded" width={81} height={24} sx={{ float: 'center' }} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={100} height={21} sx={{ float: 'right' }} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
