/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptionsInput from "./OptionsInput";
import Dropdown from "../Dropdown/Dropdown";
import DropdownList from "../Dropdown/DropdownList";
import Button from "../button/Button";
import { useAdvanceSearchStore } from "@/stores/stateStore";

type Props = {
  showAdvanceOptions: boolean;
};

const AdvanceSearchOption: React.FC<Props> = ({ showAdvanceOptions }) => {
  const {
    from,
    to,
    subject,
    hasWords,
    setFrom,
    setTo,
    setSize,
    setSubject,
    setHasWords,
  } = useAdvanceSearchStore();

  const sizeOptions = [
    { label: "Larger than", value: "larger" },
    { label: "Smaller than", value: "smaller" },
  ];

  const byteOptions = [
    { label: "MB", value: "megabyte" },
    { label: "KB", value: "kilobyte" },
    { label: "B", value: "byte" },
  ];
  const withinDate = [
    { label: "1 day", value: "megabyte" },
    { label: "KB", value: "kilobyte" },
    { label: "B", value: "byte" },
  ];
  const moduleType = [
    { label: "Exam", value: "exam" },
    { label: "CAT", value: "cat" },
  ];
  const moduleSession = [
    { label: "Day", value: "day" },
    { label: "Weekend", value: "weekend" },
  ];

  return (
    <AnimatePresence>
      {showAdvanceOptions ? (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className="absolute z-50 w-full p-6 space-y-4 bg-black border rounded-md font-semibold"
        >
          <OptionsInput name="Module name:" value={from} onChange={setFrom} />
          <OptionsInput name="Taught by:" value={to} onChange={setTo} />
          <OptionsInput
            name="Department:"
            value={subject}
            onChange={setSubject}
          />
          <OptionsInput
            name="Trimester:"
            value={hasWords}
            onChange={setHasWords}
          />
          <OptionsInput name="Year:" value={hasWords} onChange={setHasWords} />
          <OptionsInput
            name="Module Code:"
            value={hasWords}
            onChange={setHasWords}
          />
          <OptionsInput
            name="Contains words:"
            value={hasWords}
            onChange={setHasWords}
          />

          {/* <div className="flex items-center w-full gap-3">
            <label className="text-sm text-nowrap">Size</label>
            <div className="flex items-center justify-between w-full gap-3">
              <Dropdown label={"Select Module Type"} className="text-nowrap">
                <DropdownList
                  options={moduleType}
                  onSelect={(value) => setSize(value)}
                />
              </Dropdown>
              <input
                type="text"
                name="sizeValue"
                id="sizeValue"
                className="w-full pt-1 text-sm border-b-2 border-gray-600 focus:outline-none placeholder:text-gray-400 dark:bg-transparent active dark:border-b-white dark:placeholder:text-gray-500 dark:text-gray-300 focus:border-b-blue-500"
                value={""}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
          </div> */}

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              className="px-4 py-2 font-medium bg-transparent border rounded-lg w-max"
              onClick={() => console.log("Filter created")}
            >
              Create filter
            </Button>
            <Button
              className="px-4 py-2 font-medium rounded-lg w-max"
              onClick={() => console.log("Form submitted")}
            >
              Search
            </Button>
          </div>
        </motion.form>
      ) : null}
    </AnimatePresence>
  );
};

export default AdvanceSearchOption;
