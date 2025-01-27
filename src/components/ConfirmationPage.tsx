import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import { Footer } from "./Footer"
import { motion } from "framer-motion"

export default function ConfirmationPage() {
    const location = useLocation()
    const { formData } = location.state as { formData: any }
    const [deliveryStatus, setDeliveryStatus] = useState("Preparing")
    const [courierNumber, setCourierNumber] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")

    useEffect(() => {
        // Simulate changing delivery status
        const statusTimer = setTimeout(() => {
            setDeliveryStatus("On the way")
        }, 5000)

        // Generate random courier number
        setCourierNumber(Math.floor(1000 + Math.random() * 9000).toString())

        // Set a mock restaurant address
        setRestaurantAddress("123 Pizza Street, Pizzaville, 12345")

        return () => clearTimeout(statusTimer)
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Order Confirmation</h1>
                <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">Thank you for your order!</h2>
                        <p className="text-gray-600">Your delicious pizza is on its way.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="space-y-4"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Delivery Status:</span>
                            <span className="font-semibold text-green-600">{deliveryStatus}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Courier Number:</span>
                            <span className="font-semibold">{courierNumber}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Restaurant Address:</span>
                            <span className="font-semibold">{restaurantAddress}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Delivery Address:</span>
                            <span className="font-semibold">
                {formData.address}, {formData.city} {formData.zipCode}
              </span>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="mt-8"
                    >
                        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: deliveryStatus === "Preparing" ? "25%" : "50%" }}
                            ></div>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

