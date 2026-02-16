'use client';

import { useTranslations } from 'next-intl';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { Card, CardContent, Box, Typography, IconButton } from '@mui/material';
//Internal app
import { useUiStore } from '@/store';

export default function NeedHelpCard() {
  const t = useTranslations();

  const setModal = useUiStore((state) => state.setModal);
  const closeModal = useUiStore((state) => state.closeModal);

  const handleSupportModal = () => {
    setModal({
      icon: <LocalPhoneOutlinedIcon sx={{ fontSize: '72px', color: 'grey.400' }} />,
      iconTitle: t('about.needHelp'),
      title: t('about.support'),
      description: t('static.numberSupport'),
      actions: [
        {
          text: t('common.close'),
          variant: 'text',
          onClick: () => {
            closeModal();
          },
        },
      ],
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600}>
          {t('about.needHelp')}
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body1">{t('about.callCenter')}</Typography>

          <IconButton aria-label="call center" size="large">
            <LocalPhoneOutlinedIcon color="primary" />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body1">{t('about.support')}</Typography>

          <IconButton aria-label="call center" size="large" onClick={handleSupportModal}>
            <LocalPhoneOutlinedIcon color="primary" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
