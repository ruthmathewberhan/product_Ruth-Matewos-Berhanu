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
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";

// compomnent import
import AddProduct from "./add-product";
import EditProduct from "./edit-product";
import DeleteProduct from "./delete-product";

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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#CED6E4",
  "&:hover": {
    backgroundColor: "#CED6E4",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
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

  // search field
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // pagination field
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const totalPages = Math.ceil(products ? products.length / itemsPerPage : 1);

  return (
    <>
      <MenuAppBar />
      <Box sx={{ m: 10 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Box sx={{ ml: 5}}>
            <AddProduct />
          </Box>

          <Box sx={{ mr: 5}}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
          </Box>
        </Stack>
        <Grid container spacing={2}>
          {currentItems.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  title={product.title}
                  subheader={product ? (product.tags ? product.tags.map((tag) => ` #${tag} `): '') : ""}
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
                  <Stack direction="row">
                    <EditProduct id={product.id} />
                    <DeleteProduct id={product.id} />
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
              onClick={prevPage}
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
              onClick={nextPage}
              disabled={indexOfLastItem >= filteredProducts.length}
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
