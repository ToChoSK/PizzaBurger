import type React from "react"

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

interface OrderDetailsProps {
  order: Order
  orderItems: OrderItem[]
  onClose: () => void
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, orderItems, onClose }) => {
  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Order #{order.id} Details</h2>
              <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      order.type === "FINISHED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
              >
              {order.type}
            </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Pizzas:</h3>
            <div className="max-h-[60vh] overflow-y-auto">
              <ul className="space-y-2">
                {orderItems.map((item) => (
                    <li key={item.id} className="bg-gray-50 rounded p-2">
                      <p className="font-medium">Pizza #{item.pizza_id}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      {item.review_id && <p className="text-sm text-blue-600">Review submitted</p>}
                    </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
            <button
                onClick={onClose}
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
  )
}

export default OrderDetails

