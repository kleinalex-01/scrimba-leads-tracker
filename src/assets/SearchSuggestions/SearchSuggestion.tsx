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
            <div className="input-group mb-3 position-relative">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Keresés..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul className="list-group position-absolute w-100 my-5 rounded z-3">
                    {suggestions.map(item => (
                        <li key={item.name}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={{ cursor: "pointer" }}
                        >
                        <img
                            src={item.icon}
                            alt={item.name}
                            className="me-2 bg-white"
                            style={{ width: 24, height: 24 }}
                        />
                            {item.name}
                        </li>
                    ))}

                </ul>
            </div>

        </div>
        </>
    )
}