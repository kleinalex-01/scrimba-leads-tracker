import { useState } from "react";

interface Props {
    item: string;
    setItem: (value: string) => void
}
export const InputBar = ({item, setItem}: Props) => {

    const [inputVal, setInputVal] = useState("")
    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="container my-3">
                <div className="row mb-3">
                    <div className="col-12">
                            <input type="text"
                                    className="form-control"
                                    placeholder="Eg. Mop floor..."
                            />
                    </div>
                <div className="row g-2">
                    <div className="col-4">
                        <button className="btn btn-success w-100">Save Input</button>
                    </div>

                    <div className="col-4">
                        <button className="btn btn-success w-100">Save Tab</button>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-light border-success w-100">Delete All</button>
                    </div>
                </div>
                </div>
            </div>
        </form>

        <div className="container">
            <div className="row">
                <div className="col-6">
                    <p className="h1">{item}</p>
                </div>
            </div>
        </div>
        </>
    );
}