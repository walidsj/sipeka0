import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTanggal(date: string | Date | null) {
  return format(date ? new Date(date) : Date.now(), "dd MMMM yyyy", {
    locale: id,
  });
}

export function formatAngka(angka: number | string | null | undefined) {
  return new Intl.NumberFormat("id-ID").format(Number(angka ?? 0));
}

export function formatAngkaDecimal(angka: number | string | null | undefined) {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(Number(angka ?? 0));
}

const units = [
  "",
  "ribu",
  "juta",
  "milyar",
  "triliun",
  "quadriliun",
  "quintiliun",
  "sextiliun",
  "septiliun",
  "oktiliun",
  "noniliun",
  "desiliun",
  "undesiliun",
  "duodesiliun",
  "tredesiliun",
  "quattuordesiliun",
  "quindesiliun",
  "sexdesiliun",
  "septendesiliun",
  "oktodesiliun",
  "novemdesiliun",
  "vigintiliun",
];
const maxIndex = units.length - 1;
function digitToUnit(digit: number) {
  const curIndex = digit / 3;
  return curIndex <= maxIndex ? units[curIndex] : units[maxIndex];
}

const numbers = [
  "",
  "satu",
  "dua",
  "tiga",
  "empat",
  "lima",
  "enam",
  "tujuh",
  "delapan",
  "sembilan",
];
function numberToText(index: number) {
  return numbers[index] || "";
}

export const terbilangin = (angka: number) => {
  const angkaStr = String(angka);
  const angkaLength = angkaStr.length;
  const angkaMaxIndex = angkaLength - 1;

  // Angka Nol
  if (angkaMaxIndex === 0 && Number(angkaStr[0]) === 0) {
    return "nol";
  }

  let space = "";
  let result = "";

  let i = 0;
  while (i !== angkaLength) {
    const digitCount = angkaMaxIndex - i;
    const modGroup = digitCount % 3; // [2,1,0]
    const curAngka = Number(angkaStr[i]);

    if (
      digitCount === 3 &&
      curAngka === 1 &&
      (i === 0 ||
        (Number(angkaStr[i - 2]) === 0 && Number(angkaStr[i - 1]) === 0))
    ) {
      /* Angka Seribu */
      result += `${space}seribu`;
    } else {
      if (curAngka !== 0) {
        if (modGroup === 0) {
          /* Angka Satuan Bukan Nol */
          result += `${space}${numberToText(curAngka)}${i === angkaMaxIndex ? "" : " "}${digitToUnit(digitCount)}`;
        } else if (modGroup === 2) {
          /* Angka Ratusan */
          if (curAngka === 1) {
            result += `${space}seratus`;
          } else {
            result += `${space}${numberToText(curAngka)} ratus`;
          }
        } else {
          /* Angka Sepuluh dan Belasan */
          if (curAngka === 1) {
            i++; // Skip Next Angka
            const nextAngka = Number(angkaStr[i]);
            if (nextAngka === 0) {
              result += `${space}sepuluh`;
              /* Proses Next Angka Sekarang */
              if (
                digitCount !== 1 &&
                (Number(angkaStr[i - 2]) !== 0 || Number(angkaStr[i - 1]) !== 0)
              ) {
                result += ` ${digitToUnit(digitCount - 1)}`;
              }
            } else {
              if (nextAngka === 1) {
                result += `${space}sebelas`;
              } else {
                result += `${space}${numberToText(nextAngka)} belas`;
              }
              /* Proses Next Angka Sekarang */
              if (digitCount !== 1) {
                result += ` ${digitToUnit(digitCount - 1)}`;
              }
            }
          } else {
            /* Angka Puluhan */
            result += `${space}${numberToText(curAngka)} puluh`;
          }
        }
      } else {
        /* Angka Satuan Nol */
        if (
          modGroup === 0 &&
          (Number(angkaStr[i - 2]) !== 0 || Number(angkaStr[i - 1]) !== 0) &&
          digitCount !== 0
        ) {
          result += ` ${digitToUnit(digitCount)}`;
        }
      }
    }

    if (i <= 1) {
      space = " ";
    }
    i++;
  }

  return result;
};

const terbilangSatuSatu = (angka: number) => {
  const angkaStr = String(angka);
  return angkaStr
    .split("")
    .map((a) => (a == "0" ? "nol" : numberToText(Number(a))))
    .join(" ");
};

export function terbilang(target: number, settings = { decimal: "." }) {
  const targetStr = String(target);
  if (targetStr.indexOf(settings.decimal) > -1) {
    /* Dengan Desimal */
    const newTargetStr = targetStr.split(settings.decimal);
    return `${terbilangin(Number(newTargetStr[0]))} koma ${terbilangSatuSatu(Number(newTargetStr[1]))}`;
  } else {
    /* Tanpa Desimal */
    return terbilangin(target);
  }
}

export function formatAngkaRomawi(num: number) {
  if (isNaN(num)) return NaN;
  const digits = String(num).split("");
  const key = [
    "",
    "C",
    "CC",
    "CCC",
    "CD",
    "D",
    "DC",
    "DCC",
    "DCCC",
    "CM",
    "",
    "X",
    "XX",
    "XXX",
    "XL",
    "L",
    "LX",
    "LXX",
    "LXXX",
    "XC",
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
  ];
  let roman = "";
  let i = 3;
  while (i--)
    roman = (key[parseInt(digits.pop() || "0") + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

export function ucFirst(text: string) {
  return text.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

export function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
