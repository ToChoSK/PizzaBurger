export function Footer() {
  return (
      <footer className="bg-white py-12 relative">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Dapibus duis inceptos euismod; sapien mauris phasellus augue. Vivamus libero justo blandit; nunc non non.
          </p>
          <div className="flex items-center justify-center gap-4 text-2xl font-bold text-gray-900">
            <span>123456789</span>
            <span className="text-red-700">:</span>
            <span>123456789</span>
          </div>
        </div>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ddgmb74bkFKAbMPrpowcw1qUMI2sh9.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)'
          }} />
        </div>
      </footer>
  )
}

