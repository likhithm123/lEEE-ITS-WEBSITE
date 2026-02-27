import { useState, useEffect } from 'react'
import { auth, signOut, onAuthStateChanged } from '../firebase'
import { saveToSheet } from '../services/googleSheets'

export function useAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const isVit = currentUser.email.endsWith('@vit.ac.in') || currentUser.email.endsWith('@vitstudent.ac.in')

                // Retrieve extra details from local storage if they exist
                const profileExtras = JSON.parse(localStorage.getItem('ieee_its_profile') || '{}')

                const userData = {
                    name: profileExtras.name || currentUser.displayName,
                    email: currentUser.email,
                    picture: currentUser.photoURL,
                    memberType: isVit ? 'VIT Student' : 'External Member',
                    regNo: profileExtras.regNo || '',
                    mobile: profileExtras.mobile || ''
                }
                setUser(userData)
                localStorage.setItem('ieee_its_user', JSON.stringify(userData))

                // Log login event to Google Sheets
                saveToSheet('LOGS', {
                    email: currentUser.email,
                    name: currentUser.displayName,
                    type: 'LOGIN_LOG'
                })
            } else {
                setUser(null)
                localStorage.removeItem('ieee_its_user')
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const logout = async () => {
        try {
            await signOut(auth)
            localStorage.removeItem('ieee_its_user')
            setUser(null)
        } catch (err) {
            console.error('Logout error:', err)
        }
    }

    return { user, logout, loading }
}
