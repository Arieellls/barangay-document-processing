"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { registerAccount } from "@/actions/users";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { SexOptions } from "../admin/residents/SexOptions";
import { useEffect, useState, useTransition } from "react";
import { registerSchema } from "@/db/schemas";
import { toast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { StatusOptions } from "../admin/residents/StatusOptions";
import { VoterOptions } from "../admin/residents/VoterOptions";

export default function Register() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      redirect("/");
    }
  }, [session, router]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [sexValue, setSexValue] = useState<string>("");
  const [statusValue, setStatusValue] = useState<string>("");
  const [voterStatusValue, setVoterStatusValue] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (selectedFile) {
      formData.append("imageId", selectedFile);
    }

    formData.append("sex", sexValue);
    formData.append("status", statusValue);
    formData.append("isVoter", voterStatusValue);

    startTransition(async () => {
      try {
        let errors = await registerAccount(formData);
        if (errors) {
          console.log("Errors from server:", errors);
        } else {
          toast({
            title: "Account Created",
            description: `Account was created successfully.`
          });
          form.reset();
          router.replace("/login");
        }
      } catch (error) {
        console.error("Client-side error:", error);
      }
    });
  };

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      imageId: undefined,
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      middleName: "",
      sex: "",
      status: "",
      age: "",
      completeAddress: "",
      contactNumber: "",
      birthday: "",
      placeOfBirth: "",
      emailAddress: "",
      isVoter: "",
      formerAddress: "",
      currentAddress: "",
      purok: "",
      role: "user"
    }
  });

  const { control, setValue, watch, trigger } = form;

  const birthday = watch("birthday");

  useEffect(() => {
    if (birthday) {
      const calculateAge = (value: string) => {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        return age;
      };

      const age = calculateAge(birthday);
      setValue("age", String(age));
    }
  }, [birthday, setValue]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-[800px] border-2 border-muted rounded-lg px-5 py-8">
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col h-auto gap-4 mb-3 sm:flex-row">
              <div className="flex flex-col items-center justify-center h-full gap-3 sm:items-start">
                {imagePreview ? (
                  <div className="relative w-52 h-52 border-2 rounded-sm border-muted overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Profile Preview"
                      layout="fill"
                      objectFit="cover"
                      className="absolute inset-0"
                    />
                  </div>
                ) : (
                  <Image
                    src={"/Profile Default.png"}
                    width={200}
                    height={200}
                    alt="Arielito"
                    className="border-2 rounded-sm border-muted "
                  />
                )}
                <Label
                  htmlFor="imageId"
                  className="text-muted-foreground font-light"
                >
                  Profile Picture
                </Label>
                <Input
                  type="file"
                  id="imageId"
                  name="imageId"
                  onChange={handleFileChange}
                />
              </div>

              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 auto-rows-min gap-y-2">
                <div className="box-border flex flex-col items-start gap-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-muted-foreground font-light">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input id="username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col items-start gap-2 sm:col-start-1 sm:col-end-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-muted-foreground font-light">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input id="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-start gap-2 sm:col-span-2 sm:col-start-2 sm:col-end-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-muted-foreground font-light">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            {/* Secondary Input */}
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 auto-rows-min gap-y-3">
              <div className="box-border flex flex-col items-start gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input id="firstName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input id="lastName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2 ">
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Middle Name
                      </FormLabel>
                      <FormControl>
                        <Input id="middleName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="box-border flex flex-col items-start gap-2">
                <Controller
                  name="sex"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Sex
                      </FormLabel>
                      <SexOptions
                        value={field.value || ""}
                        onChange={(newSexValue) => {
                          field.onChange(newSexValue);
                          setSexValue(newSexValue);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2 ">
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Birthday
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <Controller
                  control={control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Age
                      </FormLabel>
                      <FormControl>
                        <Input id="age" type="text" readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2 sm:col-start-1 sm:col-end-3">
                <FormField
                  control={form.control}
                  name="completeAddress"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Complete Address
                      </FormLabel>
                      <FormControl>
                        <Input id="completeAddress" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Contact No.
                      </FormLabel>
                      <FormControl>
                        <Input id="contactNumber" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2 ">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Status
                      </FormLabel>
                      <StatusOptions
                        value={field.value || ""}
                        onChange={(newStatusValue) => {
                          field.onChange(newStatusValue);
                          setStatusValue(newStatusValue);
                        }}
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2 sm:col-start-2 sm:col-end-4 ">
                <FormField
                  control={form.control}
                  name="placeOfBirth"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Place of Birth
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-muted-foreground"
                          id="placeOfBirth"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Third input */}
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 auto-rows-min gap-y-3 mt-3">
              <div className="box-border flex flex-col items-start gap-2">
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input id="emailAddress" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <FormField
                  control={form.control}
                  name="isVoter"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Voter Status
                      </FormLabel>
                      <VoterOptions
                        value={field.value || ""}
                        onChange={(newStatusValue) => {
                          field.onChange(newStatusValue);
                          setVoterStatusValue(newStatusValue);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2 ">
                <FormField
                  control={form.control}
                  name="formerAddress"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Former Address
                      </FormLabel>
                      <FormControl>
                        <Input id="formerAddress" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2 ">
                <FormField
                  control={form.control}
                  name="currentAddress"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Current Address
                      </FormLabel>
                      <FormControl>
                        <Input id="currentAddress" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2 ">
                <FormField
                  control={form.control}
                  name="purok"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0">
                      <FormLabel className="text-muted-foreground font-light">
                        Purok
                      </FormLabel>
                      <FormControl>
                        <Input id="purok" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end w-full mt-7 items-center">
              <div className="flex gap-2 justify-center items-center">
                <Link href={"/login"}>
                  <Button
                    type="button"
                    className="flex justify-center items-center"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
