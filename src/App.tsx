import './App.css'
import { useState, useEffect } from 'react'
import { getAnalytics } from "firebase/analytics";
import { firebaseApp } from './firebaseConfig'
import { InputBar } from './assets/InputBar/inputBar'
function App() {
  useEffect(() => {
    getAnalytics(firebaseApp);
  },[])

  const [item, setItem] = useState<string[]>([]);
  return (
    <>
      <InputBar item={item} setItem={setItem}/>
    </>
  )
}

export default App
