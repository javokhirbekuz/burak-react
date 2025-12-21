import { createSelector } from "reselect";
import { AppRootState } from "../../lib/types/store";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retriveOrdersPage = createSelector(
  selectOrdersPage,
  (ordersPage) => {
    return {
      pausedOrders: ordersPage.pausedOrders,
      processOrders: ordersPage.processOrders,
      finishedOrders: ordersPage.finishedOrders,
    };
  }
);
