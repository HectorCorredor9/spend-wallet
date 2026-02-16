import type { JSX } from 'react';
import type { Tenant, TenantSettings } from './appInterface';

/**
 * Properties for the TenantStore.
 *
 * @property {object} tenantSett - Tenant settings
 * @property {function} setTenantSett - Function to set tenant settings
 * @param {object} tenantSett.sessExpTime - Session expiration time
 * @param {object} tenantSett.sessResetTime - Session reset time
 * @param {object} tenantSett.tenant - Tenant information
 * @param {object} tenantSett.tenantImages - Tenant images
 * @param {object} tenantSett.tenantPwa - Tenant PWA settings
 * @param {string} tenantSett.tenantUri - Tenant URI
 * @param {string} tenantSett.webUrl - Web URL
 */
export type TenantStoreProps = {
  tenantSett: {
    sessExpTime: TenantSettings['sessExpTime'];
    sessResetTime: TenantSettings['sessResetTime'];
    tenant: Tenant;
    tenantImages: TenantSettings['tenantImages'];
    tenantPwa: TenantSettings['tenantPwa'];
    tenantUri: string;
    webUrl: TenantSettings['webUrl'];
  };
  setTenantSett: (tenantSett: TenantStoreProps['tenantSett']) => void;
};

/**
 * Properties for the SessionStorage.
 *
 * @property {number} sessReset - Session reset time
 * @property {boolean} showModal - Flag to show or hide modal
 * @property {number} timeLeft - Time left for the session
 * @property {function} setSessReset - Function to set session reset time
 * @property {function} setShowModal - Function to set show or hide modal
 * @property {function} setTimeLeft - Function to set time left for the session
 * @property {function} resetSessStore - Function to reset session store
 */
export type SessionStorage = {
  sessReset: number;
  showModal: boolean;
  timeLeft: number;
  setSessReset: (reset?: number) => void;
  setShowModal: (show: boolean) => void;
  setTimeLeft: (time: number) => void;
  resetSessStore: (time: number) => void;
};

/**
 * Properties for the ModeStore.
 *
 * @property {string} mode - Current mode (e.g., 'light' or 'dark')
 * @property {function} changeMode - Function to change the mode
 * @param {string} lang - The new mode to set.
 */
export type ModeStoreProps = {
  mode: string;
  changeMode: (lang: string) => void;
};

/**
 * Interface representing the properties of the MenuStore.
 *
 * @property {string} currentItem - The currently selected item in the menu.
 * @property {function} setCurrentItem - Function to set the currently selected item in the menu.
 * @property {string} drawerStatus - The status of the drawer (open or closed).
 * @property {function} setDrawerStatus - Function to set the status of the drawer.
 */
export interface MenuStoreProps {
  currentItem: string;
  setCurrentItem: (_item: string) => void;
  drawerStatus: boolean;
  setDrawerStatus: (_status: boolean) => void;
}

/**
 * Interface for managing UI state.
 *
 * @interface UiStore
 * @property {boolean} loadingScreen - Indicates whether the loading screen is visible.
 * @property {function} setLoadingScreen - Function to set the visibility of the loading screen.
 * @property {boolean} showPopperError - Indicates whether the modal error is visible.
 * @property {function} closePopperError - Function to close the modal error.
 * @property {function} setPopperError - Function to set the modal error with a specific value.
 * @property {boolean} showModal - Indicates whether the global modal is visible.
 * @property {function} closeModal - Function to close the global modal.
 * @property {function} setModal - Function to set the global modal with a specific value.
 * @property {Message | null} modalObject - The object containing details for the global modal.
 * @property {boolean} showPopperSuccess - Indicates whether the success modal is visible.
 * @property {function} closePopperSuccess - Function to close the success modal.
 * @property {function} setPopperSuccess - Function to set the success modal with a specific value.
 * @property {ErrorMessage | ErrorContext | null} popperErrorObject - The object containing error details for the modal.
 * @property {ErrorMessage | ErrorContext | null} popperSuccessObject - The object containing success details for the modal.
 */

export interface UiStore {
  loadingScreen: boolean;
  setLoadingScreen: (status: boolean) => void;
  showPopperError: boolean;
  closePopperError: () => void;
  setPopperError: (value: ModalErrorType) => void;
  popperErrorObject: ModalErrorType;
  showModal: boolean;
  closeModal: () => void;
  setModal: (value: Message | null) => void;
  modalObject: Message | null;
  showPopperSuccess: boolean;
  closePopperSuccess: () => void;
  setPopperSuccess: (value: ModalErrorType) => void;
  popperSuccessObject: ModalErrorType;
}

type ModalErrorType = ErrorMessage | ErrorContext | null;

interface ErrorMessage {
  code?: string;
  title?: string;
  description?: string;
}
interface ErrorContext {
  error: unknown;
  context?: 'terms' | 'login';
}

interface Message {
  title: string;
  description?: JSX.Element | React.ReactNode | string;
  maxWidth?: number | string;
  icon?: JSX.Element | React.ReactNode;
  iconTitle?: string;
  bgColor?: string;
  form?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  actions: {
    text: string;
    variant: 'text' | 'contained' | 'outlined';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
  }[];
}
