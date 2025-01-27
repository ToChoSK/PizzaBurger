import type React from "react";
import { NavLink } from "react-router-dom";
import { UserCircle } from "lucide-react";
import {useCartCount} from "../hooks/useCartCount.ts"; // Importujte useCart

const Navbar: React.FC = () => {
    const cartItemsCount  = useCartCount(); // Získanie počtu položiek z hooku

    return (
        <nav className="bg-white shadow-md">
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
                            Cart ({cartItemsCount}) {/* Počet položiek sa tu automaticky aktualizuje */}
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
    );
};

export default Navbar;
