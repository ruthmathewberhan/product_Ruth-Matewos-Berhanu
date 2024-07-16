"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import Notify from "../common/notify";

const AddProduct = () => {
  // notification field
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

  return (
    <>
      <Button
        sx={{
          background: "#6A7C9B",
          color: "white",
          "&:hover": {
            backgroundColor: "#B1BACA",
          },
          p: 2,
          mb: 4,
        }}
        onClick={handleClickOpen}
      >
        Add Product +
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            try {
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const response = await fetch(
                "https://dummyjson.com/products/add",
                {
                  method: "POST",
                  body: JSON.stringify({
                    title: formJson.title,
                    description: formJson.description,
                    rating: formJson.rating,
                    price: formJson.price,
                    tags: formJson.tags,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!response.ok) {
                setMessage("Failed to post product.");
                setSeverity("error");
              }

              const Res_data = await response.json();
              setMessage("The product has been added sucessfully.");
              setSeverity("success");
            } catch (error) {
              setMessage("Error posting product:", error);
              setSeverity("error");
            }
            setOpens(true);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add new product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can create a new product by providing the necessary
            informations
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            inputProps={{
              maxLength: 13,
              step: "any",
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="rating"
            name="rating"
            label="Rating"
            type="number"
            fullWidth
            variant="outlined"
            inputProps={{
              maxLength: 13,
              step: "any",
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="tags"
            name="tags"
            label="Tags"
            type="tags"
            fullWidth
            variant="outlined"
            placeholder="please separate the tags with commas (,)"
          />
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

export default AddProduct;
