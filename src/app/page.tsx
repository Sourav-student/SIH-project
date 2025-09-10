import Link from 'next/link';
import { MapPin, Book, ShoppingBag, Trash2 } from 'lucide-react';


export default function Page() {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl">🏛️</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Ujjain Kumbh 2028</h1>
            <p className="text-xl mb-8 text-orange-100">Your Complete Digital Guide to the Sacred Journey</p>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Experience the spiritual magnificence of Kumbh Mela with our comprehensive digital guide.
              Navigate with ease, explore sacred rituals, and discover local treasures.
            </p>
            <Link
             href='/galary'
             className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors">
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Explore Kumbh Mela</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link
            href='/navigation'
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Navigation & Maps</h3>
            <p className="text-gray-600">Find your way around with interactive maps and location guides</p>
          </Link>

          <Link
            href='/rituals'
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
              <Book className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Rituals & Heritage</h3>
            <p className="text-gray-600">Learn about sacred ceremonies and cultural traditions</p>
          </Link>

          <Link
            href='/marketplace'
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
              <ShoppingBag className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Local Marketplace</h3>
            <p className="text-gray-600">Discover authentic religious items and local crafts</p>
          </Link>

          <Link
            href='/cleanliness'
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
              <Trash2 className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cleanliness Initiative</h3>
            <p className="text-gray-600">Join our mission to keep the sacred grounds clean</p>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">50M+</div>
              <div className="text-orange-200">Expected Visitors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">12</div>
              <div className="text-orange-200">Sacred Bathing Days</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-orange-200">Cultural Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-orange-200">Digital Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}