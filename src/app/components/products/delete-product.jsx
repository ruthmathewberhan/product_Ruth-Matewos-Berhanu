"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Notify from "../common/notify";

const DeleteProduct = ({ id }) => {
  // notification field
  const [product, setProduct] = useState();
  const [opens, setOpens] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleNotifyClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpens(false);
  };

  // form dialog field
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        setMessage("Network response was not ok");
        setSeverity("error");
      }
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      if (err instanceof Error) {
        setMessage(`Error updating product : ${err.message} `);
        setSeverity("error");
      } else {
        setMessage("An unknown error occurred");
        setSeverity("error");
        setOpens(true);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <IconButton onClick={handleClickOpen} aria-label="delete" color="error">
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            try {
              const response = await fetch(
                `https://dummyjson.com/products/${id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!response.ok) {
                setMessage("Failed to delete product.");
                setSeverity("error");
              }

              const Res_data = await response.json();
              setMessage("The product has been deleted sucessfully.");
              setSeverity("success");
            } catch (error) {
              setMessage("Error deleting product :", error);
              setSeverity("error");
            }
            setOpens(true);
            handleClose();
          },
        }}
      >
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText color="error">
            This is an action with no return. Do you want to delete{" "}
            {product ? product.title : ""} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              color: "#6A7C9B",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Notify
        open={opens}
        message={message}
        severity={severity}
        handleClose={handleNotifyClose}
      />
    </>
  );
};

export default DeleteProduct;
