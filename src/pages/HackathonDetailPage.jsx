import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthStore } from '../store/authStore';
import { Calendar, MapPin, Users, Award, IndianRupee, ExternalLink } from 'lucide-react';

const HackathonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHackathon();
  }, [id]);

  const fetchHackathon = async () => {
    try {
      const docRef = doc(db, 'hackathons', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHackathon({ id: docSnap.id, ...docSnap.data() });
      }
    } catch (error) {
      console.error('Error fetching hackathon:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date.seconds * 1000).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleRegister = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    window.open(hackathon.registrationLink, '_blank');
  };

  if (loading) return <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center"><div className="text-white text-xl">Loading...</div></div>;
  if (!hackathon) return <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center"><div className="text-white text-xl">Hackathon not found</div></div>;

  return (
    <div className="min-h-screen bg-[#0A0E27] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E293B] rounded-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold text-white">{hackathon.title}</h1>
            {hackathon.mode === 'online' ? (
              <span className="px-4 py-2 bg-[#3B82F6] text-white rounded-full">Online</span>
            ) : (
              <span className="px-4 py-2 bg-[#10B981] text-white rounded-full">Offline</span>
            )}
          </div>
          <p className="text-gray-300 text-lg mb-8">{hackathon.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3 text-gray-300">
              <Calendar className="w-6 h-6 text-[#3B82F6]" />
              <div><span className="font-medium">Dates:</span> {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</div>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-6 h-6 text-[#10B981]" />
              <div><span className="font-medium">Location:</span> {hackathon.location}</div>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Users className="w-6 h-6 text-[#F59E0B]" />
              <div><span className="font-medium">Team Size:</span> {hackathon.teamSize.min}-{hackathon.teamSize.max} members</div>
            </div>
            {hackathon.prizes && (
              <div className="flex items-center gap-3 text-gray-300">
                <Award className="w-6 h-6 text-[#EF4444]" />
                <div><span className="font-medium">Prize Pool:</span> ₹{hackathon.prizes.total.toLocaleString('en-IN')}</div>
              </div>
            )}
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Themes</h2>
            <div className="flex flex-wrap gap-3">
              {hackathon.themes.map((theme, idx) => (
                <span key={idx} className="px-4 py-2 bg-[#334155] text-gray-300 rounded-lg">{theme}</span>
              ))}
            </div>
          </div>
          <button onClick={handleRegister} className="w-full md:w-auto px-8 py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-lg font-semibold rounded-lg transition flex items-center gap-2 justify-center">
            Register Now <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetailPage;
