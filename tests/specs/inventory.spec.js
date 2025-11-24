import { test, expect } from '@playwright/test';
import { STOREPRODUCTS } from '../data/storeMenu.data'; 
import { StoreMenuPage } from '../pages/storeMenu.page';
import { InventoryPage } from '../pages/inventory.page';

test.describe('Inventory section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToStorePage();
        await storeMenuPage.navigateToInventoryTab();
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

        /** 
        * Scenario 2a: Increase stock quantity
        * 
        * Given an item exists in the inventory
        * When I click the "+" button
        * Then its quantity should increase by 1
        */

        test(`Increase stock quantity for product: ${product.name}`, async ({ page }) => {
            const inventoryPage = new InventoryPage(page);

            // Precondition: Add product to inventory
            await inventoryPage.fillProductRequiredFields(product);
            await inventoryPage.clickAddProductButton();
            await inventoryPage.validateProductAddedOnTable(product);

            // Obtain the inital stock quantity
            let initialQuantity = await inventoryPage.getProductStockQuantity(product.name);

            // Increase stock quantity by 1
            await inventoryPage.clickIncreaseStockButton(product.name);
            expect(await inventoryPage.getProductStockQuantity(product.name)).toBe(initialQuantity + 1);
        });

        /** 
        * Scenario 2b: Decrease stock quantity
        * 
        * When I click the "–" button
        * Then its quantity should decrease by 1
        * And it should never go below 0
        */

        test(`Decrease stock quantity for product: ${product.name}`, async ({ page }) => {
            const inventoryPage = new InventoryPage(page);

            // Precondition: Add product to inventory
            await inventoryPage.fillProductRequiredFields(product);
            await inventoryPage.clickAddProductButton();
            await inventoryPage.validateProductAddedOnTable(product);

            //Obtain the inital stock quantity
            let initialQuantity = await inventoryPage.getProductStockQuantity(product.name);

            // Decrease stock quantity
            await inventoryPage.clickDecreaseStockButton(product.name);
            const expectedQuantity = (initialQuantity > 0) ? initialQuantity - 1 : 0;
            expect(await inventoryPage.getProductStockQuantity(product.name)).toBe((expectedQuantity));
        });
    }

});