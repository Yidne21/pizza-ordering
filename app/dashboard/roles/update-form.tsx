import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addRoleSchema } from "@/utils/schema";
import { addRoleFormTypes } from "@/utils/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input-field";
import { updateRole } from "@/lib/adminActions";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Permission = {
  id: string;
  action: string;
  subject: string;
};

type FormProps = {
  permissions: Permission[];
  role: {
    roleId: string;
    name: string;
    permissions: Permission[];
  };
  onClose: () => void;
};

function UpdateForm(props: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const { data: session } = useSession(); // Get the session object

  const formattedPers = props.permissions.map((permission) => {
    return {
      id: permission.id,
      value: `${permission.action} ${permission.subject}`,
    };
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addRoleFormTypes>({
    resolver: zodResolver(addRoleSchema),
  });

  if (!session?.user.resturantId) {
    redirect("/403");
  }

  const resturantId = session?.user.resturantId;

  const onSubmit = async (data: addRoleFormTypes) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("permissions", JSON.stringify(data.permissions));
      formData.append("roleId", props.role.roleId);
      formData.append("resturantId", resturantId);

      const response = await updateRole(formData);

      if (response.success) {
        setIsSubmitting(false);
        toast.success(response.message);
        reset();
        props.onClose();
      } else {
        setIsSubmitting(false);
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        alignSelf: "stretch",
        flexShrink: 0,
        width: "100%",
        p: "20px",
      }}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        sx={{
          color: "rgba(0, 0, 0, 0.50)",
          fontFeatureSettings: "'liga' off, 'clig' off",
          fontFamily: "Roboto",
          fontSize: "22px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "24px", // 109.091%
          letterSpacing: "0.15px",
        }}
      >
        Add Role
      </Typography>
      <InputField
        label="Name"
        name="name"
        type="text"
        register={register}
        error={errors.name}
        defaultValue={props.role.name}
      />

      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          overflow={"auto"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {formattedPers.map((permission, index) => (
            <FormControlLabel
              key={index}
              control={
                <Controller
                  name="permissions"
                  control={control}
                  defaultValue={props.role.permissions.map((p) => p.id)}
                  render={({ field }) => {
                    const isChecked = field.value.includes(permission.id);
                    return (
                      <Checkbox
                        {...field}
                        value={permission.id}
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            // Add permission to the selected values
                            field.onChange([...field.value, e.target.value]);
                          } else {
                            // Remove permission from the selected values
                            field.onChange(
                              field.value.filter(
                                (val) => val !== e.target.value
                              )
                            );
                          }
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#FF8100",
                          },
                        }}
                      />
                    );
                  }}
                />
              }
              label={permission.value}
            />
          ))}
        </Box>

        <Button
          sx={{
            padding: "10px, 20px",
            justifyContent: "center",
            borderRadius: "5px",
            background: "#FF8100",
            textTransform: "capitalize",
            width: "184px",
            color: "#FFF",
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: "Roboto",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "24px", // 109.091%
            letterSpacing: "0.15px",
          }}
          type="submit"
          disabled={isSubmitting}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}

export default UpdateForm;
