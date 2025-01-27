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

interface User {
    id: number
    name: string
    email: string
    password: string
    address: string
}

interface Pizza {
    id: number
    restaurant_id: number
    type: "HAM" | "CHEESE" | "EXTRA" | "VEGETARIAN"
    price: number
    image: string
    rating: number
}

interface Restaurant {
    id: number
    name: string
    fee: number
    address: string
}

interface CartItem {
    id: number;
    pizza_id: number;
    quantity: number;
}

interface GroupedCart {
    restaurant: Restaurant;
    items: (CartItem & { pizza?: Pizza })[]; // Items with an optional Pizza field
    subtotal: number;
}
