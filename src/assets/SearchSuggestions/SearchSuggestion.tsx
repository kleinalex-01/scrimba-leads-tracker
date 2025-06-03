import { useState, useEffect } from "react";
import { firebaseApp } from "../../firebaseConfig";
import { push, ref, set, onValue, remove, child, getDatabase } from "firebase/database";
import { TasksDatabase } from "../../firebaseConfig";

interface Suggestion {
  name: string;
  icon: string;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [allSuggestions, setAllSuggestions] = useState<Suggestion[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [databaseItems, setDatabaseItems] = useState<{ id: string; text: string }[]>([]);

  // Adatbázis lekérése és elemek listázása amennyiben van adat
  useEffect(() => {
    const unsubscribe = onValue(TasksDatabase, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setDatabaseItems([]);
        return;
      }
      const items = Object.entries(data).map(([, value]) => value) as { id: string; text: string }[];
      setDatabaseItems(items);
    });
    return () => unsubscribe();
  }, []);

  // Adatbázis lekérése a javaslatokhoz
  useEffect(() => {
    const db = getDatabase(firebaseApp);
    const suggestionsRef = ref(db, "searchSuggestion");

    onValue(suggestionsRef, (snapshot) => {
      const data = snapshot.val();
      const list = Object.values(data || {}) as Suggestion[];
      setAllSuggestions(list);
    });
  }, []);

  // Javaslatok szűrése a keresési feltétel alapján
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = allSuggestions.filter((item) =>
      item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchTerm, allSuggestions]);

  // Tétel hozzáadása az adatbázishoz
  const addItem = async (e: React.FormEvent, value?: string) => {
    e.preventDefault();
    if (inputVal.trim() === "") return;
    const text = value ?? inputVal;
    const newRef = push(TasksDatabase);
    const id = newRef.key;
    await set(newRef, { id, text });
    setSearchTerm("");
    setSuggestions([]);
    setInputVal("");
  };

  // Összes tétel törlése az adatbázisból
  const deleteAll = () => {
    remove(TasksDatabase);
  };

  // Egy tétel törlése az adatbázisból
  const deleteItem = (id: string) => {
    const itemRef = child(TasksDatabase, id);
    remove(itemRef);
  };

  return (
    <div className="container my-4">
      {/* Keresősáv és javaslatok */}
      <div className="row position-relative">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Keresés..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setInputVal(e.target.value);
            }}
          />
          {/* Javaslatok megjelenítése */}
          {suggestions.length > 0 && (
            <ul className="list-group position-absolute w-100 shadow-sm" style={{ zIndex: 1000 }}>
              {suggestions.map((item) => (
                <li
                  key={item.name}
                  className="list-group-item d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    addItem(e, item.name);
                    setSearchTerm(item.name);
                    setInputVal(item.name);
                  }
                }
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="me-2 rounded bg-light"
                    style={{ width: 24, height: 24 }}
                  />
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Hozzáadás és törlés gomb */}
      <form onSubmit={addItem} className="mt-4">
        <div className="row g-2">
          <div className="col-6">
            <button type="submit" className="btn btn-success w-100">
              Kajci hozzáadás
            </button>
          </div>
          <div className="col-6">
            <button type="button" onClick={deleteAll} className="btn btn-danger w-100">
              Lista ürítése
            </button>
          </div>
        </div>
      </form>

      {/* Tételek listázása */}
      <div className="row mt-4">
        {databaseItems.map((word) => (
          <div className="col-12 d-flex justify-content-between align-items-center mb-2" key={word.id}>
            <span className="h5 mb-0">{word.text}</span>
            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(word.id)}>
              Törlés
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

