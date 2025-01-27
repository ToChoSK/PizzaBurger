import type React from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/Button"

interface OrderSummaryProps {
    groupedCart: GroupedCart[]
    total: number
    showCheckoutButton?: boolean
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ groupedCart, total, showCheckoutButton = false }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
            <div className="space-y-2 mb-4">
                {groupedCart.map((group) => (
                    <div key={group.restaurant.id} className="flex justify-between">
                        <span className="text-gray-600">{group.restaurant.name}</span>
                        <span className="font-semibold">€{(group.subtotal + group.restaurant.fee).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-green-600">€{total.toFixed(2)}</span>
                </div>
            </div>
            {showCheckoutButton && (
                <Link to="/checkout">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300">
                        Proceed to Checkout
                    </Button>
                </Link>
            )}
        </div>
    )
}

export default OrderSummary

