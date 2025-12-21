import { serverAPI } from "../lib/config";
import axios from "axios";

class OrderService {
  private readonly path: string;

  constructor() {
    this.path = serverAPI;
  }
}

export default OrderService;
