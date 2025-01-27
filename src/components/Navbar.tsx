import { forwardRef } from "react"
import { NavLink } from "react-router-dom"
import { UserCircle, ShoppingCart } from "lucide-react"
import { useCartCount } from "../hooks/useCartCount.ts"
import { motion } from "framer-motion"

const Navbar = forwardRef<HTMLDivElement, { cartItemsCount: number }>((_, ref) => {
    const cartItemsCount = useCartCount()

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50" ref={ref}>
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold text-gray-700">
                        <NavLink to="/" className="text-blue-600 hover:text-blue-800 transition duration-300">
                            PizzaPlace
                        </NavLink>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-gray-600 hover:text-blue-600 transition duration-300 ${isActive ? "font-semibold" : ""}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/pizzas"
                            className={({ isActive }) =>
                                `text-gray-600 hover:text-blue-600 transition duration-300 ${isActive ? "font-semibold" : ""}`
                            }
                        >
                            Pizzas
                        </NavLink>
                        <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                                `text-gray-600 hover:text-blue-600 transition duration-300 ${isActive ? "font-semibold" : ""}`
                            }
                        >
                            <div className="relative">
                                <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors duration-300" />
                                <motion.div
                                    key={cartItemsCount}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                                >
                                    {cartItemsCount}
                                </motion.div>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `text-gray-600 hover:text-blue-600 transition duration-300 ${isActive ? "font-semibold" : ""}`
                            }
                        >
                            <UserCircle className="w-6 h-6" />
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
})

Navbar.displayName = "Navbar"

export default Navbar

