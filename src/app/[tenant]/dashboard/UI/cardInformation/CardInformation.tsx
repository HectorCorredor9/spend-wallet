'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
//Internal app
import { ICard } from '@/interfaces';
import { useCardStore } from '@/store';
import BackInformation from './BackInformation';
import FrontInformation from './FrontInformation';
import { BodyCard, BodyCardAction } from './BodyCards';

/**
 * Shows the 3D card with all the cardholder information
 *
 * @returns 3D card with all the cardholder information.
 */
export default function CardInformation() {
  const card = useCardStore((state) => state.card);

  const [loading, setLoading] = useState(true);
  const [cardDate, setCardDate] = useState<ICard>(card);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleShowDetaild = () => {
    setShowDetails(true);
  };

  const closeInfoCard = () => {
    setShowDetails(false);
  };

  //TODO: Remove this timeout and replace it with the real API call to fetch the cards data. This is just to simulate a loading state.
  useEffect(() => {
    if (card.id) {
      setCardDate(card);
      setLoading(false);
    }
  }, [card]);

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height={241} sx={{ borderRadius: 1 }} />;
  }

  return (
    <BodyCard>
      <BodyCardAction className={showDetails ? 'active' : undefined}>
        <FrontInformation showDetails={handleShowDetaild} selectedCard={cardDate} />
        <BackInformation hideDetails={closeInfoCard} selectedCard={cardDate} />
      </BodyCardAction>
    </BodyCard>
  );
}
