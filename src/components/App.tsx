import { Navbar } from "./Navbar"
import { Hero } from "./Hero"
import { Footer } from "./Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}

