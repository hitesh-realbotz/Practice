
import styles from "./page.module.css";

export default function Home2() {
  return (
    <main className={styles.main}>
      <h2>This is HomePage2</h2>
      <User2 name="DEF" />
      
    </main>
  );
}

const User2 = (props) => {
  return(
    <div>
    <h2>User Name is {props.name}</h2>
    </div>
  )
}
