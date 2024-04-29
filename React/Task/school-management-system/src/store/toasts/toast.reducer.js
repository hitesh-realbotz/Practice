import { TOASTS_ACTION_TYPES } from './toast.types';

  const initialState = {
    message: '',
  };
  
  const toastReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (action.type) {
      case TOASTS_ACTION_TYPES.SHOW_TOAST:
        return {
          ...state,
          message: payload,
        };
      case TOASTS_ACTION_TYPES.RESET_TOAST:
        return {
          ...state,
          message: payload,
        };
      default:
        return state;
    }
  };
  
  export default toastReducer;
