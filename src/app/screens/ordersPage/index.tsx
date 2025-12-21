import { useState, SyntheticEvent, useEffect } from "react";
import { Stack, Box, Container, TextField, Divider } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishidOrders";
import "../../../css/orders.css";
import { Dispatch } from "@reduxjs/toolkit";
import { Order, OrderInquiry } from "../../lib/types/order";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";

const actionDispatch = (dispatch: Dispatch) => ({
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setFinishedOrders, setPausedOrders, setProcessOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder } = useGlobals();
  const [value, setValue] = useState("1");
  const [orderIquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ ...orderIquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => {
        console.log(err);
      });

    order
      .getMyOrders({ ...orderIquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => {
        console.log(err);
      });
    order
      .getMyOrders({ ...orderIquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => {
        console.log(err);
      });
  }, [orderIquiry, orderBuilder]);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      <Container
        className="order-container"
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table-list"
                >
                  <Tab label="PAUSED ORDERS" value={"1"}></Tab>
                  <Tab label="PROCESS ORDERS" value={"2"}></Tab>
                  <Tab label="FINISHED ORDERS" value={"3"}></Tab>
                </Tabs>
              </Box>
            </Box>
            <Stack className="order-main-content">
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order-right">
          <Box className="order-info-box neumorphism-box">
            <Box className="member-box">
              <div className="order-user-img avatar-hover">
                <img
                  src="/icons/default-user.svg"
                  className="order-user-avatar"
                />
                <div className="order-user-icon-box">
                  <img
                    src="/icons/user-badge.svg"
                    className="order-user-prof-img"
                  />
                </div>
              </div>
              <span className="order-user-name">JOE</span>
              <span className="order-user-prof">User</span>
            </Box>
            <Divider className="soft-divider" />
            <Box className="member-location">
              <div className="member-location-info">
                <LocationOnIcon /> Busan, South Korea
              </div>
            </Box>
          </Box>

          <Box className="order-payment-info-box neumorphism-box">
            <TextField
              className="payment-card-number"
              variant="outlined"
              placeholder="Card number"
              fullWidth
              InputProps={{ style: { backgroundColor: "#fff" } }}
            />
            <Box className="payment-card-datas">
              <TextField
                className="payment-expire-data"
                variant="outlined"
                placeholder="MM/YY"
                InputProps={{ style: { backgroundColor: "#fff" } }}
              />
              <TextField
                variant="outlined"
                placeholder="CVV"
                InputProps={{ style: { backgroundColor: "#fff" } }}
              />
            </Box>
            <TextField
              className="payment-card-user-name"
              variant="outlined"
              placeholder="Cardholder Name"
              fullWidth
              InputProps={{ style: { backgroundColor: "#fff" } }}
            />
            <Box className="payment-card-types">
              <img src="/icons/western-card.svg" />
              <img src="/icons/master-card.svg" />
              <img src="/icons/paypal-card.svg" />
              <img src="/icons/visa-card.svg" />
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
