import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { saveToSheet } from '../services/googleSheets'

const BLOGS = [
    {
        id: 'cyberbullying',
        tag: 'Social Impact',
        readTime: '5 min read',
        date: 'Feb 25, 2026',
        title: 'The impact of cyberbullying on young people’s mental health',
        desc: 'Cyberbullying has become a serious threat affecting young people today, persisting beyond physical spaces and creating a continuous cycle of harassment.',
        image: '/blog-cyber.png',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        content: `
            <p>Cyberbullying has become the most serious problem affecting young people today, with the rise of smartphones and social media platforms like Facebook, Instagram, and Snapchat. Communication has become faster and more public than ever before. While these platforms offer connections and entertainment, they also create spaces where harassment can occur easily and repeatedly. Unlike normal bullying, cyberbullying will not stop when the person leaves the place. It will be continued whole day or week, making the victim feel it is impossible to escape.</p>
            
            <p>One of the most immediate effects of cyberbullying is anxiety. Young people may constantly worry about what others are saying about them online. They might feel afraid to check their phones or open social media apps. Over time, this fear can develop into chronic stress or panic attacks.</p>
            
            <p>Cyberbullying is a serious threat to young people’s mental health. Creating safer and kinder online spaces is essential to protect their well-being and future.</p>
        `
    },
    {
        id: 'regulation',
        tag: 'Digital Policy',
        readTime: '4 min read',
        date: 'Feb 24, 2026',
        title: 'Why social media needs to be regulated',
        desc: 'As social media becomes a powerful force in daily life, the need for clear rules to protect users and combat misinformation becomes essential.',
        image: '/blog-social.png',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        content: `
            <p>Social media needs to be regulated because it has become a powerful part of our daily lives. Millions of people use platforms like Instagram, Facebook, and X to share ideas, news, and opinions. While this can be positive it also creates serious problems. False information spreads very quickly and many people believe it without checking facts. This can cause fear.</p>
            
            <p>Social media can also harm mental health. Constant comparison, cyberbullying, and online pressure can make people feel anxious or depressed. Young users are especially affected. In addition some platforms collect personal data without users fully understanding how it is used.</p>
            
            <p>Regulation does not mean stopping free speech. It means setting clear rules to protect users, reduce harmful content, and ensure privacy. Just like traffic rules keep roads safe, basic regulations can make social media a safer and healthier space for everyone.</p>
        `
    }
]

const MAGAZINES = [
    {
        id: 1,
        title: "The Information Theory Review",
        edition: "Annual Edition 2025",
        gradient: 'linear-gradient(135deg, #00b4d8 0%, #7b2ff7 100%)',
        desc: "An in-depth look at AI-driven information recovery.",
        icon: "📕"
    },
    {
        id: 2,
        title: "ITS Tech Pulse",
        edition: "Q4 2025 Release",
        gradient: 'linear-gradient(135deg, #a855f7 0%, #00f5ff 100%)',
        desc: "Explaining Entropy in the context of modern big data.",
        icon: "📘"
    }
]

export default function Blogs() {
    const [selectedId, setSelectedId] = useState(null)
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [subscribed, setSubscribed] = useState(false)

    const blog = BLOGS.find(b => b.id === selectedId)

    const handleSubscribe = async (e) => {
        e.preventDefault()
        if (!email) return
        setSubmitting(true)

        // Save to Google Sheets
        await saveToSheet('COMMUNITY', { email, type: 'BLOG_NEWSLETTER' })

        setSubmitting(false)
        setSubscribed(true)
        setEmail('')
        setTimeout(() => setSubscribed(false), 5000)
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <AnimatePresence mode="wait">
                {!selectedId ? (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="page-header">
                            <p className="overline" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontWeight: 600 }}>The Knowledge Hub</p>
                            <h1>Blogs & Insights</h1>
                            <p>Deep dives into the world of information theory and modern digital society.</p>
                        </div>

                        {/* Top Banner for Magazines */}
                        <section className="section" style={{ paddingBottom: 40, paddingTop: 0 }}>
                            <div className="section-container">
                                <div className="magazine-banner">
                                    <div className="magazine-text">
                                        <span className="mag-tag">New Release</span>
                                        <h2>IEEE ITS Annual Magazine</h2>
                                        <p>Explore our peer-reviewed articles and research summaries from the past year.</p>
                                        <div className="mag-actions">
                                            <button className="btn-primary" disabled style={{ opacity: 0.6, cursor: 'not-allowed', filter: 'grayscale(0.5)' }}>Coming Soon</button>
                                        </div>
                                    </div>
                                    <div className="mag-previews">
                                        {MAGAZINES.map(m => (
                                            <div className="mag-mini-card" key={m.id} style={{ background: m.gradient }}>
                                                <div className="mag-icon">{m.icon}</div>
                                                <div className="mag-info">
                                                    <h4>{m.title}</h4>
                                                    <span>{m.edition}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="section" style={{ paddingTop: 20 }}>
                            <div className="section-container">
                                <div className="blog-grid">
                                    {BLOGS.map((b) => (
                                        <motion.div
                                            className="blog-card"
                                            key={b.id}
                                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                            onClick={() => setSelectedId(b.id)}
                                        >
                                            <div className="blog-img">
                                                <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                <span className="tag">{b.tag}</span>
                                            </div>
                                            <div className="blog-body">
                                                <div className="date-row">
                                                    <span className="date">{b.date}</span>
                                                    <span className="read-time">{b.readTime}</span>
                                                </div>
                                                <h3>{b.title}</h3>
                                                <p>{b.desc}</p>
                                                <div className="read-more">Read Full Article →</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Newsletter Section */}
                        <section className="section">
                            <div className="section-container">
                                <div className="subscribe-section" style={{ maxWidth: '100%', margin: '0' }}>
                                    <h2>Join the Theoretical Inner Circle</h2>
                                    <p>Get monthly insights, event early-access, and research highlights delivered to your inbox.</p>
                                    <form className="subscribe-form" onSubmit={handleSubscribe}>
                                        <input
                                            type="email"
                                            placeholder="your.email@vitstudent.ac.in"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <button type="submit" disabled={submitting}>
                                            {submitting ? 'Connecting...' : 'Subscribe'}
                                        </button>
                                    </form>
                                    {subscribed && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="subscribe-success"
                                        >
                                            ✨ You're on the list! Welcome aboard.
                                        </motion.p>
                                    )}
                                </div>
                            </div>
                        </section>
                    </motion.div>
                ) : (
                    <motion.div
                        key="article"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="article-view"
                    >
                        <div className="article-container">
                            <button className="back-btn" onClick={() => setSelectedId(null)}>
                                ← Back to Blogs
                            </button>

                            <div className="article-header">
                                <div className="tag-row">
                                    <span className="article-tag">{blog.tag}</span>
                                    <span className="article-dot">•</span>
                                    <span className="article-date">{blog.date}</span>
                                </div>
                                <h1>{blog.title}</h1>
                                <div className="article-meta">
                                    <span className="reading-time">⏱️ {blog.readTime}</span>
                                </div>
                            </div>

                            <div className="article-hero-img">
                                <img src={blog.image} alt={blog.title} />
                            </div>

                            <div className="article-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

                            <div className="article-footer">
                                <p>Liked this article? Share it or subscribe to our newsletter for more insights.</p>
                                <button className="btn-primary" onClick={() => setSelectedId(null)}>Explore Other Blogs</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
