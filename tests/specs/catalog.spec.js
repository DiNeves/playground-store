import { test } from '@playwright/test';
import { StoreMainPage } from '../pages/store.page';
import { CatalogPage } from '../pages/catalog.page';


test.describe('Catalog section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToStorePage();
        await storeMainPage.navigateToCatalogTab();
    });

    /**
     * Scenario 1: Add an item to the cart from the catalog
     * 
     * Given I am on the Catalog page
     * When  the item has quantity available
     * And   I click "Add to Cart"
     * Then  the item quantity should decrease in the Catalog
     * And   the item should appear in the Cart page
    */
    test('Add item to cart from catalog', async ({ page }) => {
        const catalogPage = new CatalogPage(page);
        await catalogPage.addProductToCart('Lightsaber (Star Wars)');
    });

    /**
     * Scenario 2: Prevent adding out-of-stock items
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