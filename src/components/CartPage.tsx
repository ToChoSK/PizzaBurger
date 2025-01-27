import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import { Button } from "./ui/Button"
import { Footer } from "./Footer"
import { useCart } from "../hooks/useCart"
import { Link } from "react-router-dom"
import OrderSummary from "./OrderSummary"

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity } = useCart()
    const [total, setTotal] = useState(0)
    const [groupedCart, setGroupedCart] = useState<GroupedCart[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pizzasResponse, restaurantsResponse] = await Promise.all([
                    fetch("/data/pizzas.json"),
                    fetch("/data/restaurants.json"),
                ])
                const pizzas: Pizza[] = await pizzasResponse.json()
                const restaurants: Restaurant[] = await restaurantsResponse.json()

                const fullItems = cartItems.map((item) => {
                    const pizza = pizzas.find((p) => p.id === item.pizza_id)
                    return { ...item, pizza }
                })

                const grouped = restaurants
                    .map((restaurant) => {
                        const items = fullItems.filter((item) => item.pizza?.restaurant_id === restaurant.id)
                        const subtotal = items.reduce((sum, item) => sum + (item.pizza?.price || 0) * item.quantity, 0)
                        return { restaurant, items, subtotal }
                    })
                    .filter((group) => group.items.length > 0)

                setGroupedCart(grouped)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    }, [cartItems])

    useEffect(() => {
        const newTotal = groupedCart.reduce((sum, group) => sum + group.subtotal + group.restaurant.fee, 0)
        setTotal(newTotal)
    }, [groupedCart])

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Your Cart</h1>
                {groupedCart.length === 0 ? (
                    <div className="text-center">
                        <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
                        <Link to="/pizzas" className="text-blue-600 hover:text-blue-800 underline">
                            Browse our delicious pizzas
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            {groupedCart.map((group) => (
                                <div key={group.restaurant.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <div className="bg-gray-800 text-white py-3 px-6">
                                        <h2 className="text-xl font-semibold">{group.restaurant.name}</h2>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        {group.items.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4">
                                                <img
                                                    src={item.pizza?.image || "/placeholder.svg"}
                                                    alt={`${item.pizza?.type} Pizza`}
                                                    className="w-20 h-20 object-cover rounded-md"
                                                />
                                                <div className="flex-grow">
                                                    <h3 className="text-lg font-semibold text-gray-800">{item.pizza?.type} Pizza</h3>
                                                    <p className="text-gray-600">€{item.pizza?.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity === 1}
                                                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full"
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="font-semibold">{item.quantity}</span>
                                                    <Button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full"
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                <Button
                                                    onClick={() => removeFromCart(item.id)}
                                                    variant="destructive"
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-50 px-6 py-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="font-semibold">€{group.subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-gray-600">Delivery Fee:</span>
                                            <span className="font-semibold">€{group.restaurant.fee.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="md:col-span-1">
                            <OrderSummary groupedCart={groupedCart} total={total} showCheckoutButton={true} />
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    )
}

