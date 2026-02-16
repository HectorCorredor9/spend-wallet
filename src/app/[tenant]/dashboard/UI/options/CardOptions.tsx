'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import { Box, Button, IconButton, Menu, MenuItem, Skeleton } from '@mui/material';
//Internal app
import ChangePin from './ChangePin';
import { ICard } from '@/interfaces';
import { useCardStore, useUiStore } from '@/store';

export default function CardOptions() {
  const t = useTranslations();

  const card = useCardStore((state) => state.card);
  const setModal = useUiStore((state) => state.setModal);
  const closeModal = useUiStore((state) => state.closeModal);

  const [cardDate, setCardDate] = useState<ICard>(card);
  const [openPinModal, setOpenPinModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    setCardDate(card);
  }, [card]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleActiveCardModal = () => {
    setModal({
      icon: <CreditScoreIcon sx={{ fontSize: '72px', color: 'grey.400' }} />,
      iconTitle: 'Activar tarjeta',
      title: '¿Estás seguro de que deseas activar tu tarjeta?',
      actions: [
        {
          text: t('common.close'),
          variant: 'text',
          onClick: () => {
            closeModal();
          },
        },
        {
          text: t('common.continue'),
          variant: 'contained',
          onClick: () => {
            console.log('Tarjeta activada');
            closeModal();
          },
        },
      ],
    });
  };

  const handleFreezeModal = () => {
    setModal({
      icon: <AcUnitOutlinedIcon sx={{ fontSize: '72px', color: 'grey.400' }} />,
      iconTitle: t('dashboard.freezeCard'),
      title: t('dashboard.freezeCardMessage'),
      actions: [
        {
          text: t('common.close'),
          variant: 'text',
          onClick: () => {
            closeModal();
          },
        },
        {
          text: t('common.continue'),
          variant: 'contained',
          onClick: () => {
            console.log('Tarjeta congelada');
            closeModal();
          },
        },
      ],
    });
  };

  const buttons = [
    { label: t('dashboard.freezeCard'), show: true, onClick: handleFreezeModal },
    { label: t('dashboard.activateCard'), show: !cardDate.active, onClick: handleActiveCardModal },
    { label: t('dashboard.replacement'), show: true, onClick: () => console.log('Reposición') },
    {
      label: t('dashboard.changePin'),
      show: cardDate.type === 'f' && cardDate.active,
      onClick: () => setOpenPinModal(true),
    },
  ];

  const visibleButtons = buttons.filter((btn) => btn.show);
  const firstButtons = visibleButtons.slice(0, 3);
  const menuButtons = visibleButtons.slice(3);

  if (!card || Object.keys(card).length === 0) {
    return (
      <Box display="flex" flexDirection="row" gap={1} alignItems="center" flexWrap="wrap" justifyContent="center">
        <Skeleton variant="rounded" width={120} height={44} />
        <Skeleton variant="rounded" width={120} height={44} />
        <Skeleton variant="rounded" width={120} height={44} />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="row" gap={1} alignItems="center" flexWrap="wrap" justifyContent="center">
      {firstButtons.map((btn) => (
        <Button key={btn.label} variant="outlined" onClick={btn.onClick}>
          {btn.label}
        </Button>
      ))}
      {menuButtons.length > 0 && (
        <>
          <IconButton
            sx={{ backgroundColor: 'white', border: '1px solid', borderColor: 'primary.main' }}
            size="medium"
            onClick={handleMenuOpen}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {menuButtons.map((btn) => (
              <MenuItem key={btn.label} onClick={handleMenuClose}>
                {btn.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}

      <ChangePin open={openPinModal} onClose={() => setOpenPinModal(false)} />
    </Box>
  );
}
