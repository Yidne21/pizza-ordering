"use client";
import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  MRT_RowData,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
} from "material-react-table";
import { Box, Button, Typography } from "@mui/material";
import AddRolePopUp from "@/app/dashboard/roles/add-role-popup";
import AddUserPopUp from "@/app/dashboard/users/add-user-popup";

type CustomeTableProps<T extends MRT_RowData> = {
  data: T[]; // Data is passed as a prop, assuming it's fetched via SSR
  columns: MRT_ColumnDef<T>[]; // Table columns configuration
  maxHeight: string; // Maximum height for the table scroll
  title: string; // Optional title for the table
  fetchData: (params: {
    filters: MRT_ColumnFiltersState;
    globalFilter: string;
  }) => Promise<void>; // Function to fetch server-side data
};

const CustomeTable = <T extends MRT_RowData>({
  data,
  columns,
  maxHeight,
  fetchData,
  title,
}: CustomeTableProps<T>) => {
  // State for column filters and global filter
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState<string>("");

  // New states to track loading and error
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  // Fetch data when filters change
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchData({
          filters: columnFilters,
          globalFilter,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [columnFilters, globalFilter]);

  // Trigger refetching for filtering
  useEffect(() => {
    const refetchData = async () => {
      setIsRefetching(true);
      try {
        await fetchData({
          filters: columnFilters,
          globalFilter,
        });
      } catch (error) {
        console.error("Error refetching data:", error);
      } finally {
        setIsRefetching(false);
      }
    };

    if (!isLoading) {
      refetchData();
    }
  }, [columnFilters, globalFilter]);

  const [open, setOpen] = useState(false);
  const handleModalClose = () => {
    setOpen(!open);
  };

  const handleModalOpen = () => {
    setOpen(!open);
  };

  // Setting up Material React Table using custom hooks
  const table = useMaterialReactTable({
    enableColumnFilterModes: true,
    manualFiltering: true,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enablePagination: false,
    renderTopToolbarCustomActions: () => {
      return (
        <Box>
          {title === "orders" && (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color:
                  "var(--on-surface-medium-emphasis-60, rgba(0, 0, 0, 0.60))",
                fontFamily: "Roboto",
                fontStyle: "normal",
                letterSpacing: "0.15px",
              }}
            >
              Packages
            </Typography>
          )}

          {title === "users" && (
            <>
              <Button
                variant="contained"
                sx={{
                  background: "#FF8100",
                  borderRadius: "5px",
                  color: "#FFFFFF",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: 500,
                  letterSpacing: "0.15px",
                  fontFeatureSettings: { liga: "off", clig: "off" },
                  boxShadow: "none",
                  border: "none",
                }}
                onClick={handleModalOpen}
              >
                Add users
              </Button>
              <AddUserPopUp open={open} onClose={handleModalClose} />
            </>
          )}

          {title === "roles" && (
            <Box>
              <Button
                variant="contained"
                sx={{
                  background: "#FF8100",
                  borderRadius: "5px",
                  color: "#FFFFFF",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: 500,
                  letterSpacing: "0.15px",
                  fontFeatureSettings: { liga: "off", clig: "off" },
                  boxShadow: "none",
                  border: "none",
                }}
                onClick={handleModalOpen}
              >
                Add roles
              </Button>
              <AddRolePopUp open={open} onClose={handleModalClose} />
            </Box>
          )}
        </Box>
      );
    },

    columns,
    data,

    state: {
      columnFilters,
      globalFilter,
      showProgressBars: isRefetching,
      showSkeletons: isLoading,
    },
    muiTableContainerProps: {
      sx: {
        borderTop: "1px solid var(--divider, rgba(0, 0, 0, 0.12))",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        color: "var(--on-surface-high-emphasis-87, rgba(0, 0, 0, 0.87))",
        fontWeight: 500,
        fontSize: "16px",
        letterSpacing: "0.1px",
        borderBottom: "1px solid var(--divider, rgba(0, 0, 0, 0.12))",
        boxShadow: "none",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        color: "var(--on-surface-high-emphasis-87, rgba(0, 0, 0, 0.87))",
        fontWeight: 400,
        fontSize: "14px",
        letterSpacing: "0.1px",
        boxShadow: "none",
        fontStyle: "normal",
        fontFamily: "Roboto",
      },
    },
    muiTablePaperProps: {
      sx: {
        borderRadius: "var(--border-radius, 4px)",
        boxShadow: "none",
        border: "1px solid var(--divider, rgba(0, 0, 0, 0.12))",
        maxHeight,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      },
    },

    muiTableBodyRowProps: {
      hover: false,
    },

    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
  });

  return <MaterialReactTable table={table} />;
};

export default CustomeTable;
