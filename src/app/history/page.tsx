export default function History() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-teal-800 mb-8">
          📖 History of <span className="text-orange-600">Maha Kumbh Mela</span>
        </h1>

        {/* Intro Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <p className="text-gray-700 text-lg leading-relaxed">
            The <b>Maha Kumbh Mela</b> is the world’s largest spiritual gathering, held once every 12 years
            at one of the four sacred sites: <span className="font-semibold">Prayagraj, Haridwar, Ujjain,</span> 
            and <span className="font-semibold">Nashik</span>. Rooted in ancient mythology, the Mela is 
            celebrated where drops of the divine nectar of immortality (<i>Amrit</i>) fell during the celestial 
            battle between Devas (gods) and Asuras (demons).
          </p>
        </div>

        {/* Mythology Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            🌌 Mythological Significance
          </h2>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl shadow-md">
            <p className="text-gray-700 leading-relaxed">
              According to legend, during the <b>Samudra Manthan</b> (churning of the cosmic ocean),
              the gods and demons fought over the pot of nectar. Lord Vishnu, disguised as <b>Mohini</b>,
              carried the pot, and drops of nectar fell at four locations—these became the sites of the 
              sacred Kumbh Mela. Bathing in the holy rivers during the Mela is believed to cleanse sins 
              and lead to <b>Moksha</b> (liberation).
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-orange-700 mb-6">
            📅 Historical Timeline
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <p><b>Ancient Era:</b> References to ritual bathing during auspicious times are found in the <i>Rigveda</i> and <i>Puranas</i>.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <p><b>Medieval Period:</b> Chinese traveler Xuanzang (7th century) described large bathing festivals in India.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <p><b>Modern Times:</b> The British documented the scale of the Mela, noting millions of pilgrims gathering in unity.</p>
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            ✨ Interesting Facts
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>The Maha Kumbh at Prayagraj in 2013 attracted over <b>120 million people</b>—making it the largest human gathering in history.</li>
            <li>It is recognized by <b>UNESCO</b> as an “Intangible Cultural Heritage of Humanity.”</li>
            <li>Astronomical calculations decide the exact dates based on the positions of the <b>Sun, Moon, and Jupiter</b>.</li>
            <li>The holy dip (<b>Shahi Snan</b>) is the central ritual, led by revered saints and akharas.</li>
          </ul>
        </div>

        {/* Closing Section */}
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-2xl shadow-md text-center">
          <p className="text-lg text-gray-800">
            The <b>Maha Kumbh Mela</b> is not just a festival—it is a confluence of <span className="text-teal-700 font-semibold">faith, tradition, culture, and unity</span>, 
            connecting millions of people across the world in a single spiritual journey.
          </p>
        </div>
      </div>
    </div>
  );
}
