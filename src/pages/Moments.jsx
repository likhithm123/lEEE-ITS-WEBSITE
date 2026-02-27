import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ============================================================
   MomentCard
   – single photo  → just shows the image with zoom on hover
   – multiple photos → left/right arrows appear on hover,
                       photos slide in/out smooth
   ============================================================ */
function MomentCard({ label, photos, delay }) {
    const [idx, setIdx] = useState(0)
    const [hovered, setHovered] = useState(false)
    const [dir, setDir] = useState(1)      // 1 = next, -1 = prev

    const multi = photos.length > 1

    const go = useCallback((step, e) => {
        e.stopPropagation()
        setDir(step)
        setIdx(i => (i + step + photos.length) % photos.length)
    }, [photos.length])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="moment-card glass-panel"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Photo */}
            <div className="moment-img-wrapper" style={{ overflow: 'hidden', height: '100%', borderRadius: 'inherit' }}>
                <AnimatePresence initial={false} custom={dir}>
                    <motion.img
                        key={idx}
                        custom={dir}
                        variants={{
                            enter: (direction) => ({
                                x: direction > 0 ? 300 : -300,
                                opacity: 0,
                                scale: 1.1
                            }),
                            center: {
                                x: 0,
                                opacity: 1,
                                scale: 1
                            },
                            exit: (direction) => ({
                                x: direction < 0 ? 300 : -300,
                                opacity: 0,
                                scale: 0.9
                            })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 }
                        }}
                        src={photos[idx]}
                        alt={label}
                        className="moment-photo"
                        style={{ position: multi ? 'absolute' : 'relative', width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </AnimatePresence>
            </div>

            {/* Arrow controls — only for multi-photo */}
            {multi && hovered && (
                <>
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="moment-arrow left"
                        onClick={(e) => go(-1, e)}
                        aria-label="Previous photo"
                    >‹</motion.button>
                    <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="moment-arrow right"
                        onClick={(e) => go(1, e)}
                        aria-label="Next photo"
                    >›</motion.button>

                    {/* Dot strip */}
                    <div className="moment-dots">
                        {photos.map((_, i) => (
                            <span
                                key={i}
                                className={`moment-dot${i === idx ? ' active' : ''}`}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Label gradient overlay */}
            <motion.div
                className="moment-overlay"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <span className="moment-label text-glow">{label}</span>
                {multi && (
                    <span className="moment-photo-count">{idx + 1} / {photos.length}</span>
                )}
            </motion.div>
        </motion.div>
    )
}

const MOMENTS = [
    {
        label: "Junior Core 2026 Interaction",
        photos: ['/junior-core.jpg', '/junior-core-1.jpg'],
    },
    {
        label: "Day 1 ic-ETITE'24 Inagural",
        photos: [
            '/moments/ic-etite-24-inagural/004A3176.JPG',
            '/moments/ic-etite-24-inagural/004A3184.JPG',
            '/moments/ic-etite-24-inagural/004A3153.JPG',
            '/moments/ic-etite-24-inagural/004A3192.JPG',
            '/moments/ic-etite-24-inagural/004A3210.JPG',
            '/moments/ic-etite-24-inagural/004A3166.JPG',
            '/moments/ic-etite-24-inagural/004A3215.JPG',
            '/moments/ic-etite-24-inagural/004A3308.JPG',
            '/moments/ic-etite-24-inagural/004A3340.JPG',
            '/moments/ic-etite-24-inagural/004A3347.JPG'
        ],
    },
    {
        label: "ic-ETITE'24 Expo",
        photos: [
            '/moments/ic-etite-24-expo/004A3365.JPG',
            '/moments/ic-etite-24-expo/004A3367.JPG',
            '/moments/ic-etite-24-expo/004A3372.JPG',
            '/moments/ic-etite-24-expo/004A3364.JPG',
            '/moments/ic-etite-24-expo/004A3382.JPG',
            '/moments/ic-etite-24-expo/004A3379.JPG',
            '/moments/ic-etite-24-expo/004A3390.JPG',
            '/moments/ic-etite-24-expo/004A3407.JPG',
            '/moments/ic-etite-24-expo/004A3569.JPG',
            '/moments/ic-etite-24-expo/004A3578.JPG',
            '/moments/ic-etite-24-expo/004A3161.JPG',
            '/moments/ic-etite-24-expo/004A3586.JPG',
            '/moments/ic-etite-24-expo/004A3611.JPG'
        ],
    },

    {
        label: "Quanta '23",
        photos: ['/quanta23-1.jpg', '/quanta23-2.jpg', '/quanta23-3.jpg'],
    },
    {
        label: 'Innoverse – YANTRA 23',
        photos: ['/inno.jpg', '/inno1.jpg', '/inno2.jpg', '/inno3.jpg'],
    },
    {
        label: 'CASA – Say No to Substance Abuse',
        photos: ['/casa1.jpg'],
    },
    {
        label: 'TECHTREK – YANTRA 24',
        photos: ['/004A3649.JPG'],      // placeholder until real photo is added
    },
]

/* ── Page ── */
export default function Moments() {
    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="page-header">
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overline"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontWeight: 600 }}>
                    Gallery
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-glow"
                >
                    Our Moments
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Snapshots from our journey — the events, the people, the memories.
                </motion.p>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="section-container">
                    <div className="moments-grid">
                        {MOMENTS.map((m, i) => (
                            <MomentCard key={i} label={m.label} photos={m.photos} delay={i * 0.1} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

