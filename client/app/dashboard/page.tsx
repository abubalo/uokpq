import Sidebar from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import React from "react";
import Table from "@/components/dashboard/Table";
import StatsCard from "@/components/admin-widgets/StatsCard";
import { GoogleDocIcon } from "@/components/shared/Icons";

const Dashboard = () => {
  const data = [
    {
      name: "Linear Algebra",
      type: "Exam",
      status: "Uploaded",
      dateTaken: "2023-05-10",
      dateUploaded: "2023-06-15",
      uploader: {
        name: "John Doe",
        image:
          "https://plus.unsplash.com/premium_photo-1683140621573-233422bfc7f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    {
      name: "Communication Skill",
      type: "Exam",
      status: "Draft",
      dateTaken: "2023-04-25",
      dateUploaded: "",
      uploader: {
        name: "Jane Smith",
        image:
          "https://plus.unsplash.com/premium_photo-1683140618951-6232339fdb97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    {
      name: "Object Oriented Programming",
      type: "CAT",
      status: "Uploaded",
      dateTaken: "2023-03-20",
      dateUploaded: "2023-03-22",
      uploader: {
        name: "Alice Johnson",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    {
      name: "Discrete Mathematics",
      type: "Exam",
      status: "Uploaded",
      dateTaken: "2023-05-12",
      dateUploaded: "2023-05-18",
      uploader: {
        name: "Robert Brown",
        image:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    {
      name: "Operating Systems",
      type: "Exam",
      status: "Draft",
      dateTaken: "",
      dateUploaded: "",
      uploader: {
        name: "Emma Clark",
        image:
          "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    {
      name: "Artificial Intelligence",
      type: "CAT",
      status: "Uploaded",
      dateTaken: "2023-03-10",
      dateUploaded: "2023-03-18",
      uploader: {
        name: "Michael Green",
        image:
          "https://images.unsplash.com/photo-1502767089025-6572583495b4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    {
      name: "Database Management Systems",
      type: "Exam",
      status: "Uploaded",
      dateTaken: "2023-06-01",
      dateUploaded: "2023-06-10",
      uploader: {
        name: "Sophia Davis",
        image:
          "https://images.unsplash.com/photo-1601758123927-1b9b37b99d94?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    {
      name: "Software Engineering",
      type: "CAT",
      status: "Draft",
      dateTaken: "2023-03-10",
      dateUploaded: "2023-03-18",
      uploader: {
        name: "David Martinez",
        image:
          "https://images.unsplash.com/photo-1501746877-14782df58970?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    {
      name: "Human-Computer Interaction",
      type: "Exam",
      status: "Uploaded",
      dateTaken: "2023-06-15",
      dateUploaded: "2023-06-20",
      uploader: {
        name: "Emily Wilson",
        image:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    {
      name: "Cybersecurity",
      type: "Exam",
      status: "Uploaded",
      dateTaken: "2023-07-05",
      dateUploaded: "2023-07-08",
      uploader: {
        name: "Oliver Harris",
        image:
          "https://images.unsplash.com/photo-1603415527035-3cc40f85f47d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    }
  ];

  return (
    <main className="container w0full mx-auto h-auto min-h-screen">
      <section className="w-full h-dvh space-y-8">
        <div id="header" className="flex justify-between items-center py-4">
          <h2 className="font-bold text-3xl">UokPqs Admin</h2>
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
        <div className="w-full grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <StatsCard
            title={"Total papers"}
            quantity={"234,892"}
            icon={<GoogleDocIcon size={20} />}
            info={"10% increase since last week"}
          />
          <StatsCard
            title={"Total students"}
            quantity={"234,892"}
            icon={<GoogleDocIcon size={20} />}
            info={"10% increase since last week"}
          />
          <StatsCard
            title={"Total papers"}
            quantity={"234,892"}
            icon={<GoogleDocIcon size={20} />}
            info={"10% increase since last week"}
          />
          <StatsCard
            title={"Total papers"}
            quantity={"234,892"}
            icon={<GoogleDocIcon size={20} />}
            info={"10% increase since last week"}
          />
        </div>
        <div>
          <Table data={data} />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
