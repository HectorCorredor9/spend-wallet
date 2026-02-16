import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
// Internal app
import { apiPaths } from '@/constans';
import { RequestContent } from '@/interfaces';
import { useInitStates } from './useInitStatesHook';
import { useTenantStore, useUiStore } from '@/store';
import { useBrowserRequest } from './useBrowserRequestHook';
import { useSessionStorage } from '@/store/useSessionStorage';

export function useSessionActions() {
  const { push } = useRouter();
  const { initStates } = useInitStates();
  const { createBrowserRequest } = useBrowserRequest();
  const closeModal = useUiStore((state) => state.closeModal);
  const setShowModal = useSessionStorage((state) => state.setShowModal);
  const setTimeLeft = useSessionStorage((state) => state.setTimeLeft);
  const { tenantUri, sessResetTime } = useTenantStore((state) => state.tenantSett);

  const { mutate } = useMutation({
    mutationFn: async (request: RequestContent) => {
      closeModal();
      setShowModal(false);

      const data = await createBrowserRequest(request);

      setTimeLeft(sessResetTime);

      return data;
    },
  });

  const signout = useCallback(() => {
    closeModal();

    const dataSignout: RequestContent = {
      pathUrl: `${apiPaths.appBrowserApi}/signout`,
      method: 'get',
    };

    mutate(dataSignout, {
      onSettled: () => {
        initStates();
        return push(`/${tenantUri}/signin`);
      },
    });
  }, [closeModal, initStates, mutate, push, tenantUri]);

  const refresh = useCallback(() => {
    const dataRefresh: RequestContent = {
      pathUrl: `${apiPaths.appBrowserApi}/refresSesion`,
      method: 'get',
      loading: false,
    };

    mutate(dataRefresh);
  }, [mutate]);

  return { refresh, signout };
}
