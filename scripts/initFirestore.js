// Script to initialize Firestore with sample hackathon data
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleHackathons = [
  {
    name: 'Smart India Hackathon 2026',
    location: 'New Delhi, India',
    city: 'New Delhi',
    state: 'Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    date: '2026-08-15',
    endDate: '2026-08-17',
    mode: 'offline',
    prizes: {
      first: 100000,
      second: 50000,
      third: 25000,
      total: 175000
    },
    registrationFee: 0,
    teamSize: { min: 2, max: 6 },
    themes: ['AI/ML', 'IoT', 'Healthcare', 'Education', 'Agriculture'],
    description: 'India\'s biggest hackathon initiative to solve real-world problems using technology.',
    organizer: 'Ministry of Education, Govt. of India',
    website: 'https://sih.gov.in',
    status: 'upcoming',
    registrationDeadline: '2026-07-15',
    participantCount: 0,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    featured: true
  },
  {
    name: 'HackIITB 2026',
    location: 'IIT Bombay, Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra', 
    coordinates: { lat: 19.0760, lng: 72.8777 },
    date: '2026-09-20',
    endDate: '2026-09-22',
    mode: 'offline',
    prizes: {
      first: 75000,
      second: 40000,
      third: 20000,
      total: 135000
    },
    registrationFee: 500,
    teamSize: { min: 2, max: 4 },
    themes: ['Web3', 'Blockchain', 'DeFi', 'Smart Contracts'],
    description: 'Premier hackathon focused on blockchain and decentralized technologies.',
    organizer: 'IIT Bombay',
    website: 'https://hackiitb.in',
    status: 'upcoming',
    registrationDeadline: '2026-09-01',
    participantCount: 0,
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    featured: true
  },
  {
    name: 'DevFest Bangalore',
    location: 'Bangalore, Karnataka',
    city: 'Bangalore',
    state: 'Karnataka',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    date: '2026-10-05',
    endDate: '2026-10-06',
    mode: 'hybrid',
    prizes: {
      first: 50000,
      second: 30000,
      third: 15000,
      total: 95000
    },
    registrationFee: 300,
    teamSize: { min: 1, max: 5 },
    themes: ['Mobile Development', 'Cloud Computing', 'Android', 'Flutter'],
    description: 'Build innovative mobile and cloud solutions.',
    organizer: 'Google Developer Groups Bangalore',
    website: 'https://devfest.bangalore',
    status: 'upcoming',
    registrationDeadline: '2026-09-25',
    participantCount: 0,
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    featured: false
  },
  {
    name: 'ETHIndia 2026',
    location: 'Pune, Maharashtra',
    city: 'Pune',
    state: 'Maharashtra',
    coordinates: { lat: 18.5204, lng: 73.8567 },
    date: '2026-11-12',
    endDate: '2026-11-14',
    mode: 'offline',
    prizes: {
      first: 150000,
      second: 75000,
      third: 35000,
      total: 260000
    },
    registrationFee: 0,
    teamSize: { min: 2, max: 5 },
    themes: ['Ethereum', 'DeFi', 'NFT', 'Web3'],
    description: 'India\'s largest Ethereum hackathon for builders.',
    organizer: 'Devfolio',
    website: 'https://ethindia.co',
    status: 'upcoming',
    registrationDeadline: '2026-10-30',
    participantCount: 0,
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800',
    featured: true
  },
  {
    name: 'HackBVP',
    location: 'Bharati Vidyapeeth, Pune, Maharashtra',
    city: 'Pune',
    state: 'Maharashtra',
    coordinates: { lat: 18.4575, lng: 73.8530 },
    date: '2026-07-25',
    endDate: '2026-07-26',
    mode: 'offline',
    prizes: {
      first: 30000,
      second: 20000,
      third: 10000,
      total: 60000
    },
    registrationFee: 200,
    teamSize: { min: 2, max: 4 },
    themes: ['Open Innovation', 'FinTech', 'EdTech', 'HealthTech'],
    description: 'College hackathon for innovative solutions.',
    organizer: 'Bharati Vidyapeeth College of Engineering',
    website: 'https://hackbvp.in',
    status: 'upcoming',
    registrationDeadline: '2026-07-10',
    participantCount: 0,
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    featured: false
  }
];

async function initializeFirestore() {
  try {
    console.log('Starting Firestore initialization...');
    
    for (const hackathon of sampleHackathons) {
      const docRef = await addDoc(collection(db, 'hackathons'), {
        ...hackathon,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log(`Added hackathon: ${hackathon.name} with ID: ${docRef.id}`);
    }
    
    console.log('✅ Firestore initialization completed successfully!');
    console.log(`Added ${sampleHackathons.length} hackathons to the database.`);
    process.exit(0);
  } catch (error) {
    console.error('Error initializing Firestore:', error);
    process.exit(1);
  }
}

initializeFirestore();
