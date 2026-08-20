import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import { api } from "@/trpc/react";
import { useAuth } from "@/lib/auth";
import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi";
import React from "react";
import { Helmet } from "react-helmet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  tahun: z.enum(["2025", "2026"]),
});

function Login() {
  const search = Route.useSearch();

  const auth = useAuth();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const login = api.user.login.useMutation({
    onMutate() {
      toast.loading("Sedang memproses...");
    },
    onSuccess(data) {
      toast.dismiss();
      auth.login(data.token);
      toast.success(data.message);
      navigate({ href: search.redirect || "/" });
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      password: "",
      tahun: "2026",
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    login.mutate(data);
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <Helmet>
        <title>Login - Atmaku</title>
      </Helmet>
      <CardHeader>
        <CardTitle className="text-2xl">Selamat Datang!</CardTitle>
        <CardDescription>
          Mohon masukkan informasi akun Anda untuk mulai menggunakan SIPEKA
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={login.isPending}>
            <CardContent className="flex flex-col gap-4">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <div className="relative">
                      <div className="absolute top-0 left-0 flex h-full items-center pl-3">
                        <FiUser className="text-gray-400" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Username"
                          className="h-12 pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <div className="absolute top-0 left-0 flex h-full items-center pl-3">
                        <FiLock className="text-gray-400" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          className="h-12 px-10"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <div className="absolute top-0 right-0 flex h-full items-center">
                        <Button
                          type="button"
                          variant="ghost"
                          className="hover:bg-transparent"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </Button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="tahun"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Anggaran</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full">
                          <SelectValue placeholder="Pilih tahun anggaran" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" size="lg" className="w-full">
                {login.isPending ? "Memproses..." : "Masuk ke Sistem"}
              </Button>
              <p>
                Belum punya akun?{" "}
                <Link to="/register" className="text-primary">
                  Daftar sekarang
                </Link>
              </p>
            </CardFooter>
          </fieldset>
        </form>
      </Form>
    </Card>
  );
}

export const Route = createFileRoute("/_auth/login")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: Login,
});
