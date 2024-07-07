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

export function formatAngkaDecimal(angka: number | string | null | undefined) {
    return new Intl.NumberFormat('id-ID', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    }).format(Number(angka ?? 0))
}

// export function terbilang(a: number): string {
//     const bilangan: string[] = [
//         '',
//         'Satu',
//         'Dua',
//         'Tiga',
//         'Empat',
//         'Lima',
//         'Enam',
//         'Tujuh',
//         'Delapan',
//         'Sembilan',
//         'Sepuluh',
//         'Sebelas',
//     ]

//     let kalimat: string = ''

//     if (a < 12) {
//         kalimat = bilangan[a]
//     } else if (a < 20) {
//         kalimat = bilangan[a - 10] + ' Belas'
//     } else if (a < 100) {
//         const utama: number = a / 10
//         const depan: number = parseInt(String(utama).substr(0, 1))
//         const belakang: number = a % 10
//         kalimat = bilangan[depan] + ' Puluh ' + bilangan[belakang]
//     } else if (a < 200) {
//         kalimat = 'Seratus ' + terbilang(a - 100)
//     } else if (a < 1000) {
//         const utama: number = a / 100
//         const depan: number = parseInt(String(utama).substr(0, 1))
//         const belakang: number = a % 100
//         kalimat = bilangan[depan] + ' Ratus ' + terbilang(belakang)
//     } else if (a < 2000) {
//         kalimat = 'Seribu ' + terbilang(a - 1000)
//     } else if (a < 10000) {
//         const utama: number = a / 1000
//         const depan: number = parseInt(String(utama).substr(0, 1))
//         const belakang: number = a % 1000
//         kalimat = bilangan[depan] + ' Ribu ' + terbilang(belakang)
//     } else if (a < 100000) {
//         const utama: number = a / 100
//         const depan: number = parseInt(String(utama).substr(0, 2))
//         const belakang: number = a % 1000
//         kalimat = terbilang(depan) + ' Ribu ' + terbilang(belakang)
//     } else if (a < 1000000) {
//         const utama: number = a / 1000
//         const depan: number = parseInt(String(utama).substr(0, 3))
//         const belakang: number = a % 1000
//         kalimat = terbilang(depan) + ' Ribu ' + terbilang(belakang)
//     } else if (a < 100000000) {
//         const utama: number = a / 1000000
//         const depan: number = parseInt(String(utama).substr(0, 4))
//         const belakang: number = a % 1000000
//         kalimat = terbilang(depan) + ' Juta ' + terbilang(belakang)
//     } else if (a < 1000000000) {
//         const utama: number = a / 1000000
//         const depan: number = parseInt(String(utama).substr(0, 4))
//         const belakang: number = a % 1000000
//         kalimat = terbilang(depan) + ' Juta ' + terbilang(belakang)
//     } else if (a < 10000000000) {
//         const utama: number = a / 1000000000
//         const depan: number = parseInt(String(utama).substr(0, 1))
//         const belakang: number = a % 1000000000
//         kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang)
//     } else if (a < 100000000000) {
//         const utama: number = a / 1000000000
//         const depan: number = parseInt(String(utama).substr(0, 2))
//         const belakang: number = a % 1000000000
//         kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang)
//     } else if (a < 1000000000000) {
//         const utama: number = a / 1000000000
//         const depan: number = parseInt(String(utama).substr(0, 3))
//         const belakang: number = a % 1000000000
//         kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang)
//     } else if (a < 10000000000000) {
//         const utama: number = a / 10000000000
//         const depan: number = parseInt(String(utama).substr(0, 1))
//         const belakang: number = a % 10000000000
//         kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang)
//     } else if (a < 100000000000000) {
//         const utama: number = a / 1000000000000
//         const depan: number = parseInt(String(utama).substr(0, 2))
//         const belakang: number = a % 1000000000000
//         kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang)
//     } else if (a < 1000000000000000) {
//         const utama: number = a / 1000000000000
//         const depan: number = parseInt(String(utama).substr(0, 3))
//         const belakang: number = a % 1000000000000
//         kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang)
//     } else if (a < 10000000000000000) {
//         const utama: number = a / 1000000000000000
//         const depan: number = parseInt(String(utama).substr(0, 1))
//         const belakang: number = a % 1000000000000000
//         kalimat = terbilang(depan) + ' Kuadriliun ' + terbilang(belakang)
//     }

//     const pisah: string[] = kalimat.split(' ')
//     const full: string[] = []
//     for (let i = 0; i < pisah.length; i++) {
//         if (pisah[i] !== '') {
//             full.push(pisah[i])
//         }
//     }
//     return full.join(' ')
// }

