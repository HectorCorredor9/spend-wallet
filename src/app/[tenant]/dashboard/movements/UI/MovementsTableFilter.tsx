'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Dialog, DialogActions, DialogTitle, InputAdornment } from '@mui/material';
//Internal app
import { MovementsFilter } from '@/interfaces';
import { InputDatePicker, InputSelect, InputText } from '@/components';

export default function MovementsTableFilter(props: {
  onFilter: (filter: MovementsFilter) => void;
  showModal: boolean;
  handleClose: () => void;
}) {
  const { onFilter, showModal, handleClose } = props;
  const t = useTranslations();

  const { handleSubmit, reset, control } = useForm<MovementsFilter>({
    defaultValues: {
      keyword: '',
      type: '',
      status: '',
      minAmount: '',
      maxAmount: '',
      startDate: '',
      endDate: '',
    },
  });

  const optionsType = [
    { value: '', text: t('movements.filter.allTypes') },
    { value: 'debit', text: t('movements.filter.debit') },
    { value: 'credit', text: t('movements.filter.credit') },
  ];

  const optionsStatus = [
    { value: '', text: t('movements.filter.allStatus') },
    { value: 'pendiente', text: t('common.pending') },
    { value: 'procesado', text: t('common.processed') },
    { value: 'cancelado', text: t('common.cancelled') },
  ];

  const onSubmit = (data: MovementsFilter) => {
    onFilter(data);
    handleClose();
  };

  const handleClear = () => {
    reset();
    onFilter({
      keyword: '',
      type: '',
      status: '',
      minAmount: '',
      maxAmount: '',
      startDate: '',
      endDate: '',
    });
  };

  useEffect(() => {
    if (showModal) reset();
  }, [showModal, reset]);

  return (
    <Dialog open={showModal} onClose={handleClose} sx={{ '& .MuiDialog-paper': { maxWidth: '360px', width: '100%' } }}>
      <DialogTitle sx={{ pb: '0 !important' }}>{t('movements.filter.searchFor')}</DialogTitle>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, p: '20px 24px' }}
      >
        <InputText
          name="keyword"
          label={t('movements.filter.keyword')}
          control={control}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <InputSelect name="type" control={control} label={t('movements.filter.type')} options={optionsType} />
        <InputSelect name="status" control={control} label={t('movements.filter.status')} options={optionsStatus} />
        <InputText name="minAmount" control={control} label={t('movements.filter.minAmount')} type="number" />
        <InputText name="maxAmount" control={control} label={t('movements.filter.maxAmount')} type="number" />
        <InputDatePicker name="startDate" control={control} label={t('movements.filter.startDate')} type="date" />
        <InputDatePicker name="endDate" control={control} label={t('movements.filter.endDate')} type="date" />

        <DialogActions sx={{ width: '100%', p: '0px !important' }}>
          <Button variant="text" onClick={handleClear} fullWidth>
            {t('movements.filter.clear')}
          </Button>
          <Button variant="contained" type="submit" fullWidth>
            {t('movements.filter.search')}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
