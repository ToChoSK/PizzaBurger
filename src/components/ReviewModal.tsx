import type React from "react"
import { useState } from "react"

interface ReviewModalProps {
    orderItem: {
        id: number
        pizza_id: number
        quantity: number
    }
    pizza:
        | {
        type: string
        image: string
    }
        | undefined
    onClose: () => void
    onSubmit: (reviewData: { rating: number; content: string }) => void
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ orderItem, pizza, onClose, onSubmit }) => {
    const [rating, setRating] = useState(5)
    const [content, setContent] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ rating, content })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Review Your Pizza</h2>
                    {pizza && (
                        <div className="flex items-center space-x-4 mb-4">
                            <img
                                src={pizza.image || "/placeholder.svg"}
                                alt={pizza.type}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800">{pizza.type}</h3>
                                <p className="text-gray-600">Quantity: {orderItem.quantity}</p>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                                Rating
                            </label>
                            <select
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value={1}>1 Star</option>
                                <option value={2}>2 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={5}>5 Stars</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                                Review
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows={4}
                                placeholder="Write your review here..."
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit Review
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

