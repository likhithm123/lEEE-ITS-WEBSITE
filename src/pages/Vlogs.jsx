import { useState } from 'react'
import { saveToSheet } from '../services/googleSheets'

const VLOGS = [
    { id: 'dQw4w9WgXcQ', title: 'IEEE ITS VIT — Chapter Introduction', desc: 'An overview of who we are and what we do.' },
    { id: 'SXY6921XmMo', title: 'Tech Symposium 2025 Highlights', desc: 'Recap of our flagship annual event.' },
    { id: 'p8vL_C8WcRE', title: 'Information Theory Basics', desc: 'Introduction to Claude Shannon and his work.' },
    { id: 'dQw4w9WgXcQ', title: 'Join the Core Team!', desc: 'Recruitment process and expectations.' },
    { id: '0vOn7Tz820A', title: 'Quantum Computing 101', desc: 'A beginner guide to quantum gates and bits.' },
]

const SUBSCRIBE_URL = 'https://youtu.be/JA3t27eBL3M?si=l8TaPSnTcHksrznC'

export default function Vlogs() {
    const [email, setEmail] = useState('')
    const [subMsg, setSubMsg] = useState('')

    const handleSubscribe = async (e) => {
        e.preventDefault()
        if (!email) return

        // 1. Save to Google Sheets
        await saveToSheet('COMMUNITY', { email, type: 'VLOG_SUBSCRIBER' })

        // 2. Local State Management
        const list = JSON.parse(localStorage.getItem('ieee_its_vlog_subs') || '[]')
        if (list.includes(email)) {
            setSubMsg('Already subscribed!')
        } else {
            list.push(email)
            localStorage.setItem('ieee_its_vlog_subs', JSON.stringify(list))
            setSubMsg('🎉 Subscribed to Vlogs!')
        }
        setEmail('')
        setTimeout(() => setSubMsg(''), 4000)
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="page-header">
                <p className="overline" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontWeight: 600 }}>Video Content</p>
                <h1>Our Vlogs</h1>
                <p>Watch, learn, and subscribe to stay updated with our latest content.</p>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="section-container">
                    {/* Subscribe to vlogs */}
                    <div className="subscribe-section" style={{ marginBottom: '60px' }}>
                        <h2>📺 Subscribe to Our Vlogs</h2>
                        <p>Get notified when we drop new video content.</p>
                        <form className="subscribe-form" onSubmit={handleSubscribe}>
                            <input type="email" placeholder="your.email@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                            <button type="submit">Subscribe</button>
                        </form>
                        {subMsg && <p className="subscribe-success">{subMsg}</p>}
                    </div>

                    <div className="blog-grid">
                        {VLOGS.map((v, i) => (
                            <div
                                className="blog-card"
                                key={i}
                                style={{ cursor: 'pointer' }}
                                onClick={() => window.open(SUBSCRIBE_URL, '_blank')}
                            >
                                <div className="blog-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="/logo-round.png" alt="Vlog" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                                        <div className="vlog-play-btn" style={{
                                            width: '60px',
                                            height: '60px',
                                            background: 'rgba(255, 0, 0, 0.8)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 0 20px rgba(255,0,0,0.5)'
                                        }}>
                                            <span style={{ fontSize: '1.5rem', marginLeft: '4px', color: 'white' }}>▶</span>
                                        </div>
                                    </div>
                                    <span className="tag">YouTube</span>
                                </div>
                                <div className="blog-body">
                                    <h3>{v.title}</h3>
                                    <p>{v.desc}</p>
                                    <button
                                        className="btn-link"
                                        style={{
                                            marginTop: '12px',
                                            padding: 0,
                                            color: 'var(--primary-light)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}
                                    >
                                        Watch Video 🔗
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
