import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownAZ, faArrowDownZA } from '@fortawesome/free-solid-svg-icons';

const SortIcon = ({icon}) => {
console.log('ICON COMP ', icon);
return (
    <FontAwesomeIcon icon={icon}  fade/>
);
}
export default SortIcon;