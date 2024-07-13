import { useRegisterSW } from 'virtual:pwa-register/react'
import { Button } from './ui/button'

const ReloadButton = () => {
    const { updateServiceWorker } = useRegisterSW()

    return (
        <Button
            type="button"
            className="w-full"
            onClick={() => {
                updateServiceWorker(true)
            }}
        >
            Update Aplikasi
        </Button>
    )
}

export default ReloadButton
