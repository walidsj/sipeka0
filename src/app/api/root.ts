import { createCallerFactory, createTRPCRouter } from '@/server/trpc'
import { userRouter } from './routers/user'
import { bankRouter } from './routers/bank'
import { pegawaiRouter } from './routers/pegawai'
import { rekananRouter } from './routers/rekanan'
import { pengelolaBludRouter } from './routers/pengelola-blud'
import { profilBludRouter } from './routers/profil-blud'
import { kodeRekeningRouter } from './routers/kode-rekening'
import { programRkaRouter } from './routers/program-rka'
import { kegiatanRkaRouter } from './routers/kegiatan-rka'
import { subKegiatanRkaRouter } from './routers/sub-kegiatan-rka'
import { unitKerjaRouter } from './routers/unit-kerja'
import { rbaRouter } from './routers/rba'
import { aktivitasRbaRouter } from './routers/aktivitas-rba'
import { rincianRbaBelanjaRouter } from './routers/rincian-rba-belanja'
import { rabRouter } from './routers/rab'
import { rapRouter } from './routers/rap'
import { rincianRbaPendapatanRouter } from './routers/rincian-rba-pendapatan'
import { pendapatanRouter } from './routers/pendapatan'
import { rkaRouter } from './routers/rka'
import { dbaRouter } from './routers/dba'
import { belanjaRouter } from './modules/belanja'
import { sp3bRouter } from './modules/sp3b'

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
    rincianRbaBelanja: rincianRbaBelanjaRouter,
    rincianRbaPendapatan: rincianRbaPendapatanRouter,
    rab: rabRouter,
    rap: rapRouter,
    pendapatan: pendapatanRouter,
    rka: rkaRouter,
    dba: dbaRouter,
    belanja: belanjaRouter,
    sp3b: sp3bRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
