import { test, expect } from '@playwright/test';
import { STORELOCATORS } from '../data/storeMenu.data';
import { CARTLOCATORS } from '../data/cart.data';
import { PAYMENTSLOCATORS } from '../data/payments.data';

/**
 * Page Object Model for the Cart tab inside the Store page.
 * This class exposes:
 * - navigation helpers;
 * - actions (click);
 * - expect assertions.
 */
export class CartPage {
    constructor(page) {
        this.page = page;

        // ===== Fixed locators =====

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

        this.cartTotalPrice = page.getByTestId(CARTLOCATORS.cartTotalPrice);
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

            const productTotalPrice = parseFloat(await this.productTotalPrice(product.name).textContent());
            await expect(parseFloat(productTotalPrice).toFixed(2)).toBe(parseFloat(productQuantity * productPrice).toFixed(2));
        });
    }

    async validateProductListAddedtoCart(productList) {
        await test.step('Validate if product list is successfully added', async () => {
            for (const product of productList) {
                if (product.addedQuantity > 0) {
                    await this.validateProductSuccessfullyAddedtoCart(product);
                }
            }
        });
    }

    async validateTotalCartPrice() {

        await test.step('Validate if the total cart price is correctly calculated', async () => {

            let totalCartPrice = parseFloat('0.00');

            const count = await this.tableListItems.count();
            for (let i = 0; i < count; ++i) {
                const val = parseFloat(await this.tableListItems.locator("[data-testid^=" + CARTLOCATORS.table.productTotalPrice + i + "]").textContent()).toFixed(2);
                totalCartPrice = (+totalCartPrice + +parseFloat(val)).toFixed(2)
            }
            await expect(parseFloat(await this.cartTotalPrice.textContent()).toFixed(2)).toBe(parseFloat(totalCartPrice).toFixed(2));
        });
    }

    async clickGoToPaymentButton() {
        await test.step('Click on "Go to Payment" button', async () => {
            await this.goToPaymentButton.click();
        });
    }

    async validateRedirectToPaymentPage() {
        await test.step('Validate redirect to Payment page', async () => {
            await expect(this.page.getByRole('heading', { name: PAYMENTSLOCATORS.labels.pageTitle })).toBeVisible();
        });
    }
}