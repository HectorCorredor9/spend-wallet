'use client';

import { useTranslations } from 'next-intl';
import ContactlessOutlinedIcon from '@mui/icons-material/ContactlessOutlined';
import { Card, CardContent, Typography, Chip, Box, Stack } from '@mui/material';
//Internal app
import { ICard } from '@/interfaces';

export default function MyCards(props: {
  card: ICard;
  selectedCard: { id: number };
  setSelectedCard: (card: ICard) => void;
}) {
  const { card, selectedCard, setSelectedCard } = props;
  const t = useTranslations('dashboard');
  return (
    <Card
      variant={selectedCard.id === card.id ? 'elevation' : 'outlined'}
      sx={{
        cursor: 'pointer',
        borderColor: selectedCard.id === card.id ? 'primary.main' : 'grey.300',
        boxShadow: 0,
        backgroundColor: selectedCard.id === card.id ? 'primary.light' : 'background.paper',
        width: { xs: '100%', md: 360 },
        position: 'relative',
      }}
      onClick={() => setSelectedCard(card)}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '5rem',
          height: '3rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255,255,255,15%)',
          transform: 'translateY(30%) translateX(-20%)',
        }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            py: 1,
            px: 2,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'white',
              flexDirection: 'row',
            }}
          >
            <ContactlessOutlinedIcon /> {card.franchise}
          </Typography>
          <Typography variant="caption" color="white" fontWeight={700}>
            {card.number}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="column" maxWidth={330}>
            <Typography variant="body2" fontWeight={600}>
              {card.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {t('expires')}: {card.exp}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <Chip
                label={card.active ? t('active') : t('inactive')}
                color={card.active ? 'success' : 'default'}
                size="small"
                sx={{ width: 'min-content' }}
              />
              <Chip
                label={card.type == 'v' ? t('virtual') : t('physical')}
                color="info"
                size="small"
                sx={{ width: 'min-content' }}
              />
            </Stack>
          </Stack>
          <Typography variant="body2" fontWeight={600}>
            {`${new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(card.amount))}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
