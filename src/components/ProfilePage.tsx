"use client"

import { useState, useEffect } from "react"
import { Navbar } from "./Navbar.tsx"
import { Footer } from "./Footer.tsx"

interface User {
    id: number
    name: string
}

export default function ProfilePage() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse] = await Promise.all([
                    fetch("/data/users.json"),
                ])
                const usersData = await userResponse.json()
                setUsers(usersData)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [])


    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">{user.name} User</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer/>
        </div>
    )
}

