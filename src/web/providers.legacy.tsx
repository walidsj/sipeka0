import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { TRPCReactProvider } from '@/trpc/react'
import { CookiesProvider } from 'react-cookie'
import Router from './router.legacy'

export default function Providers() {
    return (
        <CookiesProvider>
            <TRPCReactProvider>
                <Router />
                <Toaster />
            </TRPCReactProvider>
        </CookiesProvider>
    )
}
