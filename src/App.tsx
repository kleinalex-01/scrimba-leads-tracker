import './App.css'
import { useState } from 'react'
import { getAnalytics } from "firebase/analytics";
import { firebaseApp } from './firebaseConfig'
import { InputBar } from './assets/InputBar/inputBar'
function App() {
  const analytics = getAnalytics(firebaseApp);
  const [item, setItem] = useState([]);
  return (
    <>
      <InputBar item={item} setItem={setItem}/>
    </>
  )
}

export default App
