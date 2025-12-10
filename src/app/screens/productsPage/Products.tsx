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
import { Product, ProductInquery } from "../../lib/types/product";
import { retrieveProducts } from "./selector";
import { ChangeEvent, useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../lib/enums/product.enum";
import { useDispatch, useSelector } from "react-redux";
import { serverAPI } from "../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../lib/types/search";

/**    REDUX SLICE & SELECTOR   **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => {
    dispatch(setProducts(data));
  },
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductProps {
  onAdd: (item: CartItem) => void;
}

const familyBrands = [
  { brandName: "Gurme", imagePath: "/img/gurme.webp" },
  { brandName: "Seafood", imagePath: "/img/seafood.webp" },
  { brandName: "Sweets", imagePath: "/img/sweets.webp" },
  { brandName: "Doner", imagePath: "/img/doner.webp" },
];

export default function Products(props: ProductProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  const [productSearch, setProductSearch] = useState<ProductInquery>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => {
        console.log(err);
      });
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /**    HANDLERS    **/

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
    console.log("productId:", id);
  };

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
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <Button
                  className="search-button"
                  color="primary"
                  variant="contained"
                  onClick={searchProductHandler}
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
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                className={"order"}
                onClick={() => {
                  searchOrderHandler("createdAt");
                }}
              >
                New
              </Button>

              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                className={"order"}
                onClick={() => {
                  searchOrderHandler("productPrice");
                }}
              >
                Price
              </Button>

              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                className={"order"}
                onClick={() => {
                  searchOrderHandler("productViews");
                }}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Other
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DESERT
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESERT)
                  }
                >
                  Dessert
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  Drink
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  Salad
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DISH
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  Dish
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverAPI}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + " l"
                      : product.productSize + " size";

                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => {
                        chooseDishHandler(product._id);
                      }}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <Button
                          className={"shop-btn product-actions"}
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
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
                          <Badge
                            badgeContent={product.productViews}
                            color={"secondary"}
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
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
                          {product.productPrice}
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
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBack, next: ArrowForward }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
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
