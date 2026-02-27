import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const FACULTY = [
    {
        name: 'John Singh K',
        designation: 'Faculty Coordinator',
        department: 'Dept. of CSE, VIT Vellore',
        initials: 'JSK',
        image: '/johnsingh.jpg',
        website: 'https://vitdirectory.vit.ac.in/page/faculty/12442',
        note: 'IEEE ITS VIT is a platform where students transform information into innovation. I am proud to guide this dedicated team as they push the boundaries of technical excellence and community building.',
    },
    {
        name: 'Shynu PG',
        designation: 'Faculty Coordinator',
        department: 'Dept. of CSE, VIT Vellore',
        initials: 'SPG',
        image: '/shynupg.jpg',
        website: 'https://vitdirectory.vit.ac.in/page/faculty/12340',
        note: 'The spirit of research and development is the core of our chapter. Seeing our students collaborate on high-impact projects and workshops is truly inspiring for the entire CSE department.'
    },
]

/* ---------- Flip Card ---------- */
function FacultyCard({ f }) {
    const [flipped, setFlipped] = useState(false)
    const timerRef = useRef(null)
    const [imgErr, setImgErr] = useState(false)

    const handleEnter = () => {
        timerRef.current = setTimeout(() => setFlipped(true), 100)
    }
    const handleLeave = () => {
        clearTimeout(timerRef.current)
        setFlipped(false)
    }

    return (
        <div
            className={`board-card-scene${flipped ? ' flipped' : ''}`}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <div className="board-card-inner">

                {/* ── FRONT ── */}
                <div className="board-card board-card-front faculty-card-face glass-panel">
                    <div className="faculty-flip-avatar">
                        {f.image && !imgErr
                            ? <img
                                src={f.image}
                                alt={f.name}
                                onError={() => setImgErr(true)}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                            />
                            : <span>{f.initials}</span>
                        }
                    </div>
                    <h4 className="text-glow">{f.name}</h4>
                    <div className="role">{f.designation}</div>
                    <div className="department" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>{f.department}</div>

                </div>

                {/* ── BACK ── */}
                <div className="board-card board-card-back faculty-card-face glass-panel">
                    <div className="faculty-flip-avatar back-avatar">
                        {f.image && !imgErr
                            ? <img
                                src={f.image}
                                alt={f.name}
                                onError={() => setImgErr(true)}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                            />
                            : <span>{f.initials}</span>
                        }
                    </div>
                    <h4>{f.name}</h4>
                    <div className="role">{f.designation}</div>

                    <div className="social-links" style={{ marginTop: '20px', flexDirection: 'column', gap: '12px' }}>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={f.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-btn linkedin-btn"
                            title="VIT Faculty Directory"
                            onClick={e => e.stopPropagation()}
                            style={{ gap: '10px', padding: '10px 20px', fontSize: '0.85rem' }}
                        >
                            {/* University / link icon */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                            View VIT Profile
                        </motion.a>
                    </div>
                </div>

            </div>
        </div>
    )
}

/* ---------- Page ---------- */
export default function Faculty() {
    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="page-header faculty-page-header">
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overline"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontWeight: 600 }}>
                    Guidance
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-glow"
                >
                    Faculty Coordinators
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    The mentors and guides who make IEEE ITS-VIT possible.
                </motion.p>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="section-container">
                    <div className="faculty-layout-grid">
                        {FACULTY.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="faculty-container"
                            >
                                <FacultyCard f={f} />
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 + 0.3 }}
                                    className="faculty-note-box glass-panel"
                                >
                                    <div className="quote-icon">“</div>
                                    <p>{f.note}</p>
                                    <div className="quote-icon-end">”</div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

