import './App.css'
import { useEffect } from 'react'
import { getAnalytics } from "firebase/analytics";
import { firebaseApp } from './firebaseConfig'
import { InputBar } from './assets/InputBar/inputBar'
function App() {
  
  useEffect(() => {
    getAnalytics(firebaseApp);
  },[])

  return (
    <>
      <InputBar/>
    </>
  )
}

export default App
