import { useState, SyntheticEvent } from "react";
import { Stack, Box, Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishidOrders";
import "../../../css/orders.css";
import Divider from "../../components/divider";

export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="order-page">
      <Container
        className="order-container"
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order-right">
          <Box className="order-info-box">
            <Box className="member-box">
              <div className="order-user-img">
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
              <span className="order-user-name">Martin</span>
              <span className="order-user-prof">User</span>
            </Box>
            <Divider height="4" width="60" bg="#9b9797ff" />
            <Box className="member-location">
              <div className="member-location-info">
                {" "}
                <LocationOnIcon /> Do not exist
              </div>
            </Box>
          </Box>
          <Box className="order-payment-info-box">
            <div className="payment-card-number">
              Card number: **** 4090 2002 7495
            </div>
            <div className="payment-card-datas">
              <span className="payment-expire-data">07/24</span>
              <span> CVV: 010</span>
            </div>
            <div className="payment-card-user-name">Justin Robertson</div>
            <div
              className="payment-card-types"
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <img src="/icons/western-card.svg" />
              <img src="/icons/master-card.svg" />
              <img src="/icons/paypal-card.svg" />
              <img src="/icons/visa-card.svg" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
