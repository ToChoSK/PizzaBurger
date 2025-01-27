import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { StarRating } from "./ui/StarRating"
import { Button } from "./ui/Button"
import { Store, ChevronRight } from "lucide-react"

interface PizzaCardProps {
    pizza: Pizza
    showRestaurant?: boolean
    getRestaurantName?: (id: number) => string
    onAddToCart: (pizza: Pizza) => void
    addedPizzaId: number | null
}

const PizzaCard: React.FC<PizzaCardProps> = ({
                                                 pizza,
                                                 showRestaurant = true,
                                                 getRestaurantName,
                                                 onAddToCart,
                                                 addedPizzaId,
                                             }) => {
    return (
        <motion.div
            className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative">
                <img src={pizza.image || "/placeholder.svg"} alt={`${pizza.type} Pizza`} className="w-full h-56 object-cover" />
                <div className="absolute top-0 right-0 bg-white px-3 py-1 m-3 rounded-full shadow-md">
                    <StarRating rating={pizza.rating} />
                </div>
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{pizza.type} Pizza</h2>
                {showRestaurant && getRestaurantName && (
                    <Link
                        to={`/restaurant/${pizza.restaurant_id}`}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center mb-4"
                    >
                        <Store className="w-4 h-4 mr-1" />
                        {getRestaurantName(pizza.restaurant_id)}
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                )}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-2xl font-bold text-green-600">€{pizza.price.toFixed(2)}</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={() => onAddToCart(pizza)}
                            className={`px-6 py-2 rounded-full text-sm font-medium ${
                                addedPizzaId === pizza.id ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                        >
                            {addedPizzaId === pizza.id ? "Added!" : "Add to Cart"}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default PizzaCard

