'use client';

import { useTranslations } from 'next-intl';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
//Internal app
import { useUiStore } from '@/store';

export default function GlobalError() {
  const t = useTranslations();
  const showPopperError = useUiStore((state) => state.showPopperError);
  const closePopperError = useUiStore((state) => state.closePopperError);
  const popperErrorObject = useUiStore((state) => state.popperErrorObject);

  return (
    <Snackbar
      sx={{ maxWidth: 533 }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={showPopperError}
      autoHideDuration={3000}
      onClose={closePopperError}
    >
      <Alert variant="outlined" severity="error" sx={{ minWidth: 250, fontSize: 14 }} onClose={closePopperError}>
        <AlertTitle sx={{ fontWeight: 700, fontSize: 14 }}>
          {popperErrorObject && 'title' in popperErrorObject
            ? popperErrorObject.title
            : t('messages.somethingwentWrong')}
        </AlertTitle>
        {popperErrorObject && 'description' in popperErrorObject
          ? popperErrorObject.description
          : t('messages.pleaseTryAgain')}
      </Alert>
    </Snackbar>
  );
}
