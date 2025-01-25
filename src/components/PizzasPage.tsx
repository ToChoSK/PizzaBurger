"use client"

import { useState, useEffect } from "react"
import { Navbar } from "./Navbar.tsx"
import { Button } from "./ui/Button.tsx"
import { Footer } from "./Footer.tsx"

interface Pizza {
    id: number
    restaurant_id: number
    type: "HAM" | "CHEESE" | "EXTRA" | "VEGETARIAN"
    price: number
    image: string
    rating: number
}

interface Restaurant {
    id: number
    name: string
}

export default function PizzasPage() {
    const [pizzas, setPizzas] = useState<Pizza[]>([])
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [filter, setFilter] = useState<"HAM" | "CHEESE" | "EXTRA" | "VEGETARIAN" | "ALL">("ALL")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pizzasResponse, restaurantsResponse] = await Promise.all([
                    fetch("/data/pizzas.json"),
                    fetch("/data/restaurants.json"),
                ])
                console.log(pizzasResponse)
                const pizzasData = await pizzasResponse.json()
                const restaurantsData = await restaurantsResponse.json()

                setPizzas(pizzasData)
                setRestaurants(restaurantsData)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [])

    const filteredPizzas = filter === "ALL" ? pizzas : pizzas.filter((pizza) => pizza.type === filter)

    const getRestaurantName = (restaurantId: number) => {
        const restaurant = restaurants.find((r) => r.id === restaurantId)
        return restaurant ? restaurant.name : "Unknown Restaurant"
    }

    const sortByPrice = () => {
        const sortedPizzas = [...pizzas].sort((a, b) => a.price - b.price);
        setPizzas(sortedPizzas);
    };

    const sortByRating = () => {
        const sortedPizzas = [...pizzas].sort((a, b) => b.rating - a.rating);
        setPizzas(sortedPizzas);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Our Pizzas</h1>
                <div className="mb-6 flex justify-center space-x-2">
                    <Button onClick={() => setFilter("ALL")} variant={filter === "ALL" ? "default" : "outline"}>
                        All
                    </Button>
                    <Button onClick={() => setFilter("HAM")} variant={filter === "HAM" ? "default" : "outline"}>
                        Ham
                    </Button>
                    <Button onClick={() => setFilter("CHEESE")} variant={filter === "CHEESE" ? "default" : "outline"}>
                        Cheese
                    </Button>
                    <Button onClick={() => setFilter("EXTRA")} variant={filter === "EXTRA" ? "default" : "outline"}>
                        Extra
                    </Button>
                    <Button onClick={() => setFilter("VEGETARIAN")} variant={filter === "VEGETARIAN" ? "default" : "outline"}>
                        Vegetarian
                    </Button>
                </div>
                <div className="mb-6 flex justify-center space-x-2">
                    <Button onClick={()=>sortByPrice()}>
                        SORT BY PRICE
                    </Button>

                    <Button onClick={()=>sortByRating()}>
                        SORT BY REVIEWS
                    </Button>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPizzas.map((pizza) => (
                        <div key={pizza.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src={pizza.image || "/placeholder.svg"}
                                alt={`${pizza.type} Pizza`}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">{pizza.type} Pizza</h2>
                                <p className="text-gray-600 mb-2">Restaurant: {getRestaurantName(pizza.restaurant_id)}</p>
                                <p className="text-lg font-bold text-green-600">€{pizza.price.toFixed(2)}</p>
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">Rating: {pizza.rating} </h2>
                                <Button onClick={() => sortByPrice()}>
                                    View reviews
                                </Button>

                            </div>

                        </div>
                    ))}
                </div>
            </main>
            <Footer/>
        </div>
    )
}

