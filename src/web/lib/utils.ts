import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatTanggal(date: string | Date | null) {
    return format(date ? new Date(date) : Date.now(), 'dd MMMM yyyy', {
        locale: id,
    })
}

export function formatAngka(angka: number | string | null | undefined) {
    return new Intl.NumberFormat('id-ID').format(Number(angka ?? 0))
}
