import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { profilBludSchema } from "./schema";
import { profilBlud } from "server/db/schema";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";

export function EditForm({
  data,
}: {
  data: Pick<
    typeof profilBlud.$inferSelect,
    "nama" | "alamat" | "noFax" | "noTelp" | "email" | "website"
  >;
}) {
  const auth = useAuth();

  const utils = api.useUtils();

  const createOrUpdate = api.profilBlud.createOrUpdate.useMutation({
    onMutate() {
      toast.loading("Menyimpan perubahan...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.profilBlud.get.invalidate();
      toast.success(data.message);
    },
    onError(err) {
      toast.dismiss();
      toast.error(err.message);
    },
  });

  const form = useForm<z.infer<typeof profilBludSchema>>({
    resolver: zodResolver(profilBludSchema),
    mode: "onTouched",
    defaultValues: {
      nama: data.nama ?? "",
      alamat: data.alamat ?? "",
      noTelp: data.noTelp ?? "",
      noFax: data.noFax ?? "",
      email: data.email ?? "",
      website: data.website ?? "",
    },
  });

  function onSubmit(input: z.infer<typeof profilBludSchema>) {
    createOrUpdate.mutate(input);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={createOrUpdate.isPending || auth.user?.role === "USER"}
          className="flex flex-col gap-4"
        >
          <FormField
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama BLUD</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="alamat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="noTelp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Telepon</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="noFax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Fax</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {auth.user?.role === "ADMIN" && (
            <div>
              <Button type="submit">
                {createOrUpdate.isPending
                  ? "Menyimpan..."
                  : data.nama
                    ? "Ubah Profil"
                    : "Simpan"}
              </Button>
            </div>
          )}
        </fieldset>
      </form>
    </Form>
  );
}
