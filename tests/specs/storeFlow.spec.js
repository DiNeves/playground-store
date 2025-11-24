import { test } from '@playwright/test';
import { STOREPRODUCTS } from '../data/storeMenu.data';
import { StoreMenuPage } from '../pages/storeMenu.page';
import { InventoryPage } from '../pages/inventory.page';
import { CatalogPage } from '../pages/catalog.page';
import { CartPage } from '../pages/cart.pages';

test.describe('Integration tests between store pages', () => {

    test.beforeEach(async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToStorePage();
        await storeMenuPage.navigateToInventoryTab();
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
        const storeMenuPage = new StoreMenuPage(page);
        const inventoryPage = new InventoryPage(page);
        const catalogPage = new CatalogPage(page);
        const cartPage = new CartPage(page);

        const product = STOREPRODUCTS[0];
        await inventoryPage.addAndValidateProduct(product);

        await storeMenuPage.navigateToCatalogTab();
        await catalogPage.addProductToCart(product.name);

        await storeMenuPage.navigateToCartTab();
        await cartPage.validateProductSuccessfullyAddedtoCart(product);
    });

    /**
     * Scenario 2: Display cart items and totals in cart page
     * 
     * Given I have added items to the cart
     * When  I visit the Cart page
     * Then  each item name, quantity, and subtotal should be displayed
     * And   the total amount should be correctly calculated.
    */
    test('Display cart items and totals in cart page', async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        const inventoryPage = new InventoryPage(page);
        const catalogPage = new CatalogPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addMultipleProducts(STOREPRODUCTS);
        await storeMenuPage.navigateToCatalogTab();

        await catalogPage.addProductListToCart(STOREPRODUCTS);
        await storeMenuPage.navigateToCartTab();

        await cartPage.validateProductListAddedtoCart(STOREPRODUCTS);
        await cartPage.validateTotalCartPrice();
    });
});