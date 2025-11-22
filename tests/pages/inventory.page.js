import { test, expect } from '@playwright/test';
import { STORELOCATORS, STOREPRODUCTS } from '../data/store.data';
import { INVENTORYLOCATORS } from '../data/inventory.data';

export class InventoryPage {
    constructor(page) {
        this.page = page;

        this.inventoryTab = page.getByTestId(STORELOCATORS.inventory.tab);
        this.inventoryTitle = page.getByTestId(STORELOCATORS.inventory.title);

        this.productName = page.getByTestId(INVENTORYLOCATORS.productName);
        this.productPrice = page.getByTestId(INVENTORYLOCATORS.productPrice);
        this.productQuantity = page.getByTestId(INVENTORYLOCATORS.productQuantity);

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
            await this.productName.fill(product.productName);
            await this.productPrice.fill(product.productPrice);
            await this.productQuantity.fill(product.productQuantity);
        });
    };
}