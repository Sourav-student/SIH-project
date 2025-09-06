import Link from "next/link";

const rituals = [
  {
    id: 1,
    title: "The Holy Dip (Shahi Snan)",
    description: "Experience the sacred ritual of bathing in the holy waters during the most auspicious moments of Kumbh Mela.",
    image: "🏊‍♂️",
    duration: "45 mins",
    timing: "4:00 AM - 10:00 AM"
  },
  {
    id: 2,
    title: "The Grand Aarti",
    description: "Witness the magnificent evening aarti ceremony with thousands of devotees participating in this spiritual celebration.",
    image: "🕉️",
    duration: "30 mins",
    timing: "6:00 PM - 7:00 PM"
  },
  {
    id: 3,
    title: "Spiritual Discourse",
    description: "Listen to renowned saints and spiritual leaders sharing ancient wisdom and teachings.",
    image: "📿",
    duration: "60 mins",
    timing: "8:00 AM - 9:00 AM"
  }
];


export default function Rituals() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Sacred Rituals & Heritage</h1>

        {/* Featured Video */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured: The Sacred Journey</h2>
          <div className="relative bg-gradient-to-br from-orange-200 to-red-200 rounded-lg overflow-hidden">
            <div className="aspect-video flex items-center justify-center">
              <iframe
                className="w-full h-full rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/7NmM1iVumnU?si=qRMil9l_muQGbxR2"
                title="Ujjain History Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          {/* history of mahakumbh */}
          <div className="mt-10 flex justify-between items-center bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl shadow-md">
            <p className="text-xl text-gray-800">
              Know the <span className="font-semibold text-orange-700">History of Maha Kumbh</span>
            </p>
            <Link href='/history' className="px-6 py-2 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700 transition cursor-pointer">
              Explore
            </Link>
          </div>
        </div>

        {/* Rituals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rituals.map((ritual) => (
            <div key={ritual.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                <span className="text-6xl">{ritual.image}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{ritual.title}</h3>
                <p className="text-gray-600 mb-4">{ritual.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>⏱️ {ritual.duration}</span>
                  <span>🕐 {ritual.timing}</span>
                </div>
                <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Daily Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="font-semibold text-orange-600 mb-1">4:00 AM</div>
              <div className="text-sm">Morning Prayers</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="font-semibold text-orange-600 mb-1">6:00 AM</div>
              <div className="text-sm">Sacred Bath</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="font-semibold text-orange-600 mb-1">12:00 PM</div>
              <div className="text-sm">Spiritual Discourse</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="font-semibold text-orange-600 mb-1">6:00 PM</div>
              <div className="text-sm">Evening Aarti</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}