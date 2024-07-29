import Sidebar from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import React from "react";
import Table from "@/components/dashboard/Table";

const Dashboard = () => {
  const data = [
    {
      name: "Linear Algbra",
      type: "Exam",
      status: "Uploaded",
      uploader: {
        name: "John Doe",
        image:
          "https://plus.unsplash.com/premium_photo-1683140621573-233422bfc7f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    {
      name: "Communication Skill",
      image:
        "https://plus.unsplash.com/premium_photo-1683140618951-6232339fdb97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      type: "Exam",
      status: "Draft",
      uploader: {
        name: "Jane Smith",
        image:
          "https://plus.unsplash.com/premium_photo-1683121771856-3c3964975777?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    {
      name: "Object Oriented Programming",
      type: "CAT",
      status: "Uploaded",
      uploader: {
        name: "Alice Johnson",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    // Add more data as needed
  ];
  return (
    <main className="container mx-auto">
      <Sidebar />
      <section className="space-y-8">
        <div id="header" className="flex justify-between items-center py-4">
          <h2 className="font-bold text-3xl">Papers</h2>{" "}
          <div>
            <Button className="rounded-md font-medium">Add Paper</Button>
          </div>
        </div>
        <div className="flex gap-6 border-b border-gray-600 dark:border-gray-400 font-semibold">
          <Link
            href="#"
            className="text-blue-700 border-b-2 border-blue-700 pb-4"
          >
            All Papers
          </Link>
          <Link href="#">Published</Link>
          <Link href="#">Drafts</Link>
          <Link href="#">Archive</Link>
        </div>
        <div>
          <Table data={data} />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
