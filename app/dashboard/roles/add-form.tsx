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
import { addRole } from "@/lib/adminActions";
import { toast } from "react-toastify";

type Permission = {
  id: string;
  action: string;
  subject: string;
}

type FormProps = {
  role: {
    name?: string;
    permissions: Permission[];
  };
  onClose: () => void;
};

function AddForm(props: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const formattedPers = props.role.permissions.map((permission) => {
    return {
    id: permission.id,
    value: `${permission.action} ${permission.subject}`
    }
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

  const handleAddRole = async (data: addRoleFormTypes) => {


    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("permissions", JSON.stringify(data.permissions));

      const response = await addRole(formData);

      if (response.success) {
        setIsSubmitting(false);
        reset();
        toast.success(response.message);
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
        p: "20px"
      }}
      component={"form"}
      onSubmit={handleSubmit(handleAddRole)}
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
          justifyContent: "space-between"

        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            alignItems: "flex-start",
            flexShrink: 0,
            width: "100%",
          }}
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
            Permissions
          </Typography>


          <Box
            overflow={'auto'}
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
                    defaultValue={[]}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        value={permission.id}
                        checked={field.value.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, e.target.value]);
                          } else {
                            field.onChange(
                              field.value.filter((val) => val !== e.target.value)
                            );
                          }
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#FF8100",
                          },
                        }}
                      />
                    )}
                  />
                }
                label={permission.value}
              />

            ))}
          </Box>


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
           Add Role
        </Button>
      </Box>
    </Box>
  );
}

export default AddForm;
