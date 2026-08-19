import { useCookies } from "react-cookie";
import { api } from "@/trpc/react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAuth() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = api.user.getProfile.useQuery(undefined, {
    enabled: !!cookies.token,
  });

  if (isError && error.data?.code === "UNAUTHORIZED") {
    toast.error("Maaf, silakan login kembali");
    logout();
  }

  function login(token: string) {
    setCookie("token", token, {
      path: "/",
      sameSite: "strict",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
  }

  function logout() {
    // Hentikan query yang sedang berjalan dan bersihkan seluruh cache,
    // supaya data user tidak sempat ter-refetch ulang memakai token lama.
    queryClient.cancelQueries();
    queryClient.clear();

    // Bersihkan refresh token (httpOnly) di sisi server, supaya sesi
    // benar-benar dicabut dan tidak bisa direfresh kembali.
    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    }).catch(() => {});

    // Cookie harus dihapus dengan atribut yang sama seperti saat login
    // (path & sameSite). Tanpa opsi ini, cookie penghapus ditulis untuk
    // path default URL saat itu, bukan "/", sehingga cookie token asli
    // tidak benar-benar terhapus dan guard redirect masih mendeteksinya.
    removeCookie("token", { path: "/", sameSite: "strict" });

    // Paksa navigasi penuh ke halaman login agar state aplikasi bersih
    // dan tidak bergantung pada timing guard redirect SPA.
    window.location.assign("/login");
  }

  return { login, logout, token: cookies.token ?? "", user: user, isLoading };
}
