import { useRegisterSW } from 'virtual:pwa-register/react'
import { Button } from './ui/button'

const ReloadButton = () => {
    const { updateServiceWorker } = useRegisterSW()

    return (
        <Button
            type="button"
            size="sm"
            className="w-full"
            onClick={() => {
                updateServiceWorker(true)
            }}
        >
            Cek Update
        </Button>
    )
}

export default ReloadButton
