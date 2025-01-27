import type React from "react"
import { useState, useEffect } from "react"
import { Footer } from "./Footer.tsx"
import Navbar from "./Navbar.tsx";
import {useCartCount} from "../hooks/useCartCount.ts";

interface User {
    id: number
    name: string
    email: string
    password: string
    address: string
}


export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    const cartItemsCount = useCartCount();

    useEffect(() => {
        const fetchUser = () => {
            const userCookie = document.cookie.split("; ").find((row) => row.startsWith("user="))
            if (userCookie) {
                const userData = JSON.parse(userCookie.split("=")[1])
                setUser(userData)
            } else {
                // Redirect to /login if user data is not found
                window.location.href = "/login"
            }
        }

        fetchUser()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser((prev) => (prev ? { ...prev, [name]: value } : null))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        try {
            const response = await fetch(`/api/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            })
            if (response.ok) {
                setIsEditing(false)
                document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=3600`
                alert("Profile updated successfully!")
            } else {
                alert("Failed to update profile. Please try again.")
            }
        } catch (error) {
            console.error("Update error:", error)
            alert("An error occurred while updating the profile.")
        }
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar  cartItemsCount={cartItemsCount}/>
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                Address
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="address"
                                type="text"
                                name="address"
                                value={user.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        {isEditing ? (
                            <div className="flex justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Save Changes
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>
                        )}
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}
