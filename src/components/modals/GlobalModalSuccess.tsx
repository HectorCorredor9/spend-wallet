'use client';

import { Dialog, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
//Internal app
import { useUiStore } from '@/store';

export default function GlobalModalSuccess() {
  const showModal = useUiStore((state) => state.showModal);
  const closeModal = useUiStore((state) => state.closeModal);
  const modalObject = useUiStore((state) => state.modalObject);

  return (
    <>
      {modalObject && modalObject.icon && (
        <Dialog
          open={showModal}
          onClose={closeModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ '& .MuiDialog-paper': { maxWidth: 360 } }}
        >
          <DialogContent sx={{ p: 0 }}>
            <Box
              className={`${modalObject.bgColor ? modalObject.bgColor : 'gradient-brand'} `}
              textAlign="center"
              pb={modalObject.bgColor ? 0 : 4}
              pt={4}
              px={3}
            >
              {modalObject && 'icon' in modalObject ? modalObject.icon : ''}
              <Typography variant="h5" color="white">
                {modalObject && 'iconTitle' in modalObject ? modalObject.iconTitle : ''}
              </Typography>
            </Box>
            <Box px={3} pt={2}>
              <Typography variant="h5" mb={2}>
                {modalObject && 'title' in modalObject ? modalObject.title : ''}
              </Typography>
              <Typography variant="subtitle2">
                {modalObject && 'description' in modalObject ? modalObject.description : ''}
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions>
            {modalObject?.actions
              ? modalObject.actions.map((btns) => {
                  return (
                    <Button key={btns.text} variant={btns.variant} onClick={btns.onClick}>
                      {btns.text}
                    </Button>
                  );
                })
              : null}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
