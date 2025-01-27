"use client"

import { useState, useEffect, useRef } from "react"
import Navbar from "./Navbar"
import { Button } from "./ui/Button"
import { Footer } from "./Footer"
import { useCart } from "../hooks/useCart"
import { motion, useAnimation } from "framer-motion"
import { Filter, SortAsc } from "lucide-react"
import PizzaCard from "./PizzaCard"

export default function PizzasPage() {
    const [pizzas, setPizzas] = useState<Pizza[]>([])
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [filter, setFilter] = useState<"HAM" | "CHEESE" | "EXTRA" | "VEGETARIAN" | "ALL">("ALL")
    const { addToCart } = useCart()
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

    const handleAddToCart = async (pizza: Pizza) => {
        addToCart(pizza)
        setAddedPizzaId(pizza.id)
        setTimeout(() => setAddedPizzaId(null), 1000)

        const pizzaCard = document.getElementById(`pizza-${pizza.id}`)
        const navbarRect = navbarRef.current?.getBoundingClientRect()

        if (pizzaCard && navbarRect) {
            const pizzaRect = pizzaCard.getBoundingClientRect()
            const startX = pizzaRect.left + pizzaRect.width / 2
            const startY = pizzaRect.top + pizzaRect.height / 2
            const endX = navbarRect.right - 20
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
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar/>
            <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
                <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Our Delicious Pizzas</h1>
                <div className="mb-8 flex flex-wrap justify-center gap-3">
                    {["ALL", "HAM", "CHEESE", "EXTRA", "VEGETARIAN"].map((filterType) => (
                        <Button
                            key={filterType}
                            onClick={() => setFilter(filterType as any)}
                            variant={filter === filterType ? "default" : "outline"}
                            className="rounded-full px-6 py-2 text-sm font-medium"
                        >
                            {filterType}
                        </Button>
                    ))}
                </div>
                <div className="mb-8 flex justify-center space-x-4">
                    <Button
                        onClick={sortByPrice}
                        className="bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-full px-6 py-2 flex items-center"
                    >
                        <SortAsc className="w-4 h-4 mr-2" />
                        Sort by Price
                    </Button>
                    <Button
                        onClick={sortByRating}
                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-full px-6 py-2 flex items-center"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Sort by Rating
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredPizzas.map((pizza) => (
                        <div key={pizza.id} id={`pizza-${pizza.id}`}>
                            <PizzaCard
                                pizza={pizza}
                                getRestaurantName={getRestaurantName}
                                onAddToCart={handleAddToCart}
                                addedPizzaId={addedPizzaId}
                            />
                        </div>
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

