"use client";

import React from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Box, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import Dropdown from "@/components/ui/Menu";
import Done from "@mui/icons-material/Done";
import OrderDetail from "./order-detail";

export type Order = {
  id: string;
  pizza: string;
  toppings: string[];
  quantity: number;
  customer_no: string;
  created_at: string;
  status: string;
};

const columns: MRT_ColumnDef<Order>[] = [
  {
    accessorKey: "pizza",
    header: "Pizza",
  },
  {
    accessorKey: "toppings",
    header: "Toppings",
    Cell: ({ row }) => {
      const [open, setOpen] = React.useState(false);
      const handleModalClose = () => {
        setOpen(!open);
      };

      const handleModalOpen = () => {
        setOpen(!open);
      };

      const details = {
        name: row.original.pizza,
        toppings: row.original.toppings,
        quantity: row.original.quantity,
      };

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#FF8100",
            cursor: "pointer",
          }}
          onClick={handleModalOpen}
        >
          <Visibility
            sx={{
              width: "var(--3, 24px)",
              height: "var(--3, 24px)",
              cursor: "pointer",
            }}
          />
          <Typography
            sx={{
              color: "#FF8100",
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            Toppings
          </Typography>
          <OrderDetail open={open} onClose={handleModalClose} order={details} />
        </Box>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "customer_no",
    header: "Customer No",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "status",
    header: "Status",
    Cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Box>
          {status !== "DELIVERED" && <Dropdown status={status} orderId={row.original.id}/>}
          {status === "DELIVERED" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#008000",
              }}
            >
              <Done
                sx={{
                  width: "24px",
                  height: "24px",
                }}
              />
              <Typography
                sx={{
                  textAlign: "center",
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                  letterSpacing: "0.25px",
                }}
              >
                {status}
              </Typography>
            </Box>
          )}
        </Box>
      );
    },
  },
];

export default columns;
