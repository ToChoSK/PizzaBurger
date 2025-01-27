import { Hero } from "./Hero";
import { Footer } from "./Footer";
import Navbar from "./Navbar";

export default function App() {

    return (
        <div className="min-h-screen bg-black">
            <Navbar/>
            <Hero />
            <Footer />
        </div>
    );
}
