import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const WEB_TEAM = [
    { name: 'Likhith M', role: 'Full Stack Developer', initials: 'L', instagram: 'https://www.instagram.com/likhith_m123?igsh=ZnRpbjVvd2VwejJ4', linkedin: 'https://www.linkedin.com/in/likhith-medarametla-0039b6320?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { name: 'Jayanth M', role: 'Frontend & UI Specialist', initials: 'J', instagram: 'https://www.instagram.com/jayanthreddy_143/', linkedin: 'https://www.linkedin.com/in/mallidi-jaya-veera-maheswara-reddy-468426297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'SivaGanesh K.B', role: 'Backend Architecture', initials: 'SG', instagram: 'https://www.instagram.com/k.b.sivaganesh?igsh=MW14OHFwYmdiMXhudg==', linkedin: 'https://www.linkedin.com/in/siva-ganesh-karanam-balaji-b96950335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'Leela Krishna K', role: 'Web Technical Lead', initials: 'LK', instagram: 'https://www.instagram.com/leelakrishna_123?igsh=Y2Rham5vYW1tbjky', linkedin: 'https://linkedin.com' },
]

function TeamCard({ member, delay }) {
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

    const Avatar = ({ small }) => {
        const size = small ? 85 : 100
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
        return <div className={`avatar${small ? ' back-avatar' : ''}`}>{member.initials}</div>
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className={`board-card-scene${flipped ? ' flipped' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="board-card-inner">
                {/* Front */}
                <div className="board-card board-card-front glass-panel">
                    <Avatar />
                    <h4 className="text-glow">{member.name}</h4>
                    <div className="role">{member.role}</div>
                </div>
                {/* Back */}
                <div className="board-card board-card-back glass-panel">
                    <Avatar small />
                    <h4>{member.name}</h4>
                    <div className="role">{member.role}</div>
                    <div className="social-links">
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
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
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-btn linkedin-btn"
                            title="LinkedIn"
                            onClick={e => e.stopPropagation()}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function WebTeam() {
    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="page-header">
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overline"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontWeight: 600 }}>
                    Credits
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-glow"
                >
                    The Web Wizards 💻
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    The duo of designers and developers behind the digital home of IEEE ITS-VIT.
                </motion.p>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="section-container">
                    <div className="web-team-grid">
                        {WEB_TEAM.map((m, i) => (
                            <TeamCard member={m} key={i} delay={i * 0.1} />
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="developers-note glass-panel"
                        style={{
                            marginTop: '80px',
                            padding: '40px',
                            textAlign: 'center',
                            maxWidth: '800px',
                            margin: '80px auto 0'
                        }}
                    >
                        <div className="quote-icon" style={{ fontSize: '3rem', color: 'var(--primary)', opacity: 0.3, marginBottom: '20px' }}>“</div>
                        <h3 className="text-glow" style={{ marginBottom: '16px' }}>Developers' Note</h3>
                        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                            This website was built with a vision to create a digital home that truly reflects the innovative spirit of IEEE ITS-VIT.
                            From the interactive "binary dinosaur" games to the sleek, high-performance glassmorphism UI, every line of code was written
                            to provide a premium experience for our community. We utilized modern technologies like React, Framer Motion for animations,
                            and Firebase for secure authentication to ensure the platform is as robust as it is beautiful.
                        </p>
                        <p style={{ marginTop: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>
                            - The Web Development Team
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

