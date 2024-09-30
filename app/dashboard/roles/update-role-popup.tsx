import React from "react";
import CustomModal from "@/components/ui/Modal";
import Form from "./form";

export type UpdateRolePopUpProps = {
  open: boolean;
  onClose: () => void;
  role: {
    name: string;
    permissions: string[];
  };
};

function UpdateRolePopUp(props: UpdateRolePopUpProps) {
  return (
    <CustomModal
      open={props.open}
      onClose={props.onClose}
      width="505px"
      height="461px"
    >
      <form>
        <Form role={props.role} isEdit={true} />
      </form>
    </CustomModal>
  );
}

export default UpdateRolePopUp;
