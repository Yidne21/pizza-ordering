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
import { addRole } from "@/lib/actions";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

type FormProps = {
  isEdit: boolean;
  role: {
    name?: string;
    permissions: string[];
  };
};

function Form(props: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [addError, setAddError] = useState<string | null>(null); // Track upload errors

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
    setAddError(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("permissions", JSON.stringify(data.permissions));

      const response = await addRole(formData);

      if (response.success) {
        reset();
      } else {
        setAddError(response.message);
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
        gap: "53px",
        alignSelf: "stretch",
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
        {props.isEdit ? "Edit Role" : "Add Role"}
      </Typography>
      <InputField
        label="Name"
        name="name"
        type="text"
        value={props.role.name}
        register={register}
        error={errors.name}
      />
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          width: "370px",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "53px",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              alignItems: "flex-start",
              flexShrink: 0,
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
              sx={{
                display: "flex",
                gap: { xs: "0px", lg: "15px" },
                flexWrap: "wrap",
                alignItems: "center",
                alignContent: "center",
                color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
                fontFamily: "Roboto",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "150%", // 24px
                letterSpacing: "0.15px",
              }}
            >
              {props.role.permissions.map((permission, index) => (
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
                          value={permission}
                          checked={field.value.includes(permission)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, e.target.value]);
                            } else {
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
                      )}
                    />
                  }
                  label={permission}
                />
              ))}
              <Button
                startIcon={<AddOutlinedIcon />}
                sx={{
                  display: "flex",
                  padding: "5px",
                  alignItems: "center",
                  gap: "10px",
                  borderRadius: "3px",
                  background: "#FF8100",
                  color: "#FFF",
                }}
              >
                Add
              </Button>
            </Box>
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
          {props.isEdit ? "Update" : "Add Role"}
        </Button>

        {/* Show upload error if any */}
        {addError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {addError}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Form;
