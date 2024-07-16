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
import EditIcon from "@mui/icons-material/Edit";
import Notify from "../common/notify";

const EditProduct = ({ id }) => {
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

  // to split the tags
  function splitAndAddToArray(str) {
    const splitArray = str.split(",");
    return splitArray;
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          color: "#6A7C9B",
        }}
        aria-label="edit"
        color="secondary"
      >
        <EditIcon />
      </IconButton>
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
              const resultArray = splitAndAddToArray(formJson.tags);
              const response = await fetch(
                `https://dummyjson.com/products/${id}`,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    title: formJson.title,
                    description: formJson.description,
                    rating: formJson.rating,
                    price: formJson.price,
                    tags: resultArray,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!response.ok) {
                setMessage("Failed to update product.");
                setSeverity("error");
              }

              const Res_data = await response.json();
              setMessage("The product has been updated sucessfully.");
              setSeverity("success");
            } catch (error) {
              setMessage("Error updating product :", error);
              setSeverity("error");
            }
            setOpens(true);
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can edit an existing product by providing the necessary
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
            defaultValue={product ? product.title : ""}
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
            defaultValue={product ? product.description : ""}
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
            defaultValue={product ? product.price : 1}
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
            defaultValue={product ? product.rating : 1}
            inputProps={{
              maxLength: 13,
              step: "any", // make it accept float
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
            defaultValue={
              product
                ? product.tags
                  ? product.tags.map((tag) => ` #${tag} `)
                  : ""
                : ""
            }
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

export default EditProduct;
