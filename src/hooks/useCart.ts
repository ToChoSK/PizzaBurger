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
    pizza?: Pizza; // Voliteľná vlastnosť pre dynamické priradenie
}

export function useCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const storedCart = Cookies.get("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Aktualizácia celkovej sumy vždy, keď sa zmení `cartItems`
    useEffect(() => {
        const newTotal = cartItems.reduce(
            (sum, item) => sum + item.quantity * (item.pizza?.price || 0),
            0
        );
        setTotal(newTotal);
    }, [cartItems]);

    const addToCart = (pizza: Pizza) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.pizza_id === pizza.id);
            let updatedCart;
            if (existingItem) {
                updatedCart = prevItems.map((item) =>
                    item.pizza_id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCart = [
                    ...prevItems,
                    { id: Date.now(), pizza_id: pizza.id, quantity: 1, pizza },
                ];
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

    return { cartItems, total, addToCart, removeFromCart, updateQuantity };
}
