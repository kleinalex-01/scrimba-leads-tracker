import { useState } from "react";

interface Props {
    item: string[];
    setItem: React.Dispatch<React.SetStateAction<string[]>>
}
export const InputBar = ({item, setItem}: Props) => {
    const [inputVal, setInputVal] = useState<string>("")
    const addItem = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputVal.trim() === "") return

        setItem([...item, inputVal])

        setInputVal("")
    }

    const deleteAll = () => {
        setItem([])
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
                          placeholder="Eg. Mop floor..."
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row g-2">
                    <div className="col-4">
                        <button type="submit" className="btn btn-success w-100">Save Input</button>
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn btn-success w-100">Save Tab</button>
                    </div>
                    <div className="col-4">
                        <button type="button" onClick={deleteAll} className="btn btn-light border-success w-100">Delete All</button>
                    </div>
                </div>
            </form>
        </div>

        <div className="container">
            <div className="row">
                <div className="col-6">
                    {item.map(item => {
                        return(
                            <>
                                <li key={item} className="h1">{item}</li>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    );
}