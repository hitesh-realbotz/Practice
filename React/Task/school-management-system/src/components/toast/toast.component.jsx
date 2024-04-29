import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectToastReducer } from '../../store/toasts/toast.selector';
import { showToast } from '../../store/toasts/toast.action';

const ToastEle = (props) => {
    // toast(props.toastMessage);
    const toastMessage = useSelector(selectToastReducer);
    const dispatch = useDispatch();
    
    console.log('TOASTMESAGE from toster ', toastMessage);
    if (!!toastMessage.length) {
        toast(toastMessage);
        dispatch(showToast(''));

    }

    return (
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"

        />
    );
}
export default ToastEle;