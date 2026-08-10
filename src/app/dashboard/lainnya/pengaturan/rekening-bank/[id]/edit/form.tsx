import { rekeningBankTable } from "server/db/schema";
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
import { rekeningBankSchema } from "#server/schema/rekening-bank";
import BankPicker from "@/components/bank-picker";

export default function EditForm({
  data,
}: {
  data: typeof rekeningBankTable.$inferSelect;
}) {
  const navigate = useNavigate();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof rekeningBankSchema>>({
    resolver: zodResolver(rekeningBankSchema),
    mode: "onTouched",
    defaultValues: {
      bankId: data.bankId || undefined,
      noRekening: data.noRekening || undefined,
      namaRekening: data.namaRekening || undefined,
    },
  });

  const edit = api.rekeningBank.updateById.useMutation({
    onMutate() {
      toast.loading("Menyimpan data...");
    },
    onSuccess(data) {
      toast.dismiss();
      utils.rekeningBank.invalidate();
      navigate(-1);
      toast.success(data.message);
    },
    onError(error) {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  function onSubmit(val: z.infer<typeof rekeningBankSchema>) {
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
            name="bankId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank</FormLabel>
                <FormControl>
                  <BankPicker
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="noRekening"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Rekening</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="namaRekening"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama di Rekening</FormLabel>
                <FormControl>
                  <Input {...field} />
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
