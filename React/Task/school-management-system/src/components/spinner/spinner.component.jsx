import { SpinnerContainer, SpinnerOverlay } from './spinner.styles';
import { Audio } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="three-dots-loading"
      wrapperStyle
      wrapperClass
    />
  );
}
export default Spinner;
