import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'

const Home = lazy(() => import('./pages/HomePage'))
const Discover = lazy(() => import('./pages/ExplorePage'))
const HackathonDetail = lazy(() => import('./pages/HackathonDetailPage'))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccessPage'))

function App() {
  const { setUser } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [setUser])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0D0D1A] text-[#F1F0F5] font-body">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#13131F',
              color: '#F1F0F5',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            },
          }}
        />
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/hackathon/:id" element={<HackathonDetail />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
