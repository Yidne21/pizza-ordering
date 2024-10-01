import React from "react";
import CustomModal from "@/components/ui/Modal";
import Form from "./form";

export type AddUserPopUpProps = {
  open: boolean;
  onClose: () => void;
};

const roles = ["Admin", "customer", "staff", "manager"];

function AddUserPopUp(props: AddUserPopUpProps) {
  return (
    <CustomModal
      open={props.open}
      onClose={props.onClose}
      width="654px"
      height="584px"
    >
      <form>
        <Form roles={roles} isEdit={false} />
      </form>
    </CustomModal>
  );
}

export default AddUserPopUp;
