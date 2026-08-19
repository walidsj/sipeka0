import level1_2025 from "./2025/level-1.json";
import level2_2025 from "./2025/level-2.json";
import level3_2025 from "./2025/level-3.json";
import level4_2025 from "./2025/level-4.json";
import level5_2025 from "./2025/level-5.json";
import level6_2025 from "./2025/level-6.json";

import level1_2026 from "./2026/level-1.json";
import level2_2026 from "./2026/level-2.json";
import level3_2026 from "./2026/level-3.json";
import level4_2026 from "./2026/level-4.json";
import level5_2026 from "./2026/level-5.json";
import level6_2026 from "./2026/level-6.json";

export type RekeningLevel = {
  kode: string;
  uraian: string;
};

export type Rekening = RekeningLevel[];

type RekeningData = {
  level1: Rekening;
  level2: Rekening;
  level3: Rekening;
  level4: Rekening;
  level5: Rekening;
  level6: Rekening;
};

const rekeningData: Record<string, RekeningData> = {
  "2025": {
    level1: level1_2025 as unknown as Rekening,
    level2: level2_2025 as unknown as Rekening,
    level3: level3_2025 as unknown as Rekening,
    level4: level4_2025 as unknown as Rekening,
    level5: level5_2025 as unknown as Rekening,
    level6: level6_2025 as unknown as Rekening,
  },
  "2026": {
    level1: level1_2026 as unknown as Rekening,
    level2: level2_2026 as unknown as Rekening,
    level3: level3_2026 as unknown as Rekening,
    level4: level4_2026 as unknown as Rekening,
    level5: level5_2026 as unknown as Rekening,
    level6: level6_2026 as unknown as Rekening,
  },
};

export function getRekening(tahun?: string): RekeningData {
  const key = tahun === "2025" ? "2025" : "2026";
  return rekeningData[key];
}
