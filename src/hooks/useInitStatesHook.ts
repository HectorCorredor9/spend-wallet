import * as store from '@/store';

export function useInitStates() {
  const closeModal = store.useUiStore((state) => state.closeModal);
  const closePopperError = store.useUiStore((state) => state.closePopperError);
  const closePopperSuccess = store.useUiStore((state) => state.closePopperSuccess);
  const resetSessStore = store.useSessionStorage((state) => state.resetSessStore);
  const { sessResetTime } = store.useTenantStore((state) => state.tenantSett);

  const initStates = () => {
    closeModal();
    closePopperError();
    closePopperSuccess();
    resetSessStore(sessResetTime);
  };

  return { initStates };
}
