"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Navbar from "./Navbar"
import { Footer } from "./Footer"
import { useCart } from "../hooks/useCart"
import { ArrowLeft, MapPin } from "lucide-react"
import PizzaCard from "./PizzaCard"

export default function RestaurantPage() {
    const { id } = useParams<{ id: string }>()
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
    const [pizzas, setPizzas] = useState<Pizza[]>([])
    const { addToCart } = useCart()
    const [addedPizzaId, setAddedPizzaId] = useState<number | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [restaurantsResponse, pizzasResponse] = await Promise.all([
                    fetch("/data/restaurants.json"),
                    fetch("/data/pizzas.json"),
                ])
                const restaurantsData: Restaurant[] = await restaurantsResponse.json()
                const pizzasData: Pizza[] = await pizzasResponse.json()

                const currentRestaurant = restaurantsData.find((r) => r.id === Number.parseInt(id as string))
                setRestaurant(currentRestaurant || null)

                const restaurantPizzas = pizzasData.filter((p) => p.restaurant_id === Number.parseInt(id as string))
                setPizzas(restaurantPizzas)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [id])

    const handleAddToCart = (pizza: Pizza) => {
        addToCart(pizza)
        setAddedPizzaId(pizza.id)
        setTimeout(() => setAddedPizzaId(null), 1000)
    }

    if (!restaurant) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
                <Link to="/pizzas" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to All Pizzas
                </Link>
                <div className="bg-white shadow-lg rounded-2xl p-8 mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">{restaurant.name}</h1>
                    <p className="text-gray-600 flex items-center mb-4">
                        <MapPin className="w-5 h-5 mr-2" />
                        {restaurant.address}
                    </p>
                    <p className="text-lg font-semibold text-blue-600">Delivery Fee: €{restaurant.fee.toFixed(2)}</p>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Pizzas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pizzas.map((pizza) => (
                        <PizzaCard
                            key={pizza.id}
                            pizza={pizza}
                            showRestaurant={false}
                            onAddToCart={handleAddToCart}
                            addedPizzaId={addedPizzaId}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

