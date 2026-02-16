'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Box, CssBaseline, ThemeProvider, Fade } from '@mui/material';
// Internal App
import { getImages } from '@/utils/tools';
import { createTenantTheme } from '@/theme-ui';
import { useModeStore, useTenantStore } from '@/store';
import { ChildrenProps, TenantSettProps } from '@/interfaces';

export default function MuiProvider({ children, tenantTheme, tenantSett }: ChildrenProps & TenantSettProps) {
  const currentMode = useModeStore((state) => state.mode);
  const currentTheme = createTenantTheme(tenantTheme, `${currentMode}`);

  const [isHydrated, setIsHydrated] = useState(true);

  const setTenantSett = useTenantStore((state) => state.setTenantSett);

  useEffect(() => {
    setTenantSett(tenantSett);
    setIsHydrated(false);
  }, [tenantSett, setTenantSett]);

  return (
    <ThemeProvider theme={currentTheme}>
      {isHydrated ? (
        <Fade in={isHydrated} timeout={500}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              background:
                currentMode === 'dark'
                  ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)'
                  : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 50%, #d0d0d0 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: currentMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                animation: 'float 6s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-20px)' },
                },
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '20%',
                right: '15%',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: currentMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                animation: 'float 4s ease-in-out infinite reverse',
              }}
            />

            {/* Main loading container */}
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {/* Logo with modern styling */}
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: currentMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border:
                    currentMode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: currentMode === 'dark' ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
                  animation: 'pulse 2s ease-in-out infinite, rotate 8s linear infinite',
                }}
              >
                <Image
                  src={getImages(tenantSett.tenantImages, 'img-logo-color.svg')}
                  width={70}
                  height={70}
                  alt={`Picture of ${tenantSett.tenantImages}`}
                  priority
                />
              </Box>

              {/* Loading dots animation */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {[0, 1, 2].map((index) => (
                  <Box
                    key={index}
                    sx={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: currentMode === 'dark' ? '#ffffff' : '#333333',
                      animation: `bounce 1.4s ease-in-out ${index * 0.16}s infinite both`,
                      '@keyframes bounce': {
                        '0%, 80%, 100%': { transform: 'scale(0)', opacity: 0.5 },
                        '40%': { transform: 'scale(1)', opacity: 1 },
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Fade>
      ) : (
        <>
          <CssBaseline />
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>{children}</Box>
        </>
      )}
    </ThemeProvider>
  );
}
