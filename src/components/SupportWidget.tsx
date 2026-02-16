'use client';

import Image from 'next/image';
import Sun from '@mui/icons-material/WbSunny';
import Moon from '@mui/icons-material/Nightlight';
import { useTranslations, useLocale } from 'next-intl';
import Settings from '@mui/icons-material/SettingsSuggest';
import { SpeedDial, SpeedDialAction } from '@mui/material';
//Internal app
import { setAppLang } from '@/i18n';
import { useModeStore } from '@/store';
import logoEn from '%/images/lang/en.png';
import logoEs from '%/images/lang/es.png';
import { availableLangs } from '@/constans';

export default function SupportWidget() {
  const t = useTranslations('common');
  const mode = useModeStore((state) => state.mode);
  const changeMode = useModeStore((state) => state.changeMode);
  const currentMode = mode === 'light' ? 'dark' : 'light';
  const changeTextMode = mode === 'light' ? 'Dark' : 'Light';
  const currentLang = useLocale();
  const tooltipLang = currentLang === 'en' ? 'es' : 'en';
  const nextLang = availableLangs.filter((lang) => lang !== currentLang)[0];

  const changeLanguage = () => {
    setAppLang(nextLang);
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'fixed', bottom: 10, right: 10, '& .MuiFab-root': { width: 40, height: 40 } }}
      icon={<Settings />}
    >
      <SpeedDialAction
        onClick={changeLanguage}
        sx={{ p: 0 }}
        key="lang"
        tooltipTitle={t(tooltipLang)}
        icon={<Image src={nextLang === 'en' ? logoEn : logoEs} width={25} height={25} alt={`${nextLang}`} priority />}
      />
      <SpeedDialAction
        onClick={() => changeMode(currentMode)}
        tooltipTitle={t(`mode${changeTextMode}`)}
        icon={mode === 'light' ? <Moon /> : <Sun />}
      />
    </SpeedDial>
  );
}
