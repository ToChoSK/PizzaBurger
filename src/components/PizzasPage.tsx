"use client"

import { useState, useEffect, useRef } from "react"
import Navbar from "./Navbar.tsx"
import { Button } from "./ui/Button.tsx"
import { Footer } from "./Footer.tsx"
import { useCart } from "../hooks/useCart"
import { motion, useAnimation } from "framer-motion"
import { useCartCount } from "../hooks/useCartCount.ts"
import {StarRating} from "./ui/StarRating.tsx";

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
    const { addToCart } = useCart()
    const cartItemsCount = useCartCount()
    const [addedPizzaId, setAddedPizzaId] = useState<number | null>(null)
    const animationControls = useAnimation()
    const navbarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pizzasResponse, restaurantsResponse] = await Promise.all([
                    fetch("/data/pizzas.json"),
                    fetch("/data/restaurants.json"),
                ])
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
        const sortedPizzas = [...pizzas].sort((a, b) => a.price - b.price)
        setPizzas(sortedPizzas)
    }

    const sortByRating = () => {
        const sortedPizzas = [...pizzas].sort((a, b) => b.rating - a.rating)
        setPizzas(sortedPizzas)
    }

    const handleAddToCart = async (pizza: Pizza, event: React.MouseEvent<HTMLButtonElement>) => {
        addToCart(pizza)
        setAddedPizzaId(pizza.id)
        setTimeout(() => setAddedPizzaId(null), 1000)

        const button = event.currentTarget
        const buttonRect = button.getBoundingClientRect()
        const navbarRect = navbarRef.current?.getBoundingClientRect()

        if (navbarRect) {
            const startX = buttonRect.left + buttonRect.width / 2
            const startY = buttonRect.top + buttonRect.height / 2
            const endX = navbarRect.right - 20 // Adjust this value to position the end point
            const endY = navbarRect.top + navbarRect.height / 2

            await animationControls.start({
                x: [0, endX - startX],
                y: [0, endY - startY],
                scale: [1, 0.5],
                opacity: [1, 0],
                transition: { duration: 0.5 },
            })
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar cartItemsCount={cartItemsCount} ref={navbarRef} />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Our Pizzas</h1>
                <div className="mb-6 flex flex-wrap justify-center gap-2">
                    {["ALL", "HAM", "CHEESE", "EXTRA", "VEGETARIAN"].map((filterType) => (
                        <Button
                            key={filterType}
                            onClick={() => setFilter(filterType as any)}
                            variant={filter === filterType ? "default" : "outline"}
                            className="rounded-full px-4 py-2 text-sm"
                        >
                            {filterType}
                        </Button>
                    ))}
                </div>
                <div className="mb-6 flex justify-center space-x-4">
                    <Button onClick={sortByPrice} className="bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full px-4 py-2">
                        Sort by Price
                    </Button>
                    <Button onClick={sortByRating} className="bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full px-4 py-2">
                        Sort by Rating
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPizzas.map((pizza) => (
                        <motion.div
                            key={pizza.id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative">
                                <img
                                    src={pizza.image || "/placeholder.svg"}
                                    alt={`${pizza.type} Pizza`}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-0 right-0 bg-white px-2 py-1 m-2 rounded-full shadow">
                                    <StarRating rating={pizza.rating} />
                                </div>
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">{pizza.type} Pizza</h2>
                                <p className="text-sm text-gray-600 mb-2">From: {getRestaurantName(pizza.restaurant_id)}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-lg font-bold text-green-600">€{pizza.price.toFixed(2)}</p>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            onClick={(e) => handleAddToCart(pizza, e)}
                                            className={`px-4 py-2 rounded-full ${
                                                addedPizzaId === pizza.id
                                                    ? "bg-green-500 text-white"
                                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                            }`}
                                        >
                                            {addedPizzaId === pizza.id ? "Added!" : "Add to Cart"}
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
            <Footer />
            <motion.div
                className="fixed w-6 h-6 bg-blue-500 rounded-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={animationControls}
            />
        </div>
    )
}

