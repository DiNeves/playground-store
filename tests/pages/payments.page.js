import { test, expect } from '@playwright/test';
import { PAYMENTSLOCATORS } from "../data/payments.data";
import { STORELOCATORS } from '../data/storeMenu.data';
import { ORDERSLOCATORS } from '../data/orders.data';

export class PaymentPage {
    constructor(page) {
        this.page = page;

        this.paymentsTab = page.getByTestId(STORELOCATORS.payments.tab);
        this.paymentsTitle = page.getByTestId(STORELOCATORS.payments.title);

        this.table = page.getByTestId(PAYMENTSLOCATORS.table.list);
        this.tableListItems = this.table.getByRole(PAYMENTSLOCATORS.table.listItem);
        this.tableProduct = (product) => this.tableListItems.filter({ hasText: `${product}` });

        this.productName = (product) => this.tableProduct(product).locator("[data-testid^=" + PAYMENTSLOCATORS.table.productName + "]");

        this.productDetails = (product) => this.tableProduct(product).locator("[data-testid^=" + PAYMENTSLOCATORS.table.productDetails + "]");
        this.productQuantity = (product) => this.productDetails(product).locator("[data-testid^=" + PAYMENTSLOCATORS.table.productQuantity + "]");

        this.productPrice = (product) => this.productDetails(product).locator("[data-testid^=" + PAYMENTSLOCATORS.table.productPrice + "]");
        this.productTotalPrice = (product) => this.tableProduct(product).locator("[data-testid^=" + PAYMENTSLOCATORS.table.productTotalPrice + "]");

        this.paymentTotalPrice = page.getByTestId(PAYMENTSLOCATORS.paymentTotalPrice);
        this.confirmPaymentButton = page.getByTestId(PAYMENTSLOCATORS.confirmPaymentButton);
    }

    async validateIfProductExistsInPayments(product) {

        await test.step('Validate if the product exists in payments page', async () => {

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

    async validateProductListExistsInPayments(productList) {
        await test.step('Validate if product list exists in payments page', async () => {
            for (const product of productList) {
                if (product.addedQuantity > 0) {
                    await this.validateIfProductExistsInPayments(product);
                }
            }
        });
    }

    async validateTotalPaymentSummary() {

        await test.step('Validate if the total payment price is correctly calculated', async () => {

            let totalPaymentPrice = parseFloat('0.00');

            const count = await this.tableListItems.count();
            for (let i = 0; i < count; ++i) {
                const val = parseFloat(await this.tableListItems.locator("[data-testid^=" + PAYMENTSLOCATORS.table.productTotalPrice + i + "]").textContent()).toFixed(2);
                totalPaymentPrice = (+totalPaymentPrice + +parseFloat(val)).toFixed(2)
            }
            await expect(parseFloat(await this.paymentTotalPrice.textContent()).toFixed(2)).toBe(parseFloat(totalPaymentPrice).toFixed(2));
        });
    }

    async selectPaymentMethod(paymentMethodType) {
        await test.step(`Select Payment Type: ${paymentMethodType}`, async () => {
            const paymentLocatorID = PAYMENTSLOCATORS.paymentMethods[paymentMethodType];
            await this.page.getByTestId(paymentLocatorID).click();
        });
    }

    async clickConfirmPaymentButton() {
        await test.step('Click on "Confirm Payment" button', async () => {
            await this.confirmPaymentButton.click();
        });
    }

    async validateRedirectToOrdersPage() {
        await test.step('Validate Redirect to Orders page', async () => {
            await expect(this.page.getByRole('heading', { name: ORDERSLOCATORS.labels.pageTitle })).toBeVisible();
        });
    }

    async clickConfirmPaymentWithoutSelectingMethod() {
        await test.step('Click on "Confirm Payment" button without selecting a payment method', async () => {
            this.page.once('dialog', async dialog => {
                expect(dialog.message()).toBe(PAYMENTSLOCATORS.labels.alertMessage);
                await dialog.accept();
            });
            await this.confirmPaymentButton.click();
            await expect(this.page.getByRole('heading', { name: PAYMENTSLOCATORS.labels.pageTitle })).toBeVisible();
        });
    }


}