import { getTranslations } from 'next-intl/server';
import { Box, Stack, Typography } from '@mui/material';
//Internal app
import SecurityCard from './UI/SecurityCard';
import AccountInformation from './UI/AccountInformation';
import PersonalInformation from './UI/PersonaInformation';
import StepperContainer from './UI/stepper/StepperContainer';

export default async function ProfilePage() {
  const t = await getTranslations();

  return (
    <Stack spacing={2}>
      <Stack direction="column" spacing={1} mb={2}>
        <Typography variant="h4" fontWeight={600}>
          {t('profile.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('profile.description')}
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
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'row', lg: 'column' },
            gap: 3,
            height: { xs: '100%', lg: 'fit-content' },
          }}
        >
          <PersonalInformation />
          <AccountInformation />
          <SecurityCard />
        </Box>

        <Box sx={{ width: '100%', height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 3 }}>
          <Box sx={{ width: '100%', mx: 'auto', alignSelf: 'flex-start' }}>
            <StepperContainer />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
