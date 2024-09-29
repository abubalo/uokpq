import Avatar from "@/components/profile/Avatar";
import React from "react";
import { SlOptionsVertical } from "react-icons/sl";

type TableRow = {
  name: string;
  type: string;
  status: string;
  dateTaken: string;
  dateUploaded: string;
  uploader: {
    name: string;
    image: string;
  };
};

type Props = {
  data: TableRow[];
};

const Table: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full ">
        <thead className="bg-neutral-500/50 backdrop:blur-md rounded-tl-md rounded-tr-md overflow-hidden">
          <tr className="rounded-full overflow-hidden">
            <th className="w-1/3 px-6 py-3 text-left  leading-4 font-medium text-gray-400  tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left  leading-4 font-medium text-gray-400  tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left  leading-4 font-medium text-gray-400  tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left  leading-4 font-medium text-gray-400  tracking-wider">
              Date Taken
            </th>
            <th className="px-6 py-3 text-left  leading-4 font-medium text-gray-400  tracking-wider">
              Date Uploaded
            </th>
            <th className="px-6 py-3 text-left  leading-4 font-medium text-gray-400  tracking-wider">
              Uploader
            </th>
            <th className="px-6 py-3 text-left  leading-4 font-medium text-gray-400  tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="">
          {data.map((row, index) => (
            <tr key={index}>
              <td className="w-1/3 px-6 py-4 whitespace-no-wrap border-b">
                {row.name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b">
                {row.type}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b">
                {row.status}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b">
                <span>{row.dateTaken}</span>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b">
                <span>{row.dateUploaded}</span>
              </td>
              <td className="flex items-center gap-4 px-6 py-4 whitespace-no-wrap border-b">
                <Avatar src={row.uploader.image} alt="" size="sm" />
                <span>{row.uploader.name}</span>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b">
                <span className="cursor-pointer">
                  <SlOptionsVertical />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
