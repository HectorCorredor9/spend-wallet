import { create } from 'zustand';
//Internal app
import { UiStore } from '@/interfaces';
import { devtools } from 'zustand/middleware';

/**
 * Store and change states for show/hide elements in UI.
 *
 * @example
 * ```tsx
 * import { useUiStore } from '@/store/useUiStore';
 *
 * const loadingScreen = useUiStore((state) => state.loadingScreen);
 * const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);
 * const showPopperError = useUiStore((state) => state.showPopperError);
 * const setPopperError = useUiStore((state) => state.setPopperError);
 * const closePopperError = useUiStore((state) => state.closePopperError);
 * const popperErrorObject = useUiStore((state) => state.popperErrorObject);
 * const modalObject = useUiStore((state) => state.modalObject);
 * const showModal = useUiStore((state) => state.showModal);
 * const closeModal = useUiStore((state) => state.closeModal);
 * const setModal = useUiStore((state) => state.setModal);
 * const showPopperSuccess = useUiStore((state) => state.showPopperSuccess);
 * const closePopperSuccess = useUiStore((state) => state.closePopperSuccess);
 * const setPopperSuccess = useUiStore((state) => state.setPopperSuccess);
 * const popperSuccessObject = useUiStore((state) => state.popperSuccessObject);
 * ```
 *
 * @returns {object} The state and actions of the UI store.
 * @property {boolean} loadingScreen - The current state of the loading screen.
 * @property {function} setLoadingScreen - Function to set the status of the loading screen.
 * @property {boolean} showPopperError - The current state of the modal error.
 * @property {function} setPopperError - Function to set the modal error.
 * @property {function} closePopperError - Function to close the modal error.
 * @property {ErrorMessage | ErrorContext | null} popperErrorObject - The object containing details of the modal error.
 * @property {Message | null} modalObject - The object containing details of the global modal.
 * @property {boolean} showModal - The current state of the global modal.
 * @property {function} closeModal - Function to close the global modal.
 * @property {function} setModal - Function to set the global modal.
 * @property {boolean} showPopperSuccess - The current state of the success modal.
 * @property {function} closePopperSuccess - Function to close the success modal.
 * @property {function} setPopperSuccess - Function to set the success modal.
 * @property {ErrorMessage | ErrorContext | null} popperSuccessObject - The object containing details of the success modal.
 */
export const useUiStore = create<UiStore>()(
  devtools(
    (set) => ({
      /*Big Modal*/
      loadingScreen: false,

      setLoadingScreen: (status) => set({ loadingScreen: status }, false, 'setLoadingScreen'),

      /*Notification error */
      popperErrorObject: null,

      showPopperError: false,

      closePopperError: () => set({ showPopperError: false }, false, 'closePopperError'),

      setPopperError: (value) => set({ showPopperError: true, popperErrorObject: value }, false, 'setPopperError'),

      /*Notification success*/
      popperSuccessObject: null,

      showPopperSuccess: false,

      closePopperSuccess: () => set({ showPopperSuccess: false }, false, 'closePopperSuccess'),

      setPopperSuccess: (value) =>
        set({ showPopperSuccess: true, popperSuccessObject: value }, false, 'setPopperSuccess'),

      /*Global Modal */
      modalObject: null,

      showModal: false,

      closeModal: () => set({ showModal: false }, false, 'closeModal'),

      setModal: (value) => set({ showModal: true, modalObject: value }, false, 'setModal'),
    }),
    { name: 'UiStore' }
  )
);
