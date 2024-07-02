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

export function terbilang(a: number): string {
    const bilangan: string[] = [
        '',
        'Satu',
        'Dua',
        'Tiga',
        'Empat',
        'Lima',
        'Enam',
        'Tujuh',
        'Delapan',
        'Sembilan',
        'Sepuluh',
        'Sebelas',
    ]

    let kalimat: string = ''

    if (a < 12) {
        kalimat = bilangan[a]
    } else if (a < 20) {
        kalimat = bilangan[a - 10] + ' Belas'
    } else if (a < 100) {
        const utama: number = a / 10
        const depan: number = parseInt(String(utama).substr(0, 1))
        const belakang: number = a % 10
        kalimat = bilangan[depan] + ' Puluh ' + bilangan[belakang]
    } else if (a < 200) {
        kalimat = 'Seratus ' + terbilang(a - 100)
    } else if (a < 1000) {
        const utama: number = a / 100
        const depan: number = parseInt(String(utama).substr(0, 1))
        const belakang: number = a % 100
        kalimat = bilangan[depan] + ' Ratus ' + terbilang(belakang)
    } else if (a < 2000) {
        kalimat = 'Seribu ' + terbilang(a - 1000)
    } else if (a < 10000) {
        const utama: number = a / 1000
        const depan: number = parseInt(String(utama).substr(0, 1))
        const belakang: number = a % 1000
        kalimat = bilangan[depan] + ' Ribu ' + terbilang(belakang)
    } else if (a < 100000) {
        const utama: number = a / 100
        const depan: number = parseInt(String(utama).substr(0, 2))
        const belakang: number = a % 1000
        kalimat = terbilang(depan) + ' Ribu ' + terbilang(belakang)
    } else if (a < 1000000) {
        const utama: number = a / 1000
        const depan: number = parseInt(String(utama).substr(0, 3))
        const belakang: number = a % 1000
        kalimat = terbilang(depan) + ' Ribu ' + terbilang(belakang)
    } else if (a < 100000000) {
        const utama: number = a / 1000000
        const depan: number = parseInt(String(utama).substr(0, 4))
        const belakang: number = a % 1000000
        kalimat = terbilang(depan) + ' Juta ' + terbilang(belakang)
    } else if (a < 1000000000) {
        const utama: number = a / 1000000
        const depan: number = parseInt(String(utama).substr(0, 4))
        const belakang: number = a % 1000000
        kalimat = terbilang(depan) + ' Juta ' + terbilang(belakang)
    } else if (a < 10000000000) {
        const utama: number = a / 1000000000
        const depan: number = parseInt(String(utama).substr(0, 1))
        const belakang: number = a % 1000000000
        kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang)
    } else if (a < 100000000000) {
        const utama: number = a / 1000000000
        const depan: number = parseInt(String(utama).substr(0, 2))
        const belakang: number = a % 1000000000
        kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang)
    } else if (a < 1000000000000) {
        const utama: number = a / 1000000000
        const depan: number = parseInt(String(utama).substr(0, 3))
        const belakang: number = a % 1000000000
        kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang)
    } else if (a < 10000000000000) {
        const utama: number = a / 10000000000
        const depan: number = parseInt(String(utama).substr(0, 1))
        const belakang: number = a % 10000000000
        kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang)
    } else if (a < 100000000000000) {
        const utama: number = a / 1000000000000
        const depan: number = parseInt(String(utama).substr(0, 2))
        const belakang: number = a % 1000000000000
        kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang)
    } else if (a < 1000000000000000) {
        const utama: number = a / 1000000000000
        const depan: number = parseInt(String(utama).substr(0, 3))
        const belakang: number = a % 1000000000000
        kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang)
    } else if (a < 10000000000000000) {
        const utama: number = a / 1000000000000000
        const depan: number = parseInt(String(utama).substr(0, 1))
        const belakang: number = a % 1000000000000000
        kalimat = terbilang(depan) + ' Kuadriliun ' + terbilang(belakang)
    }

    const pisah: string[] = kalimat.split(' ')
    const full: string[] = []
    for (let i = 0; i < pisah.length; i++) {
        if (pisah[i] !== '') {
            full.push(pisah[i])
        }
    }
    return full.join(' ')
}
