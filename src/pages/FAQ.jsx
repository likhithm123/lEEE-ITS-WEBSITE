import { useState } from 'react'

const FAQS = [
    { q: 'What is IEEE ITS?', a: 'IEEE Information Theory Society (ITS) is a global community focused on the advancement of information theory and its applications. Our VIT chapter brings this mission to campus through events, workshops, and projects.' },
    { q: 'Who can join IEEE ITS VIT?', a: 'Any student who is passionate about doing something new and innovative can join. No prior experience is required!' },
    { q: 'How do I become a member?', a: 'Head to our "Join Us" page and fill out the application form. You\'ll need to sign in with your Google account and complete a short onboarding process.' },
    { q: 'What kind of events do you organize?', a: 'We organize workshops, hackathons, seminars, paper reading groups, coding competitions, guest lectures, and our flagship annual Tech Symposium.' },
    { q: 'Can first-year students join?', a: 'Absolutely! We welcome students from all years. First-year students bring fresh perspectives and energy to our community.' },
    { q: 'How can I contribute to blogs or vlogs?', a: 'We have an open content team! If you love writing or creating video content about tech and information theory, reach out to our Content Lead.' },
    { q: 'Do you collaborate with other chapters?', a: 'Yes! We regularly collaborate with other IEEE societies, ACM, GDG, and other tech communities on campus and beyond.' },
]

export default function FAQ() {
    const [active, setActive] = useState(null)

    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="page-header">
                <p className="overline" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontWeight: 600 }}>Got Questions?</p>
                <h1>Frequently Asked Questions</h1>
                <p>Everything you need to know about IEEE ITS - VIT Chapter.</p>
            </div>
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="section-container">
                    <div className="faq-list">
                        {FAQS.map((f, i) => (
                            <div className={`faq-item ${active === i ? 'active' : ''}`} key={i}>
                                <button className="faq-question" onClick={() => setActive(active === i ? null : i)}>
                                    {f.q}
                                    <span className="arrow">▼</span>
                                </button>
                                <div className="faq-answer">
                                    <p>{f.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
