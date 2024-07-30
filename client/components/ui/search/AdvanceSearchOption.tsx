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
    moduleName,
    taughtBy,
    department,
    trimester,
    date,
    modulesCode,
    containsWords,
    session,
    paperType,
    setModuleName,
    setTaugtBy,
    setDepartment,
    setTrimester,
    setDate,
    setModulesCode,
    setContainsWords,
    setSession,
    setPaperType,
  } = useAdvanceSearchStore();

  const moduleSession = [
    { label: "Day", value: "day" },
    { label: "Weekend", value: "weekend" },
  ];
  const paperTypes = [
    { label: "Exam", value: "exam" },
    { label: "Cat", value: "cat" },
  ];

  const handleCreateFilter = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("Filter created!");
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

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
          <OptionsInput
            name="Module name:"
            value={moduleName}
            onChange={setModuleName}
          />
          <OptionsInput
            name="Taught by:"
            value={taughtBy}
            onChange={setTaugtBy}
          />
          <OptionsInput
            name="Department:"
            value={department}
            onChange={setDepartment}
          />
          <OptionsInput
            name="Paper type:"
            value={paperType}
            onChange={setPaperType}
          />
          <OptionsInput
            name="Trimester:"
            value={trimester}
            onChange={setTrimester}
          />
          <OptionsInput name="Date:" value={date} onChange={setDate} />
          <OptionsInput
            name="Module Code:"
            value={modulesCode}
            onChange={setModulesCode}
          />
          <OptionsInput
            name="Contains words:"
            value={containsWords}
            onChange={setContainsWords}
          />
          <OptionsInput name="Session:" value={session} onChange={setSession} />

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
              onClick={handleCreateFilter}
            >
              Create filter
            </Button>
            <Button
              className="px-4 py-2 font-medium rounded-lg w-max"
              onClick={handleSubmit}
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
