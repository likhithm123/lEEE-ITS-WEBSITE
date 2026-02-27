import React from 'react'
import { motion } from 'framer-motion'

const EVENTS = [
    { date: 'Feb 2023', title: 'Chapter Founded', desc: 'IEEE ITS Chapter officially established at VIT, Vellore.' },
    { date: 'Feb 2023', title: 'Innoverse - Yantra 23', desc: 'Introduction to Information Theory — our first technical workshop with 60+ attendees.' },
    { date: 'Nov 2023', title: 'Quanta 2023', desc: 'Hands-on workshop on quantum error correction in collaboration with IBM Qiskit.' },
    { date: 'feb 2024', title: 'TechTrate - Yantra 24', desc: 'Deep learning workshop for wireless channel estimation and signal detection.' },
    { date: 'Feb 22, 2024', title: "ic-ETITE'24", desc: "A multinational tech conference hosted by the Department of SCORE in collaboration with tech giants like Cisco, Intel, and others." },

    { date: 'Feb 2026', title: 'New Board Inauguration', desc: 'Welcomed the 2026 board with a grand inauguration ceremony.' },
    {
        date: 'March 6, 2026', title: 'INNOVATE FOR IMPACT (IEEE ITS)',
        desc: '24 hours of non-stop building and innovation at VIT. Showcase your skills and win big.',
        isUpcoming: true
    }, {
        date: 'March 15, 2026', title: 'CASA 2026',
        desc: 'A responsible measure to bring the community together for a day of fun, food, and games! Registration open now for our annual cultural fest.',
        isUpcoming: true
    },


]

export default function EventTimeline() {
    const reversedEvents = [...EVENTS].reverse()

    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="page-header">
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overline"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontWeight: 600 }}>
                    The Roadmap
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-glow"
                >
                    Our Journey & Future
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    From our founding to the upcoming milestones — every memory and every plan.
                </motion.p>
            </div>
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="section-container">
                    <div className="timeline">
                        {reversedEvents.map((e, i) => {
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: e.isUpcoming ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className={`timeline-item${e.isUpcoming ? ' upcoming' : ''}`}
                                >
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content glass-panel">
                                        <div className="date-row">
                                            <div className="date">{e.date}</div>
                                            {e.isUpcoming && <span className="upcoming-badge">Upcoming</span>}
                                        </div>
                                        <h4 className={e.isUpcoming ? "text-glow" : ""}>{e.title}</h4>
                                        <p>{e.desc}</p>
                                        {e.isUpcoming && (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="btn-secondary"
                                                style={{ marginTop: '12px', padding: '6px 14px', fontSize: '0.8rem' }}
                                                onClick={() => window.open('/hackathon', '_blank')}
                                            >
                                                Register Now
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

