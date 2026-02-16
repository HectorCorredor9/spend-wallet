'use client';

import { useTranslations } from 'next-intl';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
//Internal app
import { useUiStore } from '@/store';

export default function GlobalSuccess() {
  const t = useTranslations();
  const showPopperSuccess = useUiStore((state) => state.showPopperSuccess);
  const closePopperSuccess = useUiStore((state) => state.closePopperSuccess);
  const popperSuccessObject = useUiStore((state) => state.popperSuccessObject);
  const validDescription = popperSuccessObject && 'description' in popperSuccessObject;

  return (
    <Snackbar
      sx={{ maxWidth: 533 }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={showPopperSuccess}
      autoHideDuration={3000}
      onClose={closePopperSuccess}
    >
      <Alert variant="outlined" severity="success" sx={{ minWidth: 250, fontSize: 14 }} onClose={closePopperSuccess}>
        <AlertTitle sx={{ fontWeight: 700, fontSize: 14, mb: validDescription ? 1 : 0 }}>
          {popperSuccessObject && 'title' in popperSuccessObject
            ? popperSuccessObject.title
            : t('messages.changeSuccess')}
        </AlertTitle>
        {validDescription ? popperSuccessObject.description : null}
      </Alert>
    </Snackbar>
  );
}
