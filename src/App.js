import Button from "./Button";
import styles from "./App.module.css";
import {useState, useEffect} from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("")
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  useEffect(() => {
    console.log("I run only once.");
  } , []);
  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  } , [keyword]);
  useEffect(() =>{
    console.log("I run when 'counter' changes.");
  } , [counter]);
  return (
    <div>
      <input 
        value={keyword}
        onChange={onChange}
        type="text" 
        placeholder="Search here.." />
      <h1 className={styles.title}>Welcome back!!!</h1>
      <Button text={"Continue"}/>
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default App;
