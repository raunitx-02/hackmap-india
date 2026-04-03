import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ hackathons }) => {
  const center = [20.5937, 78.9629]; // India center

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden">
      <MapContainer center={center} zoom={5} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hackathons.map((hackathon) => (
          <Marker
            key={hackathon.id}
            position={[hackathon.coordinates.lat, hackathon.coordinates.lng]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold mb-1">{hackathon.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{hackathon.location}</p>
                <a
                  href={`/hackathon/${hackathon.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Details →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
