import { createCallerFactory, createTRPCRouter } from '@/server/trpc'
import { userRouter } from './routers/user'
import { bankRouter } from './routers/bank'
import { pegawaiRouter } from './routers/pegawai'
import { rekananRouter } from './routers/rekanan'
import { pengelolaBludRouter } from './routers/pengelolaBlud'
import { profilBludRouter } from './routers/profilBlud'
import { kodeRekeningRouter } from './routers/kodeRekening'
import { programRkaRouter } from './routers/programRka'
import { kegiatanRkaRouter } from './routers/kegiatanRka'
import { subKegiatanRkaRouter } from './routers/subKegiatanRka'
import { unitKerjaRouter } from './routers/unitKerja'
import { rkuRouter } from './routers/rku'
import { rbaRouter } from './routers/rba'
import { aktivitasRbaRouter } from './routers/aktivitasRba'

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
    rku: rkuRouter,
    rba: rbaRouter,
    aktivitasRba: aktivitasRbaRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
