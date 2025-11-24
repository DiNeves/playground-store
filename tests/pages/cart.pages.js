import { test, expect } from '@playwright/test';
import { STORELABELS, STORELOCATORS } from '../data/storeMenu.data';
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

        this.productDetails = (product) => this.tableProduct(product).locator("[data-testid^=" + CARTLOCATORS.table.productDetails + "]");
        this.productQuantity = (product) => this.productDetails(product).locator("[data-testid^=" + CARTLOCATORS.table.productQuantity + "]");

        this.productPrice = (product) => this.productDetails(product).locator("[data-testid^=" + CARTLOCATORS.table.productPrice + "]");
        this.productTotalPrice = (product) => this.tableProduct(product).locator("[data-testid^=" + CARTLOCATORS.table.productTotalPrice + "]");

        this.goToPaymentButton = page.getByTestId(CARTLOCATORS.goToPaymentButton);

    }

    async validateProductSuccessfullyAddedtoCart(product) {

        await test.step('Validate if the product is successfully added', async () => {

            // Get fields from the table row.
            await expect(this.productName(product.name)).toHaveText(product.name);

            const productQuantity = await this.productQuantity(product.name).textContent();
            await expect(productQuantity).toBe(product.addedQuantity);

            const productPrice = await this.productPrice(product.name).textContent();
            await expect(productPrice).toBe(product.price);
            
            const productTotalPrice =  Number(await this.productTotalPrice(product.name).textContent());
            await expect(productTotalPrice).toBe(productQuantity*productPrice);
        });
    }

    async clickGoToPaymentButton() {
        await test.step('Click on "Go to Payment" button', async () => {
            await this.goToPaymentButton.click();
        });
    }

    async validateRedirectToPaymentPage(){
        await test.step('Validate redirect to Payment page', async () => {
            await expect(this.page.getByRole('heading', { name: STORELABELS.payments.pageTitle })).toBeVisible();
        });
    }
}