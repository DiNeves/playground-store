import { test } from '@playwright/test';
import { StoreMenuPage } from '../pages/storeMenu.page'; 
import { CatalogPage } from '../pages/catalog.page';


test.describe('Catalog section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToStorePage();
        await storeMenuPage.navigateToCatalogTab();
    });

    /**
     * Scenario 1: Prevent adding out-of-stock items
     *
     * Given an item has quantity 0
     * Then the button should display "Out of Stock"
     * And the button should be disabled
    */
    test('Validate "Out of Stock" state for all displayed Products', async ({ page }) => {
        const catalogPage = new CatalogPage(page);
        await catalogPage.validateOutOfStockButtonInAllItems();
    });
});