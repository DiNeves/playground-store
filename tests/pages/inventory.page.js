import { test, expect } from '@playwright/test';
import { STORELOCATORS } from '../data/storeMenu.data';
import { INVENTORYLOCATORS } from '../data/inventory.data';

export class InventoryPage {
    constructor(page) {
        this.page = page;

        this.inventoryTab = page.getByTestId(STORELOCATORS.inventory.tab);
        this.inventoryTitle = page.getByTestId(STORELOCATORS.inventory.title);

        this.productName = page.getByTestId(INVENTORYLOCATORS.productName);
        this.productPrice = page.getByTestId(INVENTORYLOCATORS.productPrice);
        this.productQuantity = page.getByTestId(INVENTORYLOCATORS.productQuantity);

        this.addProductButton = page.getByTestId(INVENTORYLOCATORS.addProductButton);
        
        this.rows = page.getByTestId(INVENTORYLOCATORS.table.list).getByRole(INVENTORYLOCATORS.table.listItem);
    }

    async fillProductName(productName) {
        await test.step('Fill product name', async () => {
            await this.productName.fill(productName);
        });
    };

    async fillProductPrice(productPrice) {
        await test.step('Fill product price', async () => {
            await this.productPrice.fill(productPrice);
        });
    };

    async fillProductQuantity(productQuantity) {
        await test.step('Fill product quantity', async () => {
            await this.productQuantity.fill(productQuantity);
        });
    };

    async fillProductRequiredFields(product) {
        await test.step('Fill product required fields', async () => {
            await this.productName.fill(product.name);
            await this.productPrice.fill(product.price);
            await this.productQuantity.fill(product.quantity);
        });
    };

    async clickAddProductButton() {
        await test.step('Click on Add product button', async () => {
            await this.addProductButton.click();
        });
    };

    async validateProductAddedOnTable(product) {
        await test.step('Validate if product exists on list', async () => {
            // Get only the table's line that contains the product name.
            const row = this.rows.filter({ hasText: product.name });

            // Get fields from the table row.
            await expect(row.locator("[data-testid^=" + INVENTORYLOCATORS.table.productName + "]")).toHaveText(product.name);
            await expect(row.locator("[data-testid^=" + INVENTORYLOCATORS.table.productPrice + "]")).toHaveText(product.price);
            await expect(row.locator("[data-testid^=" + INVENTORYLOCATORS.table.productQuantity + "]")).toHaveText(product.quantity);
        });
    };

    async clickIncreaseStockButton(productName) {
        await test.step('Click on "+" button for product: ' + productName, async () => {
            const row = this.rows.filter({ hasText: productName });
            await row.locator("[data-testid^=" + INVENTORYLOCATORS.table.increaseButton + "]").click();
        });
    }

    async clickDecreaseStockButton(productName) {
        await test.step('Click on "-" button for product: ' + productName, async () => {
            const row = this.rows.filter({ hasText: productName });
            await row.locator("[data-testid^=" + INVENTORYLOCATORS.table.decreaseButton + "]").click();
        });
    }

    async getProductStockQuantity(productName) {
        return await test.step('Get stock quantity for product: ' + productName, async () => {
            const row = this.rows.filter({ hasText: productName });
            const quantityText = await row.locator("[data-testid^=" + INVENTORYLOCATORS.table.productQuantity + "]").textContent();
            return parseInt(quantityText, 10);
        });
    }
}