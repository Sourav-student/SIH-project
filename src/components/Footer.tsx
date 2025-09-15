import { Globe, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  
  return (
    <footer className="bg-gray-800 text-white pb-5">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm">🏛️</span>
              </div>
              <span className="font-bold text-lg">JharkhandTour</span>
            </div>
            <p className="text-gray-400">
              Your complete digital companion for the sacred Jharkhand tourism experience.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white">Home</li>
              <li className="hover:text-white">Navigation</li>
              <li className="hover:text-white">Rituals</li>
              <li className="hover:text-white">Marketplace</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +91 12345 67890</li>
              <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> info@jharkhandtour.gov.in</li>
              <li className="flex items-center"><Globe className="w-4 h-4 mr-2" /> www.jharkhandtour.gov.in</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Jharkhand Administration. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}