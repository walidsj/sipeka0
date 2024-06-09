import { createCallerFactory, createTRPCRouter } from '@/server/trpc'
import { userRouter } from './routers/user'
import { bankRouter } from './routers/database/bank'
import { pegawaiRouter } from './routers/pegawai'
import { rekananRouter } from './routers/rekanan'
import { pengelolaBludRouter } from './routers/pengelola-blud'
import { profilBludRouter } from './routers/profil-blud'
import { kodeRekeningRouter } from './routers/kode-rekening'
import { programRkaRouter } from './routers/program-rka'
import { kegiatanRkaRouter } from './routers/kegiatan-rka'
import { subKegiatanRkaRouter } from './routers/sub-kegiatan-rba'
import { unitKerjaRouter } from './routers/unit-kerja'
import { rbaRouter } from './routers/rba'
import { aktivitasRbaRouter } from './routers/aktivitas-rba'
import { rincianRbaRouter } from './routers/rincian-rba'
import { rabRouter } from './routers/rab'

export const appRouter = createTRPCRouter({
    user: userRouter,
    bank: bankRouter,
    pegawai: pegawaiRouter,
    rekanan: rekananRouter,
    unitKerja: unitKerjaRouter,
    pengelolaBlud: pengelolaBludRouter,
    profilBlud: profilBludRouter,
    kodeRekening: kodeRekeningRouter,
    programRka: programRkaRouter,
    kegiatanRka: kegiatanRkaRouter,
    subKegiatanRka: subKegiatanRkaRouter,
    rba: rbaRouter,
    aktivitasRba: aktivitasRbaRouter,
    rincianRba: rincianRbaRouter,
    rab: rabRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
