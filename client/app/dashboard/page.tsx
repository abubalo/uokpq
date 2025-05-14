"use client";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import React from "react";
import { GoogleDocIcon } from "@/components/shared/Icons";
import StatsCard from "@/components/dashboard/StatsCard";
import Default from "./Default";
import Users from "./Users";
import Settings from "./Settings";
import { useSearchParams } from "next/navigation";

const data = [
  {
    id: 1,
    name: "Linear Algebra",
    type: "Exam",
    status: "published",
    dateTaken: "2023-05-10",
    dateUploaded: "2023-06-15",
    uploader: {
      name: "John Doe",
      image:
        "https://plus.unsplash.com/premium_photo-1683140621573-233422bfc7f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 2,
    name: "Communication Skill",
    type: "Exam",
    status: "draft",
    dateTaken: "2023-04-25",
    dateUploaded: "",
    uploader: {
      name: "Jane Smith",
      image:
        "https://plus.unsplash.com/premium_photo-1683140618951-6232339fdb97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 3,
    name: "Object Oriented Programming",
    type: "CAT",
    status: "archived",
    dateTaken: "2023-03-20",
    dateUploaded: "2023-03-22",
    uploader: {
      name: "Alice Johnson",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 4,
    name: "Discrete Mathematics",
    type: "Exam",
    status: "draft",
    dateTaken: "2023-05-12",
    dateUploaded: "2023-05-18",
    uploader: {
      name: "Robert Brown",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 5,
    name: "Operating Systems",
    type: "Exam",
    status: "published",
    dateTaken: "",
    dateUploaded: "",
    uploader: {
      name: "Emma Clark",
      image:
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 6,
    name: "Artificial Intelligence",
    type: "CAT",
    status: "archived",
    dateTaken: "2023-03-10",
    dateUploaded: "2023-03-18",
    uploader: {
      name: "Michael Green",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 7,
    name: "Database Management Systems",
    type: "Exam",
    status: "published",
    dateTaken: "2023-06-01",
    dateUploaded: "2023-06-10",
    uploader: {
      name: "Sophia Davis",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 8,
    name: "Software Engineering",
    type: "CAT",
    status: "draft",
    dateTaken: "2023-03-10",
    dateUploaded: "2023-03-18",
    uploader: {
      name: "David Martinez",
      image:
        "https://images.unsplash.com/photo-1501746877-14782df58970?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 9,
    name: "Human-Computer Interaction",
    type: "Exam",
    status: "arhived",
    dateTaken: "2023-06-15",
    dateUploaded: "2023-06-20",
    uploader: {
      name: "Emily Wilson",
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 10,
    name: "Cybersecurity",
    type: "Exam",
    status: "draft",
    dateTaken: "2023-07-05",
    dateUploaded: "2023-07-08",
    uploader: {
      name: "Oliver Harris",
      image:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
];

const Dashboard = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("view") || "default";

  const components: Record<string, React.JSX.Element> = {
    default: <Default data={data} />,
    users: <Users users={data} />,
    settings: <Settings />,
  };

  const renderComponent = components[query] || components.default;

  const isActive = (view: string) =>
    query === view ? "text-blue-700 border-b-2 border-blue-700 pb-4" : "";

  return (
    <main className="container mx-auto h-auto">
      <section className="w-full space-y-8 mt-10">
        <div className="flex gap-6 border-b border-gray-600 dark:border-gray-400 font-semibold">
          <Link href="?view=default" className={isActive("default")}>
            All Papers
          </Link>
          <Link href="?view=users" className={isActive("users")}>
            Users
          </Link>
          <Link href="?view=settings" className={isActive("settings")}>
            Settings
          </Link>
          <Link href="#">Archive</Link>
        </div>

        <div className="w-full grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <StatsCard
            title={"Total Papers"}
            quantity={234892}
            icon={<GoogleDocIcon size={20} />}
            info={"10% increase since last week"}
          />
          <StatsCard
            title={"Total Students"}
            quantity={45230}
            icon={<GoogleDocIcon size={20} />}
            info={"5% increase since last week"}
          />
          <StatsCard
            title={"Active Exams"}
            quantity={120}
            icon={<GoogleDocIcon size={20} />}
            info={"5 new exams"}
          />
          <StatsCard
            title={"Uploaded CATs"}
            quantity={340}
            icon={<GoogleDocIcon size={20} />}
            info={"15 new CATs uploaded"}
          />
        </div>
      </section>

      <section>{renderComponent}</section>
    </main>
  );
};

export default Dashboard;
