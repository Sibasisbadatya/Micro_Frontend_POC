// CustomTable.jsx


import React, { useState } from "react";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Paper, TextField, Button, Box } from "@mui/material";




function validateField(col, value) {
  if (col.required && (value === "" || value === null || value === undefined)) {
    return `${col.label} is required`;
  }
  if (col.type === "number" && value !== "" && value !== null && value !== undefined) {
    if (isNaN(Number(value))) return `${col.label} must be a number`;
  }
  // Add more validation as needed
  return null;
}

function CustomTable({ columns = [], data = [], rowKey = "id", onSave }) {
  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [errors, setErrors] = useState({});

  const handleEdit = (row) => {
    setEditId(row[rowKey]);
    setEditRow({ ...row });
    setErrors({});
  };

  const handleCancel = () => {
    setEditId(null);
    setEditRow({});
    setErrors({});
  };

  const handleChange = (key, value) => {
    setEditRow((prev) => ({ ...prev, [key]: value }));
    const col = columns.find((c) => c.key === key);
    setErrors((prev) => ({ ...prev, [key]: validateField(col, value) }));
  };

  const handleSave = () => {
    // Validate all fields
    const nextErrors = {};
    columns.forEach((col) => {
      nextErrors[col.key] = validateField(col, editRow[col.key]);
    });
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
    onSave?.(editRow);
    setEditId(null);
    setEditRow({});
    setErrors({});
  };

  const gridColumns = [
    ...columns.filter(col => col.visible !== false).map(col => ({
      field: col.key,
      headerName: col.label,
      width: Number(col.width) || 150,
      editable: false,
      renderCell: (params) => {
        if (editId === params.row[rowKey]) {
          if (col.editable === false) {
            return (
              <TextField
                value={editRow[col.key] ?? ""}
                size="small"
                fullWidth
                disabled
              />
            );
          }
          return (
            <TextField
              value={editRow[col.key] ?? ""}
              onChange={e => handleChange(col.key, e.target.value)}
              error={!!errors[col.key]}
              helperText={errors[col.key]}
              size="small"
              fullWidth
            />
          );
        }
        return params.value ?? "-";
      }
    })),
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      renderCell: (params) => {
        const isEditing = editId === params.row[rowKey];
        if (isEditing) {
          return (
            <Box display="flex" gap={1}>
              <Button variant="contained" size="small" onClick={handleSave}>Save</Button>
              <Button variant="outlined" size="small" onClick={handleCancel}>Cancel</Button>
            </Box>
          );
        }
        return (
          <Button variant="outlined" size="small" onClick={() => handleEdit(params.row)}>
            Edit
          </Button>
        );
      },
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    }
  ];

  return (
    <Paper elevation={2} style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={data.map((row, idx) => ({ id: row[rowKey] ?? idx + 1, ...row }))}
        columns={gridColumns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </Paper>
  );
}

export default CustomTable;