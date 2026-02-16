'use client';

import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
//Internal app
import { useUiStore } from '@/store';

export default function GlobalModal() {
  const showModal = useUiStore((state) => state.showModal);
  const closeModal = useUiStore((state) => state.closeModal);
  const modalObject = useUiStore((state) => state.modalObject);

  const handleClose = (e: object, reason: string) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      closeModal();
    }
  };

  if (!modalObject || modalObject.icon) return null;

  const {
    title = 'Default Title',
    description = 'Default Description',
    form,
    onSubmit,
    actions,
    maxWidth,
  } = modalObject;

  const RenderFormContainer = () => {
    return (
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, p: '20px 24px' }}
      >
        {description}

        <DialogActions sx={{ width: '100%' }}>
          {actions.map((btns) => (
            <Button
              key={btns.text}
              variant={btns.variant ?? 'contained'}
              type={btns.type ?? undefined}
              onClick={btns.onClick}
              disabled={btns.disabled ?? false}
              fullWidth
            >
              {btns.text}
            </Button>
          ))}
        </DialogActions>
      </Box>
    );
  };

  const RenderCardContainer = () => {
    return (
      <>
        <DialogContent sx={{ p: '20px 24px' }}>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>

        {actions && (
          <DialogActions>
            {actions.map((btns) => (
              <Button
                key={btns.text}
                variant={btns.variant ?? 'contained'}
                type={btns.type ?? undefined}
                onClick={btns.onClick}
                disabled={btns.disabled ?? false}
              >
                {btns.text}
              </Button>
            ))}
          </DialogActions>
        )}
      </>
    );
  };

  return (
    <Dialog
      open={showModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ '& .MuiDialog-paper': { maxWidth: maxWidth ?? '360px', width: '100%' } }}
    >
      {title && (
        <DialogTitle id="alert-dialog-title" sx={{ pb: '0 !important' }}>
          {title}
        </DialogTitle>
      )}

      {form ? <RenderFormContainer /> : <RenderCardContainer />}
    </Dialog>
  );
}
