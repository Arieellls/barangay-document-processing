"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import { services } from "@/lib/service-list";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PurposeOptions } from "./PurposeOptions";
import { useEffect, useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UserType } from "@/app/types/officialsType";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { submitRequestDocuments } from "@/app/actions/documents/submitRequest";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function RequestDocuments({ user }: { user?: UserType }) {
  const [purposeValue, setPurposeValue] = useState<string>("");
  const [openTextarea, setOpenTextarea] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (purposeValue === "Other") {
      setOpenTextarea(true);
    } else {
      setOpenTextarea(false);
    }
    console.log(openTextarea);
    console.log(purposeValue);
  }, [purposeValue]);

  const requestSchema = z.object({
    firstName: z.string().min(1, "First name is required."),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required."),
    email: z
      .string()
      .email("Invalid email address.")
      .min(1, "Email is required."),
    serviceType: z.string().min(1, "Service type is required."),
    purpose: z.string().min(1, "Purpose is required."),
    pickupDate: z
      .date({
        required_error: "Pick-up date is required.",
        invalid_type_error: "Invalid date."
      })
      .refine((date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      }, "Pick-up date cannot be in the past."),
    additionalDetails: z.string().optional()
  });

  const form = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    mode: "onChange",
    defaultValues: {
      firstName: user?.firstName,
      middleName: user?.middleName || "",
      lastName: user?.lastName,
      email: user?.emailAddress,
      purpose: "",
      serviceType: selectedService,
      pickupDate: undefined,
      additionalDetails: ""
    }
  });
  useEffect(() => {
    form.setValue("serviceType", selectedService);
    form.clearErrors("serviceType");
  }, [selectedService, form]);

  const onSubmit = (data: z.infer<typeof requestSchema>) => {
    console.log(data);

    startTransition(async () => {
      const errors = await submitRequestDocuments(data);

      try {
        if (errors) {
          console.log("Errors from server:", errors);
        } else {
          toast({
            title: "Request Sent",
            description: `Document request was sent successfully.`
          });
          setSelectedService("");
          setOpenTextarea(false);
          form.reset({
            serviceType: "",
            pickupDate: undefined,
            purpose: "",
            additionalDetails: ""
          });
        }
      } catch (error) {
        console.error("Client-side error:", error);
      }
    });
  };

  return (
    <div className="flex w-full gap-5 sm:flex-row flex-col">
      <div className="flex h-fit flex-wrap sm:w-[60%] gap-4 text-sm sm:text-lg">
        {services.map((service) => (
          <div
            key={service.id}
            className={`sm:w-60 w-44 cursor-pointer p-1  ${
              selectedService === service.name
                ? "border-2 border-gray-500 rounded-lg"
                : ""
            } transition-all duration-100`}
            onClick={() => setSelectedService(service.name)}
          >
            <Card className="w-full h-full overflow-hidden text-left">
              <CardHeader className="p-0">
                <div className="relative w-full auto aspect-video">
                  <Image src={service.imageCover} fill alt={service.name} />
                </div>
              </CardHeader>
              <CardContent className="px-3">
                <CardTitle className="p-0 m-0 text-[1rem] leading-4 my-4 mt-5">
                  {service.name}
                </CardTitle>
                <CardDescription className="p-0 m-0 text-sm">
                  <p>{service.description}</p>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="sm:w-[40%] h-full border-2 border-gray-800 rounded-md p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="py-1">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          id="firstName"
                          {...field}
                          className="text-muted-foreground"
                          value={user?.firstName}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-1">
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input
                          id="middleName"
                          {...field}
                          className="text-muted-foreground"
                          value={user?.middleName || ""}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-1">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          id="lastName"
                          value={user?.lastName}
                          className="text-muted-foreground"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          {...field}
                          className="text-muted-foreground"
                          value={user?.emailAddress}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="my-4" />
              <div className="py-1">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <FormControl>
                        <Input
                          id="serviceType"
                          {...field}
                          value={selectedService}
                          className="text-muted-foreground"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-1">
                <FormField
                  control={form.control}
                  name="pickupDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pick-up Date</FormLabel>
                      <FormControl>
                        <Input
                          id="pickupDate"
                          type="date"
                          value={
                            field.value instanceof Date
                              ? field.value.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) => {
                            const newValue = e.target.value;
                            field.onChange(
                              newValue ? new Date(newValue) : null
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-1">
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purpose</FormLabel>
                      <FormControl>
                        <PurposeOptions
                          value={field.value || ""}
                          onChange={(newPurposeValue) => {
                            field.onChange(newPurposeValue);
                            setPurposeValue(newPurposeValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {openTextarea && (
                <div className="py-1">
                  {openTextarea && (
                    <div className="py-1">
                      <FormField
                        control={form.control}
                        name="additionalDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Details</FormLabel>{" "}
                            <FormControl>
                              <Textarea
                                placeholder="Type your purpose here."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="flex gap-3 justify-end mt-5">
                <Button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    setSelectedService("");
                    form.reset({
                      serviceType: "",
                      pickupDate: undefined,
                      purpose: "",
                      additionalDetails: ""
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
