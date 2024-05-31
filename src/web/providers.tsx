import '@/web/styles/index.css'
import '@fontsource-variable/plus-jakarta-sans'

import Router from './router'
import { TRPCReactProvider } from '@/web/trpc/react'

export default function Providers() {
    return (
        <TRPCReactProvider>
            <Router />
        </TRPCReactProvider>
    )
}
