import { useState, useEffect } from "react"
import { Footer } from "./Footer"
import { ReviewModal } from "./ReviewModal"

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

export default function OrdersPage() {
    const [user, setUser] = useState<User | null>(null)
    const [orders, setOrders] = useState<Order[]>([])
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])
    const [pizzas, setPizzas] = useState<Pizza[]>([])
    const [reviews, setReviews] = useState<Review[]>([])
    const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItem | null>(null)
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

    useEffect(() => {
        // Get user from cookie
        const userCookie = document.cookie.split("; ").find((row) => row.startsWith("user="))
        if (userCookie) {
            setUser(JSON.parse(userCookie.split("=")[1]))
        }

        // Fetch orders
        fetch("/data/orders.json")
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error("Error fetching orders:", error))

        // Fetch order items
        fetch("/data/order_pizzas.json")
            .then((response) => response.json())
            .then((data) => setOrderItems(data))
            .catch((error) => console.error("Error fetching order items:", error))

        // Fetch pizzas
        fetch("/data/pizzas.json")
            .then((response) => response.json())
            .then((data) => setPizzas(data))
            .catch((error) => console.error("Error fetching pizzas:", error))

        // Fetch reviews
        fetch("/data/reviews.json")
            .then((response) => response.json())
            .then((data) => setReviews(data))
            .catch((error) => console.error("Error fetching reviews:", error))
    }, [])

    const userOrders = orders.filter((order) => order.user_id === user?.id)

    const handleReviewClick = (orderItem: OrderItem) => {
        setSelectedOrderItem(orderItem)
        setIsReviewModalOpen(true)
    }

    const handleReviewSubmit = (reviewData: Partial<Review>) => {
        // Here you would typically send this data to your backend
        console.log("Review submitted:", reviewData)
        setIsReviewModalOpen(false)
        // Optionally, update the local state to reflect the new review
        if (selectedOrderItem) {
            const updatedOrderItems = orderItems.map((item) =>
                item.id === selectedOrderItem.id ? { ...item, review_id: Date.now() } : item,
            )
            setOrderItems(updatedOrderItems)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Your Orders</h1>
                {user ? (
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">User Information</h2>
                        <p className="text-gray-600">
                            <strong className="text-gray-800">Name:</strong> {user.name}
                        </p>
                        <p className="text-gray-600">
                            <strong className="text-gray-800">Email:</strong> {user.email}
                        </p>
                        <p className="text-gray-600">
                            <strong className="text-gray-800">Address:</strong> {user.address}
                        </p>
                    </div>
                ) : (
                    <p className="text-red-500 mb-6 text-center">User information not found. Please log in.</p>
                )}
                {userOrders.length > 0 ? (
                    <div className="space-y-8">
                        {userOrders.map((order) => (
                            <div key={order.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Order #{order.id}</h3>
                                    <p className="text-gray-600 mb-4">
                                        Status:
                                        <span
                                            className={`ml-2 px-2 py-1 text-sm font-semibold rounded-full ${
                                                order.type === "FINISHED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                      {order.type}
                    </span>
                                    </p>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-700">Pizzas:</h4>
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {orderItems
                                            .filter((item) => item.order_id === order.id)
                                            .map((item) => {
                                                const pizza = pizzas.find((p) => p.id === item.pizza_id)
                                                const review = reviews.find((r) => r.order_pizza_id === item.id)
                                                return pizza ? (
                                                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex flex-col space-y-4">
                                                        <div className="flex items-start space-x-4">
                                                            <img
                                                                src={pizza.image || "/placeholder.svg"}
                                                                alt={pizza.type}
                                                                className="w-24 h-24 object-cover rounded-md"
                                                            />
                                                            <div>
                                                                <h5 className="text-lg font-semibold text-gray-800">{pizza.type}</h5>
                                                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                                <p className="text-gray-600">Price: ${pizza.price.toFixed(2)}</p>
                                                                <p className="text-gray-600">Rating: {pizza.rating.toFixed(1)}</p>
                                                            </div>
                                                        </div>
                                                        {review ? (
                                                            <div className="bg-blue-50 p-3 rounded-md">
                                                                <p className="text-sm font-semibold text-blue-800">Your Review:</p>
                                                                <p className="text-sm text-blue-600">Rating: {review.rating}/5</p>
                                                                <p className="text-sm text-blue-600">{review.content}</p>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleReviewClick(item)}
                                                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                                                            >
                                                                {item.review_id ? "Edit Review" : "Add Review"}
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : null
                                            })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center text-lg">No orders found for this user.</p>
                )}
            </main>
            <Footer />
            {isReviewModalOpen && selectedOrderItem && (
                <ReviewModal
                    orderItem={selectedOrderItem}
                    pizza={pizzas.find((p) => p.id === selectedOrderItem.pizza_id)}
                    onClose={() => setIsReviewModalOpen(false)}
                    onSubmit={handleReviewSubmit}
                />
            )}
        </div>
    )
}

