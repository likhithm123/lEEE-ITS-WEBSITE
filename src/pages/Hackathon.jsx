import { motion } from 'framer-motion'

export default function Hackathon() {
    return (
        <div className="page-container page-content">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="section-header"
                style={{ textAlign: 'center', marginBottom: '2rem' }}
            >
                <p className="overline">Event Showcase</p>
                <h1 className="text-glow">⚡ INNOVATE FOR IMPACT ⚡</h1>
                <p>24hr Hackathon where ideas turn into real solutions 🚀</p>
            </motion.div>

            <div className="hackathon-details" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--panel-bg)', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div className="event-img" style={{ width: '100%', height: '400px', borderRadius: '15px', overflow: 'hidden', marginBottom: '1rem', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)' }}>
                        <img
                            src="/hackathon.jpeg"
                            alt="Innovate For Impact"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>

                    <h3 style={{ color: 'var(--primary)', textAlign: 'center' }}>Solve Real Campus & Global Challenges</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'center' }}>
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '15px' }}>
                            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>💡</span>
                            <h4>Build</h4>
                            <p style={{ fontSize: '0.9rem' }}>Build prototypes in just 24 hours</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '15px' }}>
                            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🏆</span>
                            <h4>Compete</h4>
                            <p style={{ fontSize: '0.9rem' }}>Compete, pitch, and standout</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '15px' }}>
                            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🌍</span>
                            <h4>Impact</h4>
                            <p style={{ fontSize: '0.9rem' }}>Tech that makes a real difference</p>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '15px', marginTop: '1rem' }}>
                        <h3>📅 Event Timeline</h3>
                        <p style={{ marginBottom: '1rem' }}><strong>6th March (4:00 PM) – 7th March (4:00 PM)</strong></p>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid var(--border)' }}>
                                💻 <strong>Day 1:</strong> Online Kickoff + Development
                            </li>
                            <li style={{ padding: '0.8rem 0' }}>
                                📍 <strong>Day 2:</strong> Ambedkar Auditorium (Finale)
                            </li>
                        </ul>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '15px' }}>
                        <h3>🔥 Tracks</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '1rem' }}>
                            {['Student Life', 'Tech', 'Sustainability', 'Academics', 'Open Innovation'].map((track, i) => (
                                <span key={i} style={{ padding: '0.5rem 1rem', background: 'var(--primary-dark)', borderRadius: '20px', fontSize: '0.9rem', color: '#fff', border: '1px solid var(--primary)' }}>
                                    {track}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '15px', textAlign: 'center' }}>
                        <h3>👥 Team Setup</h3>
                        <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}><strong>Team Size:</strong> 2–4 members</p>
                        <p>📜 E-Certificates will be provided</p>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <h3 className="text-glow" style={{ marginBottom: '1rem' }}>📌 Register now on VTOP:</h3>
                        <p style={{ opacity: 0.8, marginBottom: '2rem' }}>VTOP → Event Registration → Innovate for Impact</p>

                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)', fontStyle: 'italic' }}>
                            "Come with an idea. Leave with impact. 🌱✨"
                        </p>

                        <a
                            href="https://vtop.vit.ac.in/vtop/open/page"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-block', marginTop: '2rem' }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary"
                                style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
                            >
                                Register via VTOP
                            </motion.button>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}
