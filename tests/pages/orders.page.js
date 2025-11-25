import { test, expect } from '@playwright/test';
import { STORELOCATORS } from '../data/storeMenu.data';
import { ORDERSLOCATORS } from '../data/orders.data';

export class OrdersPage {
    constructor(page) {
        this.page = page;

        this.ordersTab = page.getByTestId(STORELOCATORS.orders.tab);
        this.ordersTitle = page.getByTestId(STORELOCATORS.orders.title);

        this.table = page.getByTestId(PAYMENTSLOCATORS.table.list);
        this.tableListItems = this.table.getByRole(PAYMENTSLOCATORS.table.listItem);
        // this.tableProduct = (product) => this.tableListItems.filter({ hasText: `${product}` });

    }



}