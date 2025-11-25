import { test, expect } from '@playwright/test';
import { STORELOCATORS } from '../data/storeMenu.data';
import { ORDERSLOCATORS } from '../data/orders.data';

export class OrdersPage {
    constructor(page) {
        this.page = page;

        this.ordersTab = page.getByTestId(STORELOCATORS.orders.tab);
        this.ordersTitle = page.getByTestId(STORELOCATORS.orders.title);

        this.table = page.getByTestId(ORDERSLOCATORS.table.list);
        this.tableListItems = this.table.getByRole(ORDERSLOCATORS.table.listItem);
        // this.tableProduct = (product) => this.tableListItems.filter({ hasText: `${product}` });

    }

    async validateOrderDetails(product, paymentMethodName){
        await test.step(`Validate Order Details for: ${product.name}`, async () => {
            const myOrder = this.tableListItems.filter({ hasText: `${product.name}` }).first();
            await expect(myOrder).toBeVisible();

            const dateLocator = myOrder.locator("[data-testid^=" + ORDERSLOCATORS.table.date + "]");
            await expect(dateLocator).toBeVisible();
            await expect(dateLocator).toContainText('Date: ');
            
            const paymentLocator = myOrder.locator("[data-testid^=" + ORDERSLOCATORS.table.paymentMethod + "]");
            await expect(paymentLocator).toContainText(paymentMethodName);

            const expectedItemText = `${product.addedQuantity} x ${product.name}`;
            await expect(myOrder).toContainText(expectedItemText);

            const productPrice = parseFloat(product.price);
            const quantity = parseInt(product.addedQuantity);
            const expectedTotal = (productPrice * quantity).toFixed(2);

            const totalLocator = myOrder.locator("[data-testid^=" + ORDERSLOCATORS.table.totalValue + "]");
            await expect(totalLocator).toHaveText(expectedTotal);   
        });
    }
}