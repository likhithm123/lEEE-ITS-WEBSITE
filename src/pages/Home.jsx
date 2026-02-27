import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ---------- data ---------- */
const SPOTLIGHT_EVENT = {
    tag: '🔥 Hackathon',
    title: 'INNOVATE FOR IMPACT',
    description: 'A high-energy hybrid hackathon where ideas turn into real solutions. Solve real campus & global challenges!',
    date: 'March 6-7, 2026',
    time: '4:00 PM IST',
    venue: 'Ambedkar Auditorium',
    link: '/hackathon',
}


const BOARD_MEMBERS = [
    { name: 'Arush Gupta', role: 'Chairperson', initials: 'A', image: '/aarush.jpg', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
    { name: 'Isha S U', role: 'Vice Chairperson', initials: 'I', image: '/isha.jpeg', instagram: 'https://www.instagram.com/maverick.19?igsh=N2o4eWttN2U3M2M4&utm_source=qr', linkedin: 'https://www.linkedin.com/in/ishasu?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { name: 'Sharath Chandra M', role: 'Secretary', initials: 'SC', image: '/sharath.jpg', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
    { name: 'Aparajitaa Sanyal', role: 'Editorial Head', initials: 'A', image: '/aparajitaa.jpg', instagram: 'https://www.instagram.com/aparajitaasan_/', linkedin: 'https://in.linkedin.com/in/aparajitaa-sanyal-989718326' },
    { name: 'Agrima Gupta', role: 'Technical Head', initials: 'AG', image: '/agrima.jpeg', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
    { name: 'Devkanti Sarkar', role: 'Design Head', initials: 'DS', image: '/devanti.jpeg', instagram: 'https://www.instagram.com/devkanti_sarkar/', linkedin: 'https://www.linkedin.com/in/devkanti-sarkar-272881324/' },
    { name: 'Solanki Nehal Shailesh', role: 'Events Head', initials: 'SN', image: '/solanki.jpeg', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
    { name: 'Harika R', role: 'Finance Head', initials: 'H', image: '/harika.jpg', instagram: 'https://www.instagram.com/harikaa.r?igsh=enl3Yjk0NTg1ZzNu', linkedin: 'https://www.linkedin.com/in/harika-r-080904367?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { name: 'Sanjana Anna John', role: 'Outreach Head', initials: 'SA', image: '/sanjana.jpeg', instagram: 'https://www.instagram.com/sanjana.john?igsh=MW8zN2FoYzhiNDBjdA==', linkedin: 'https://www.linkedin.com/in/sanjana-anna-john-a6a9b5363?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { name: 'Drishita Paul', role: 'Publicity Head', initials: 'DP', image: '/drishitha.jpeg', instagram: 'https://www.instagram.com/drish_but_messier?igsh=d3N0OXRqZWp5a3Fj', linkedin: 'https://www.linkedin.com/in/drishita-paul-0238b1295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'Mithun M S', role: 'Management Head', initials: 'M', image: '/mithun.jpeg', instagram: 'https://www.instagram.com/mith.un._?igsh=MWVocXRlcTViMnNudw%3D%3D&utm_source=qr', linkedin: 'https://www.linkedin.com/in/mithun-ms-a6ba19376?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
    { name: 'Manya Dev', role: 'Co-Secretary', initials: 'MD', image: '/manya.jpg', instagram: 'https://www.instagram.com/_manya_dev?igsh=bHZjbmk3cXgwOHV1&utm_source=qr', linkedin: 'https://www.linkedin.com/in/manya-dev-320014333?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: 'Krithika Shri', role: 'Creative Head', initials: 'KS', image: '/krithika.jpg', instagram: 'https://www.instagram.com/krithika_2303?utm_source=qr&igsh=NmdlaDYyenYxMGZm', linkedin: 'https://www.linkedin.com/in/krithika-shri-9843353b3?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { name: 'Mrithula T', role: 'R&D Head', initials: 'M', image: '/mrithula.jpeg', instagram: 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=uzl5y9k', linkedin: 'https://www.linkedin.com/in/mrithula-t-107424322' },
    { name: 'Khanak Verma', role: 'Project Head', initials: 'KV', image: '/khanak.jpeg', instagram: 'https://www.instagram.com/khanak_verma_?igsh=MTN1ZWw4ZHFjNnQwdQ%3D%3D&utm_source=qr', linkedin: 'https://www.linkedin.com/in/khanak-verma-70a807317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
]

const DOMAINS = [

    { icon: '📡', title: 'Technical', desc: '• Developing scalable software architectures, advanced competitive coding, and full-stack systems with core CSE principles.' },
    { icon: '🔐', title: 'Editorial', desc: '• Curating technical excellence through high-impact publications, AI research reviews, and strategic content strategy.' },
    { icon: '🧠', title: 'Design', desc: '• Blending aesthetics with technology to craft immersive UI/UX, brand identities, and dynamic visual media.' },
    { icon: '📊', title: 'Research and Development', desc: '• Pioneering innovation in Artificial Intelligence, Machine Learning, and Neural Networks to solve complex computational problems.' },
    { icon: '🌐', title: 'Publicity', desc: '• Amplifying our reach through strategic digital outreach, public relations, and high-impact community building.' },
    { icon: '⚡', title: 'Events & Management', desc: '• Executing world-class technical symposiums, hackathons, and workshops that drive innovation.' },
    { icon: '🤝', title: 'Out-Reach', desc: '• Establishing powerful industrial alliances and academic partnerships to foster global collaboration.' },
    { icon: '💰', title: 'Finance', desc: '• Optimizing resource allocation through strategic financial planning, budgeting, and sponsorship management.' },



]

function StickyScrollSection() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const textY = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
        <section ref={containerRef} className="sticky-scroll-container">
            <div className="sticky-element">
                <motion.div
                    style={{ scale, opacity }}
                    className="sticky-content"
                >
                    <motion.h2 style={{ y: textY }}>Beyond Boundaries</motion.h2>
                    <div className="sticky-visual">
                        <div className="visual-circle"></div>
                        <div className="visual-dots"></div>
                    </div>
                    <p className="sticky-desc">
                        At IEEE ITS-VIT, we push the limits of what's possible with information.
                        From the smallest bit to the largest data network.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

/* ---------- Board Card with flip effect ---------- */
function BoardCard({ member }) {
    const [flipped, setFlipped] = useState(false)
    const [imgErr, setImgErr] = useState(false)
    const timerRef = useRef(null)

    const handleMouseEnter = () => {
        timerRef.current = setTimeout(() => setFlipped(true), 100)
    }
    const handleMouseLeave = () => {
        clearTimeout(timerRef.current)
        setFlipped(false)
    }

    /* Shared avatar renderer */
    const Avatar = ({ small }) => {
        const size = small ? 130 : 160
        if (member.image && !imgErr) {
            return (
                <div className="avatar" style={{
                    width: size, height: size,
                    padding: 0, overflow: 'hidden',
                    background: 'var(--gradient-primary)',
                }}>
                    <img
                        src={member.image}
                        alt={member.name}
                        onError={() => setImgErr(true)}
                        style={{
                            width: '100%', height: '100%',
                            objectFit: 'cover', objectPosition: 'center top',
                            borderRadius: '50%', display: 'block',
                        }}
                    />
                </div>
            )
        }
        return <div className={`avatar${small ? ' back-avatar' : ''}`} style={{ width: size, height: size }}>{member.initials}</div>
    }

    return (
        <div
            className={`board-card-scene${flipped ? ' flipped' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="board-card-inner">
                {/* Front */}
                <div className="board-card board-card-front">
                    <Avatar />
                    <h4>{member.name}</h4>
                    <div className="role">{member.role}</div>
                </div>
                {/* Back */}
                <div className="board-card board-card-back">
                    <Avatar small />
                    <h4>{member.name}</h4>
                    <div className="role">{member.role}</div>
                    <div className="social-links">
                        <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-btn instagram-btn"
                            title="Instagram"
                            onClick={e => e.stopPropagation()}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                            Instagram
                        </a>
                        <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-btn linkedin-btn"
                            title="LinkedIn"
                            onClick={e => e.stopPropagation()}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ---------- main component ---------- */
export default function Home() {
    const [showSpotlight, setShowSpotlight] = useState(true)
    const [visibleSections, setVisibleSections] = useState({})
    const sectionRefs = useRef({})

    // Intersection observer for fade-in
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        setVisibleSections(prev => ({ ...prev, [e.target.id]: true }))
                    }
                })
            },
            { threshold: 0.15 }
        )
        Object.values(sectionRefs.current).forEach(el => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const refCb = id => el => { sectionRefs.current[id] = el }
    const sectionStyle = id => ({
        opacity: visibleSections[id] ? 1 : 0,
        transform: visibleSections[id] ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)',
    })

    const particles = Array.from({ length: 30 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${60 + Math.random() * 40}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${6 + Math.random() * 6}s`,
    }))

    return (
        <>
            {/* ===== Spotlight Modal ===== */}
            {showSpotlight && (
                <div className="spotlight-overlay" onClick={() => setShowSpotlight(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="spotlight-modal glass-panel"
                        onClick={e => e.stopPropagation()}
                        style={{ padding: '15px', maxWidth: '450px', width: '90%', position: 'relative' }}
                    >
                        <button className="close-btn" onClick={() => setShowSpotlight(false)} aria-label="Close" style={{ position: 'absolute', top: '25px', right: '25px', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff' }}>✕</button>
                        <Link to={SPOTLIGHT_EVENT.link} style={{ display: 'block', width: '100%', position: 'relative' }}>
                            <img src="/hackathon.jpeg" alt="Event" style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }} />
                            <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', textAlign: 'center' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary"
                                    style={{ padding: '10px 24px', fontSize: '0.9rem', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}
                                >
                                    Click to Register →
                                </motion.button>
                            </div>
                        </Link>

                    </motion.div>
                </div>
            )}

            {/* ===== Hero ===== */}
            <section className="hero" id="hero">
                <div className="hero-particles">
                    {particles.map((p, i) => (
                        <div key={i} className="hero-particle" style={p} />
                    ))}
                </div>
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hero-badge"
                    >
                        <span className="dot"></span>
                        IEEE Information Theory Society — VIT Chapter
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Decode the Future of <br />
                        <span className="gradient-text text-glow">Information Theory</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        We are a community of passionate engineers and researchers exploring network theory, coding theory, machine learning, and quantum computing at VIT.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="hero-buttons"
                    >
                        <Link to="/join">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="btn-primary"
                            >
                                Join Our Chapter →
                            </motion.button>
                        </Link>
                        <Link to="/timeline">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="btn-secondary"
                            >
                                Explore Events
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>


            {/* ===== About / What is IEEE ITS ===== */}
            <section className="section" id="about" ref={refCb('about')} style={sectionStyle('about')}>
                <div className="section-container">
                    <div className="about-grid">
                        <div className="about-visual">
                            <div className="grid-pattern"></div>
                            <div className="floating-shapes">
                                <div className="shape"></div>
                                <div className="shape"></div>
                                <div className="shape"></div>
                            </div>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                                <img src="/logo-round.png" alt="Logo" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="about-text">
                            <p className="overline" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontWeight: 600 }}>What is IEEE ITS?</p>
                            <h3>Information Theory Society</h3>
                            <p>
                                The IEEE Information Theory Society (ITS) is a global community that promotes the advancement of information theory and its applications. Our VIT chapter brings together students who are passionate about pushing the boundaries of coding, data compression, network protocols, and more.
                            </p>
                            <p>
                                We host workshops, seminars, hackathons, and competitions to build a vibrant culture of learning and innovation on campus.
                            </p>
                            <div className="about-stats">
                                <div className="stat-item">
                                    <div className="stat-number">60+</div>
                                    <div className="stat-label">Members</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">10+</div>
                                    <div className="stat-label">Events</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">5+</div>
                                    <div className="stat-label">Domains</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Board Members Slider ===== */}
            <section className="section" id="board" ref={refCb('board')} style={sectionStyle('board')}>
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <p className="overline">Leadership</p>
                        <h2>Meet Our Board</h2>
                        <p>The passionate leaders driving IEEE ITS-VIT forward.</p>
                    </motion.div>
                    <div className="board-slider-wrapper">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="board-slider"
                        >
                            {[...BOARD_MEMBERS, ...BOARD_MEMBERS].map((m, i) => (
                                <BoardCard member={m} key={i} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== Domains ===== */}
            <section className="section" id="domains" ref={refCb('domains')} style={sectionStyle('domains')}>
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <p className="overline">What We Do</p>
                        <h2>Our Domains</h2>
                        <p>Exploring the frontiers of information theory and its modern applications.</p>
                    </motion.div>
                    <div className="domains-grid">
                        {DOMAINS.map((d, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="domain-card glass-panel"
                                key={i}
                            >
                                <div className="icon">{d.icon}</div>
                                <h3>{d.title}</h3>
                                <p>{d.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ===== Sticky Scroll Section ===== */}
            <StickyScrollSection />

            {/* ===== Wanna Chill ===== */}
            <section className="section" id="chill" ref={refCb('chill')} style={sectionStyle('chill')}>
                <div className="section-container">
                    <div className="chill-section">
                        <div className="chill-dino">🦖</div>
                        <h2>Wanna Chill? 🎮</h2>
                        <p>Take a break from the grind. We've got technical mini-games to keep your brain buzzing — Binary Decoder, Logic Gates, Morse Code & more!</p>
                        <Link to="/games">
                            <button className="chill-btn">
                                Click Here to Play →
                            </button>
                        </Link>
                        <div className="chill-icons">

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
