
import { createAction } from '../../utils/reducer/reducer.utils';
import { TOASTS_ACTION_TYPES } from './toast.types';

export const showToast = (message) =>
  createAction(TOASTS_ACTION_TYPES.SHOW_TOAST, message);
  
  export const resetToastMessage = () =>
  createAction(TOASTS_ACTION_TYPES.RESET_TOAST, '');