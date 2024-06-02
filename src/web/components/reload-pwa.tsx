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
import { useNavigate } from 'react-router-dom'

const ReloadPrompt = () => {
    const navigate = useNavigate()

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
                                Versi Terbaru Tersedia
                            </h4>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <p className="text-center text-gray-500">
                            Update aplikasi SIPEKA versi terbaru telah tersedia,
                            silahkan update untuk mendapatkan versi yang lebih
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
                            navigate(0)
                        }}
                    >
                        Update Aplikasi
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

    // return (
    //     <Dialog open={!!needRefresh} onClose={() => null}>
    //         <div className="fixed inset-0 z-20 px-4">
    //             <div className="min-h-screen text-center">
    //                 <div className="fixed inset-0 bg-black/70"></div>
    //                 <div className="fixed inset-0 z-10 overflow-y-auto">
    //                     <div className="flex min-h-screen items-end justify-center p-8 text-center sm:items-center sm:p-0">
    //                         <div className="m-auto inline-block w-full transform text-left align-middle transition-all">
    //                             <div className="relative z-20 mx-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
    //                                 <div className="flex flex-col gap-3">
    //                                     <FiUploadCloud className="mx-auto mt-3 h-20 w-20 text-gray-500" />
    //                                     <Dialog.Panel>
    //                                         <Dialog.Title className="text-lg font-semibold">
    //                                             <div className="text-center">
    //                                                 Update Aplikasi SIPEKA
    //                                             </div>
    //                                         </Dialog.Title>
    //                                         <div className="mt-2">
    //                                             <div className="text-center">
    //                                                 <div className="mt-2">
    //                                                     <p className="text-sm text-gray-500">
    //                                                         Versi terbaru dari
    //                                                         Aplikasi MyAtma
    //                                                         telah tersedia,
    //                                                         silahkan update
    //                                                         untuk mendapatkan
    //                                                         versi yang lebih
    //                                                         aman dan cepat.
    //                                                     </p>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                         <div className="mt-4">
    //                                             <div className="mt-8 flex justify-between space-x-3">
    //                                                 <button
    //                                                     onClick={() =>
    //                                                         updateServiceWorker(
    //                                                             true
    //                                                         )
    //                                                     }
    //                                                     type="button"
    //                                                     className="flex w-full items-center justify-center gap-3 rounded-3xl bg-primary bg-gradient-to-r from-primary to-sky-400 px-8 py-5 font-semibold text-white shadow-lg active:bg-opacity-80 disabled:bg-opacity-40 disabled:text-opacity-50"
    //                                                     tabIndex={0}
    //                                                 >
    //                                                     Update Sekarang
    //                                                 </button>
    //                                             </div>
    //                                         </div>
    //                                     </Dialog.Panel>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </Dialog>
    // )
}

export default ReloadPrompt
