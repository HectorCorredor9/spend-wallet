'use client';

import { useEffect, useState } from 'react';
import { Stack, Box, Skeleton } from '@mui/material';
//Internal app
import MyCards from './cards/MyCards';
import { ICard } from '@/interfaces/views';
import { DataGenerator } from '@/utils/dataGenerator';
import { useCardStore } from '@/store/useCardsStore';

export default function CardsList() {
  const cards: ICard[] = DataGenerator.getCardsData();

  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(cards[0]);

  const setCurrentCard = useCardStore((state) => state.setCurrentCard);

  //TODO: Remove this timeout and replace it with the real API call to fetch the cards data. This is just to simulate a loading state.
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setCurrentCard(selectedCard);
    }, 1000);
  }, [setLoading, selectedCard, setCurrentCard]);

  if (loading) {
    return (
      <Stack
        direction={{ xs: 'row', lg: 'column' }}
        sx={{ flexWrap: { xs: 'nowrap', lg: 'wrap' }, minWidth: 0, gap: 2 }}
      >
        {[...Array(3)].map((_, idx) => (
          <Skeleton key={idx} width={358} height={160} variant="rectangular" sx={{ borderRadius: 1 }} />
        ))}
      </Stack>
    );
  }

  if (!cards || cards.length === 0) return null;

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'row', lg: 'column' }}
      sx={{ flexWrap: { xs: 'nowrap', lg: 'wrap' }, minWidth: 0 }}
    >
      {cards.map((card) => (
        <Box
          key={card.id}
          sx={{
            minWidth: { xs: 320, md: 'unset' },
            maxWidth: { xs: 360, md: 'unset' },
            flex: { xs: '0 0 auto', md: 'unset' },
          }}
        >
          <MyCards card={card} selectedCard={selectedCard} setSelectedCard={() => setSelectedCard(card)} />
        </Box>
      ))}
    </Stack>
  );
}
