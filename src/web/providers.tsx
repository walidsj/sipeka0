import '@/styles/globals.css'
import { routes } from './router'
import { Toaster } from 'react-hot-toast'
import { TRPCReactProvider } from '@/trpc/react'
import { CookiesProvider } from 'react-cookie'
import { createBrowserRouter, RouterProvider } from 'react-router'

export default function Providers() {
    const router = createBrowserRouter(routes)

    return (
        <CookiesProvider>
            <TRPCReactProvider>
                <RouterProvider router={router} />
                <Toaster />
            </TRPCReactProvider>
        </CookiesProvider>
    )
}
