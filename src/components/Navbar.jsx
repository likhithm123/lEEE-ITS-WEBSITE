import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
    const { user, logout } = useAuth()
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
        setShowDropdown(false)
    }, [location])

    const firstName = user?.name?.split(' ')[0] || ''

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Blogs', path: '/blogs' },
        { label: 'Vlogs', path: '/vlogs' },
        { label: 'Events', path: '/timeline' },
        { label: 'Moments', path: '/moments' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Faculty', path: '/faculty' },
        { label: 'Merch', path: '/merch' },
        { label: 'Games', path: '/games' },
    ]

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="main-nav">
            <Link to="/" className="nav-logo">
                <motion.img
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    src="/logo-round.png"
                    alt="IEEE ITS Logo"
                    className="logo-icon-img"
                />
                <img src="/logo-text.png" alt="IEEE ITS" className="logo-text-img" />
            </Link>

            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                {navItems.map((item, idx) => (
                    <motion.li
                        key={item.path}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Link
                            to={item.path}
                            className={location.pathname === item.path ? 'active' : ''}
                        >
                            {item.label}
                        </Link>
                    </motion.li>
                ))}

                {user ? (
                    <li className="nav-user-wrap">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="nav-user-btn"
                            onClick={() => setShowDropdown(v => !v)}
                        >
                            {user.picture
                                ? <img src={user.picture} alt={firstName} className="nav-user-avatar" />
                                : <span className="nav-user-initial">{firstName[0]?.toUpperCase()}</span>
                            }
                            {firstName}
                            <motion.span
                                animate={{ rotate: showDropdown ? 180 : 0 }}
                                className="nav-chevron"
                            >
                                ▼
                            </motion.span>
                        </motion.button>
                        <AnimatePresence>
                            {showDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="nav-dropdown glass-panel"
                                >
                                    <Link to="/join" className="nav-dropdown-item">👤 My Profile</Link>
                                    <button className="nav-dropdown-item" onClick={logout}>🚪 Sign Out</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                ) : (
                    <>
                        <motion.li
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link to="/login" className="nav-login-link">Login</Link>
                        </motion.li>
                        <motion.li
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link to="/join">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="nav-cta"
                                >
                                    Join Us
                                </motion.button>
                            </Link>
                        </motion.li>
                    </>
                )}
            </ul>

            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} />
                <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
                <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} />
            </button>
        </nav>
    )
}

