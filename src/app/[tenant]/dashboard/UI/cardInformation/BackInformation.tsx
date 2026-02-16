'use client';

import { useTranslations } from 'next-intl';
import Copy from '@mui/icons-material/ContentCopy';
import { Card, Typography, Box, Chip, IconButton, Button, Stack } from '@mui/material';
//Internal app
import { ICard } from '@/interfaces/views';
import MinuteProgressCvv from './MinuteProgressCvv';

/**
 * Shows information on the back of the 3D card
 *
 * @param hideDetails - Function to hide cardholder information
 * @param holder - Owner's name.
 * @param cardNumber - Card number.
 * @param expDate - Card expiration date.
 * @param cvc - Shows the cvv2.
 */
export default function BackInformation(props: { selectedCard: ICard; hideDetails: () => void }) {
  const { selectedCard, hideDetails } = props;
  const t = useTranslations('dashboard');

  return (
    <Card
      sx={{
        backgroundColor: 'grey.600',
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 'none',
        boxShadow: 'none',
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        top: 0,
      }}
    >
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
              1234 5678 9012 1234
              <IconButton aria-label={t('showNumber')} size="small">
                <Copy />
              </IconButton>
            </Typography>

            <MinuteProgressCvv initialValue={123} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'white',
                fontWeight: 700,
                color: 'text.primary',
                height: 'fit-content',
                borderColor: 'white',
                boxShadow: 'none',
                maxHeight: '32px',
                '&:hover': {
                  boxShadow: 'none',
                },
              }}
              onClick={() => {
                hideDetails();
              }}
            >
              Cerrar
            </Button>

            <Box>
              <Typography variant="body2" color="white" fontWeight={700}>
                {t('expires')}
              </Typography>
              <Typography variant="body1" fontWeight={600} color="white" letterSpacing={1}>
                12/32
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

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
