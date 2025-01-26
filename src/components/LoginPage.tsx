import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface LoginCredentials {
    email: string
    password: string
}

export default function LoginPage() {
    const [credentials, setCredentials] = useState<LoginCredentials>({ email: "", password: "" })
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCredentials((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            })
            if (response.ok) {
                const user = await response.json()
                document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=3600`
                navigate("/profile")
            } else {
                alert("Login failed. Please check your credentials.")
            }
        } catch (error) {
            console.error("Login error:", error)
            alert("An error occurred during login.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
        </label>
        <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="email"
    type="email"
    name="email"
    value={credentials.email}
    onChange={handleChange}
    required
    />
    </div>
    <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
        </label>
        <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    id="password"
    type="password"
    name="password"
    value={credentials.password}
    onChange={handleChange}
    required
    />
    </div>
    <div className="flex items-center justify-between">
    <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
        >
        Sign In
    </button>
    </div>
    </form>
    </div>
)
}

