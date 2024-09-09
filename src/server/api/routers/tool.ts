import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { z } from 'zod'
import axios from 'axios'
import { TRPCError } from '@trpc/server'
import cookie from 'cookie'
import { format } from 'date-fns'
import { eq } from 'drizzle-orm'
import { tables } from '@/server/db'
import fs from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import https from 'https'
import { Base64 } from 'js-base64'
import { env } from '@/env.server'

const PROXY_ORIGIN = 'https://sipd.kemendagri.go.id'
const httpsAgent = new https.Agent({
    keepAlive: true,
})

const getSkpdId = async (token: string): Promise<number> => {
    const skpdKode = '1.02.0.00.0.00.01.0011'
    const skpdNama = 'Rumah Sakit Jiwa Daerah Atma Husada Mahakam'

    type ItemSkpdType = {
        id: number
        kode_skpd: string
        nama_skpd: string
        is_skpd: boolean
    }

    return axios
        .get(env.SIPD_PROXY_URL + '/aklap/api/common/list-skpd', {
            headers: {
                Authorization: `Bearer ${token}`,
                origin: PROXY_ORIGIN,
            },
            httpsAgent,
        })
        .then((data) => {
            return data?.data?.data?.find(
                (item: ItemSkpdType) => item.kode_skpd === skpdKode && item.nama_skpd === skpdNama
            )?.id
        })
}

const execPromise = promisify(exec)

const cwd = process.cwd()

