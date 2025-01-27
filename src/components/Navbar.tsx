import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { UserCircle, ShoppingCart, ClipboardList } from "lucide-react"
import { useCartCount } from "../hooks/useCartCount"

const Navbar: React.FC = () => {
    const cartItemsCount = useCartCount()
    const location = useLocation()

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GLlqUp7sVT9SCCkh3JK95ABSXWuir1.png"
                                alt="PizzaBurger Logo"
                                className="w-10 h-10 rounded"
                            />
                            <span className="hidden font-bold text-xl sm:inline-block">PizzaBurger</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === "/" ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/pizzas"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === "/pizzas" ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Pizzas
                        </Link>
                        <Link
                            to="/orders"
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === "/orders" ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            <ClipboardList className="w-4 h-4 mr-2" />
                            Last Orders
                        </Link>
                        <Link
                            to="/cart"
                            className={`relative px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === "/cart" ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
                            )}
                        </Link>
                        <Link
                            to="/profile"
                            className={`p-1 rounded-full ${
                                location.pathname === "/profile" ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            <UserCircle className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

