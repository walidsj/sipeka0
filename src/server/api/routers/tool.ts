import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { z } from 'zod'
import axios from 'axios'
import { TRPCError } from '@trpc/server'
import https from 'https'
import cookie from 'cookie'
import { format } from 'date-fns'
import { eq } from 'drizzle-orm'
import { tables } from '@/server/db'
import fs from 'fs'

export const toolRouter = createTRPCRouter({
    preLoginSipd: userProcedure
        .input(
            z.object({
                tahun: z.number(),
                username: z.string(),
                password: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const data = {
                tahun: input.tahun,
                username: input.username,
                password: input.password,
                remember_me: true,
            }

            type PreLoginSipdResponse = {
                id_pegawai: number
                id_user: number
                id_daerah: number
                id_skpd: number
                kode_skpd: string
                nama_skpd: string
                id_role: number
                nama_role: string
            }

            try {
                const response = await axios.post(
                    'https://service.sipd.kemendagri.go.id/auth/auth/pre-login',
                    data
                )

                return response.data as PreLoginSipdResponse[]
            } catch (error) {
                console.log(error)
                if (axios.isAxiosError(error)) {
                    throw new TRPCError({
                        code: 'UNAUTHORIZED',
                        message: JSON.stringify(error.response?.data),
                    })
                }
            }
        }),

    getCaptcha: userProcedure.mutation(async () => {
        try {
            const response = await axios.get(
                'https://service.sipd.kemendagri.go.id/auth/captcha/new'
            )

            return response.data as {
                audio: string
                base64: string
                id: string
            }
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: JSON.stringify(error.response?.data),
                })
            }
        }
    }),

    loginSipd: userProcedure
        .input(
            z.object({
                tahun: z.number(),
                captcha_id: z.string(),
                captcha_solution: z.string(),
                id_pegawai: z.number(),
                id_user: z.number(),
                id_daerah: z.number(),
                id_skpd: z.number(),
                kode_skpd: z.string(),
                nama_skpd: z.string(),
                id_role: z.number(),
                nama_role: z.string(),
                username: z.string(),
                password: z.string(),
                pegawai: z.array(
                    z.object({
                        id_pegawai: z.number(),
                        id_user: z.number(),
                        id_daerah: z.number(),
                        id_skpd: z.number(),
                        kode_skpd: z.string(),
                        nama_skpd: z.string(),
                        id_role: z.number(),
                        nama_role: z.string(),
                    })
                ),
                selected_pegawai: z.object({
                    id_pegawai: z.number(),
                    id_user: z.number(),
                    id_daerah: z.number(),
                    id_skpd: z.number(),
                    kode_skpd: z.string(),
                    nama_skpd: z.string(),
                    id_role: z.number(),
                    nama_role: z.string(),
                }),
            })
        )
        .mutation(async ({ input }) => {
            const payload = {
                tahun: input.tahun,
                username: input.username,
                password: input.password,
                id_daerah: input.id_daerah,
                id_role: input.id_role,
                id_skpd: input.id_skpd,
                id_pegawai: input.id_pegawai,
                captcha_id: input.captcha_id,
                captcha_solution: input.captcha_solution,
                remember_me: true,
                pegawai: input.pegawai,
                selected_pegawai: input.selected_pegawai,
            }

            try {
                const response = await axios.post(
                    'https://service.sipd.kemendagri.go.id/auth/auth/login',
                    payload
                )

                return response.data as { token: string; refresh_token: string }
            } catch (error) {
                console.log(error)

                if (axios.isAxiosError(error)) {
                    throw new TRPCError({
                        code: 'UNAUTHORIZED',
                        message: JSON.stringify(error.response?.data),
                    })
                }
            }
        }),

    getSipdProfile: userProcedure.query(async ({ ctx }) => {
        const { sipd_token }: { sipd_token: string } = cookie.parse(
            ctx.headers.cookie
        )

        try {
            const response = await axios.get(
                'https://service.sipd.kemendagri.go.id/auth/strict/user/profile',
                {
                    headers: {
                        Authorization: `Bearer ${sipd_token}`,
                    },
                }
            )

            return response.data as {
                id_user: number
                id_daerah: number
                nip_user: string
                nama_user: string
                id_pang_gol: number
                nik_user: string
                npwp_user: string
                alamat: string
                lahir_user: string
            }
        } catch (error) {
            console.log(error)

            if (axios.isAxiosError(error)) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: JSON.stringify(error.response?.data),
                })
            }
        }
    }),

    getCetakLraSipd: userProcedure.query(async ({ ctx }) => {
        const { sipd_token }: { sipd_token: string } = cookie.parse(
            ctx.headers.cookie
        )

        const now = format(new Date(), 'yyyy-MM-dd')

        try {
            const response = await axios.get(
                `https://service.sipd.kemendagri.go.id/aklap/api/report/cetaklra?searchparams=%7B%22tanggalFrom%22:%222024-01-01%22,%22tanggalTo%22:%22${now}%22,%22formatFile%22:%22preview%22,%22tahun%22:%222024%22,%22level%22:null,%22previewLaporan%22:null,%22is_combine%22:%22skpd_unit%22,%22skpd%22:479%7D`,
                {
                    headers: {
                        Authorization: `Bearer ${sipd_token}`,
                    },
                }
            )

            return response.data as Document
        } catch (error) {
            console.log(error)

            if (axios.isAxiosError(error)) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: JSON.stringify(error.response?.data),
                })
            }
        }
    }),

    getTransaksiNonAnggaranSipd: userProcedure
        .input(
            z.object({
                tglStart: z.string(),
                tglEnd: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            type TransaksiNonAnggaranType = {
                id: number
                created_at: string
                journal_number: string
                journal_date: string
                journal_status_id: number
                nama_jurnal_status: string
                journal_types_id: number
                description: string
                scenario_non_anggaran_id: number
                detail: {
                    id: number
                    is_main_account: boolean
                    journal_id: number
                    account_id: number
                    name: string
                    code: string
                    position: string
                    amount: number
                }[]
            }

            const { sipd_token }: { sipd_token: string } = cookie.parse(
                ctx.headers.cookie
            )

            try {
                const response = await axios.get(
                    `https://service.sipd.kemendagri.go.id/aklap/api/jurnal-non-anggaran/approval-list?skpd=479&length=999999&journal_status=0&page=1&tanggalFrom=${input.tglStart}&tanggalTo=${input.tglEnd}&order=tanggal&direction=DESC`,
                    {
                        headers: {
                            Authorization: `Bearer ${sipd_token}`,
                        },
                    }
                )

                return response.data?.data?.list as TransaksiNonAnggaranType[]
            } catch (error) {
                console.log(error)

                if (axios.isAxiosError(error)) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: JSON.stringify(error.response?.data),
                    })
                }
            }
        }),

    sendTransaksiNonAnggaranSipd: userProcedure
        .input(
            z.object({
                belanjaId: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const belanja = await ctx.db.query.belanja.findFirst({
                where: eq(tables.belanja.id, input.belanjaId),
                with: {
                    rab: true,
                },
            })

            if (!belanja) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Data belanja tidak ditemukan',
                })
            }

            if (!belanja.file) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'File belanja tidak ditemukan (belum diupload)',
                })
            }

            if (!belanja.rab) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Data RAB Kode Rekening belanja tidak ditemukan',
                })
            }

            type TransaksiDetailType = {
                debit: number
                kredit: number
                akun: string
                format: number
                idPopulasi: number
                idSkenario: number
                kodeRekening: string
                method: string
                namaRekening: string
                namaSkenario: string
                position: string
                satuanKerja: string
            }

            let nominalAnggaran = 0

            let listTransaksi: {
                'Belanja Barang dan Jasa BLUD'?: TransaksiDetailType[]
                'Belanja Pegawai BLUD'?: TransaksiDetailType[]
            } = {}

            let listRekening: {
                'Belanja Barang dan Jasa BLUD'?: TransaksiDetailType[]
                'Belanja Pegawai BLUD'?: TransaksiDetailType[]
            } = {}

            if (belanja.rab.kodeRekening?.startsWith('5.1.01')) {
                nominalAnggaran = 10609100672
                listTransaksi = {
                    'Belanja Pegawai BLUD': [
                        {
                            debit: Number(belanja.jumlah),
                            kredit: 0,
                            akun: 'LRA',
                            format: 1,
                            idPopulasi: 68267,
                            idSkenario: 241,
                            kodeRekening: '5.1.01.99.99.9999',
                            method: 'lainnya',
                            namaRekening: 'Belanja Pegawai BLUD',
                            namaSkenario: 'Belanja BLUD',
                            position: 'debet',
                            satuanKerja: 'skpd',
                        },
                        {
                            debit: 0,
                            kredit: Number(belanja.jumlah),
                            akun: 'NERACA',
                            format: 1,
                            idPopulasi: 68268,
                            idSkenario: 241,
                            kodeRekening: '3.1.02.05.01.0001',
                            method: 'lainnya',
                            namaRekening: 'Estimasi Perubahan SAL',
                            namaSkenario: 'Belanja BLUD',
                            position: 'kredit',
                            satuanKerja: 'skpd',
                        },
                    ],
                }
            } else if (belanja.rab.kodeRekening?.startsWith('5.1.02')) {
                nominalAnggaran = 10609100672
                listTransaksi = {
                    'Belanja Barang dan Jasa BLUD': [
                        {
                            debit: Number(belanja.jumlah),
                            kredit: 0,
                            akun: 'LRA',
                            format: 1,
                            idPopulasi: 68265,
                            idSkenario: 241,
                            kodeRekening: '5.1.02.99.99.9999',
                            method: 'lainnya',
                            namaRekening: 'Belanja Barang dan Jasa BLUD',
                            namaSkenario: 'Belanja BLUD',
                            position: 'debet',
                            satuanKerja: 'skpd',
                        },
                        {
                            debit: 0,
                            kredit: Number(belanja.jumlah),
                            akun: 'NERACA',
                            format: 1,
                            idPopulasi: 68266,
                            idSkenario: 241,
                            kodeRekening: '3.1.02.05.01.0001',
                            method: 'lainnya',
                            namaRekening: 'Estimasi Perubahan SAL',
                            namaSkenario: 'Belanja BLUD',
                            position: 'kredit',
                            satuanKerja: 'skpd',
                        },
                    ],
                }

                listRekening = {
                    'Belanja Barang dan Jasa BLUD': [
                        {
                            debit: Number(belanja.jumlah),
                            kredit: 0,
                            akun: 'LO',
                            format: 1,
                            idPopulasi: 65331,
                            idSkenario: 194,
                            kodeRekening: '8.1.02.99.99.9999',
                            method: 'lainnya',
                            namaRekening: 'Beban Barang dan Jasa BLUD',
                            namaSkenario: 'Belanja Barang dan Jasa BLUD',
                            position: 'debet',
                            satuanKerja: 'skpd',
                        },
                        {
                            debit: 0,
                            kredit: Number(belanja.jumlah),
                            akun: 'NERACA',
                            format: 1,
                            idPopulasi: 65332,
                            idSkenario: 194,
                            kodeRekening: '1.1.01.04.01.0001',
                            method: 'lainnya',
                            namaRekening: 'Kas di BLUD',
                            namaSkenario: 'Belanja Barang dan Jasa BLUD',
                            position: 'kredit',
                            satuanKerja: 'skpd',
                        },
                    ],
                }
            } else {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Kode rekening tidak disupport',
                })
            }

            const { sipd_token }: { sipd_token: string } = cookie.parse(
                ctx.headers.cookie
            )

            const base64File = fs.readFileSync(
                `./storage/files/belanja/${belanja.file}`,
                'base64'
            )

            let nomorJournal = ''

            try {
                const res: {
                    data: { status: boolean; message: string; data: string }
                } = await axios.get(
                    'https://service.sipd.kemendagri.go.id/aklap/api/jurnal-non-anggaran/generate-nomor-journal?skpd=479&scenario_id=19',
                    {
                        headers: {
                            Authorization: `Bearer ${sipd_token}`,
                        },
                    }
                )

                nomorJournal = res.data.data

                if (!nomorJournal) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Nomor jurnal tidak ditemukan',
                    })
                }
            } catch (error) {
                console.log(error)

                if (axios.isAxiosError(error)) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: JSON.stringify(error.response?.data),
                    })
                }
            }

            const body = {
                skpd: 479,
                tanggal_jurnal: format(
                    new Date(belanja.tglDokumen || ''),
                    'yyyy-MM-dd'
                ),
                list_transaksi: listTransaksi,
                nominal_anggaran: nominalAnggaran,
                list_rekening: listRekening,
                nominal_realisasi: 0,
                dokumen: base64File,
                dokumen_name: belanja.file,
                nomor_journal: nomorJournal,
                id_urusan: 11,
                kode_urusan: '1',
                nama_urusan:
                    'URUSAN PEMERINTAHAN WAJIB YANG BERKAITAN DENGAN PELAYANAN DASAR',
                id_bidang_urusan: 202,
                kode_bidang_urusan: '1.02',
                nama_bidang_urusan: 'URUSAN PEMERINTAHAN BIDANG KESEHATAN',
                id_program: 1397,
                kode_program: 'X.XX.01',
                nama_program:
                    'PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH PROVINSI',
                id_kegiatan: 9708,
                kode_kegiatan: 'X.XX.01.1.10',
                nama_kegiatan: 'Peningkatan Pelayanan BLUD',
                id_sub_kegiatan: 24328,
                kode_sub_kegiatan: 'X.XX.01.1.10.0001',
                nama_sub_kegiatan: 'Pelayanan dan Penunjang Pelayanan BLUD',
                keterangan: belanja.uraian,
            }

            try {
                const data = await axios.post(
                    'https://service.sipd.kemendagri.go.id/aklap/api/jurnal-non-anggaran/simpan-badan-layanan-umum-daerah',
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${sipd_token}`,
                        },
                    }
                )

                return {
                    message: JSON.stringify(data.data),
                }
            } catch (error) {
                console.log(error)

                if (axios.isAxiosError(error)) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: JSON.stringify(error.response?.data),
                    })
                }
            }
        }),

    rejectJournalSipd: userProcedure
        .input(
            z.object({
                journalId: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { sipd_token }: { sipd_token: string } = cookie.parse(
                ctx.headers.cookie
            )

            try {
                const data = await axios.post(
                    `https://service.sipd.kemendagri.go.id/aklap/api/jurnal-non-anggaran/reject`,
                    {
                        journal_id: input.journalId,
                        journal_reject_reason_id: 3,
                        reject_notes: 'jurnal salah',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sipd_token}`,
                        },
                    }
                )

                return {
                    message: JSON.stringify(data.data),
                }
            } catch (error) {
                console.log(error)

                if (axios.isAxiosError(error)) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: JSON.stringify(error.response?.data),
                    })
                }
            }
        }),

    deleteJournalSipd: userProcedure
        .input(
            z.object({
                journalId: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { sipd_token }: { sipd_token: string } = cookie.parse(
                ctx.headers.cookie
            )

            try {
                const data = await axios.post(
                    `https://service.sipd.kemendagri.go.id/aklap/api/jurnal-non-anggaran/delete-journal`,
                    { id: input.journalId },
                    {
                        headers: {
                            Authorization: `Bearer ${sipd_token}`,
                        },
                    }
                )

                return {
                    message: JSON.stringify(data.data),
                }
            } catch (error) {
                console.log(error)

                if (axios.isAxiosError(error)) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: JSON.stringify(error.response?.data),
                    })
                }
            }
        }),
})
