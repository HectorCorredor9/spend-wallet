import { getTranslations } from 'next-intl/server';
import { Box, Stack, Typography } from '@mui/material';
//Internal app
import { CardsList } from '@/components';
import MovementsTable from './UI/MovementsTable';
import { DataGenerator } from '@/utils/dataGenerator';

export default async function MovementsPage() {
  const t = await getTranslations();
  const allMovements = DataGenerator.getCardMovements();

  return (
    <Stack spacing={2}>
      <Stack direction="column" spacing={1} mb={2}>
        <Typography variant="h4" fontWeight={600}>
          {t('menu.movements')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('movements.description')}
        </Typography>
      </Stack>

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
        <Box sx={{ width: '100%', height: '100%', display: 'grid', gridTemplateRows: 'auto 2fr', gap: 3 }}>
          <MovementsTable movements={allMovements} />
        </Box>
      </Box>
    </Stack>
  );
}
