// "use client";

// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function RequestForm() {
//   const requestSchema = z.object({
//     firstName: z.string(),
//     middleName: z.string().optional(),
//     lastName: z.string(),
//     purpose: z.string(),
//     serviceType: z.string(),
//     pickupDate: z.date()
//   });

//   const form = useForm<z.infer<typeof registerSchema>>({
//     resolver: zodResolver(registerSchema),
//     mode: "onChange",
//     defaultValues: {
//       imageId: undefined,
//       username: "",
//       password: "",
//       confirmPassword: "",
//       firstName: "",
//       lastName: "",
//       middleName: "",
//       sex: "",
//       status: "",
//       age: "",
//       completeAddress: "",
//       contactNumber: "",
//       birthday: "",
//       placeOfBirth: "",
//       emailAddress: "",
//       isVoter: "",
//       formerAddress: "",
//       currentAddress: "",
//       purok: "",
//       role: "user"
//     }
//   });

//   const onSubmit = (data: z.infer<typeof requestSchema>) => {
//     console.log(data);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <div className="py-4 space-y-8">
//           <FormField
//             control={form.control}
//             name="firstName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>First Name</FormLabel>
//                 <FormControl>
//                   <Input id="firstName" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className="py-4 space-y-8">
//           <FormField
//             control={form.control}
//             name="middleName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Middle Name</FormLabel>
//                 <FormControl>
//                   <Input id="middleName" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className="py-4 space-y-8">
//           <FormField
//             control={form.control}
//             name="lastName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Last Name</FormLabel>
//                 <FormControl>
//                   <Input id="lastName" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }
