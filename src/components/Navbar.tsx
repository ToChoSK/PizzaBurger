import { Button } from "./ui/Button.tsx"
import { MapPin, User } from 'lucide-react'
import {useNavigate} from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DifXxkuAUoZhUNqFxRuD52QSFyfxGT.png"
                  alt="PizzaBurger Logo"
                  className="h-12 w-12 cursor-pointer" // Kurzot ukazuje možnosť kliknutia
                  onClick={() => navigate('/')} // Navigácia na Home Page
              />
              <div className="hidden md:flex items-center gap-6">
                <Button variant="link" className="text-white hover:text-white/80"
                        onClick={() => navigate('/')} // Navigácia na /pizzas
                >HOME</Button>
                <Button variant="link" className="text-white hover:text-white/80">LAST ORDERS</Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden md:inline">current location</span>
              </Button>
              <Button variant="ghost" className="text-white">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
  )
}

