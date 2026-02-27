import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { saveToSheet, getFromSheet } from '../services/googleSheets'

export default function JoinUs() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    // profile fields
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [regNo, setRegNo] = useState('')
    const [editName, setEditName] = useState(false)
    const [editMobile, setEditMobile] = useState(false)
    const [editRegNo, setEditRegNo] = useState(false)
    const [saved, setSaved] = useState(false)
    const [saving, setSaving] = useState(false)

    // load saved profile extras
    useEffect(() => {
        const loadProfile = async () => {
            if (!user) return

            // 1. Try Local Storage
            const extras = JSON.parse(localStorage.getItem('ieee_its_profile') || '{}')
            setName(extras.name || user.name || '')
            setMobile(extras.mobile || '')
            setRegNo(extras.regNo || '')

            // Enable edit mode by default if fields are empty
            if (!extras.mobile) setEditMobile(true)
            if (!extras.regNo) setEditRegNo(true)

            // 2. Try Google Sheets (Remote sync)
            const remoteData = await getFromSheet('PROFILE')
            if (remoteData) {
                const myRow = remoteData.find(r => r.email === user.email)
                if (myRow) {
                    setName(myRow.name || name)
                    setMobile(myRow.mobile || mobile)
                    setRegNo(myRow.regNo || regNo)
                    if (myRow.mobile) setEditMobile(false)
                    if (myRow.regNo) setEditRegNo(false)
                    localStorage.setItem('ieee_its_profile', JSON.stringify({
                        name: myRow.name,
                        mobile: myRow.mobile,
                        regNo: myRow.regNo
                    }))
                }
            }
        }
        loadProfile()
    }, [user])

    const handleSave = async () => {
        setSaving(true)
        const profileData = {
            name,
            email: user.email,
            mobile,
            regNo,
            memberType: user.memberType
        }

        // Save Locally
        localStorage.setItem('ieee_its_profile', JSON.stringify({
            name,
            mobile,
            regNo,
        }))

        // Save to Google Sheets
        await saveToSheet('PROFILE', profileData)

        // update name in user session too
        const u = JSON.parse(localStorage.getItem('ieee_its_user') || '{}')
        localStorage.setItem('ieee_its_user', JSON.stringify({ ...u, name }))

        setSaved(true)
        setEditName(false)
        setEditMobile(false)
        setEditRegNo(false)
        setSaving(false)
        setTimeout(() => setSaved(false), 3000)
    }

    /* ---- not logged in ---- */
    if (!user) {
        return (
            <div style={{ minHeight: '100vh' }}>
                <div className="page-header">
                    <p className="overline" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontWeight: 600 }}>Be Part of Us</p>
                    <h1>Join IEEE ITS - VIT</h1>
                    <p>Become a part of VIT's premier information theory community.</p>
                </div>
                <section className="section" style={{ paddingTop: 0 }}>
                    <div className="section-container">
                        <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
                            <div className="join-step" style={{ marginBottom: '48px' }}>
                                <div className="step-number">1</div>
                                <h3>Sign In</h3>
                                <p>Login with your Google account. This verifies your identity and grants you access to the chapter portal.</p>
                            </div>
                            <Link to="/login">
                                <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
                                    Get Started — Sign In →
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    /* ---- logged in: profile view ---- */
    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="page-header">
                <p className="overline" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontWeight: 600 }}>Member Portal</p>
                <h1>Your Profile</h1>
                <p>Welcome back, <strong style={{ color: 'var(--primary-light)' }}>{name || user.name}</strong> 👋</p>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="section-container">
                    <div className="profile-card">
                        {/* Avatar */}
                        <div className="profile-avatar-wrap">
                            {user.picture
                                ? <img src={user.picture} alt={user.name} className="profile-avatar-img" />
                                : <div className="profile-avatar-placeholder">{(name || user.name || '?')[0].toUpperCase()}</div>
                            }
                            <div className="profile-badge" style={{
                                background: user.memberType === 'VIT Student' ? 'rgba(0, 180, 216, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                color: user.memberType === 'VIT Student' ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                                border: `1px solid ${user.memberType === 'VIT Student' ? 'var(--neon-cyan)' : 'var(--border-color)'}`
                            }}>
                                {user.memberType === 'VIT Student' ? '✓ ' : '👤 '}{user.memberType}
                            </div>
                        </div>

                        {/* Fields */}
                        <div className="profile-fields">

                            {/* Name – editable */}
                            <div className="profile-field">
                                <label>Full Name</label>
                                <div className="profile-field-row">
                                    {editName
                                        ? <input
                                            className="profile-input"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            placeholder="Your name"
                                        />
                                        : <span className="profile-value">{name || user.name}</span>
                                    }
                                    <button
                                        className="profile-edit-btn"
                                        onClick={() => setEditName(v => !v)}
                                    >
                                        {editName ? '✕' : '✏️'}
                                    </button>
                                </div>
                            </div>

                            {/* Email – fixed */}
                            <div className="profile-field">
                                <label>Email <span className="profile-lock">🔒 fixed</span></label>
                                <div className="profile-field-row">
                                    <span className="profile-value muted">{user.email}</span>
                                </div>
                            </div>

                            {/* Mobile – editable */}
                            <div className="profile-field">
                                <label>Mobile Number
                                    {!editMobile && mobile && <span className="profile-lock">🔒 saved</span>}
                                </label>
                                <div className="profile-field-row">
                                    {editMobile
                                        ? <input
                                            className="profile-input"
                                            value={mobile}
                                            onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            placeholder="10-digit mobile number"
                                            type="tel"
                                        />
                                        : <span className="profile-value">{mobile || 'Not set'}</span>
                                    }
                                    <button
                                        className="profile-edit-btn"
                                        onClick={() => setEditMobile(v => !v)}
                                    >
                                        {editMobile ? '✕' : '✏️'}
                                    </button>
                                </div>
                            </div>

                            {/* Registration Number */}
                            <div className="profile-field">
                                <label>Registration Number
                                    {!editRegNo && regNo && <span className="profile-lock">🔒 saved</span>}
                                </label>
                                <div className="profile-field-row">
                                    {editRegNo
                                        ? <input
                                            className="profile-input"
                                            value={regNo}
                                            onChange={e => setRegNo(e.target.value.toUpperCase().slice(0, 10))}
                                            placeholder="e.g. 23BCE0001"
                                        />
                                        : <span className="profile-value">{regNo || 'Not set'}</span>
                                    }
                                    <button
                                        className="profile-edit-btn"
                                        onClick={() => setEditRegNo(v => !v)}
                                    >
                                        {editRegNo ? '✕' : '✏️'}
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="profile-actions">
                            <button className="btn-primary" onClick={handleSave} disabled={saving}>
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                            {saved && <span className="profile-saved-msg">✅ Profile saved!</span>}
                            <button
                                className="btn-secondary"
                                style={{ marginTop: '12px' }}
                                onClick={logout}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
