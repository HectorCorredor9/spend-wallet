import { getTranslations } from 'next-intl/server';
import { Box, Typography, Stack } from '@mui/material';
//Internal app
import Banner from './UI/Banner';
import { CardsList } from '@/components';
import CardOptions from './UI/options/CardOptions';
import { CardMovement } from '@/interfaces';
import LastMovements from './UI/LastMovements';
import { DataGenerator } from '@/utils/dataGenerator';
import CardInformation from './UI/cardInformation/CardInformation';

// Mock data
const movements: CardMovement[] = DataGenerator.getCardMovements();
const user = DataGenerator.getUserData();

export default async function DashboardPage() {
  const t = await getTranslations();

  return (
    <Stack spacing={2}>
      <Banner user={user} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
          width: '100%',
          height: '100%',
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', lg: '380px' },
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            alignContent: 'start',
          }}
        >
          <Stack direction="column" spacing={1} mb={2}>
            <Typography variant="h4" fontWeight={600}>
              {t('dashboard.myCards')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('dashboard.manageCards')}
            </Typography>
          </Stack>

          <Box
            sx={{
              maxHeight: { xs: 'none', lg: 615 },
              overflowY: { xs: 'visible', lg: 'auto' },
              overflowX: { xs: 'auto', lg: 'visible' },
              width: '100%',
            }}
          >
            <CardsList />
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'min-content',
            gap: 3,
            alignContent: 'start',
          }}
        >
          <CardInformation />
          <CardOptions />
          <LastMovements movements={movements} />
        </Box>
      </Box>
    </Stack>
  );
}
