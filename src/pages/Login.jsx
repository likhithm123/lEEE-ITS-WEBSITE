import { useState, useEffect } from 'react'
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase'

export default function Login() {
    const [error, setError] = useState('')
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const isVit = currentUser.email.endsWith('@vit.ac.in') || currentUser.email.endsWith('@vitstudent.ac.in')
                const userData = {
                    name: currentUser.displayName,
                    email: currentUser.email,
                    picture: currentUser.photoURL,
                    memberType: isVit ? 'VIT Student' : 'External Member'
                }
                setUser(userData)
                localStorage.setItem('ieee_its_user', JSON.stringify(userData))
            } else {
                setUser(null)
                localStorage.removeItem('ieee_its_user')
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handleLogin = async () => {
        try {
            setError('')
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            setError('Failed to sign in. Please try again.')
            console.error('Firebase Auth Error:', err)
        }
    }

    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error('Logout error:', err)
        }
    }

    if (loading) {
        return (
            <div className="login-page">
                <div className="login-card">
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    if (user) {
        return (
            <div className="login-page">
                <div className="login-card">
                    {user.picture ? (
                        <img src={user.picture} alt={user.name} className="login-avatar" />
                    ) : (
                        <div className="login-logo">✓</div>
                    )}
                    <h2>Welcome, {user.name}! 🎉</h2>
                    <div style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        marginBottom: '16px',
                        background: user.memberType === 'VIT Student' ? 'rgba(0, 180, 216, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                        color: user.memberType === 'VIT Student' ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                        border: `1px solid ${user.memberType === 'VIT Student' ? 'var(--neon-cyan)' : 'var(--border-color)'}`
                    }}>
                        {user.memberType}
                    </div>
                    <p className="subtitle">Signed in as <strong style={{ color: 'var(--primary-light)' }}>{user.email}</strong></p>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
                        You now have access to exclusive IEEE ITS resources, event registrations, and member features.
                    </p>
                    <button className="google-btn" onClick={handleLogout} style={{ marginTop: '8px' }}>
                        Sign Out
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo">ITS</div>
                <h2>Sign In</h2>
                <p className="subtitle">Sign in with your Google account to access member features.</p>
                <div className="google-login-container">
                    <button className="google-btn" onClick={handleLogin}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ marginRight: '10px', height: '18px' }} />
                        Sign in with Google
                    </button>
                </div>
                <p className="note">🔒 Secure authentication powered by Google.</p>
                {error && <div className="login-error" style={{ marginTop: '16px', color: '#ff6b6b' }}>{error}</div>}
            </div>
        </div>
    )
}
