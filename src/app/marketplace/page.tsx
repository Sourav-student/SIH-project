const marketplaceItems = [
  { id: 1, name: "Complete Puja Thali Set", price: 750, image: "🏺", category: "Religious Items", rating: 4.8 },
  { id: 2, name: "Sacred Rudraksha Mala", price: 1200, image: "📿", category: "Jewelry", rating: 4.9 },
  { id: 3, name: "Holy Water Kalash", price: 500, image: "⚱️", category: "Religious Items", rating: 4.7 },
  { id: 4, name: "Spiritual Books Collection", price: 800, image: "📚", category: "Books", rating: 4.6 }
];

export default function marketplace() {

  // const [cartItems, setCartItems] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Local Marketplace</h1>
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2">
              <option>All Categories</option>
              <option>Religious Items</option>
              <option>Jewelry</option>
              <option>Books</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketplaceItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                <span className="text-6xl">{item.image}</span>
              </div>
              <div className="p-6">
                <div className="text-xs text-gray-500 mb-2">{item.category}</div>
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(item.rating))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">({item.rating})</span>
                </div>
                {/* <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-600">₹{item.price}</span>
                  <button
                    onClick={() => setCartItems([...cartItems, item])}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Vendor Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Verified Local Vendors</h2>
          <p className="text-gray-600 mb-4">
            All marketplace vendors are verified and approved by the Kumbh Mela administration.
            Shop with confidence knowing you are getting authentic products at fair prices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-green-600 font-semibold">✓ Verified Sellers</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-semibold">💳 Secure Payments</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-purple-600 font-semibold">🚚 Same Day Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}