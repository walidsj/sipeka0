import level1 from './level-1.json'
import level2 from './level-2.json'
import level3 from './level-3.json'
import level4 from './level-4.json'
import level5 from './level-5.json'
import level6 from './level-6.json'

type RekeningLevel = {
    kode: string
    uraian: string
}

type Rekening = RekeningLevel[]

export const rekeningLevel1 = level1 as unknown as Rekening
export const rekeningLevel2 = level2 as unknown as Rekening
export const rekeningLevel3 = level3 as unknown as Rekening
export const rekeningLevel4 = level4 as unknown as Rekening
export const rekeningLevel5 = level5 as unknown as Rekening
export const rekeningLevel6 = level6 as unknown as Rekening
