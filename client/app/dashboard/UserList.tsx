"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "@/components/ui/button/Button";
import { Input } from "@/components/ui/Input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Badge } from "@/components/ui/Badge";
import {
  ChevronDown,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/Avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  avatar?: string;
  lastActive: string;
}

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar:
      "https://plus.unsplash.com/premium_photo-1683140621573-233422bfc7f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Admin",
    status: "active",
    lastActive: "2024-03-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar:
      "https://plus.unsplash.com/premium_photo-1683140618951-6232339fdb97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Editor",
    status: "active",
    lastActive: "2024-03-14",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Viewer",
    status: "inactive",
    lastActive: "2024-02-28",
  },
  // Add more users as needed
];

export default function UserListPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Users</h1>
          <Badge variant="secondary" className="ml-2">
            {users.length} total
          </Badge>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system. They will receive an email
                invitation.
              </DialogDescription>
            </DialogHeader>
            {/* Add your form here */}
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="name" placeholder="Enter user's full name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter user's email"
                />
              </div>
              <Select>
                <SelectTrigger arial-label="role">
                  <SelectValue placeholder="Select user role" />
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="suer-admin">Super Admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button>Add User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 w-full max-w-sm">
          <Search className="h-4 w-4 text-gray-400" />
          <Input placeholder="Search users..." className="pl-8" />
        </div>
        <div className="flex items-center space-x-4">
          <Select>
            <SelectTrigger arial-label="role">
              <SelectValue placeholder="Role" />
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="suer-admin">Super Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </SelectTrigger>
          </Select>
          <Select>
            <SelectTrigger arial-label="status">
              <SelectValue placeholder="Status" />
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="idel">Idle</SelectItem>
                </SelectGroup>
              </SelectContent>
            </SelectTrigger>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex gap-3 items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "active" ? "default" : "secondary"}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                      <DropdownMenuItem>Reset password</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
