'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { IconButton } from '@mui/material';
//Internal app
import { setAppLang } from '@/i18n';
import logoEn from '%/images/lang/en.png';
import logoEs from '%/images/lang/es.png';
import { availableLangs } from '@/constans';

export default function ChangeLang() {
  const currentLang = useLocale();
  const nextLang = availableLangs.filter((lang) => lang !== currentLang)[0];

  const changeLanguage = () => {
    setAppLang(nextLang);
  };

  return (
    <IconButton sx={{ '&:hover': { bgcolor: 'primary.light' } }} onClick={changeLanguage} size="small">
      <Image src={nextLang === 'en' ? logoEn : logoEs} width={20} height={20} alt={`${nextLang}`} priority />
    </IconButton>
  );
}
