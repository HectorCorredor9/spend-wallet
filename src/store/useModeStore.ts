import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
//Internal app
import { ModeStoreProps } from '@/interfaces';

const storeApi: StateCreator<ModeStoreProps, [['zustand/devtools', never]]> = (set) => ({
  mode: 'light',
  changeMode: (mode) => set(() => ({ mode: mode })),
});

/**
 * `useModeStore` is a Zustand store that manages the mode state.
 *
 * @example
 * ```tsx
 * import { useModeStore } from '@/store/useModeStore';
 *
 * const mode = useModeStore((state) => state.mode);
 * const changeMode = useModeStore((state) => state.changeMode);
 * ```
 *
 * @returns {object} The state and actions of the mode store.
 * @property {string} mode - The current mode, which can be 'light' or 'dark'.
 * @property {function} changeMode - A function to change the current mode.
 */
export const useModeStore = create<ModeStoreProps>()(
  persist(
    devtools(storeApi, { name: 'modeStore' }),
    {
      name: 'accessibility',
      version: undefined,
    }
  )
);
