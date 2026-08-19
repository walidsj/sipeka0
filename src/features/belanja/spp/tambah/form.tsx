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
import { sppSchema } from "#server/schema/spp";
import LpjBelanjaPicker from "@/components/lpj-belanja-picker";

export default function CreateForm() {
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof sppSchema>>({
    resolver: zodResolver(sppSchema),
    mode: "onTouched",
    defaultValues: {
      lpjBelanjaId: undefined,
      noDokumen: "",
      tglDokumen: undefined,
    },
  });

  const create = api.spp.create.useMutation({
    onMutate() {
      toast.loading("Menyimpan data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.spp.invalidate();
      window.history.back();
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  function onSubmit(data: z.infer<typeof sppSchema>) {
    create.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={create.isPending} className="flex flex-col gap-2">
          <FormField
            name="lpjBelanjaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LPJ Belanja</FormLabel>
                <FormControl>
                  <LpjBelanjaPicker
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  />
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
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-3">
            <Button type="submit">
              {create.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
