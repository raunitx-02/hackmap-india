import { create } from 'zustand'
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  
  setUser: (user) => set({ user, loading: false }),
  
  signInWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      
      // Create/update user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      }, { merge: true })
      
      toast.success('Signed in successfully!')
    } catch (error) {
      console.error('Google sign-in error:', error)
      toast.error('Sign-in failed. Please try again.')
    }
  },
  
  signInWithGithub: async () => {
    try {
      const provider = new GithubAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      }, { merge: true })
      
      toast.success('Signed in successfully!')
    } catch (error) {
      console.error('GitHub sign-in error:', error)
      toast.error('Sign-in failed. Please try again.')
    }
  },
  
  logout: async () => {
    try {
      await signOut(auth)
      set({ user: null })
      toast.success('Signed out successfully!')
    } catch (error) {
      console.error('Sign-out error:', error)
      toast.error('Sign-out failed.')
    }
  },
}))
