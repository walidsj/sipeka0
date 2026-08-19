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
import { FiEye, FiEyeOff } from "react-icons/fi";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Helmet } from "react-helmet";

const schema = z.object({
  nama: z.string().min(1),
  instansi: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  token: z.string().length(8),
});

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const register = api.user.register.useMutation({
    onMutate() {
      toast.loading("Sedang mendaftarkan...");
    },
    onSuccess(data) {
      toast.dismiss();
      toast.success(data.message);
      navigate({ to: "/login" });
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
      nama: "",
      instansi: "",
      username: "",
      password: "",
      token: "",
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    register.mutate(data);
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <Helmet>
        <title>Register - Atmaku</title>
      </Helmet>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Silakan registrasi akun</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={register.isPending}>
            <CardContent className="flex flex-col gap-4">
              <FormField
                name="nama"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
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
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          className="pr-10"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute top-0 right-0 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="instansi"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asal Instansi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Asal Instansi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Internal</SelectLabel>
                          <SelectItem value="RSJD Atma Husada Mahakam">
                            RSJD Atma Husada Mahakam
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Eksternal</SelectLabel>
                          <SelectItem value="BPKAD Prov. Kaltim">
                            BPKAD Prov. Kaltim
                          </SelectItem>
                          <SelectItem value="Bapenda Prov. Kaltim">
                            Bapenda Prov. Kaltim
                          </SelectItem>
                          <SelectItem value="BPK RI">BPK RI</SelectItem>
                          <SelectItem value="Biro Perekonomian Setda Prov. Kaltim">
                            Biro Perekonomian Setda Prov. Kaltim
                          </SelectItem>
                          <SelectItem value="Inspektorat Prov. Kaltim">
                            Inspektorat Prov. Kaltim
                          </SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="token"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-3">
                    <FormLabel>Masukkan TokenID</FormLabel>
                    <FormControl>
                      <Input placeholder="TokenID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button size="lg" className="w-full">
                {register.isPending ? "Mendaftarkan..." : "Daftar Akun"}
              </Button>
              <p>
                Sudah punya akun?{" "}
                <Link to="/login" className="text-primary">
                  Masuk
                </Link>
              </p>
            </CardFooter>
          </fieldset>
        </form>
      </Form>
    </Card>
  );
}

export const Route = createFileRoute("/_auth/register")({
  component: Login,
});
