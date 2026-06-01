import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/data/countries";
import { categories, getVisaTypesForCountry } from "@/data/visa-types";
import type { TrackerApplication, TrackerStatus } from "@/lib/tracker";
import { createTrackerApplication, trackerStatusLabels, trackerStatuses } from "@/lib/tracker";
import type { VisaCategory } from "@/types/visa";

const trackerFormSchema = z.object({
  countryCode: z.string().min(1, "Choose a destination"),
  visaCategory: z.enum(["tourist", "business", "student", "work"]),
  appliedOn: z.string().min(1, "Add the application date"),
  status: z.enum(trackerStatuses),
});

type TrackerFormValues = z.infer<typeof trackerFormSchema>;

const defaultValues: TrackerFormValues = {
  countryCode: countries[0]?.code ?? "usa",
  visaCategory: "tourist",
  appliedOn: new Date().toISOString().slice(0, 10),
  status: "submitted",
};

export function TrackerForm({
  onAdd,
  disabled = false,
}: {
  onAdd: (application: TrackerApplication) => void;
  disabled?: boolean;
}) {
  const form = useForm<TrackerFormValues>({
    resolver: zodResolver(trackerFormSchema),
    defaultValues,
  });

  const selectedCountry = form.watch("countryCode");
  const availableTypes = useMemo(
    () => getVisaTypesForCountry(selectedCountry),
    [selectedCountry],
  );

  useEffect(() => {
    const currentCategory = form.getValues("visaCategory");
    if (!availableTypes.some((type) => type.category === currentCategory)) {
      form.setValue("visaCategory", availableTypes[0]?.category ?? "tourist");
    }
  }, [availableTypes, form]);

  const onSubmit = (values: TrackerFormValues) => {
    onAdd(
      createTrackerApplication({
        countryCode: values.countryCode,
        visaCategory: values.visaCategory as VisaCategory,
        appliedOn: values.appliedOn,
        status: values.status as TrackerStatus,
      }),
    );
    form.reset({
      ...values,
      appliedOn: new Date().toISOString().slice(0, 10),
      status: "submitted",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <FormField
          control={form.control}
          name="countryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <Select disabled={disabled} onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="visaCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visa type</FormLabel>
              <Select disabled={disabled} onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a visa type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableTypes.map((type) => {
                    const category = categories.find((item) => item.id === type.category);
                    return (
                      <SelectItem key={type.category} value={type.category}>
                        {category?.label ?? type.category}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="appliedOn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application date</FormLabel>
              <FormControl>
                <Input disabled={disabled} max={new Date().toISOString().slice(0, 10)} type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current status</FormLabel>
              <Select disabled={disabled} onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {trackerStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {trackerStatusLabels[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="md:col-span-2 xl:col-span-4">
          <Button disabled={disabled} type="submit">
            Add application
          </Button>
        </div>
      </form>
    </Form>
  );
}
