import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack, Grid, Box, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import MenuAppBar from "./app-bar";

// compomnent import
import AddProduct from './add-product'
import EditProduct from './edit-product'
import DeleteProduct from './delete-product'

/**********************/

const itemsPerPage = 8; // Number of items per page

// collapse style function

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// product display using card

export default function ProductCard({ products }) {
  // collapse and expand field

  const [expandedItems, setExpandedItems] = React.useState(
    products ? Array(products.length).fill(false) : []
  );

  const handleExpandClick = (index) => {
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };

  // pagination field
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(products ? products.length / itemsPerPage : 1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const slicedData = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <MenuAppBar />
      <Box sx={{ m: 10 }}>
        <Box
        >
            <AddProduct/>
        </Box>
        <Grid container spacing={2}>
          {slicedData.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  title={product.title}
                  subheader={product.tags.map((tag) => ` #${tag} `)}
                />
                <CardMedia
                  component="img"
                  height="250"
                  // image={`/static/images/${product.id}.jpg`}
                  image={`/static/images/3.jpg`}
                  alt="Product image"
                />
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Typography variant="h6" color="text.secondary">
                      {product.price}
                    </Typography>
                    <Rating name="read-only" value={product.rating} readOnly />
                  </Stack>
                </CardContent>
                <CardActions disableSpacing>
                  <Stack direction='row' >
                  <EditProduct id={product.id}/>
                  <DeleteProduct id={product.id}/>
                  </Stack>
                  <ExpandMore
                    expand={expandedItems[product.id]}
                    onClick={() => handleExpandClick(product.id)}
                    aria-expanded={expandedItems[product.id]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse
                  in={expandedItems[product.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    <Typography paragraph>Description:</Typography>
                    <Typography paragraph>{product.description}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            m: 5,
          }}
        >
          <Stack direction="row" spacing={4}>
            <Button
              sx={{
                color: "#6A7C9B",
              }}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              size="large"
              color="secondary"
            >
              Previous
            </Button>
            <Typography variant="h5">
              {currentPage} / {totalPages}
            </Typography>
            <Button
              sx={{
                color: "#6A7C9B",
              }}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              size="large"
              color="secondary"
            >
              Next
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
