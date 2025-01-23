"use client"

import { useState, useEffect } from "react"
import {Navbar} from "./Navbar.tsx";
import {Button} from "./ui/Button.tsx";
import {Footer} from "./Footer.tsx";

interface Pizza {
    id: number
    restaurant_id: number
    type: "HAM" | "CHEESE" | "EXTRA"
    price: number
}

interface Restaurant {
    id: number;
    name: string;
}

export default function PizzasPage() {
    const [pizzas, setPizzas] = useState<Pizza[]>([])
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [filter, setFilter] = useState<"HAM" | "CHEESE" | "EXTRA" | "ALL">("ALL")

    useEffect(() => {
        // Načítanie pízz a reštaurácií
        const fetchData = async () => {
            try {
                const [pizzasResponse, restaurantsResponse] = await Promise.all([
                    fetch("/data/pizzas.json"),
                    fetch("/data/restaurants.json")
                ]);

                const pizzasData = await pizzasResponse.json();
                const restaurantsData = await restaurantsResponse.json();

                setPizzas(pizzasData);
                setRestaurants(restaurantsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filteredPizzas = filter === "ALL" ? pizzas : pizzas.filter((pizza) => pizza.type === filter)

    const getRestaurantName = (restaurantId: number) => {
        const restaurant = restaurants.find((r) => r.id === restaurantId);
        return restaurant ? restaurant.name : "Unknown Restaurant";
    };

    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Our Pizzas</h1>
                <div className="mb-6">
                    <Button onClick={() => setFilter("ALL")} variant={filter === "ALL" ? "default" : "outline"} className="mr-2">
                        All
                    </Button>
                    <Button onClick={() => setFilter("HAM")} variant={filter === "HAM" ? "default" : "outline"} className="mr-2">
                        Ham
                    </Button>
                    <Button
                        onClick={() => setFilter("CHEESE")}
                        variant={filter === "CHEESE" ? "default" : "outline"}
                        className="mr-2"
                    >
                        Margherita
                    </Button>
                    <Button onClick={() => setFilter("EXTRA")} variant={filter === "EXTRA" ? "default" : "outline"}>
                        Special
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPizzas.map((pizza) => (
                        <div key={pizza.id} className="bg-gray-800 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-2">{pizza.type} Pizza</h2>
                            <p>Reštaurácia: {getRestaurantName(pizza.restaurant_id)}</p>
                            <p>Cena: {pizza.price} €</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

