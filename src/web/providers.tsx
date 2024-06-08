import '@/web/styles/index.css'
import Router from './router'
import { Toaster } from 'react-hot-toast'
import { TRPCReactProvider } from '@/web/trpc/react'
import { CookiesProvider } from 'react-cookie'

export default function Providers() {
    return (
        <CookiesProvider>
            <TRPCReactProvider>
                <div className="min-h-svh">
                    <Router />
                </div>
                <Toaster />
            </TRPCReactProvider>
        </CookiesProvider>
    )
}
