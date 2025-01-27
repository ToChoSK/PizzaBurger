import { useState, useEffect } from "react"
import Cookies from "js-cookie"

export function useCartCount() {
    const [cartItemsCount, setCartItemsCount] = useState(0)

    useEffect(() => {
        const updateCartCount = () => {
            const storedCart = Cookies.get("cart")
            if (storedCart) {
                const cartItems = JSON.parse(storedCart)
                const count = cartItems.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)
                setCartItemsCount(count)
            } else {
                setCartItemsCount(0)
            }
        }

        updateCartCount()

        // Listen for changes to the cart cookie
        const intervalId = setInterval(updateCartCount, 1000)

        return () => clearInterval(intervalId)
    }, [])

    return cartItemsCount
}

