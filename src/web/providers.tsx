import '@/styles/globals.css'
import Router from './router'
import { Toaster } from 'react-hot-toast'
import { TRPCReactProvider } from '@/trpc/react'
import { CookiesProvider } from 'react-cookie'

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
