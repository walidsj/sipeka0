import '@/web/styles/index.css'
import '@fontsource-variable/plus-jakarta-sans'
import Router from './router'
import { Toaster } from 'react-hot-toast'
import { TRPCReactProvider } from '@/web/trpc/react'
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
