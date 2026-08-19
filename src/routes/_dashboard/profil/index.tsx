import { createFileRoute } from "@tanstack/react-router";

import { user } from "#server/db/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  nama: z.string().min(1),
  instansi: z.string().min(1),
  fileImage: z.instanceof(File).nullish(),
});

function Dashboard() {
  const auth = useAuth();

  return (
    <Card className="max-w-96">
      <CardContent>{auth.user && <EditForm data={auth.user} />}</CardContent>
    </Card>
  );
}

function EditForm({
  data,
}: {
  data: Omit<typeof user.$inferSelect, "password">;
}) {
  const utils = api.useUtils();

  const editUser = api.user.updateProfile.useMutation({
    onMutate() {
      toast.loading("Menyimpan perubahan...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.user.getProfile.invalidate();
      toast.success(data.message);
    },
    onError(err) {
      toast.dismiss();
      toast.error(err.message);
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      nama: data.nama ?? "",
      instansi: data.instansi ?? "",
    },
  });

  function onSubmit(input: z.infer<typeof schema>) {
    if (input.fileImage) {
      const reader = new FileReader();

      reader.readAsDataURL(input.fileImage);
      reader.onload = function () {
        if (typeof reader.result !== "string") return;

        editUser.mutate({
          nama: input.nama,
          instansi: input.instansi,
          image: reader.result,
        });
      };
    } else {
      editUser.mutate({
        nama: input.nama,
        instansi: input.instansi,
        image: null,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={editUser.isPending} className="flex flex-col gap-4">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input value={data.username ?? ""} disabled />
            </FormControl>
          </FormItem>

          <FormField
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input {...field} className="input" placeholder="Nama" />
                </FormControl>
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
            name="fileImage"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Foto Profil</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit">
              {editUser.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}

export const Route = createFileRoute("/_dashboard/profil/")({
  component: Dashboard,
});
