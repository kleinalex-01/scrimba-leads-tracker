import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseApp } from "../../firebaseConfig";

interface Suggestion {
    name: string;
    icon: string;
}

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [allSuggestoions, setAllSuggestions] = useState<Suggestion[]>([]);

    useEffect(() => {
        const db = getDatabase(firebaseApp);
        const suggestionsRef = ref(db, "searchSuggestion");

        onValue(suggestionsRef, (snapshot) => {
            const data = snapshot.val();
            const list = Object.values(data || {}) as Suggestion[];
            setAllSuggestions(list);
        })
    },[])

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setSuggestions([]);
            return;
        }
        const filteredSuggestions = allSuggestoions.filter(item => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
        setSuggestions(filteredSuggestions)
    },[searchTerm, allSuggestoions])

    return (
        <>
        <div className="container my-3">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Keresés..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className=" my-3 container-fluid d-flex flex-column align-items-start">
                    {suggestions.map(item => (
                        <button className="d-flex" key={item.name} >
                            <img src={item.icon} alt={item.name} width={24}/>
                            <span className="mx-3">{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>

        </div>
        </>
    )
}