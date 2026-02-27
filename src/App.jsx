import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnimatedBg from './components/AnimatedBg'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import FAQ from './pages/FAQ'
import Moments from './pages/Moments'
import EventTimeline from './pages/EventTimeline'
import JoinUs from './pages/JoinUs'
import Login from './pages/Login'
import Faculty from './pages/Faculty'
import Games from './pages/Games'
import Merch from './pages/Merch'
import WebTeam from './pages/WebTeam'
import Suggestions from './pages/Suggestions'
import Vlogs from './pages/Vlogs'
import Hackathon from './pages/Hackathon'


function App() {
  const location = useLocation()

  return (
    <>
      <div className="noise-overlay" />
      <div className="scanline" />
      <AnimatedBg />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/blogs" element={<PageTransition><Blogs /></PageTransition>} />
          <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
          <Route path="/moments" element={<PageTransition><Moments /></PageTransition>} />
          <Route path="/timeline" element={<PageTransition><EventTimeline /></PageTransition>} />
          <Route path="/join" element={<PageTransition><JoinUs /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/faculty" element={<PageTransition><Faculty /></PageTransition>} />
          <Route path="/games" element={<PageTransition><Games /></PageTransition>} />
          <Route path="/merch" element={<PageTransition><Merch /></PageTransition>} />
          <Route path="/web-team" element={<PageTransition><WebTeam /></PageTransition>} />
          <Route path="/suggestions" element={<PageTransition><Suggestions /></PageTransition>} />
          <Route path="/vlogs" element={<PageTransition><Vlogs /></PageTransition>} />
          <Route path="/hackathon" element={<PageTransition><Hackathon /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default App
