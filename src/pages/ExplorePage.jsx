import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import FilterBar from '../components/FilterBar';
import HackathonCard from '../components/HackathonCard';
import MapView from '../components/MapView';
import { Map, List } from 'lucide-react';

const ExplorePage = () => {
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'hackathons'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHackathons(data);
      setFilteredHackathons(data);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters) => {
    let filtered = [...hackathons];
    if (filters.searchTerm) {
      filtered = filtered.filter(h => 
        h.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    if (filters.mode && filters.mode !== 'all') {
      filtered = filtered.filter(h => h.mode === filters.mode);
    }
    if (filters.state) {
      filtered = filtered.filter(h => h.location.includes(filters.state));
    }
    setFilteredHackathons(filtered);
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Explore Hackathons</h1>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#3B82F6]' : 'bg-[#1E293B]'}`}>
              <List className="w-5 h-5 text-white" />
            </button>
            <button onClick={() => setViewMode('map')} className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-[#3B82F6]' : 'bg-[#1E293B]'}`}>
              <Map className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        <FilterBar onFilterChange={handleFilterChange} />
        {loading ? (
          <div className="text-white text-center py-12">Loading...</div>
        ) : viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.map(hackathon => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        ) : (
          <MapView hackathons={filteredHackathons} />
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
