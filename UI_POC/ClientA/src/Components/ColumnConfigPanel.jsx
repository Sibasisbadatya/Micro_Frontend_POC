// ColumnConfigPanel.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Stack,
  Button,
  Typography,
  IconButton,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const FIELD_TYPES = ["text", "number", "email", "date", "textarea", "select", "checkbox"];

/**
 * Mocked fixed columns
 * width is internally available for table usage
 * width is NOT editable in UI for now
 */
const MOCK_COLUMNS = [
  {
    key: "employeeCode",
    label: "Employee Code",
    width: "180",
    type: "text",
    editable: true,
    required: true,
    visible: true,
    readOnly: false,
    options: [],
  },
  {
    key: "employeeName",
    label: "Employee Name",
    width: "220",
    type: "text",
    editable: true,
    required: true,
    visible: true,
    readOnly: false,
    options: [],
  },
  {
    key: "email",
    label: "Email",
    width: "260",
    type: "email",
    editable: true,
    required: true,
    visible: true,
    readOnly: false,
    options: [],
  },
  {
    key: "age",
    label: "Age",
    width: "120",
    type: "number",
    editable: true,
    required: false,
    visible: true,
    readOnly: false,
    options: [],
  },
  {
    key: "joiningDate",
    label: "Joining Date",
    width: "180",
    type: "date",
    editable: true,
    required: false,
    visible: true,
    readOnly: false,
    options: [],
  }
];

function ColumnConfigPanel({ value, onChange }) {
  const [columns, setColumns] = useState(value?.length ? value : MOCK_COLUMNS);

  useEffect(() => {
    onChange?.(columns);
  }, [columns, onChange]);

  const updateColumn = (index, field, val) => {
    const updated = [...columns];
    updated[index][field] = val;
    setColumns(updated);
  };

  const updateOption = (colIndex, optIndex, field, val) => {
    const updated = [...columns];
    updated[colIndex].options[optIndex][field] = val;
    setColumns(updated);
  };

  const removeOption = (colIndex, optIndex) => {
    const updated = [...columns];
    updated[colIndex].options.splice(optIndex, 1);
    setColumns(updated);
  };

  const addOption = (colIndex) => {
    const updated = [...columns];
    updated[colIndex].options.push({ label: "", value: "" });
    setColumns(updated);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6">Column Configuration</Typography>
        <Typography variant="body2" color="text.secondary">
          Configure behavior for existing columns
        </Typography>
      </Box>

      {columns.map((col, index) => (
        <Paper key={col.key} sx={{ p: 3 }} elevation={2}>
          <Box mb={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              {col.label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Key: {col.key}
            </Typography>
          </Box>

          <Grid container spacing={2}>


            <Grid item xs={12} md={8}>
              <Box display="flex" flexWrap="wrap" gap={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={col.editable}
                      onChange={(e) => updateColumn(index, "editable", e.target.checked)}
                    />
                  }
                  label="Editable"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={col.required}
                      onChange={(e) => updateColumn(index, "required", e.target.checked)}
                    />
                  }
                  label="Required"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={col.visible}
                      onChange={(e) => updateColumn(index, "visible", e.target.checked)}
                    />
                  }
                  label="Visible"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={col.readOnly}
                      onChange={(e) => updateColumn(index, "readOnly", e.target.checked)}
                    />
                  }
                  label="Read Only"
                />
              </Box>
            </Grid>
          </Grid>

          {col.type === "select" && (
            <>
              <Divider sx={{ my: 3 }} />

              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle2">Dropdown Options</Typography>
                <Button size="small" onClick={() => addOption(index)}>
                  Add Option
                </Button>
              </Box>

              <Stack spacing={2}>
                {col.options.map((opt, optIndex) => (
                  <Grid container spacing={2} key={optIndex}>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        label="Label"
                        value={opt.label}
                        onChange={(e) =>
                          updateOption(index, optIndex, "label", e.target.value)
                        }
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        label="Value"
                        value={opt.value}
                        onChange={(e) =>
                          updateOption(index, optIndex, "value", e.target.value)
                        }
                      />
                    </Grid>

                    <Grid item xs={2}>
                      <IconButton color="error" onClick={() => removeOption(index, optIndex)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            </>
          )}
        </Paper>
      ))}
    </Stack>
  );
}

export default ColumnConfigPanel;