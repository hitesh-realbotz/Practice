import './App.css';
import NameComponent from './components/name.component';
import CounterComponent from './components/counter.component';
import { useState } from 'react';

function App() {

  const [isMasterReset, setIsMasterReset] = useState(false);

  const handleMasterReset = () => {
    setIsMasterReset(!isMasterReset);
  }


  return (
    <>
      <NameComponent isMasterReset={isMasterReset} />
      <CounterComponent isMasterReset={isMasterReset} />
      <div>
        <button onClick={handleMasterReset}>Reset Local Storage</button>
      </div>
    </>
  );
}


export default App;
