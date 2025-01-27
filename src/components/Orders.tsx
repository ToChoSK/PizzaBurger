import type React from "react"
import { useState, useEffect } from "react"
import OrderDetails from "./OrderDetails"
import {ReviewModal} from "./ReviewModal"
import Navbar from "./Navbar.tsx";

interface User {
    id: number
    name: string
    email: string
    address: string
}

interface Order {
    id: number
    user_id: number
    type: "FINISHED" | "PROCESSING"
    timestamp: string
}

interface OrderItem {
    id: number
    order_id: number
    pizza_id: number
    quantity: number
    review_id: number | null
}

interface Pizza {
    id: number
    restaurant_id: number
    type: string
    price: number
    image: string
    rating: number
}

interface Review {
    id: number
    user_id: number
    pizza_id: number
    order_pizza_id: number
    rating: number
    content: string
}

const Orders: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [orders, setOrders] = useState<Order[]>([])
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])
    const [pizzas, setPizzas] = useState<Pizza[]>([])
    const [reviews, setReviews] = useState<Review[]>([])
    const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItem | null>(null)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

    useEffect(() => {
        // Get user from cookie
        const userCookie = document.cookie.split("; ").find((row) => row.startsWith("user="))
        if (userCookie) {
            setUser(JSON.parse(userCookie.split("=")[1]))
        }

        // Fetch data
        Promise.all([
            fetch("/data/orders.json"),
            fetch("/data/order_pizzas.json"),
            fetch("/data/pizzas.json"),
            fetch("/data/reviews.json"),
        ])
            .then(async ([ordersRes, itemsRes, pizzasRes, reviewsRes]) => {
                const [ordersData, itemsData, pizzasData, reviewsData] = await Promise.all([
                    ordersRes.json(),
                    itemsRes.json(),
                    pizzasRes.json(),
                    reviewsRes.json(),
                ])
                setOrders(ordersData)
                setOrderItems(itemsData)
                setPizzas(pizzasData)
                setReviews(reviewsData)
            })
            .catch((error) => console.error("Error fetching data:", error))
    }, [])

    const userOrders = orders
        .filter((order) => order.user_id === user?.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    const handleReviewClick = (orderItem: OrderItem) => {
        setSelectedOrderItem(orderItem)
        setIsReviewModalOpen(true)
    }

    const handleReviewSubmit = (reviewData: Partial<Review>) => {
        console.log("Review submitted:", reviewData)
        setIsReviewModalOpen(false)
        if (selectedOrderItem) {
            setOrderItems((items) =>
                items.map((item) => (item.id === selectedOrderItem.id ? { ...item, review_id: Date.now() } : item)),
            )
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar/>
        <div className="min-h-screen flex flex-col bg-gray-100">
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
                    {user ? (
                        <div className="space-y-2">
                            <p>
                                <span className="font-medium">Name:</span> {user.name}
                            </p>
                            <p>
                                <span className="font-medium">Email:</span> {user.email}
                            </p>
                            <p>
                                <span className="font-medium">Address:</span> {user.address}
                            </p>
                        </div>
                    ) : (
                        <p className="text-red-500">Please log in to view your orders.</p>
                    )}
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="max-h-[600px] overflow-y-auto">
                        {userOrders.length > 0 ? (
                            <div className="divide-y divide-gray-200">
                                {userOrders.map((order) => (
                                    <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                                            <span
                                                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                                    order.type === "FINISHED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                        {order.type}
                      </span>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {orderItems
                                                .filter((item) => item.order_id === order.id)
                                                .map((item) => {
                                                    const pizza = pizzas.find((p) => p.id === item.pizza_id)
                                                    const review = reviews.find((r) => r.order_pizza_id === item.id)
                                                    return pizza ? (
                                                        <div key={item.id} className="border rounded-lg p-4 space-y-3">
                                                            <div className="flex items-start gap-4">
                                                                <img
                                                                    src={pizza.image || "/placeholder.svg"}
                                                                    alt={pizza.type}
                                                                    className="w-20 h-20 object-cover rounded-md"
                                                                />
                                                                <div>
                                                                    <h5 className="font-semibold">{pizza.type}</h5>
                                                                    <p className="text-sm text-gray-600">
                                                                        Qty: {item.quantity} × ${pizza.price.toFixed(2)}
                                                                    </p>
                                                                    <p className="text-sm text-gray-600">Rating: {pizza.rating.toFixed(1)}★</p>
                                                                </div>
                                                            </div>
                                                            {review ? (
                                                                <div className="bg-blue-50 rounded-md p-3">
                                                                    <p className="text-sm font-medium">Your Review</p>
                                                                    <p className="text-sm">Rating: {review.rating}★</p>
                                                                    <p className="text-sm text-gray-600">{review.content}</p>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleReviewClick(item)}
                                                                    className="text-sm text-blue-600 hover:underline"
                                                                >
                                                                    {item.review_id ? "Edit Review" : "Add Review"}
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : null
                                                })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500">No orders found for this user.</div>
                        )}
                    </div>
                </div>
            </main>

            {selectedOrder && (
                <OrderDetails
                    order={selectedOrder}
                    orderItems={orderItems.filter((item) => item.order_id === selectedOrder.id)}
                    onClose={() => setSelectedOrder(null)}
                />
            )}

            {isReviewModalOpen && selectedOrderItem && (
                <ReviewModal
                    orderItem={selectedOrderItem}
                    pizza={pizzas.find((p) => p.id === selectedOrderItem.pizza_id)}
                    onClose={() => setIsReviewModalOpen(false)}
                    onSubmit={handleReviewSubmit}
                />
            )}
        </div>
        </div>
    )
}

export default Orders

