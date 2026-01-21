import { useState } from 'react'
import Card1 from "./components/Card1"
import Card2 from "./components/Card2"
import Header from "./components/Header"
import Introduction from "./components/Introduction"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Introduction />
      <div className="card-wrapper">
        <Card1 />
        <Card2 />
      </div>
    </>
  );
};

export default App
