import { test } from '@playwright/test';
import { STOREPRODUCTS } from '../data/store.data';
import { StoreMainPage } from '../pages/store.page';
import { InventoryPage } from '../pages/inventory.page';

test.describe('Inventory section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToStorePage();
        await storeMainPage.navigateToInventoryTab();
    });

    for (const product of STOREPRODUCTS) {

        /**
        * Scenario 1: Add a new product to inventory
        * 
        * Given I am on the Inventory page
        * When  I fill the fields "Name", "Price", and "Quantity"
        * And   I click "Add Product"
        * Then  the product should appear in the inventory list
        * And   its quantity and price should be correctly displayed
        */
        test(`Add new product: ${product.name} | ${product.price} | ${product.quantity}`, async ({
            page,
        }) => {

            const inventoryPage = new InventoryPage(page);

            await inventoryPage.fillProductRequiredFields(product);
            await inventoryPage.clickAddProductButton();
            await inventoryPage.validateProductAddedOnTable(product);
        });

    }

});