import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, IndianRupee, Award } from 'lucide-react';

const HackathonCard = ({ hackathon }) => {
  const formatDate = (date) => {
    return new Date(date.seconds * 1000).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysLeft = () => {
    const eventDate = new Date(hackathon.startDate.seconds * 1000);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <Link to={`/hackathon/${hackathon.id}`}>
      <div className="bg-[#1E293B] rounded-lg p-6 hover:bg-[#2D3748] transition cursor-pointer border border-[#334155]">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{hackathon.title}</h3>
          {hackathon.mode === 'online' ? (
            <span className="px-3 py-1 bg-[#3B82F6] text-white text-xs rounded-full">
              Online
            </span>
          ) : (
            <span className="px-3 py-1 bg-[#10B981] text-white text-xs rounded-full">
              Offline
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {hackathon.description}
        </p>

        {/* Info Grid */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Calendar className="w-4 h-4 text-[#3B82F6]" />
            <span>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <MapPin className="w-4 h-4 text-[#10B981]" />
            <span>{hackathon.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Users className="w-4 h-4 text-[#F59E0B]" />
            <span>{hackathon.teamSize.min}-{hackathon.teamSize.max} members per team</span>
          </div>
          {hackathon.prizes && (
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Award className="w-4 h-4 text-[#EF4444]" />
              <span>Prize Pool: ₹{hackathon.prizes.total.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hackathon.themes.slice(0, 3).map((theme, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-[#334155] text-gray-300 text-xs rounded"
            >
              {theme}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#334155]">
          <span className="text-sm text-gray-400">
            {getDaysLeft() === 0 ? 'Happening now!' : `${getDaysLeft()} days left`}
          </span>
          <button className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm rounded-lg transition">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HackathonCard;
