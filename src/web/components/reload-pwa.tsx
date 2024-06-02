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

const ReloadPrompt = () => {
    const {
        needRefresh: [needRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(_swUrl, registration) {
            registration &&
                setInterval(() => {
                    registration.update()
                }, 5000)
        },
        onRegisterError(error) {
            console.log('SW registration error', error)
        },
    })

    return (
        <AlertDialog open={!!needRefresh}>
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
                            <h4 className="text-center">
                                Versi Terbaru SIPEKA Tersedia!
                            </h4>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <p className="text-center text-gray-500">
                            Silahkan update untuk mendapatkan versi yang lebih
                            aman dan cepat.
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
