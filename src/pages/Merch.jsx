import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { saveToSheet, getFromSheet } from '../services/googleSheets'

const TSHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const TSHIRTS = [
    {
        id: 'classic',
        name: 'IEEE ITS Classic Tee',
        price: '₹499',
        tag: 'Bestseller',
        colors: ['#1a1a2e', '#00b4d8', '#7b2ff7'],
        desc: 'The signature IEEE ITS tee. Premium 180 GSM cotton with the chapter logo embroidered on the chest.',
        image: '/tshirt.jpg',
    },
    {
        id: 'hoodie',
        name: 'ITS Premium Hoodie',
        price: '₹999',
        tag: 'Coming Soon',
        colors: ['#121212', '#2a2a2a'],
        desc: 'Stay warm and tech-savvy. Oversized fleece hoodie with high-density print on the back.',
        isComingSoon: true
    },

]

export default function Merch() {
    const { user } = useAuth()
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState(0)
    const [qty, setQty] = useState(1)
    const [bookings, setBookings] = useState([])
    const [showSuccess, setShowSuccess] = useState(false)
    const [activeTab, setActiveTab] = useState('shop')
    const [syncing, setSyncing] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)

    useEffect(() => {
        const loadBookings = async () => {
            const stored = JSON.parse(localStorage.getItem('ieee_its_bookings') || '[]')
            setBookings(stored)

            if (!user) return

            setSyncing(true)
            const remote = await getFromSheet('BOOKINGS')
            if (remote && Array.isArray(remote)) {
                const userBookings = remote.filter(b => b.email === user.email)
                if (userBookings.length > 0) {
                    setBookings(userBookings)
                    localStorage.setItem('ieee_its_bookings', JSON.stringify(userBookings))
                }
            }
            setSyncing(false)
        }
        loadBookings()
    }, [user])

    const openBook = (item) => {
        if (!user) return
        setSelectedItem(item)
        setSelectedSize('')
        setSelectedColor(0)
        setQty(1)
    }

    const confirmBooking = async () => {
        if (!selectedSize || bookingLoading) return

        setBookingLoading(true)
        try {
            let currentMobile = user.mobile
            let currentRegNo = user.regNo

            if (!currentMobile || !currentRegNo) {
                const remoteProfiles = await getFromSheet('PROFILE')
                const myProfile = remoteProfiles?.find(r => r.email === user.email)
                if (myProfile) {
                    currentMobile = myProfile.mobile
                    currentRegNo = myProfile.regNo
                }
            }

            if (!currentMobile) {
                alert('❌ Mobile Number Required!\n\nPlease go to "Join Us" and enter your mobile number to continue with the booking.')
                return
            }

            const now = new Date()
            const booking = {
                id: Date.now(),
                date: now.toLocaleDateString('en-IN'),
                time: now.toLocaleTimeString('en-IN'),
                name: user.name,
                email: user.email,
                mobile: currentMobile,
                regNo: currentRegNo,
                item: selectedItem.name,
                size: selectedSize,
                color: selectedItem.colors[selectedColor],
                qty,
                price: selectedItem.price,
                total: selectedItem.price.replace('₹', '') * qty,
                status: 'Booked',
                type: 'MERCH_BOOKING'
            }

            const updated = [booking, ...bookings]
            localStorage.setItem('ieee_its_bookings', JSON.stringify(updated))
            setBookings(updated)

            try {
                await saveToSheet('BOOKINGS', booking)
            } catch (sheetError) {
                console.warn('Cloud sync delayed, but booking saved locally.')
            }

            setSelectedItem(null)
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 4000)
        } catch (error) {
            console.error('Booking error:', error)
            alert('Booking failed. Please check if you have entered all details correctly in "Join Us"!')
        } finally {
            setBookingLoading(false)
        }
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="page-header">
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overline"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontWeight: 600 }}>
                    Official Store
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-glow"
                >
                    IEEE ITS Merchandise 🛍️
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Rep the chapter. Rock the gear.
                </motion.p>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="section-container">

                    {!user && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="merch-auth-notice glass-panel"
                        >
                            <span>🔒</span>
                            <div>
                                <strong>Sign in to book merchandise</strong>
                                <p>Only VIT members can place bookings. <Link to="/login" style={{ color: 'var(--primary-light)' }}>Sign in here →</Link></p>
                            </div>
                        </motion.div>
                    )}

                    {user && (
                        <div className="game-tabs" style={{ marginBottom: '40px' }}>
                            <button className={`game-tab${activeTab === 'shop' ? ' active' : ''}`} onClick={() => setActiveTab('shop')}>🛍️ Shop</button>
                            <button className={`game-tab${activeTab === 'orders' ? ' active' : ''}`} onClick={() => setActiveTab('orders')}>
                                📦 My Bookings ({bookings.length}) {syncing && <span className="sync-spinner"> (Syncing...)</span>}
                            </button>
                        </div>
                    )}

                    {activeTab === 'orders' && user && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {bookings.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                                    <div style={{ fontSize: '3rem' }}>📦</div>
                                    <p style={{ marginTop: '16px' }}>No bookings yet. Go shop!</p>
                                    <button className="game-btn" style={{ marginTop: '20px' }} onClick={() => setActiveTab('shop')}>Browse Merch →</button>
                                </div>
                            ) : (
                                <div className="orders-list">
                                    {bookings.map((b, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={b.id || b.timestamp}
                                            className="order-card glass-panel"
                                        >
                                            <div className="order-status">{b.status || 'Verified'}</div>
                                            <h4>{b.item}</h4>
                                            <div className="order-meta">
                                                <span>Size: <strong>{b.size}</strong></span>
                                                <span>Qty: <strong>{b.qty}</strong></span>
                                                <span>Price: <strong>{b.price}</strong></span>
                                                <span>Booked on: <strong>{b.date || b.timestamp?.split('T')[0]}</strong></span>
                                            </div>
                                            <div className="order-color-dot" style={{ background: b.color }} title="Color" />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'shop' && (
                        <motion.div
                            className="merch-grid"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                        >
                            {TSHIRTS.map(item => (
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    key={item.id}
                                    className="merch-card glass-panel"
                                >
                                    <div className="merch-img">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="merch-main-img" />
                                        ) : (
                                            <span className="merch-emoji">{item.emoji}</span>
                                        )}
                                        <div className="merch-color-swatches">
                                            {item.colors.map((c, i) => (
                                                <span key={i} className="merch-swatch" style={{ background: c }} />
                                            ))}
                                        </div>
                                        {item.tag && <div className="merch-tag">{item.tag}</div>}
                                    </div>
                                    <div className="merch-info">
                                        <h3>{item.name}</h3>
                                        <p>{item.desc}</p>
                                        <div className="merch-footer">
                                            <span className="merch-price">{item.price}</span>
                                            {user
                                                ? <button
                                                    className="game-btn"
                                                    onClick={() => openBook(item)}
                                                    disabled={item.isComingSoon}
                                                    style={item.isComingSoon ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                                >
                                                    {item.isComingSoon ? 'Coming Soon' : 'Book Now'}
                                                </button>
                                                : <Link to="/login"><button className="game-btn">Sign In to Book</button></Link>
                                            }
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                className="booking-toast glass-panel"
                            >
                                🎉 Booking confirmed! We'll notify you on your registered email.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <AnimatePresence>
                {selectedItem && (
                    <div className="merch-modal-overlay" onClick={() => setSelectedItem(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="merch-modal glass-panel"
                            onClick={e => e.stopPropagation()}
                        >
                            <button className="close-btn" onClick={() => setSelectedItem(null)}>✕</button>
                            <h3 className="text-glow">{selectedItem.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{selectedItem.desc}</p>

                            <label className="modal-label">Color</label>
                            <div className="modal-colors">
                                {selectedItem.colors.map((c, i) => (
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        key={i}
                                        className={`modal-swatch${selectedColor === i ? ' selected' : ''}`}
                                        style={{ background: c }}
                                        onClick={() => setSelectedColor(i)}
                                    />
                                ))}
                            </div>

                            <label className="modal-label">Size</label>
                            <div className="modal-sizes">
                                {TSHIRT_SIZES.map(s => (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        key={s}
                                        className={`modal-size-btn${selectedSize === s ? ' selected' : ''}`}
                                        onClick={() => setSelectedSize(s)}
                                    >
                                        {s}
                                    </motion.button>
                                ))}
                            </div>

                            <label className="modal-label">Quantity</label>
                            <div className="modal-qty">
                                <motion.button whileTap={{ scale: 0.8 }} className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</motion.button>
                                <span>{qty}</span>
                                <motion.button whileTap={{ scale: 0.8 }} className="qty-btn" onClick={() => setQty(q => Math.min(5, q + 1))}>+</motion.button>
                            </div>

                            <div className="modal-total">Total: <strong>₹{selectedItem.price.replace('₹', '') * 1 * qty}</strong></div>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '8px 0 20px' }}>
                                📌 No payment required — this is just a booking reservation.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center' }}
                                disabled={!selectedSize || bookingLoading}
                                onClick={confirmBooking}
                            >
                                {bookingLoading ? 'Processing...' : 'Confirm Booking →'}
                            </motion.button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

