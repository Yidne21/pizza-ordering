import React from "react";
import CustomModal from "@/components/ui/Modal";
import Form from "./form";

export type AddRolePopUpProps = {
  open: boolean;
  onClose: () => void;
};

const permissions = [
  "Update Order Status",
  "See Orders",
  "See Customers",
  "Add Users",
];

const role = {
  name: "",
  permissions,
};
function AddRolePopUp(props: AddRolePopUpProps) {
  return (
    <CustomModal
      open={props.open}
      onClose={props.onClose}
      width="505px"
      height="461px"
    >
      <Form role={role} isEdit={false} />
    </CustomModal>
  );
}

export default AddRolePopUp;
