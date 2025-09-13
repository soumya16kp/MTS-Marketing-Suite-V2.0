import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3">
            <img src="/mts-logo.png" alt="MTS Logo" className="w-12 h-12" />
            <div>
              <span className="font-montserrat font-bold text-2xl text-gray-900">MTS</span>
              <p className="text-sm text-gray-600">All-in-One Digital Marketing</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-green-600">
            404
          </h1>
          <h2 className="text-3xl font-montserrat font-bold text-gray-900">Oops! Page Not Found</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the digital void. Don't worry, even the best SEO
            can't find everything!
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">What can you do?</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="space-y-2">
              <Search className="w-6 h-6 text-purple-600 mx-auto" />
              <p>Check the URL for typos</p>
            </div>
            <div className="space-y-2">
              <Home className="w-6 h-6 text-green-600 mx-auto" />
              <p>Return to homepage</p>
            </div>
            <div className="space-y-2">
              <ArrowLeft className="w-6 h-6 text-purple-600 mx-auto" />
              <p>Go back to previous page</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-gray-300 hover:bg-gray-50 bg-transparent">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>

        <div className="text-sm text-gray-500 italic">
          "In the world of digital marketing, every 404 is just a redirect waiting to happen."
        </div>
      </div>
    </div>
  )
}
