import { useEffect, useState } from "react";
import { push, child, set, onValue, remove} from "firebase/database";
import { refDatabase } from "../../firebaseConfig";

export const GroceryList = () => {
    const [inputVal, setInputVal] = useState<string>("")
    const [databaseItems, setDatabaseItems] = useState<{ id: string, text: string}[]>([])

    // Adatázis lekérése és State frissítése
    useEffect(() => {
        const unsubscribe = onValue(refDatabase, (snapshot) => {
            const data = snapshot.val()
            if (!data) {
                setDatabaseItems([])
                return
            }
            const items = Object.entries(data).map(([,value]) => value) as { id: string, text: string}[];
            setDatabaseItems(items)
        })
        return () => unsubscribe();
    }, [])

    // Uj termék hozzáadása a listához
    const addItem = async (e: React.FormEvent) => {
        e.preventDefault()
        if (inputVal.trim() === "") return
        const newRef = push(refDatabase)
        const id = newRef.key
        await set(newRef, {
            id,
            text: inputVal
        })
        setInputVal("")
    }

    // Összes termék törlése a listából
    const deleteAll = () => {
        remove(refDatabase)
    }

    // Egy termék törlése a listából
    const deleteItem = (id:string) => {
        const itemRef = child(refDatabase, id)
        remove(itemRef)
    }

    return (
        <>
         <div className="container my-3">
            <form onSubmit={addItem}>
                <div className="row mb-3">
                    <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Kukorica, krumpli, hagyma, stb."
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row g-2">

                    <div className="col-6">
                        <button type="submit" className="btn btn-success w-100">Kajci hozzáadás</button>
                    </div>
                    
                    <div className="col-6">
                        <button type="button" onClick={deleteAll} className="btn btn-danger border-success w-100">Lista ürítése</button>
                    </div>
                </div>
            </form>
        </div>

        <div>

        </div>

        <div className="container">
            <div className="row">
                    {databaseItems.map((word,index) => {
                        return(
                            <>
                            <div className="col-12 d-flex w-100 justify-content-between mt-3">
                                <li key={index} className="h1">{word.text}</li>
                                <button type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            deleteItem(word.id)                                            
                                        }}
                                        >Törlés</button>
                            </div>
                            </>
                            )
                        })}
            </div>
        </div>
        </>
    );
}