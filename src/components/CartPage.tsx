"use client"

import { useState, useEffect } from "react"
import Navbar from "./Navbar.tsx"
import { Button } from "./ui/Button.tsx"
import { Footer } from "./Footer.tsx"
import { useCart } from "../hooks/useCart"
import {useCartCount} from "../hooks/useCartCount.ts";

interface Pizza {
    id: number
    type: string
    price: number
    image: string
}

interface CartItem {
    id: number
    pizza_id: number
    quantity: number
    pizza?: Pizza
}

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity} = useCart()
    const cartItemsCount = useCartCount();
    const [total, setTotal] = useState(0)
    const [fullCartItems, setFullCartItems] = useState<CartItem[]>([])

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch("/data/pizzas.json")
                const pizzas: Pizza[] = await response.json()
                const fullItems = cartItems.map((item) => {
                    const pizza = pizzas.find((p) => p.id === item.pizza_id)
                    return { ...item, pizza }
                })
                setFullCartItems(fullItems)
            } catch (error) {
                console.error("Error fetching pizzas:", error)
            }
        }
        fetchPizzas()
    }, [cartItems])

    useEffect(() => {
        const newTotal = fullCartItems.reduce((sum, item) => sum + (item.pizza?.price || 0) * item.quantity, 0)
        setTotal(newTotal)
    }, [fullCartItems])

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar cartItemsCount={cartItemsCount} />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Your Cart</h1>
                {fullCartItems.length === 0 ? (
                    <p className="text-center text-gray-600">Your cart is empty.</p>
                ) : (
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        {fullCartItems.map((item: CartItem) => (
                            <div key={item.id} className="flex items-center border-b border-gray-200 py-4 px-6">
                                <img
                                    src={item.pizza?.image || "/placeholder.svg"}
                                    alt={`${item.pizza?.type} Pizza`}
                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-lg font-semibold text-gray-800">{item.pizza?.type} Pizza</h2>
                                    <p className="text-gray-600">€{item.pizza?.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center">
                                    <Button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity === 1}
                                        className="px-2 py-1"
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1">
                                        +
                                    </Button>
                                    <Button onClick={() => removeFromCart(item.id)} variant="destructive" className="ml-4">
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold text-gray-800">Total:</span>
                                <span className="text-2xl font-bold text-green-600">€{total.toFixed(2)}</span>
                            </div>
                            <Button className="w-full">Proceed to Checkout</Button>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    )
}

