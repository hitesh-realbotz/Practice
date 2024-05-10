import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Icon = ({icon, fade, size, style, width}) => {
return (
    <FontAwesomeIcon width={width ? width : 20} icon={icon} size={size} style={style} fade={fade}/>
);
}
export default Icon;