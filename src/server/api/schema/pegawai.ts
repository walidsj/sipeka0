import { z } from 'zod'

export const pegawaiSchema = z.object({
    nama: z.string().min(1),
    gelarDepan: z.string().min(1).or(z.literal('')),
    gelarBelakang: z.string().min(1).or(z.literal('')),
    nip: z.string().length(18).or(z.literal('')),
    nik: z.string().length(16),
    jabatan: z.string().min(1),
    npwp: z.string().length(15),
    noTelp: z.string().min(1),
    statusPegawai: z.enum(['PNS', 'PPPK', 'NON ASN', 'MOU']),
    bankId: z.number(),
    namaRekening: z.string().min(1),
    noRekening: z.string().min(1),
    jenisKelamin: z.enum(['LAKI-LAKI', 'PEREMPUAN']),
})
