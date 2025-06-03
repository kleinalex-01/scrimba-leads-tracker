import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function SignInPage() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const auth = getAuth()

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch {
            setError("Hibás email vagy jelszó. Kérjük, próbáld újra.")
        }
    }

    return (
        <>
        <form onSubmit={handleSignIn} className="container my-3">
            <h1 className="text-center">Bejelentkezés</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email cím</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Jelszó</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Bejelentkezés</button>

        </form>
        </>
    )
}