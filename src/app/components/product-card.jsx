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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, Grid, Box } from "@mui/material";

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
  const [expandedItems, setExpandedItems] = React.useState(products ? Array(products.length).fill(false) : []);  

  const handleExpandClick = (index) => {  
    const newExpandedItems = [...expandedItems];  
    newExpandedItems[index] = !newExpandedItems[index];  
    setExpandedItems(newExpandedItems);  
  }; 

  return (
    <>
        <Box sx={{ m: 10 }}>
          <Grid container spacing={2}>
            {products.map((product, index) => (
              <Grid item sm={12} md={3} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    title={product.title}
                    subheader={product.tags.map((tag) => ` #${tag} `)}
                  />
                  <CardMedia
                    component="img"
                    height="250"
                    image="/static/images/1.jpg"
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
                      <Typography variant="body2" color="text.secondary">
                        {product.rating}
                      </Typography>
                    </Stack>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <ExpandMore
                      expand={expandedItems[index]}
                      onClick={() => handleExpandClick(index)}
                      aria-expanded={expandedItems[index]}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={expandedItems[index]}
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
        </Box>
    </>
  );
}
