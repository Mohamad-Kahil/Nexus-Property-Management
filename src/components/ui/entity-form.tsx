import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "tel" | "date" | "select" | "textarea";
  placeholder?: string;
  description?: string;
  options?: { label: string; value: string }[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}

interface EntityFormProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  defaultValues?: Record<string, any>;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export function EntityForm({
  fields,
  onSubmit,
  onCancel,
  defaultValues = {},
  submitLabel = "Submit",
  isSubmitting = false,
}: EntityFormProps) {
  // Dynamically create schema based on fields
  const formSchema = z.object(
    fields.reduce((acc: Record<string, any>, field) => {
      let schema = z.string();

      if (field.validation?.required) {
        schema = schema.min(1, { message: `${field.label} is required` });
      } else {
        schema = schema.optional();
      }

      if (field.type === "number") {
        schema = z.preprocess(
          (val) => (val === "" ? undefined : Number(val)),
          z.number().optional(),
        );

        if (field.validation?.min !== undefined) {
          schema = schema.refine(
            (val) => val === undefined || val >= field.validation.min!,
            { message: `Must be at least ${field.validation.min}` },
          );
        }

        if (field.validation?.max !== undefined) {
          schema = schema.refine(
            (val) => val === undefined || val <= field.validation.max!,
            { message: `Must be at most ${field.validation.max}` },
          );
        }
      }

      if (field.type === "email") {
        schema = z.string().email({ message: "Invalid email address" });
        if (!field.validation?.required) {
          schema = schema.optional();
        }
      }

      if (field.validation?.minLength) {
        schema = schema.min(field.validation.minLength, {
          message: `Must be at least ${field.validation.minLength} characters`,
        });
      }

      if (field.validation?.maxLength) {
        schema = schema.max(field.validation.maxLength, {
          message: `Must be at most ${field.validation.maxLength} characters`,
        });
      }

      if (field.validation?.pattern) {
        schema = schema.regex(field.validation.pattern, {
          message: "Invalid format",
        });
      }

      acc[field.name] = schema;
      return acc;
    }, {}),
  );

  // Create form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  // Handle form submission
  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 py-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    {field.type === "select" ? (
                      <Select
                        onValueChange={formField.onChange}
                        defaultValue={formField.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "textarea" ? (
                      <Textarea
                        placeholder={field.placeholder}
                        {...formField}
                        className="min-h-[120px]"
                      />
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...formField}
                      />
                    )}
                  </FormControl>
                  {field.description && (
                    <FormDescription>{field.description}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <DialogFooter>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : submitLabel}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
