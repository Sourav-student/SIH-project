import Link from "next/link";

export default function CleanlinesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Cleanliness & Environmental Awareness</h1>

        {/* Hero Section */}
        <div className="bg-green-500 text-white rounded-xl flex max-md:flex-col gap-3 justify-between items-center p-8 mb-8">
          <div className="max-md:w-full w-[480px] h-full shadow-lg rounded-md overflow-hidden">
            <video
              src="/galary/clean_India.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h2 className="text-2xl font-bold mb-4">Keep Our Sacred Grounds Clean</h2>
            <p className="text-lg text-green-100 mb-6">
              Join millions of devotees in maintaining the sanctity and cleanliness of our sacred spaces
            </p>
            <Link
              href='/cleanlines/initiative'
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 cursor-pointer">
              Join the Initiative
            </Link>
          </div>
        </div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🗑️</div>
            <h3 className="text-xl font-semibold mb-3">Waste Management</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Use designated dustbins</li>
              <li>• Separate biodegradable waste</li>
              <li>• Avoid single-use plastics</li>
              <li>• Report overflowing bins</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">💧</div>
            <h3 className="text-xl font-semibold mb-3">Water Conservation</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Use water mindfully during rituals</li>
              <li>• Report water leaks immediately</li>
              <li>• Do not waste drinking water</li>
              <li>• Use eco-friendly soaps only</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🚯</div>
            <h3 className="text-xl font-semibold mb-3">Sacred Space Respect</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• No littering in river areas</li>
              <li>• Respect designated pathways</li>
              <li>• Keep noise levels appropriate</li>
              <li>• Follow smoking restrictions</li>
            </ul>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-8">Our Environmental Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Waste Recycled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50M</div>
              <div className="text-gray-600">Liters Water Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Volunteer Cleaners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">Zero</div>
              <div className="text-gray-600">Plastic Waste Goal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}