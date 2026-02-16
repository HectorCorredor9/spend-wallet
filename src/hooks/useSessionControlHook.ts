import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef } from 'react';
// Internal app
import { useTenantStore, useUiStore } from '@/store';
import { useSessionActions } from './useSessionActionsHook';
import { useSessionStorage } from '@/store/useSessionStorage';

export function useSessionControl() {
  const t = useTranslations();
  const { refresh, signout } = useSessionActions();
  const setModal = useUiStore((state) => state.setModal);
  const setShowModal = useSessionStorage((state) => state.setShowModal);
  const { sessResetTime } = useTenantStore((state) => state.tenantSett);
  const sessReset = useSessionStorage((state) => state.sessReset);
  const showModal = useSessionStorage((state) => state.showModal);
  const timeLeft = useSessionStorage((state) => state.timeLeft);
  const setTimeLeft = useSessionStorage((state) => state.setTimeLeft);
  const modalTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const sessTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const intervalTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  // Keep latest timeLeft without functional updater
  const timeLeftRef = useRef<number>(timeLeft);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const clearTimers = useCallback(
    (clear: string) => {
      if (clear === 'modalTimer' || (modalTimer.current && showModal)) {
        clearTimeout(modalTimer.current);
        modalTimer.current = undefined;
      }

      if (clear === 'sessTimer' && sessTimer.current && !showModal) {
        clearTimeout(sessTimer.current);
        sessTimer.current = undefined;
      }

      if (clear === 'intervalTimer' && intervalTimer.current) {
        clearInterval(intervalTimer.current);
        intervalTimer.current = undefined;
      }
    },
    [showModal]
  );

  useEffect(() => {
    let show = showModal;

    if (showModal && !sessTimer.current) {
      show = false;
      setShowModal(false);
      setTimeLeft(sessResetTime);
    }

    if (show) {
      intervalTimer.current = setInterval(() => {
        // Read from ref to avoid stale closure
        const next = timeLeftRef.current - 1;
        if (next <= 0) {
          setTimeLeft(0);
          if (intervalTimer.current) clearInterval(intervalTimer.current);
        } else {
          setTimeLeft(next);
        }
      }, 1000);

      setModal({
        title: t('common.stillThere'),
        description: t('common.sessionContinue'),
        actions: [
          {
            text: `${t('common.continue')} ${timeLeft}`,
            variant: 'text',
            onClick: () => {
              refresh();
            },
          },
        ],
      });
    }

    return () => {
      clearTimers('intervalTimer');
    };
  }, [clearTimers, refresh, sessResetTime, setModal, setShowModal, showModal, t, timeLeft, setTimeLeft]);

  useEffect(() => {
    clearTimers('sessTimer');
    if (sessReset > 0 && !showModal) {
      modalTimer.current = setTimeout(() => {
        setTimeLeft(sessResetTime);
        setShowModal(true);
        sessTimer.current = setTimeout(() => {
          signout();
        }, sessResetTime * 1000);
      }, sessReset);
    }

    return () => {
      clearTimers('modalTimer');
    };
  }, [clearTimers, sessReset, sessResetTime, setShowModal, setTimeLeft, showModal, signout]);
}
