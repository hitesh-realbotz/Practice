import Image from "next/image";
import styles from "./page.module.css";
import Home2 from "./page2";

export default function Home5() {
  return (
    <main className={styles.main}>
      <h2>This is HomePage</h2>
      <User name={'ABC'} />  
      <Home2 />    
    </main>
  );
}

const User = (props) => {
  return(
    <div>
    <h2>User Name is {props.name}</h2>
    </div>
  )
}
