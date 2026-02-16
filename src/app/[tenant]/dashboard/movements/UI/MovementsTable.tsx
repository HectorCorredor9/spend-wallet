'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TablePagination,
  Box,
  Button,
} from '@mui/material';
//Internal app
import MovementsTableFilter from './MovementsTableFilter';
import { CardMovement, MovementsFilter } from '@/interfaces';
import { EmptySlot, ErrorSlot, SkeletonTable } from '@/components';

export default function MovementsTable({ movements }: { movements: CardMovement[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const rowsPerPage = 10;

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [filtered, setFiltered] = useState(movements);

  //TODO: Remove this timeout and replace it with the real API call to fetch the cards data. This is just to simulate a loading state.
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1200);
    setFiltered(movements);
    return () => clearTimeout(timeout);
  }, [movements]);

  const handleFilter = (filter: MovementsFilter) => {
    setLoading(true);
    setTimeout(() => {
      let result = movements;

      if (filter.keyword) {
        result = result.filter((m) => m.description.toLowerCase().includes(filter.keyword.toLowerCase()));
      }
      if (filter.type) {
        result = result.filter((m) => m.type === filter.type);
      }
      if (filter.status) {
        result = result.filter((m) => m.status === filter.status);
      }
      if (filter.minAmount) {
        result = result.filter((m) => parseFloat(m.amount) >= parseFloat(filter.minAmount));
      }
      if (filter.maxAmount) {
        result = result.filter((m) => parseFloat(m.amount) <= parseFloat(filter.maxAmount));
      }
      if (filter.startDate) {
        result = result.filter((m) => m.date >= filter.startDate);
      }
      if (filter.endDate) {
        result = result.filter((m) => m.date <= filter.endDate);
      }
      setFiltered(result);
      setLoading(false);
    }, 800);
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pendiente: t('common.pending'),
      procesado: t('common.processed'),
      cancelado: t('common.cancelled'),
    };
    return statusMap[status] || status;
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  if (movements.length === 0) return <EmptySlot />;

  if (!movements) return <ErrorSlot />;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" onClick={() => setFiltered(movements)}>
          {t('movements.table.allMovements')}
        </Button>
        <Button variant="outlined" onClick={() => setShowModal(true)}>
          <FilterListOutlinedIcon />
        </Button>
      </Box>
      <Box
        sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr' }, width: '100%', height: '100%', gap: 3 }}
      >
        <Card sx={{ width: '100%', maxWidth: 'none', height: 'min-content' }}>
          <CardContent>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'text.primary', fontWeight: 700, fontSize: 16 }}>
                      {t('movements.table.description')}
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'text.primary', fontWeight: 700, fontSize: 16 }}>
                      {t('movements.table.status')}
                    </TableCell>
                    <TableCell align="right" sx={{ color: 'text.primary', fontWeight: 700, fontSize: 16 }}>
                      {t('movements.table.amount')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <SmsFailedOutlinedIcon sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                        <Typography variant="body1" color="text.secondary">
                          {t('movements.filter.notFilterResults')}
                        </Typography>
                        <Button variant="outlined" onClick={() => setFiltered(movements)} sx={{ mt: 2 }}>
                          {t('movements.filter.clear')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : loading ? (
                    <SkeletonTable />
                  ) : (
                    <>
                      {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movement) => (
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
            <TablePagination
              component="div"
              count={movements.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={() => {}}
              rowsPerPageOptions={[]}
              labelRowsPerPage={''}
            />
          </CardContent>
        </Card>
      </Box>

      <MovementsTableFilter onFilter={handleFilter} showModal={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
}
