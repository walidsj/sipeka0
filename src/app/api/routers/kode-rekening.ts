import {
    Rekening,
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
                kode: z.string().optional(),
                searchKode: z.string().optional(),
                search: z.string().optional(),
                page: z.number().optional(),
                pageSize: z.number().optional(),
            })
        )
        .query(async ({ input }) => {
            const page = input.page ?? 1
            const pageSize = input.pageSize ?? 10

            let data: Rekening = []
            let dataTotal: number = 0

            if (input.level === '1') {
                dataTotal = rekeningLevel1.length
                data = rekeningLevel1.filter((item) => {
                    if (input.search) {
                        if (input.searchKode) {
                            return (
                                (item.uraian
                                    .toLowerCase()
                                    .includes(input.search.toLowerCase()) ||
                                    item.kode.startsWith(
                                        input.search.toLowerCase()
                                    )) &&
                                item.kode.startsWith(
                                    input.searchKode.toLowerCase()
                                )
                            )
                        }

                        return (
                            item.uraian
                                .toLowerCase()
                                .includes(input.search.toLowerCase()) ||
                            item.kode.startsWith(input.search.toLowerCase())
                        )
                    }

                    if (input.searchKode) {
                        return item.kode.startsWith(
                            input.searchKode.toLowerCase()
                        )
                    }

                    return true
                })
            }

            if (input.level === '2') {
                dataTotal = rekeningLevel2.length
                data = rekeningLevel2.filter((item) => {
                    if (input.search) {
                        if (input.searchKode) {
                            return (
                                (item.uraian
                                    .toLowerCase()
                                    .includes(input.search.toLowerCase()) ||
                                    item.kode.startsWith(
                                        input.search.toLowerCase()
                                    )) &&
                                item.kode.startsWith(
                                    input.searchKode.toLowerCase()
                                )
                            )
                        }

                        return (
                            item.uraian
                                .toLowerCase()
                                .includes(input.search.toLowerCase()) ||
                            item.kode.startsWith(input.search.toLowerCase())
                        )
                    }

                    if (input.searchKode) {
                        return item.kode.startsWith(
                            input.searchKode.toLowerCase()
                        )
                    }

                    return true
                })
            }

            if (input.level === '3') {
                dataTotal = rekeningLevel3.length
                data = rekeningLevel3.filter((item) => {
                    if (input.search) {
                        if (input.searchKode) {
                            return (
                                (item.uraian
                                    .toLowerCase()
                                    .includes(input.search.toLowerCase()) ||
                                    item.kode.startsWith(
                                        input.search.toLowerCase()
                                    )) &&
                                item.kode.startsWith(
                                    input.searchKode.toLowerCase()
                                )
                            )
                        }

                        return (
                            item.uraian
                                .toLowerCase()
                                .includes(input.search.toLowerCase()) ||
                            item.kode.startsWith(input.search.toLowerCase())
                        )
                    }

                    if (input.searchKode) {
                        return item.kode.startsWith(
                            input.searchKode.toLowerCase()
                        )
                    }

                    return true
                })
            }

            if (input.level === '4') {
                dataTotal = rekeningLevel4.length
                data = rekeningLevel4.filter((item) => {
                    if (input.search) {
                        if (input.searchKode) {
                            return (
                                (item.uraian
                                    .toLowerCase()
                                    .includes(input.search.toLowerCase()) ||
                                    item.kode.startsWith(
                                        input.search.toLowerCase()
                                    )) &&
                                item.kode.startsWith(
                                    input.searchKode.toLowerCase()
                                )
                            )
                        }

                        return (
                            item.uraian
                                .toLowerCase()
                                .includes(input.search.toLowerCase()) ||
                            item.kode.startsWith(input.search.toLowerCase())
                        )
                    }

                    if (input.searchKode) {
                        return item.kode.startsWith(
                            input.searchKode.toLowerCase()
                        )
                    }

                    return true
                })
            }

            if (input.level === '5') {
                dataTotal = rekeningLevel5.length
                data = rekeningLevel5.filter((item) => {
                    if (input.search) {
                        if (input.searchKode) {
                            return (
                                (item.uraian
                                    .toLowerCase()
                                    .includes(input.search.toLowerCase()) ||
                                    item.kode.startsWith(
                                        input.search.toLowerCase()
                                    )) &&
                                item.kode.startsWith(
                                    input.searchKode.toLowerCase()
                                )
                            )
                        }

                        return (
                            item.uraian
                                .toLowerCase()
                                .includes(input.search.toLowerCase()) ||
                            item.kode.startsWith(input.search.toLowerCase())
                        )
                    }

                    if (input.searchKode) {
                        return item.kode.startsWith(
                            input.searchKode.toLowerCase()
                        )
                    }

                    return true
                })
            }

            if (input.level === '6') {
                dataTotal = rekeningLevel6.length
                data = rekeningLevel6.filter((item) => {
                    if (input.search) {
                        if (input.searchKode) {
                            return (
                                (item.uraian
                                    .toLowerCase()
                                    .includes(input.search.toLowerCase()) ||
                                    item.kode.startsWith(
                                        input.search.toLowerCase()
                                    )) &&
                                item.kode.startsWith(
                                    input.searchKode.toLowerCase()
                                )
                            )
                        }

                        return (
                            item.uraian
                                .toLowerCase()
                                .includes(input.search.toLowerCase()) ||
                            item.kode.startsWith(input.search.toLowerCase())
                        )
                    }

                    if (input.searchKode) {
                        return item.kode.startsWith(
                            input.searchKode.toLowerCase()
                        )
                    }

                    return true
                })
            }

            const dataFiltered = data.length

            if (input.page && input.pageSize) {
                const start = (input.page - 1) * input.pageSize
                const end = start + input.pageSize

                data = data?.slice(start, end)
            }

            const firstRow = (page ? (page - 1) * pageSize : 0) + 1
            const lastRow = (page ? (page - 1) * pageSize : 0) + data.length
            const pageCount = Math.ceil(dataFiltered / pageSize)

            return {
                data,
                meta: {
                    pagination: {
                        dataTotal,
                        dataFiltered,
                        page,
                        pageCount,
                        pageSize,
                        firstRow,
                        lastRow,
                    },
                },
            }
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
