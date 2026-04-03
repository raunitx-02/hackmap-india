import { create } from 'zustand';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const useHackathonStore = create((set, get) => ({
  hackathons: [],
  currentHackathon: null,
  loading: false,
  error: null,

  fetchHackathons: async () => {
    set({ loading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, 'hackathons'));
      const hackathons = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      set({ hackathons, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchHackathonById: async (id) => {
    set({ loading: true, error: null });
    try {
      const docRef = doc(db, 'hackathons', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ currentHackathon: { id: docSnap.id, ...docSnap.data() }, loading: false });
      } else {
        set({ error: 'Hackathon not found', loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addHackathon: async (hackathon) => {
    set({ loading: true, error: null });
    try {
      const docRef = await addDoc(collection(db, 'hackathons'), {
        ...hackathon,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      const newHackathon = { id: docRef.id, ...hackathon };
      set((state) => ({ 
        hackathons: [...state.hackathons, newHackathon],
        loading: false 
      }));
      return docRef.id;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateHackathon: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const docRef = doc(db, 'hackathons', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      set((state) => ({
        hackathons: state.hackathons.map(h => 
          h.id === id ? { ...h, ...updates } : h
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteHackathon: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteDoc(doc(db, 'hackathons', id));
      set((state) => ({
        hackathons: state.hackathons.filter(h => h.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  registerForHackathon: async (hackathonId, userId, teamData) => {
    set({ loading: true, error: null });
    try {
      await addDoc(collection(db, 'registrations'), {
        hackathonId,
        userId,
        ...teamData,
        registeredAt: new Date().toISOString()
      });
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  searchHackathons: async (searchTerm) => {
    set({ loading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, 'hackathons'));
      const hackathons = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(h => 
          h.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.themes?.some(theme => theme.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      set({ hackathons, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useHackathonStore;
