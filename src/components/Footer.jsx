import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer" id="footer">
            <div className="footer-grid">
                <div className="footer-brand">
                    <div className="footer-logo-wrap">
                        <img src="/logo-round.png" alt="IEEE ITS" className="footer-logo-round" />
                        <img src="/logo-text.png" alt="IEEE ITS" className="footer-logo-text" />
                    </div>
                    <p>The Information Theory Society chapter at VIT, fostering innovation in information theory, coding, and beyond.</p>
                    <div className="social-links">
                        <a href="https://www.instagram.com/ieeeitsvit?igsh=MXdpbjhseXh4ZGN0" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                        </a>
                        <a href="https://www.linkedin.com/company/ieee-its-chapter-vit/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                        </a>
                        <a href="mailto:ieeeits.vit@gmail.com" className="social-link" aria-label="Email">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        </a>
                    </div>
                </div>
                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/blogs">Blogs</Link></li>
                        <li><Link to="/vlogs">Vlogs</Link></li>
                        <li><Link to="/timeline">Events</Link></li>
                        <li><Link to="/merch">Merch</Link></li>
                        <li><Link to="/games">Games</Link></li>
                    </ul>

                </div>
                <div className="footer-col">
                    <h4>Community</h4>
                    <ul>
                        <li><Link to="/join">Join Us</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/moments">Moments</Link></li>
                        <li><Link to="/faculty">Faculty</Link></li>
                        <li><Link to="/web-team">Web Team</Link></li>
                        <li><Link to="/suggestions">Suggestions</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Contact</h4>
                    <ul>
                        <li><a href="mailto:ieeeits.vit@gmail.com">ieeeits.vit@gmail.com</a></li>
                        <li><a href="tel:+919711059508">+91 97110 59508</a></li>
                        <li><span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>VIT, Vellore, Tamil Nadu</span></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} IEEE ITS - VIT Chapter. All rights reserved.</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    Made with 💙 by <Link to="/web-team" style={{ color: 'var(--primary-light)', fontWeight: 600 }}>IEEE ITS Web Team</Link>
                </p>
            </div>
        </footer>
    )
}
