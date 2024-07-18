import '@/styles/globals.css'
import Router from './router'
import { Toaster } from 'react-hot-toast'
import { TRPCReactProvider } from '@/trpc/react'
import { CookiesProvider } from 'react-cookie'
// import ReloadPrompt from '@/components/reload-pwa'

export default function Providers() {
    return (
        <CookiesProvider>
            <TRPCReactProvider>
                {/* <ReloadPrompt /> */}
                <Router />
                <Toaster />
            </TRPCReactProvider>
        </CookiesProvider>
    )
}
