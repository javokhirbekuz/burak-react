import { createSelector, Dispatch } from "@reduxjs/toolkit";
import {
  Badge,
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { setProducts } from "./slice";
import { Product } from "../../lib/types/product";
import { retrieveProducts } from "./selector";

/**    REDUX SLICE & SELECTOR   **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => {
    dispatch(setProducts(data));
  },
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

const products = [
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

const familyBrands = [
  { brandName: "Gurme", imagePath: "/img/gurme.webp" },
  { brandName: "Seafood", imagePath: "/img/seafood.webp" },
  { brandName: "Sweets", imagePath: "/img/sweets.webp" },
  { brandName: "Doner", imagePath: "/img/doner.webp" },
];

export default function Products() {
  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Box className="title">Burak Restaurant</Box>
            <Box className="search-bar">
              <div className="search-container">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Type here"
                />
                <Button
                  className="search-button"
                  color="primary"
                  variant="contained"
                >
                  <span className="search-text">SEARCH</span>
                  <SearchIcon className="search-icon" />
                </Button>
              </div>
            </Box>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={"primary"}
                className={"order"}
              >
                New
              </Button>

              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Price
              </Button>

              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button variant={"contained"} color={"secondary"}>
                  Other
                </Button>

                <Button variant={"contained"} color={"secondary"}>
                  Dessert
                </Button>

                <Button variant={"contained"} color={"secondary"}>
                  Drink
                </Button>

                <Button variant={"contained"} color={"secondary"}>
                  Salad
                </Button>

                <Button variant={"contained"} color={"primary"}>
                  Dish
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product, index) => {
                  return (
                    <Stack key={index} className={"product-card"}>
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${product.imagePath})` }}
                      >
                        <div className={"product-sale"}>Normal Size</div>
                        <Button className={"shop-btn product-actions"}>
                          <img
                            src={"/icons/shopping-cart.svg"}
                            alt=""
                            style={{ display: "flex" }}
                          />
                        </Button>

                        <Button
                          className={"view-btn product-actions"}
                          sx={{ right: "36px" }}
                        >
                          <Badge badgeContent={20} color={"secondary"}>
                            <RemoveRedEyeIcon
                              sx={{ color: false ? "gray" : "white" }}
                            ></RemoveRedEyeIcon>
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>

                        <div
                          className={"product-price"}
                          style={{ color: "#FF9200" }}
                        >
                          <MonetizationOnIcon />
                          {12}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className={"no-data"}>Products are not available</Box>
              )}
            </Stack>
          </Stack>
          <Stack className={"pagination-section"}>
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBack, next: ArrowForward }}
                  {...item}
                  color={"secondary"}
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brand-logo"}>
        <Container>
          <Stack className={"brand-logo-frame"}>
            <Stack>
              <Typography
                className={"brand-logo-title"}
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "30px",
                  color: "tan",
                }}
              >
                Our Family Brands
              </Typography>
            </Stack>
            <Stack className={"card"}>
              {familyBrands.length !== 0 ? (
                familyBrands.map((ele, index) => {
                  return (
                    <Stack key={index} className={"brands-card"}>
                      <img src={ele.imagePath} alt="nothing" />
                    </Stack>
                  );
                })
              ) : (
                <Box className={"no-data"}>No family brands Available</Box>
              )}
            </Stack>
          </Stack>
        </Container>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our Address</Box>

            <iframe
              title="Adress"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.8980123862757!2d71.91859257606139!3d40.521745271422866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb7f001e43dddd%3A0xc8a5fb4624a551b6!2sAkbarobod%20Q%20V%20P%20(poliklinika)!5e0!3m2!1sen!2skr!4v1762870004147!5m2!1sen!2skr"
              width="1320"
              height="500"
              style={{
                marginTop: "60px",
                border: 0,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
