import './App.css'
import { useEffect, useState } from 'react'
import { getAnalytics } from "firebase/analytics";
import { firebaseApp } from './firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GroceryList } from './assets/GroceryList/GroceryList'
import SignInPage from './assets/SignInPage/SignInPage';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    getAnalytics(firebaseApp);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    })

    return () => unsubscribe();
  },[])

  if (loading) {
    return <div className="container my-3"><h1 className="text-center">Betöltés...</h1></div>
  }

  return (
    <>
    {user ? <GroceryList /> : <SignInPage />}
    </>
  )
}

export default App
