"use client";

const marketplaceItems = [
  { id: 1, name: "Complete Puja Thali Set", price: 750, image: "🏺", category: "Religious Items", rating: 4.8 },
  { id: 2, name: "Sacred Rudraksha Mala", price: 1200, image: "📿", category: "Jewelry", rating: 4.9 },
  { id: 3, name: "Holy Water Kalash", price: 500, image: "⚱️", category: "Religious Items", rating: 4.7 },
  { id: 4, name: "Spiritual Books Collection", price: 800, image: "📚", category: "Books", rating: 4.6 }
];

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Header + Filters */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Local Marketplace
          </h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base">
              <option>All Categories</option>
              <option>Religious Items</option>
              <option>Jewelry</option>
              <option>Books</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {marketplaceItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <div className="h-40 sm:h-48 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl">{item.image}</span>
              </div>
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{item.name}</h3>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 text-sm sm:text-base">
                    {"★".repeat(Math.floor(item.rating))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 ml-1">({item.rating})</span>
                </div>
                <div className="mt-auto">
                  <span className="text-lg sm:text-xl font-bold text-orange-600">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vendor Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Verified Local Vendors</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            All marketplace vendors are verified and approved by the Kumbh Mela administration.
            Shop with confidence knowing you are getting authentic products at fair prices.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-green-600 font-semibold text-sm sm:text-base">✓ Verified Sellers</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-semibold text-sm sm:text-base">💳 Secure Payments</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-purple-600 font-semibold text-sm sm:text-base">🚚 Same Day Delivery</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}