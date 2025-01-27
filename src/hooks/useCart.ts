import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface Pizza {
    id: number;
    type: string;
    price: number;
    image: string;
}

interface CartItem {
    id: number;
    pizza_id: number;
    quantity: number;
}

export function useCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = Cookies.get("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const addToCart = (pizza: Pizza) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.pizza_id === pizza.id);
            let updatedCart;
            if (existingItem) {
                updatedCart = prevItems.map((item) =>
                    item.pizza_id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCart = [...prevItems, { id: Date.now(), pizza_id: pizza.id, quantity: 1 }];
            }
            Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
            return updatedCart;
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((prevItems) => {
            const updatedCart = prevItems.filter((item) => item.id !== id);
            Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
            return updatedCart;
        });
    };

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems((prevItems) => {
            const updatedCart = prevItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
            Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
            return updatedCart;
        });
    };

    return { cartItems, addToCart, removeFromCart, updateQuantity };
}
