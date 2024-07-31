import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Base64 } from 'js-base64'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const uploadSchema = z.object({
    fileCsv: z.instanceof(File),
})

export default function CreateForm() {
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof uploadSchema>>({
        resolver: zodResolver(uploadSchema),
        mode: 'onTouched',
        defaultValues: {
            fileCsv: undefined,
        },
    })

    const create = api.rekeningKoran.importCsv.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.rekeningKoran.invalidate()
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof uploadSchema>) {
        console.log(val)

        let reader = new FileReader()

        reader.readAsDataURL(val.fileCsv)
        reader.onload = function () {
            if (typeof reader.result !== 'string') return

            // const base64Format = Base64.encode(reader.result)

            const base64Format = reader.result.split(',')[1]

            create.mutate({ fileCsv: base64Format })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={create.isPending}
                    className="flex flex-row items-end gap-2"
                >
                    <FormField
                        name="fileCsv"
                        render={({
                            field: { value, onChange, ...fieldProps },
                        }) => (
                            <FormItem>
                                <FormLabel className="normal-case">
                                    File CSV
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...fieldProps}
                                        type="file"
                                        accept="text/csv"
                                        onChange={(event) =>
                                            onChange(
                                                event.target.files &&
                                                    event.target.files[0]
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="mt-3">
                        <Button type="submit">
                            {create.isPending ? 'Menyimpan...' : 'Import Data'}
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
