import {
    rekeningLevel1,
    rekeningLevel2,
    rekeningLevel3,
    rekeningLevel4,
    rekeningLevel5,
    rekeningLevel6,
} from '@/data/rekening'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { z } from 'zod'

export const kodeRekeningRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                level: z.enum(['1', '2', '3', '4', '5', '6']),
                kode: z.string().nullish(),
                search: z.string().nullish(),
                page: z.number().nullish(),
                perPage: z.number().nullish(),
            })
        )
        .query(async ({ input }) => {
            let data

            if (input.level === '1') {
                data = rekeningLevel1.filter((item) => {
                    if (input.search) {
                        return (
                            item.uraian
                                .toLowerCase()
                                .includes(input.search.toLowerCase()) ||
                            item.kode.startsWith(input.search.toLowerCase())
                        )
                    }
                    return true
                })
            }

            if (input.level === '2') {
                data = rekeningLevel2.filter((item) => {
                    if (input.search) {
                        return (
                            item.uraian
                                .toLowerCase()
                                .includes(input.search.toLowerCase()) ||
                            item.kode.startsWith(input.search.toLowerCase())
                        )
                    }
                    return true
                })
            }

            if (input.level === '3') {
                data = rekeningLevel3.filter((item) => {
                    if (input.search) {
                        return (
                            item.uraian
                                .toLowerCase()
                                .includes(input.search.toLowerCase()) ||
                            item.kode.startsWith(input.search.toLowerCase())
                        )
                    }
                    return true
                })
            }

            if (input.level === '4') {
                data = rekeningLevel4.filter((item) => {
                    if (input.search) {
                        return (
                            item.uraian
                                .toLowerCase()
                                .includes(input.search.toLowerCase()) ||
                            item.kode.startsWith(input.search.toLowerCase())
                        )
                    }
                    return true
                })
            }

            if (input.level === '5') {
                data = rekeningLevel5.filter((item) => {
                    if (input.search) {
                        return (
                            item.uraian
                                .toLowerCase()
                                .includes(input.search.toLowerCase()) ||
                            item.kode.startsWith(input.search.toLowerCase())
                        )
                    }
                    return true
                })
            }

            if (input.level === '6') {
                data = rekeningLevel6.filter((item) => {
                    if (input.search) {
                        return (
                            item.uraian
                                .toLowerCase()
                                .includes(input.search.toLowerCase()) ||
                            item.kode.startsWith(input.search.toLowerCase())
                        )
                    }
                    return true
                })
            }

            if (input.page && input.perPage) {
                const start = (input.page - 1) * input.perPage
                const end = start + input.perPage

                data = data?.slice(start, end)
            }

            return data
        }),

    getByKode: userProcedure
        .input(
            z.object({
                level: z.enum(['1', '2', '3', '4', '5', '6']),
                kode: z.string(),
            })
        )
        .query(async ({ input }) => {
            let data

            if (input.level === '1') {
                data = rekeningLevel1.find((item) => item.kode === input.kode)
            }

            if (input.level === '2') {
                data = rekeningLevel2.find((item) => item.kode === input.kode)
            }

            if (input.level === '3') {
                data = rekeningLevel3.find((item) => item.kode === input.kode)
            }

            if (input.level === '4') {
                data = rekeningLevel4.find((item) => item.kode === input.kode)
            }

            if (input.level === '5') {
                data = rekeningLevel5.find((item) => item.kode === input.kode)
            }

            if (input.level === '6') {
                data = rekeningLevel6.find((item) => item.kode === input.kode)
            }

            return data
        }),
})
