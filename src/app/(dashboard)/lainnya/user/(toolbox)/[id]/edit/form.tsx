import { pegawai, user } from "#server/db/schema";
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
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PegawaiPicker from "@/components/pegawai-picker";
import { userSchema } from "#server/schema/user";

const userEditSchema = userSchema.merge(
  z.object({
    password: z.string().min(5).or(z.string().nullish()),
  }),
);

export default function EditForm({
  data,
}: {
  data: Omit<typeof user.$inferSelect, "password"> & {
    pegawai?: typeof pegawai.$inferSelect;
  };
}) {
  const navigate = useNavigate();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof userEditSchema>>({
    resolver: zodResolver(userEditSchema),
    mode: "onTouched",
    defaultValues: {
      nama: data.nama!,
      username: data.username!,
      instansi: data.instansi!,
      role: data.role!,
      pegawaiId: data.pegawaiId ?? undefined,
      password: "",
    },
  });

  const edit = api.user.updateById.useMutation({
    onMutate() {
      toast.loading("Menyimpan user...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.user.getById.invalidate();
      navigate(-1);
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  function onSubmit(val: z.infer<typeof userEditSchema>) {
    edit.mutate({ id: data.id, ...val });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={edit.isPending} className="max-w-80">
          <div className="flex flex-col gap-2">
            <FormField
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama User</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="instansi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instansi</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">USER</SelectItem>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pegawaiId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pegawai</FormLabel>
                  <FormControl>
                    <PegawaiPicker
                      onValueChange={(val) => field.onChange(val ?? null)}
                      value={field.value ?? undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-3">
              <Button type="submit">
                {edit.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
