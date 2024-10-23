import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import { Input, AutoSuggestInput } from "./Input";
import Button from "./button/Button";
import { Calendar } from "./Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { CalendarIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { addPaper } from "@/utils/fetchPaperData";

const moduleOptions = ["Introduction to Computer Science", "Data Structures", "Algorithms"];
const courseOptions = ["Bachelor of Information Technology", "Computer Science", "Applied Mathematics"];

const lecturer = [
  { firstName: "Jean", lastName: "Ntwali" },
  { firstName: "Alice", lastName: "Munyaneza" },
  { firstName: "Emmanuel", lastName: "Rukundo" },
  { firstName: "Aline", lastName: "Uwimana" },
  { firstName: "Eric", lastName: "Kamanzi" },
  { firstName: "Patricia", lastName: "Mukamana" },
  { firstName: "Claude", lastName: "Nkurunziza" },
  { firstName: "Grace", lastName: "Mukarubega" },
  { firstName: "Olivier", lastName: "Maniraho" },
  { firstName: "Sandrine", lastName: "Iradukunda" }
];

const formSchema = z.object({
  course: z.string().min(1, "Course is required"),
  module: z.string().min(1, "Module is required"),
  dateTaken: z.date({
    required_error: "Date is required",
  }),
  lecturer: z.string().min(1, "Lecturer name is required"),
  uploader: z.string().min(1, "Uploader name is required"),
  trimester: z.string().min(1, "Trimester is required"),
  thumbnail: z.instanceof(File).optional(),
  pdfUrl: z.instanceof(File).refine((file) => {
    return file && file.type === "application/pdf";
  }, "Only PDF files are allowed"),
});

type FormValues = z.infer<typeof formSchema>;

const PaperForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    await addPaper(data);
  };

  const handleFileDrop = (
    e: React.DragEvent,
    fieldName: "thumbnail" | "pdfUrl"
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (fieldName === "pdfUrl" && file.type !== "application/pdf") {
      form.setError(fieldName, {
        type: "manual",
        message: "Only PDF files are allowed",
      });
      return;
    }
    form.setValue(fieldName, file);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mx-auto max-w-3xl space-y-4"
      >


      <FormField
        control={form.control}
        name="module"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Module Name</FormLabel>
            <AutoSuggestInput
              suggestions={moduleOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Type module name"
            />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="course"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Name</FormLabel>
            <AutoSuggestInput
              suggestions={courseOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Type course name"
            />
          </FormItem>
        )}
      />


        <FormField
          control={form.control}
          name="dateTaken"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Taken</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lecturer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lecturer Name</FormLabel>
              <FormControl>
                <AutoSuggestInput
                suggestions={lecturer.map(name => name.firstName + " " + name.lastName)}
                placeholder="Enter lecturer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="uploader"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uploaded by</FormLabel>
              <FormControl>
                <Input placeholder="Enter lecturer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trimester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trimester</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trimester" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7].map((trimester) => (
                    <SelectItem key={trimester} value={trimester.toString()}>
                      Trimester {trimester}
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
          name="thumbnail"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <div
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleFileDrop(e, "thumbnail")}
                >
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    {...field}
                  />
                  <Upload className="mx-auto h-8 w-8 mb-2" />
                  <p>Drag and drop or click to upload thumbnail</p>
                  {value && <p className="mt-2">Selected: {value.name}</p>}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pdfUrl"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Paper PDF</FormLabel>
              <FormControl>
                <div
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleFileDrop(e, "pdfUrl")}
                >
                  <Input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    {...field}
                  />
                  <Upload className="mx-auto h-8 w-8 mb-2" />
                  <p>Drag and drop or click to upload PDF</p>
                  {value && <p className="mt-2">Selected: {value.name}</p>}
                </div>
              </FormControl>
              <FormDescription>Only PDF files are allowed</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 justify-end items-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => console.log("Draft successfully!")}
          >
            Draft
          </Button>
          <Button type="submit" variant="default">
            Upload
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaperForm;
