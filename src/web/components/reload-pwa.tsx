import { useRegisterSW } from 'virtual:pwa-register/react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { CardTitle } from './ui/card'
import { Helmet } from 'react-helmet'

const ReloadPrompt = () => {
    const {
        needRefresh: [needRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl, registration) {
            console.log(`Service Worker at: ${swUrl}`)
            registration &&
                setInterval(() => {
                    registration.update()
                }, 3000)
        },
        // immediate: true,  // load SW immediately
        onNeedRefresh() {
            console.log('App is outdated. Need to refresh')
        },
        onRegisterError(error) {
            console.log('SW registration error', error)
        },
    })

    return (
        <AlertDialog open={!!needRefresh}>
            {needRefresh && (
                <Helmet>
                    <title>Update Aplikasi Sekarang! - SIPEKA</title>
                </Helmet>
            )}
            <AlertDialogContent className="w-full max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <div className="flex w-full flex-col gap-4">
                            <div className="mx-auto">
                                <img
                                    src="/images/icons/startup.png"
                                    alt="Update aplikasi"
                                    className="mb-5 w-36"
                                />
                            </div>
                            <CardTitle className="text-center">
                                Update Versi Terbaru
                            </CardTitle>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <p className="text-center text-gray-500">
                            Silahkan update untuk mendapatkan versi aplikasi
                            yang lebih aman dan cepat.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button
                        type="button"
                        className="w-full"
                        size="lg"
                        onClick={() => {
                            updateServiceWorker(true)
                        }}
                    >
                        Update Aplikasi
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ReloadPrompt
