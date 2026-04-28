// CustomTable.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
} from "@mui/material";


function CustomTable({
  columns = [],
  data = [],
  rowKey = "id",
  onSave,
  onDelete,
}) {
  const visibleColumns = useMemo(
    () => columns.filter((col) => col.visible !== false),
    [columns]
  );

  const [editingRowId, setEditingRowId] = useState(null);
  const [draftRow, setDraftRow] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const startEdit = (row) => {
    setEditingRowId(row[rowKey]);
    setDraftRow({ ...row });
    setErrors({});
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setDraftRow({});
    setErrors({});
  };

  const updateField = (key, value) => {
    setDraftRow((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
  };

  const validateField = (key, value) => {
    const column = columns.find((col) => col.key === key);
    if (!column) return null;

    const rules = column.validation || {};

    if (column.required && (value === "" || value === null || value === undefined)) {
      return `${column.label} is required`;
    }

    if (rules.regex && value && !rules.regex.test(String(value))) {
      return rules.message || `Invalid ${column.label}`;
    }

    if (rules.min !== undefined && Number(value) < rules.min) {
      return rules.message || `${column.label} must be >= ${rules.min}`;
    }

    if (rules.max !== undefined && Number(value) > rules.max) {
      return rules.message || `${column.label} must be <= ${rules.max}`;
    }

    if (rules.minLength !== undefined && String(value).length < rules.minLength) {
      return rules.message || `${column.label} must be at least ${rules.minLength} chars`;
    }

    if (rules.maxLength !== undefined && String(value).length > rules.maxLength) {
      return rules.message || `${column.label} must be at most ${rules.maxLength} chars`;
    }

    if (typeof rules.custom === "function") {
      return rules.custom(value, draftRow);
    }

    return null;
  };

  const validateRow = () => {
    const nextErrors = {};
    for (const col of visibleColumns) {
      const error = validateField(col.key, draftRow[col.key]);
      if (error) nextErrors[col.key] = error;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = async (row) => {
    if (!validateRow()) return;

    try {
      setSaving(true);
      await onSave?.(draftRow, row);
      cancelEdit();
    } finally {
      setSaving(false);
    }
  };

  const renderCell = (column, row) => {
    const isEditing = editingRowId === row[rowKey];
    const value = isEditing ? draftRow[column.key] : row[column.key];

    if (!isEditing) {
      if (column.render) return column.render(value, row);
      if (column.type === "checkbox") return value ? "Yes" : "No";
      return value ?? "-";
    }

    if (column.readOnly || column.editable === false) {
      return value ?? "-";
    }

    switch (column.type) {
      case "textarea":
        return (
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={value ?? ""}
            onChange={(e) => updateField(column.key, e.target.value)}
            error={!!errors[column.key]}
            helperText={errors[column.key]}
            size="small"
          />
        );

      case "select":
        return (
          <TextField
            select
            fullWidth
            value={value ?? ""}
            onChange={(e) => updateField(column.key, e.target.value)}
            error={!!errors[column.key]}
            helperText={errors[column.key]}
            size="small"
          >
            <MenuItem value="">Select</MenuItem>
            {column.options?.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        );

      case "checkbox":
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={(e) => updateField(column.key, e.target.checked)}
              />
            }
            label=""
          />
        );

      default:
        return (
          <TextField
            fullWidth
            type={column.type || "text"}
            value={value ?? ""}
            onChange={(e) => updateField(column.key, e.target.value)}
            error={!!errors[column.key]}
            helperText={errors[column.key]}
            size="small"
          />
        );
    }
  };

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            {visibleColumns.map((col) => (
              <TableCell key={col.key} sx={{ fontWeight: 600, width: col.width || "auto" }}>
                {col.label}
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={visibleColumns.length + 1} align="center">
                <Typography variant="body2">No data available</Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => {
              const isEditing = editingRowId === row[rowKey];

              return (
                <TableRow key={row[rowKey]}>
                  {visibleColumns.map((col) => (
                    <TableCell key={col.key}>{renderCell(col, row)}</TableCell>
                  ))}

                  <TableCell>
                    {!isEditing ? (
                      <Box display="flex" gap={1}>
                        <Button variant="outlined" size="small" onClick={() => startEdit(row)}>
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => onDelete?.(row)}
                        >
                          Delete
                        </Button>
                      </Box>
                    ) : (
                      <Box display="flex" gap={1}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleSave(row)}
                          disabled={saving}
                        >
                          {saving ? "Saving..." : "Save"}
                        </Button>
                        <Button variant="outlined" size="small" onClick={cancelEdit}>
                          Cancel
                        </Button>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;