const compressPdf = async (base64: string): Promise<string> => {
    const tempFolder = path.join(cwd, 'temp')
    const hasTempFolder = fs.existsSync(tempFolder)

    if (!hasTempFolder) {
        fs.mkdirSync(tempFolder)
    }

    const originalFilePath = path.join(cwd, 'temp', 'original.pdf')
    const compressFilePath = path.join(cwd, 'temp', 'compress.pdf')

    fs.writeFileSync(originalFilePath, base64, 'base64')

    const os = process.platform

    const command = `-sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${compressFilePath}" ${originalFilePath}`

    if (os === 'win32') {
        await execPromise('gswin64c.exe ' + command)
    } else {
        await execPromise('gs ' + command)
    }

    const compressFileBase64 = fs.readFileSync(compressFilePath, 'base64')

    fs.unlinkSync(originalFilePath)
    fs.unlinkSync(compressFilePath)

    return compressFileBase64
}

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
                const response = await axios.post(env.SIPD_PROXY_URL + '/auth/auth/pre-login', data, {
                    headers: {
                        origin: PROXY_ORIGIN,
                    },
                    httpsAgent,
                })

                return response.data as PreLoginSipdResponse[]
            } catch (error) {
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
            const response = await axios.get(env.SIPD_PROXY_URL + '/auth/captcha/new', {
                headers: {
                    origin: PROXY_ORIGIN,
                },
                httpsAgent,
            })

            return response.data as {
                audio: string
                base64: string
                id: string
            }
        } catch (error) {
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
                const response = await axios.post(env.SIPD_PROXY_URL + '/auth/auth/login', payload, {
                    headers: {
                        origin: PROXY_ORIGIN,
                    },
                })

                return response.data as { token: string; refresh_token: string }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw new TRPCError({
                        code: 'UNAUTHORIZED',
                        message: JSON.stringify(error.response?.data),
                    })
                }
            }
        }),

    getSipdProfile: userProcedure.query(async ({ ctx }) => {
        const { sipd_token } = cookie.parse(ctx.headers.cookie!)

        try {
            const response = await axios.get(env.SIPD_PROXY_URL + '/auth/strict/user/profile', {
                headers: {
                    Authorization: `Bearer ${sipd_token}`,
                    origin: PROXY_ORIGIN,
                },
                httpsAgent,
            })

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
            if (axios.isAxiosError(error)) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: JSON.stringify(error.response?.data),
                })
            }
        }
    }),

    getCetakLraSipd: userProcedure.query(async ({ ctx }) => {
        const { sipd_token } = cookie.parse(ctx.headers.cookie!)

        const skpdId = await getSkpdId(sipd_token)

        const now = format(new Date(), 'yyyy-MM-dd')

        try {
            const response = await axios.get(
                `/aklap/api/report/cetaklra?searchparams=%7B%22tanggalFrom%22:%222024-01-01%22,%22tanggalTo%22:%22${now}%22,%22formatFile%22:%22preview%22,%22tahun%22:%222024%22,%22level%22:null,%22previewLaporan%22:null,%22is_combine%22:%22skpd_unit%22,%22skpd%22:${skpdId}%7D`,
                {
                    headers: {
                        Authorization: `Bearer ${sipd_token}`,
                        origin: PROXY_ORIGIN,
                    },
                    httpsAgent,
                }
            )

            return response.data as Document
        } catch (error) {
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
            const { sipd_token } = cookie.parse(ctx.headers.cookie!)

            const skpdId = await getSkpdId(sipd_token)

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

            try {
                const response = await axios.get(
                    `/aklap/api/jurnal-non-anggaran/approval-list?skpd=${skpdId}&length=999999&journal_status=0&page=1&tanggalFrom=${input.tglStart}&tanggalTo=${input.tglEnd}&order=tanggal&direction=DESC`,
                    {
                        headers: {
                            Authorization: `Bearer ${sipd_token}`,
                            origin: PROXY_ORIGIN,
                        },
                        httpsAgent,
                    }
                )

                return response.data?.data?.list as TransaksiNonAnggaranType[]
            } catch (error) {
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
                filePdf: z.string().refine(Base64.isValid).nullable(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { sipd_token } = cookie.parse(ctx.headers.cookie!)

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

            if (!belanja.file && !input.filePdf) {
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

            let kodeRekening = ''

            if (belanja.rab.kodeRekening?.startsWith('5.1.01')) {
                kodeRekening = '5.1.01.99.99.9999'
            } else if (belanja.rab.kodeRekening?.startsWith('5.1.02')) {
                kodeRekening = '5.1.02.99.99.9999'
            } else if (belanja.rab.kodeRekening?.startsWith('5.2.02')) {
                kodeRekening = '5.2.02.99.99.9999'
            } else {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Kode rekening tidak disupport',
                })
            }

            const base64File = input.filePdf
                ? input.filePdf
                : fs.readFileSync(`./storage/files/belanja/${belanja.file}`, 'base64')

            const skpdId = await getSkpdId(sipd_token)

            const namaSkenario = 'Belanja BLUD'

            // Start multiple requests concurrently
            const [base64FileCompressed, mainAccountResponse, nomorJournalResponse, nominalAnggaranResponse] =
                await Promise.all([
                    compressPdf(base64File),
                    axios.get(
                        `/aklap/api/jurnal-transaksi-non-anggaran/main-account-list-urusan?keyword=&skenario[]=${namaSkenario}&page=1&urusan=11&bidang_urusan=202&program=1397&skpd=${skpdId}&kegiatan=9708&sub_kegiatan=24328`,
                        {
                            headers: {
                                Authorization: `Bearer ${sipd_token}`,
                                origin: PROXY_ORIGIN,
                            },
                            httpsAgent,
                        }
                    ),
                    axios.get(`/aklap/api/jurnal-non-anggaran/generate-nomor-journal?skpd=${skpdId}&scenario_id=19`, {
                        headers: {
                            Authorization: `Bearer ${sipd_token}`,
                            origin: PROXY_ORIGIN,
                        },
                        httpsAgent,
                    }),
                    axios.get(
                        `/aklap/api/jurnal-non-anggaran/get-nominal-anggaran?skpd=${skpdId}&kode_rekening=${kodeRekening}`,
                        {
                            headers: {
                                Authorization: `Bearer ${sipd_token}`,
                                origin: PROXY_ORIGIN,
                            },
                            httpsAgent,
                        }
                    ),
                ])

            const mainAccountPrimary = mainAccountResponse.data.list.find(
                (item: { kodeRekening: string }) => item.kodeRekening === kodeRekening
            )

            if (!mainAccountPrimary) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Main account primary tidak ditemukan',
                })
            }

            const nomorJournal = nomorJournalResponse.data.data

            if (!nomorJournal) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Nomor jurnal tidak ditemukan',
                })
            }

            const nominalAnggaran = nominalAnggaranResponse.data.data

            if (!nominalAnggaran) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Nominal anggaran tidak ada',
                })
            }

            let kodeRekeningKeyword = ''

            // Fetch paired accounts concurrently
            const [mainAccountPrimaryPairedResponse, mainAccountSecondaryResponse] = await Promise.all([
                axios.get(
                    `/aklap/api/jurnal-transaksi-non-anggaran/paired-account-list?idPopulasi=${mainAccountPrimary.idPopulasi}`,
                    {
                        headers: {
                            Authorization: `Bearer ${sipd_token}`,
                            origin: PROXY_ORIGIN,
                        },
                        httpsAgent,
                    }
                ),
                (async () => {
                    if (kodeRekening.startsWith('5.2')) {
                        if (belanja.rab && belanja.rab.kodeRekening) {
                            const arrayOfKodeRekeningKeyword = belanja.rab.kodeRekening.split('.')
                            arrayOfKodeRekeningKeyword.shift()
                            arrayOfKodeRekeningKeyword.shift()
                            kodeRekeningKeyword = '.' + arrayOfKodeRekeningKeyword.join('.')
                        }
                    }

                    const response = await axios.get(
                        `/aklap/api/jurnal-transaksi-non-anggaran/main-account-list-rekening?keyword=${kodeRekeningKeyword}&nama_rekening=${mainAccountPrimary.namaRekening}&page=1`,
                        {
                            headers: {
                                Authorization: `Bearer ${sipd_token}`,
                                origin: PROXY_ORIGIN,
                            },
                            httpsAgent,
                        }
                    )

                    return response
                })(),
            ])

            const mainAccountPrimaryPaired = mainAccountPrimaryPairedResponse.data.data

            if (!mainAccountPrimaryPaired) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Main account primary paired tidak ditemukan',
                })
            }

            const mainAccountSecondary = mainAccountSecondaryResponse.data.list.find(
                (item: { kodeRekening: string }) => {
                    const belakangKodeRekening = kodeRekening.split('.')
                    belakangKodeRekening.shift()
                    return (
                        item.kodeRekening.endsWith('.' + belakangKodeRekening.join('.')) ||
                        item.kodeRekening.endsWith(kodeRekeningKeyword)
                    )
                }
            )

            if (!mainAccountSecondary) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Main account secondary tidak ditemukan',
                })
            }

            const mainAccountSecondaryPairedResponse = await axios.get(
                `/aklap/api/jurnal-transaksi-non-anggaran/paired-account-list?idPopulasi=${mainAccountSecondary.idPopulasi}`,
                {
                    headers: {
                        Authorization: `Bearer ${sipd_token}`,
                        origin: PROXY_ORIGIN,
                    },
                    httpsAgent,
                }
            )

            const mainAccountSecondaryPaired = mainAccountSecondaryPairedResponse.data.data

            if (!mainAccountSecondaryPaired) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Main account secondary paired tidak ditemukan',
                })
            }

            type PairedAccountType = {
                idPopulasi: number
                id_pasangan: number
                id_pasangan_jurnal: number
                id_pasangan_jurnal2: number
                kodeRekening: string
                namaRekening: string
                akun: string
                method: string
                position: string
                idSkenario: number
                namaSkenario: string
                satuanKerja: string
                format: number
                urutan: number
            }

            const body = {
                skpd: skpdId,
                tanggal_jurnal: format(new Date(belanja.tglDokumen || ''), 'yyyy-MM-dd'),
                list_transaksi: {
                    [mainAccountPrimary.namaRekening]: mainAccountPrimaryPaired.map((item: PairedAccountType) => ({
                        ...item,
                        debit: item.position === 'debet' ? Number(belanja.jumlah) : Number(0),
                        kredit: item.position === 'kredit' ? Number(belanja.jumlah) : Number(0),
                    })),
                },
                nominal_anggaran: nominalAnggaran,
                list_rekening: {
                    [mainAccountSecondary.namaRekening]: mainAccountSecondaryPaired.map((item: PairedAccountType) => ({
                        ...item,
                        debit: item.position === 'debet' ? Number(belanja.jumlah) : Number(0),
                        kredit: item.position === 'kredit' ? Number(belanja.jumlah) : Number(0),
                    })),
                },
                nominal_realisasi: 0,
                dokumen: base64FileCompressed,
                dokumen_name: input.filePdf ? belanja.noDokumen + '_' + Date.now() + '.pdf' : belanja.file,
                nomor_journal: nomorJournal,
                id_urusan: 11,
                kode_urusan: '1',
                nama_urusan: 'URUSAN PEMERINTAHAN WAJIB YANG BERKAITAN DENGAN PELAYANAN DASAR',
                id_bidang_urusan: 202,
                kode_bidang_urusan: '1.02',
                nama_bidang_urusan: 'URUSAN PEMERINTAHAN BIDANG KESEHATAN',
                id_program: 1397,
                kode_program: 'X.XX.01',
                nama_program: 'PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH PROVINSI',
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
                    env.SIPD_PROXY_URL + '/aklap/api/jurnal-non-anggaran/simpan-badan-layanan-umum-daerah',
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${sipd_token}`,
                            origin: PROXY_ORIGIN,
                        },
                        httpsAgent,
                    }
                )

                return {
                    message: JSON.stringify(data.data),
                }
            } catch (error) {
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
            const { sipd_token } = cookie.parse(ctx.headers.cookie!)

            try {
                const data = await axios.post(
                    `/aklap/api/jurnal-non-anggaran/reject`,
                    {
                        journal_id: input.journalId,
                        journal_reject_reason_id: 3,
                        reject_notes: 'jurnal salah',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sipd_token}`,
                            origin: PROXY_ORIGIN,
                        },
                        httpsAgent,
                    }
                )

                return {
                    message: JSON.stringify(data.data),
                }
            } catch (error) {
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
            const { sipd_token } = cookie.parse(ctx.headers.cookie!)

            try {
                const data = await axios.post(
                    `/aklap/api/jurnal-non-anggaran/delete-journal`,
                    { id: input.journalId },
                    {
                        headers: {
                            Authorization: `Bearer ${sipd_token}`,
                            origin: PROXY_ORIGIN,
                        },
                        httpsAgent,
                    }
                )

                return {
                    message: JSON.stringify(data.data),
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: JSON.stringify(error.response?.data),
                    })
                }
            }
        }),
})
