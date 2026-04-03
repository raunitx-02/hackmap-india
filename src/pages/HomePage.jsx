import HeroSection from '../components/HeroSection';
import HackathonCard from '../components/HackathonCard';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const HomePage = () => {
  const [featuredHackathons, setFeaturedHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedHackathons();
  }, []);

  const fetchFeaturedHackathons = async () => {
    try {
      const q = query(
        collection(db, 'hackathons'),
        orderBy('startDate', 'desc'),
        limit(6)
      );
      const snapshot = await getDocs(q);
      const hackathons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeaturedHackathons(hackathons);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">Featured Hackathons</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#1E293B] rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-[#334155] rounded mb-4"></div>
                <div className="h-4 bg-[#334155] rounded mb-2"></div>
                <div className="h-4 bg-[#334155] rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHackathons.map(hackathon => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
