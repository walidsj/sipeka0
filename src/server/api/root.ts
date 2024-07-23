import { createCallerFactory, createTRPCRouter } from '@/server/trpc'
import { userRouter } from './routers/user'
import { bankRouter } from './routers/bank'
import { pegawaiRouter } from './routers/pegawai'
import { rekananRouter } from './routers/rekanan'
import { pengelolaBludRouter } from './routers/pengelola-blud'
import { profilBludRouter } from './routers/profil-blud'
import { kodeRekeningRouter } from './routers/kode-rekening'
import { unitKerjaRouter } from './routers/unit-kerja'
import { rbaRouter } from './routers/rba'
import { aktivitasRbaRouter } from './routers/aktivitas-rba'
import { rincianRbaBelanjaRouter } from './routers/rincian-rba-belanja'
import { rabRouter } from './routers/rab'
import { rapRouter } from './routers/rap'
import { rincianRbaPendapatanRouter } from './routers/rincian-rba-pendapatan'
import { pendapatanRouter } from './routers/pendapatan'
import { dbaRouter } from './routers/dba'
import { belanjaRouter } from './modules/belanja'
import { sp3bRouter } from './modules/sp3b'
import { lpjBelanjaRouter } from './routers/lpj_belanja'
import { sppRouter } from './routers/spp'
import { spmRouter } from './routers/spm'
import { sp2dRouter } from './routers/sp2d'
import { rekeningBankRouter } from './routers/rekening-bank'
import { rekeningKoranRouter } from './routers/rekening-koran'

export const appRouter = createTRPCRouter({
    user: userRouter,
    bank: bankRouter,
    pegawai: pegawaiRouter,
    rekanan: rekananRouter,
    unitKerja: unitKerjaRouter,
    pengelolaBlud: pengelolaBludRouter,
    profilBlud: profilBludRouter,
    kodeRekening: kodeRekeningRouter,
    rba: rbaRouter,
    aktivitasRba: aktivitasRbaRouter,
    rincianRbaBelanja: rincianRbaBelanjaRouter,
    rincianRbaPendapatan: rincianRbaPendapatanRouter,
    rab: rabRouter,
    rap: rapRouter,
    pendapatan: pendapatanRouter,
    dba: dbaRouter,
    belanja: belanjaRouter,
    sp3b: sp3bRouter,
    lpjBelanja: lpjBelanjaRouter,
    spp: sppRouter,
    spm: spmRouter,
    sp2d: sp2dRouter,
    rekeningBank: rekeningBankRouter,
    rekeningKoran: rekeningKoranRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
