import { serverAPI } from "../lib/config";
import axios from "axios";
import { Order, OrderInquiry, OrderItemInput } from "../lib/types/order";
import { CartItem } from "../lib/types/search";

class OrderService {
  private readonly path: string;

  constructor() {
    this.path = serverAPI;
  }
  public async createOrder(input: CartItem[]): Promise<Order> {
    try {
      const orderItem: OrderItemInput[] = input.map((cartItem: CartItem) => {
        return {
          productId: cartItem._id,
          itemQuantity: cartItem.quantity,
          itemPrice: cartItem.price,
        };
      });

      const url = `${this.path}/order/create`;

      const response = await axios.post(url, orderItem, {
        withCredentials: true,
      });
      console.log("Order created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error during order creation:", error);
      throw error;
    }
  }

  public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
    try {
      const url = `${this.path}/order/all?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;
      const response = await axios.get(url, { withCredentials: true });
      console.log("Fetched my orders successfully:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching my orders:", error);
      throw error;
    }
  }
}

export default OrderService;
