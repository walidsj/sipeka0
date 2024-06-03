import { EditForm } from './form'
import { api } from '@/web/trpc/react'

export default function Page() {
    const profilBlud = api.profilBlud.get.useQuery()

    return (
        <div className="flex flex-row gap-5">
            <div>
                <img src="/images/icons/policy.png" className="h-36" />
            </div>
            <div className="w-96">
                {profilBlud.isSuccess && (
                    <EditForm
                        data={
                            profilBlud.data
                                ? profilBlud.data
                                : {
                                      nama: '',
                                      alamat: '',
                                      noFax: '',
                                      noTelp: '',
                                      email: '',
                                      website: '',
                                  }
                        }
                    />
                )}
            </div>
        </div>
    )
}
