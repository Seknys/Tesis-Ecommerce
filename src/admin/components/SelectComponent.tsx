import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Icategories } from "../../interfaces/interface";

interface ISelectProps {
  setCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
  category: string | undefined;
  categoryArray: Icategories[];
}

export default function SelectCategory({
  setCategory,
  category,
  categoryArray,
}: ISelectProps) {
  const handleChange = (event: any) => {

    if (setCategory) {
      setCategory(event.target.value as string);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Age"
          onChange={handleChange}
        >
          {categoryArray.map((categoryA) => (
            <MenuItem key={categoryA.uid} value={categoryA.uid}>
              {categoryA.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
