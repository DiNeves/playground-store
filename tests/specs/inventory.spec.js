import { test } from '@playwright/test';
import { StoreMainPage } from '../pages/store.page';
import { InventoryPage } from '../pages/inventory.page';
import { STOREPRODUCTS } from '../data/store.data';

test.describe('Inventory section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToStorePage();
        await storeMainPage.navigateToInventoryTab();
    });

    /**
     * Scenario 1: Add a new product to inventory
     * 
     * Given I am on the Inventory page
     * When  I fill the fields "Name", "Price", and "Quantity"
     * And   I click "Add Product"
     * Then  the product should appear in the inventory list
     * And   its quantity and price should be correctly displayed
    */
    test('Add product to inventory', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.fillProductName('Taser');
        await inventoryPage.fillProductPrice('55.00');
        await inventoryPage.fillProductQuantity('5');
        // missing click
    });

});