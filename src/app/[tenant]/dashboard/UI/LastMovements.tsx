'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
  Chip,
  Skeleton,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
//Internal app
import { useTenantStore } from '@/store';
import { CardMovement } from '@/interfaces';
import { EmptySlot, ErrorSlot, SkeletonTable } from '@/components';

export default function LastMovements({ movements }: { movements: CardMovement[] }) {
  const t = useTranslations();
  const locale = useLocale();

  const { tenantUri } = useTenantStore((state) => state.tenantSett);

  const [loading, setLoading] = useState(true);

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pendiente: t('common.pending'),
      procesado: t('common.processed'),
      cancelado: t('common.cancelled'),
    };
    return statusMap[status] || status;
  };

  //TODO: Remove this timeout and replace it with the real API call to fetch the cards data. This is just to simulate a loading state.
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [movements]);

  if (movements.length === 0) return <EmptySlot />;

  if (!movements) return <ErrorSlot />;

  if (loading) return <Skeleton variant="rectangular" width="100%" height={362} sx={{ borderRadius: 1 }} />;

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 'none',
        boxShadow: 'none',
      }}
    >
      <CardContent sx={{ width: '100%' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} width="100%">
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.lastTransactions')}
          </Typography>
          <Link
            href={`/${tenantUri}/dashboard/movements`}
            underline="hover"
            fontWeight={600}
            fontSize={12}
            display="flex"
            alignItems="center"
            gap={0.5}
          >
            {t('dashboard.viewAll')} <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
          </Link>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableBody>
              {/* TODO: It's part of the table reloading process when you change cards. */}
              {false ? (
                <SkeletonTable />
              ) : (
                <>
                  {movements.slice(0, 5).map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box
                            sx={{
                              bgcolor: 'primary.light',
                              borderRadius: '50%',
                              p: 0.5,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {movement.type === 'debit' ? (
                              <ArrowCircleUpIcon sx={{ color: 'error.main', fontSize: 22 }} />
                            ) : (
                              <ArrowCircleDownIcon sx={{ color: 'success.main', fontSize: 22 }} />
                            )}
                          </Box>
                          <Box>
                            <Typography fontWeight={500} fontSize={14}>
                              {movement.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(movement.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={getStatusLabel(movement.status)}
                          size="small"
                          color={
                            movement.status === 'pendiente'
                              ? 'default'
                              : movement.status === 'procesado'
                                ? 'success'
                                : 'error'
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600} fontSize={14}>
                          {`${new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(movement.amount))}`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
