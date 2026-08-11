import toast from "react-hot-toast";

export const handleCopy = (text: string | null | undefined) => {
  if (!text) return toast.error("Tidak ada data yang bisa di-copy");

  navigator.clipboard.writeText(text);

  toast.success(`"${text}" berhasil dicopy`);
};
