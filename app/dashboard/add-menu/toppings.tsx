import React, { useState } from "react";
import { Box, Button, FormControlLabel, Checkbox, TextField } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { addMenuFormTypes } from "@/utils/types";

interface ToppingComponentProps {
  control: Control<addMenuFormTypes>;
  selectedToppings: string[];
  setSelectedToppings: (toppings: string[]) => void;
}

const ToppingComponent: React.FC<ToppingComponentProps> = ({
  control,
  selectedToppings,
  setSelectedToppings,
}) => {
  const [toppings, setToppings] = useState<string[]>(["Cheese", "Pepperoni", "Mushrooms", "Mozzarella"]);
  const [newTopping, setNewTopping] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAddTopping = () => {
    setIsAdding(true);
    if (newTopping.trim()) {
      setToppings((prev) => [...prev, newTopping]);
      setNewTopping(""); 
      setIsAdding(false);
    }
  };

  return (
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
        lineHeight: "150%",
        letterSpacing: "0.15px",
      }}
    >
      {toppings.map((topping, index) => (
        <FormControlLabel
          key={index}
          control={
            <Controller
              name="toppings"
              control={control}
              defaultValue={selectedToppings}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  value={topping}
                  checked={field.value.includes(topping)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newToppings = [...field.value, e.target.value];
                      field.onChange(newToppings);
                      setSelectedToppings(newToppings);
                    } else {
                      const updatedToppings = field.value.filter(
                        (val: string) => val !== e.target.value
                      );
                      field.onChange(updatedToppings);
                      setSelectedToppings(updatedToppings);
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
          label={topping}
        />
      ))}

      {/* Conditionally render TextField */}
      {isAdding && (
        <TextField
          label="New Topping"
          variant="outlined"
          size="small"
          value={newTopping}
          onChange={(e) => setNewTopping(e.target.value)}
          sx={{ width: "150px", marginRight: "10px", fontSize: "8px", '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#FF8100',
          },
          '&:hover fieldset': {
            borderColor: '#FF8100', // Border color when hovered
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FF8100', // Border color when focused
          },
        }, }}
        />
      )}

      {/* Button to toggle text field */}
  
      <Button
        startIcon={<AddOutlinedIcon />}
        onClick={handleAddTopping} // Show text field on click
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
  );
};

export default ToppingComponent;
