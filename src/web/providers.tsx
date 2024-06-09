import '@/web/styles/index.css'
import Router from './router'
import { Toaster } from 'react-hot-toast'
import { TRPCReactProvider } from '@/web/trpc/react'
import { CookiesProvider } from 'react-cookie'
import ReloadPrompt from './components/reload-pwa'

export default function Providers() {
    return (
        <CookiesProvider>
            <TRPCReactProvider>
                <div className="min-h-svh">
                    <ReloadPrompt />
                    <Router />
                </div>
                <Toaster />
            </TRPCReactProvider>
        </CookiesProvider>
    )
}