const units = [
    '',
    'ribu',
    'juta',
    'milyar',
    'triliun',
    'quadriliun',
    'quintiliun',
    'sextiliun',
    'septiliun',
    'oktiliun',
    'noniliun',
    'desiliun',
    'undesiliun',
    'duodesiliun',
    'tredesiliun',
    'quattuordesiliun',
    'quindesiliun',
    'sexdesiliun',
    'septendesiliun',
    'oktodesiliun',
    'novemdesiliun',
    'vigintiliun',
]
const maxIndex = units.length - 1
function digitToUnit(digit: number) {
    const curIndex = digit / 3
    return curIndex <= maxIndex ? units[curIndex] : units[maxIndex]
}

const numbers = [
    '',
    'satu',
    'dua',
    'tiga',
    'empat',
    'lima',
    'enam',
    'tujuh',
    'delapan',
    'sembilan',
]
function numberToText(index: number) {
    return numbers[index] || ''
}

export const terbilangin = (angka: number) => {
    const angkaStr = String(angka)
    const angkaLength = angkaStr.length
    const angkaMaxIndex = angkaLength - 1

    // Angka Nol
    if (angkaMaxIndex === 0 && Number(angkaStr[0]) === 0) {
        return 'nol'
    }

    let space = ''
    let result = ''

    let i = 0
    while (i !== angkaLength) {
        const digitCount = angkaMaxIndex - i
        const modGroup = digitCount % 3 // [2,1,0]
        const curAngka = Number(angkaStr[i])

        if (
            digitCount === 3 &&
            curAngka === 1 &&
            (i === 0 ||
                (Number(angkaStr[i - 2]) === 0 &&
                    Number(angkaStr[i - 1]) === 0))
        ) {
            /* Angka Seribu */
            result += `${space}seribu`
        } else {
            if (curAngka !== 0) {
                if (modGroup === 0) {
                    /* Angka Satuan Bukan Nol */
                    result += `${space}${numberToText(curAngka)}${i === angkaMaxIndex ? '' : ' '}${digitToUnit(digitCount)}`
                } else if (modGroup === 2) {
                    /* Angka Ratusan */
                    if (curAngka === 1) {
                        result += `${space}seratus`
                    } else {
                        result += `${space}${numberToText(curAngka)} ratus`
                    }
                } else {
                    /* Angka Sepuluh dan Belasan */
                    if (curAngka === 1) {
                        i++ // Skip Next Angka
                        const nextAngka = Number(angkaStr[i])
                        if (nextAngka === 0) {
                            result += `${space}sepuluh`
                            /* Proses Next Angka Sekarang */
                            if (
                                digitCount !== 1 &&
                                (Number(angkaStr[i - 2]) !== 0 ||
                                    Number(angkaStr[i - 1]) !== 0)
                            ) {
                                result += ` ${digitToUnit(digitCount - 1)}`
                            }
                        } else {
                            if (nextAngka === 1) {
                                result += `${space}sebelas`
                            } else {
                                result += `${space}${numberToText(nextAngka)} belas`
                            }
                            /* Proses Next Angka Sekarang */
                            if (digitCount !== 1) {
                                result += ` ${digitToUnit(digitCount - 1)}`
                            }
                        }
                    } else {
                        /* Angka Puluhan */
                        result += `${space}${numberToText(curAngka)} puluh`
                    }
                }
            } else {
                /* Angka Satuan Nol */
                if (
                    modGroup === 0 &&
                    (Number(angkaStr[i - 2]) !== 0 ||
                        Number(angkaStr[i - 1]) !== 0) &&
                    digitCount !== 0
                ) {
                    result += ` ${digitToUnit(digitCount)}`
                }
            }
        }

        if (i <= 1) {
            space = ' '
        }
        i++
    }

    return result
}

const terbilangSatuSatu = (angka: number) => {
    let angkaStr = String(angka)
    return angkaStr
        .split('')
        .map((a) => (a == '0' ? 'nol' : numberToText(a)))
        .join(' ')
}

export function terbilang(target: number, settings = { decimal: '.' }) {
    let targetStr = String(target)
    if (targetStr.indexOf(settings.decimal) > -1) {
        /* Dengan Desimal */
        let newTargetStr = targetStr.split(settings.decimal)
        return `${terbilangin(Number(newTargetStr[0]))} koma ${terbilangSatuSatu(Number(newTargetStr[1]))}`
    } else {
        /* Tanpa Desimal */
        return terbilangin(target)
    }
}
