import React from "react";
import CustomModal from "@/components/ui/Modal";
import Form from "./form";

export type UpdateUserPopUpProps = {
  open: boolean;
  onClose: () => void;
};

const roles = ["Admin", "customer", "staff", "manager"];

function UpdateUserPopUp(props: UpdateUserPopUpProps) {
  return (
    <CustomModal
      open={props.open}
      onClose={props.onClose}
      width="654px"
      height="584px"
    >
      <form>
        <Form roles={roles} isEdit={true} />
      </form>
    </CustomModal>
  );
}

export default UpdateUserPopUp;
