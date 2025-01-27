import { Hero } from "./Hero";
import { Footer } from "./Footer";
import Navbar from "./Navbar";
import { useCartCount } from "../hooks/useCartCount";

export default function App() {
    const cartItemsCount = useCartCount();

    return (
        <div className="min-h-screen bg-black">
            <Navbar cartItemsCount={cartItemsCount} />
            <Hero />
            <Footer />
        </div>
    );
}
