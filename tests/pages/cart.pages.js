import { test, expect } from '@playwright/test';
import { STORELOCATORS } from '../data/storeMenu.data';
import { CARTLOCATORS } from '../data/cart.data';

export class CartPage {
    constructor(page) {
        this.page = page;

        this.cartTab = page.getByTestId(STORELOCATORS.cart.tab);
        this.cartTitle = page.getByTestId(STORELOCATORS.cart.title);

        this.table = page.getByTestId(CARTLOCATORS.table.list);
        this.tableListItems = this.table.getByRole(CARTLOCATORS.table.listItem);
        this.tableProduct = (product) => this.tableListItems.filter({ hasText: `${product}` });

        this.productName = (product) => this.tableProduct(product).locator("[data-testid^=" + CARTLOCATORS.table.productName + "]");
        this.productQuantity = (product) => this.tableProduct(product).locator("[data-testid^=" + CARTLOCATORS.table.productQuantity + "]");

        this.productPrice = (product) => this.tableProduct(product).locator("[data-testid^=" + CARTLOCATORS.table.productPrice + "]");
        this.productTotalPrice = (product) => this.tableProduct(product).locator("[data-testid^=" + CARTLOCATORS.table.productTotalPrice + "]");

    }

    async validateProductSuccessfullyAddedtoCart(product) {

        await test.step('Validate if the product is successfully added', async () => {

            // Get fields from the table row.
            await expect(this.productName(product.name)).toHaveText(product.name);
            await expect(this.productQuantity(product.quantity)).toHaveText(product.quantity);
            await expect(this.productPrice(product.price)).toHaveText(product.price);
            
            // FIXME
            // await expect(this.productTotalPrice(product.price)).toHaveText(product.price);
        });
    }
}