import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from '@mui/material/Box';
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";




const Filter = ({ onFiltersClicked, events }) => {
  const [eventName, setEventName] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    setEventName(event.target.value);
  };

  const handleDelete = (e, value) => {
    e.preventDefault();
    setEventName((current) => current.filter(item => item !== value));

  };
  useEffect(() => {
    onFiltersClicked(eventName)
  }, [eventName])

  // const eventCache = {}
  return (
    <Box>
      <FormControl sx={{ minWidth: 400, color: 'red' }}>
        <InputLabel id="demo-simple-select-label">Event Type Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Event Type Filter"
          multiple
          value={eventName}
          onChange={handleChange}
          IconComponent={KeyboardArrowDownIcon}

          renderValue={(selected) => (
            <div>
              {(selected).map((value) => (
                <Chip
                  key={value}
                  label={value}
                  clickable
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }

                  onDelete={(e) => handleDelete(e, value)}
                />
              ))}
            </div>
          )}
        >
          {events.filterList && events.filterList.map((e) => {
            return (
              <MenuItem key={e} value={e}>
                <Checkbox checked={eventName.includes(e)} />
                <ListItemText primary={e} />
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>


  );
};

export default Filter;
