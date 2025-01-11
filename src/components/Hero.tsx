import { Button } from "./ui/Button.tsx"

export function Hero() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Burger Section */}
            <div
                className="relative h-[50vh] md:h-screen bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DcAmrrULhP3GXnihAqJ8nbhMoqIfnD.png")',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            >
                <div className="text-center z-10">
                    <h2 className="text-7xl font-bold text-white mb-8 tracking-wider">BURGER</h2>
                    <Button
                        size="lg"
                        className="bg-red-700 hover:bg-red-800 text-white px-12 py-6 text-xl rounded-none"
                    >
                        ORDER
                    </Button>
                </div>
            </div>

            {/* Pizza Section */}
            <div
                className="relative h-[50vh] md:h-screen bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ndOa79mMC887uMt7z6rMIQ638HfzzK.png")',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            >
                <div className="text-center z-10">
                    <h2 className="text-7xl font-bold text-white mb-8 tracking-wider">PIZZA</h2>
                    <Button
                        size="lg"
                        className="bg-red-700 hover:bg-red-800 text-white px-12 py-6 text-xl rounded-none"
                    >
                        ORDER
                    </Button>
                </div>
            </div>
        </div>
    )
}
