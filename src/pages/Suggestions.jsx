import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import { saveToSheet } from '../services/googleSheets'

export default function Suggestions() {
    const { user } = useAuth()
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message.trim()) return

        setSubmitting(true)

        const suggestion = {
            name: user.name,
            email: user.email,
            message: message,
            type: 'SUGGESTION'
        }

        // Save to Google Sheets
        await saveToSheet('COMMUNITY', suggestion)

        // Save to localStorage for backup
        const existing = JSON.parse(localStorage.getItem('ieee_its_suggestions') || '[]')
        localStorage.setItem('ieee_its_suggestions', JSON.stringify([...existing, { ...suggestion, date: new Date().toISOString() }]))

        setSubmitting(false)
        setSubmitted(true)
        setMessage('')
        setTimeout(() => setSubmitted(false), 5000)
    }

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '100px' }}>
            <div className="page-header">
                <p className="overline" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontWeight: 600 }}>We Value Your Voice</p>
                <h1>Suggestions & Feedback 💡</h1>
                <p>Have an idea for a workshop? Or a way to improve our website? Let us know!</p>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="section-container">
                    {!user ? (
                        <div className="suggestion-auth-notice" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <div className="merch-auth-notice">
                                <span>🔒</span>
                                <div>
                                    <strong>Sign in to share suggestions</strong>
                                    <p>Your identity helps us credit great ideas and reach out for clarifications. <Link to="/login" style={{ color: 'var(--primary-light)' }}>Sign in here →</Link></p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="suggestion-form-wrapper"
                            style={{
                                maxWidth: '600px',
                                margin: '0 auto',
                                background: 'var(--gradient-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '24px',
                                padding: '40px'
                            }}
                        >
                            <form onSubmit={handleSubmit}>
                                <div className="suggestion-user-info" style={{ marginBottom: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="field-group">
                                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>From</label>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{user.name}</div>
                                    </div>
                                    <div className="field-group">
                                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Email</label>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{user.email}</div>
                                    </div>
                                </div>

                                <div className="field-group" style={{ marginBottom: '32px' }}>
                                    <label htmlFor="suggestion" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-light)', marginBottom: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Your Suggestion</label>
                                    <textarea
                                        id="suggestion"
                                        className="suggestion-textarea"
                                        placeholder="Tell us what's on your mind... (e.g., 'I want a workshop on LoRaWAN' or 'Add a dark mode toggle')"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            minHeight: '160px',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '16px',
                                            padding: '16px',
                                            color: 'white',
                                            fontSize: '1rem',
                                            lineHeight: '1.6',
                                            fontFamily: 'inherit',
                                            resize: 'vertical',
                                            outline: 'none',
                                            transition: 'border-color 0.3s'
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={submitting || !message.trim()}
                                    style={{ width: '100%', justifyContent: 'center', height: '54px' }}
                                >
                                    {submitting ? 'Transmitting...' : 'Submit Suggestion →'}
                                </button>
                            </form>

                            <AnimatePresence>
                                {submitted && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{
                                            marginTop: '24px',
                                            textAlign: 'center',
                                            color: 'var(--neon-cyan)',
                                            background: 'rgba(0, 180, 216, 0.1)',
                                            padding: '12px',
                                            borderRadius: '12px',
                                            fontSize: '0.9rem',
                                            fontWeight: 600
                                        }}
                                    >
                                        🚀 Decoded! Thank you for the contribution.
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    )
}
