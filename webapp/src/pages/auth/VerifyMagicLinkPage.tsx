import { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '@state/stores/auth.store.ts'

export const VerifyMagicLinkPage = () => {
    const { signIn } = useAuthStore()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const location = useLocation()

    useEffect(() => {
        const linkCode = location.hash.substring(1)

        const preAuthSessionId = searchParams.get('preAuthSessionId')

        if (!preAuthSessionId) {
            navigate('/auth/sign-up')
        } else {
            signIn(linkCode, preAuthSessionId).then(() => {
                navigate('/home')
            })
        }
    }, [])

    return null
}
