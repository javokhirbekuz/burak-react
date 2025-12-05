import axios from "axios";
import { serverAPI } from "../lib/config";
import { Product, ProductInquery } from "../lib/types/product";

class ProductService {
  private readonly path;

  constructor() {
    this.path = serverAPI;
  }

  public async getProducts(input: ProductInquery): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&limit=${input.limit}&page=${input.page}`;
      if (input.productCollection) {
        url += `&productCollection=${input.productCollection}`;
      }
      if (input.search) {
        url += `&search=${input.search}`;
      }
      const result = await axios.get(url);
      console.log("getProducts:", result);
      return result.data;
    } catch (err) {
      console.log("Error, getProducts:", err);
      throw err;
    }
  }
}

export default ProductService;
