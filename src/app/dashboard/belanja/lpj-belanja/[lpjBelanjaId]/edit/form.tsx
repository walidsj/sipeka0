import { lpjBelanjaTable } from "server/db/schema";
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
import { format } from "date-fns";
import { lpjBelanjaSchema } from "#server/schema/lpj_belanja";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function EditForm({
  data,
}: {
  data: typeof lpjBelanjaTable.$inferSelect;
}) {
  const navigate = useNavigate();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof lpjBelanjaSchema>>({
    resolver: zodResolver(lpjBelanjaSchema),
    mode: "onTouched",
    defaultValues: {
      jenis: data.jenis || undefined,
      noDokumen: data.noDokumen || "",
      tglDokumen: data.tglDokumen || undefined,
      uraian: data.uraian || "",
    },
  });

  const edit = api.lpjBelanja.updateById.useMutation({
    onMutate() {
      toast.loading("Menyimpan data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.lpjBelanja.getById.invalidate();
      navigate(-1);
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  function onSubmit(val: z.infer<typeof lpjBelanjaSchema>) {
    edit.mutate({ id: data.id, ...val });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={edit.isPending}
          className="flex max-w-96 flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="jenis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GU">GU</SelectItem>
                      <SelectItem value="LS">LS</SelectItem>
                      <SelectItem value="TU">TU</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="noDokumen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Dokumen</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    className="h-12 text-xl font-bold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tglDokumen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Dokumen</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value ?? undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="uraian"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Uraian</FormLabel>
                <FormControl>
                  <Textarea
                    value={field.value}
                    onChange={field.onChange}
                    rows={4}
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
        </fieldset>
      </form>
    </Form>
  );
}
