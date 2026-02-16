'use client';

import { Box, styled } from '@mui/material';

export const BodyCard = styled(Box, {
  name: 'BodyCard',
  slot: 'root',
})(() => ({
  height: 242,
  perspective: '1200px',
  perspectiveOrigin: '50% 50%',
  position: 'relative',
  width: '100%',
}));

export const BodyCardAction = styled(Box, {
  name: 'BodyCardAction',
  slot: 'root',
})(() => ({
  margin: 'auto',
  textAlign: 'justify',
  transition:
    'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1), scale 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
  transformStyle: 'preserve-3d',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  willChange: 'transform, box-shadow, scale',
  borderRadius: 20,
  '&:not(.active)': {
    transform: 'rotateY(0deg) scale(1)',
  },
  '&.active': {
    transform: 'rotateY(180deg) scale(1.01)',
  },
}));
