import { Link } from 'react-router-dom';
import { Search, MapPin, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#0A0E27] via-[#1E293B] to-[#0A0E27] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Discover <span className="text-[#3B82F6]">Hackathons</span>
            <br />
            Across India
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The most powerful platform to find hackathons, connect with teams, and build
            amazing projects. Better than Devfolio and Unstop combined.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/explore"
              className="px-8 py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg font-semibold flex items-center gap-2 justify-center transition"
            >
              <Search className="w-5 h-5" />
              Explore Hackathons
            </Link>
            <Link
              to="/teams"
              className="px-8 py-4 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg font-semibold flex items-center gap-2 justify-center transition"
            >
              <Users className="w-5 h-5" />
              Find Your Team
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-[#1E293B] p-6 rounded-lg">
              <div className="text-4xl font-bold text-[#3B82F6] mb-2">50+</div>
              <div className="text-gray-300">Active Hackathons</div>
            </div>
            <div className="bg-[#1E293B] p-6 rounded-lg">
              <div className="text-4xl font-bold text-[#10B981] mb-2">10K+</div>
              <div className="text-gray-300">Registered Users</div>
            </div>
            <div className="bg-[#1E293B] p-6 rounded-lg">
              <div className="text-4xl font-bold text-[#F59E0B] mb-2">28</div>
              <div className="text-gray-300">States Covered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
