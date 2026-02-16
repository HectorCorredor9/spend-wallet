'use client';

import { useTranslations } from 'next-intl';
import ShowEye from '@mui/icons-material/VisibilityOutlined';
import { Card, Typography, Box, Chip, IconButton, Stack } from '@mui/material';
import ContactlessOutlinedIcon from '@mui/icons-material/ContactlessOutlined';
//Internal app
import { ICard } from '@/interfaces';

/**
 * Displays information on the front of the 3D card.
 *
 * @param showDetails - Function to show cardholder information
 * @param cardNumber - Card number.
 * @param balance - The available account balance.
 */
export default function FrontInformation(props: { selectedCard: ICard; showDetails: () => void }) {
  const { selectedCard, showDetails } = props;
  const t = useTranslations('dashboard');

  return (
    <Card
      className="banner-color"
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 'none',
        boxShadow: 'none',
        backfaceVisibility: 'hidden',
      }}
    >
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label={selectedCard.active ? t('active') : t('inactive')}
                color={selectedCard.active ? 'success' : 'default'}
                size="small"
                sx={{ width: 'min-content', backgroundColor: 'white' }}
              />
              <Chip
                label={selectedCard.type == 'v' ? t('virtual') : t('physical')}
                color="info"
                size="small"
                sx={{ width: 'min-content', backgroundColor: 'white' }}
              />
            </Stack>

            <Typography variant="h5" fontWeight={600} color="white">
              {selectedCard.description}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexDirection: 'row',
                fontWeight: 700,
                letterSpacing: 2,
                color: 'white',
              }}
            >
              {selectedCard.number}
              <IconButton
                aria-label={t('showNumber')}
                size="small"
                onClick={() => {
                  showDetails();
                }}
              >
                <ShowEye />
              </IconButton>
            </Typography>

            <Stack direction="column" spacing={1}>
              <Typography variant="body2" color="white" fontWeight={700}>
                {t('balance')}
              </Typography>
              <Typography variant="h3" fontWeight={600} color="white">
                {`${new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(selectedCard.amount))}`}
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              height: '100%',
              minHeight: 193,
              width: 'auto',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexDirection: 'row',
                fontWeight: 600,
                color: 'white',
              }}
            >
              <ContactlessOutlinedIcon /> {selectedCard.franchise}
            </Typography>
            <Box>
              <Typography variant="body2" color="white" fontWeight={700}>
                {t('expires')}
              </Typography>
              <Typography variant="body1" fontWeight={600} color="white" letterSpacing={1}>
                **/**
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '16rem',
          height: '16rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          transform: 'translateY(-50%) translateX(50%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '8rem',
          height: '8rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          transform: 'translateY(50%) translateX(-50%)',
        }}
      />
    </Card>
  );
}
