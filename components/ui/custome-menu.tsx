/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormControl, Select } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

type DropdownProps = {
  name: string;
  register: UseFormRegister<any>;
  defaultValue: string;
  children: React.ReactNode;
};

export default function CustomeMenu({
  name,
  register,
  defaultValue,
  children,
}: DropdownProps) {
  return (
    <FormControl>
      <Select
        value={defaultValue}
        {...register(name)}
        displayEmpty
        inputProps={{ "aria-label": "Select option" }}
      >
        {children}
      </Select>
    </FormControl>
  );
}
