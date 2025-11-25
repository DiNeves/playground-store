import { test } from '@playwright/test';
import { STOREPRODUCTS } from '../data/storeMenu.data';
import { StoreMenuPage } from '../pages/storeMenu.page'; 
import { CatalogPage } from '../pages/catalog.page';
import { StorePage } from '../pages/store.page';


test.describe('Catalog section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToStorePage();
        await storeMenuPage.navigateToCatalogTab();
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
        const storePage = new StorePage(page);
        const product = STOREPRODUCTS[0];
        await storePage.addProductFromCatalogToCart(product);
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