
import { useEffect } from 'react';
import useLocalStorage from '../custom-hook/useLocalStorage'

const NameComponent = (props) => {
  
  const {isMasterReset} = props;
  const [name, setName] = useLocalStorage('name', '');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleReset = () => {
    setName('');
  };

  useEffect(() => {
    setName('');
    }, [isMasterReset]);

  return (
    <div>
      <h1>Hello, {name || 'Stranger'}!</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleChange}
      />
      <button onClick={handleReset}>Reset Name</button>
    </div>
  );
}

export default NameComponent;