import { useState } from "react";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <h1>Pet Adoption</h1>
      </header>
      <main></main>
      <footer></footer>
    </>
  );
}

export default App;
