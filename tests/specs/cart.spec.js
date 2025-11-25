import { test } from '@playwright/test';
import { StoreMenuPage } from '../pages/storeMenu.page'; 
import { CartPage } from '../pages/cart.page';
import { STOREPRODUCTS } from '../data/storeMenu.data';
import { InventoryPage } from '../pages/inventory.page';
import { CatalogPage } from '../pages/catalog.page';
import { StorePage } from '../pages/store.page';

test.describe('Cart section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToStorePage();
        await storeMenuPage.navigateToCartTab();
    });

     /**
     * Scenario 1: Display cart items and totals in cart page
     * 
     * Given I have added items to the cart
     * When  I visit the Cart page
     * Then  each item name, quantity, and subtotal should be displayed
     * And   the total amount should be correctly calculated.
    */
    test('Display cart items and totals in cart page', async ({ page }) => {
        const storePage = new StorePage(page);
        await storePage.addAndValidateDataProductListToCart(STOREPRODUCTS);
    });

    /**
     * Scenario 2: Proceed to the Payment step
     * 
     * Given I am in the Cart page with items
     * When I click "Go to Payments"
     * Then I should be redirected to the Payment page
    */
   test('Validate redirect to Payment page from Cart', async ({ page }) => {
        const cartPage = new CartPage(page);
        const storeMenuPage = new StoreMenuPage(page);
        const inventoryPage = new InventoryPage(page);
        const catalogPage = new CatalogPage(page);

        const product = STOREPRODUCTS[0];
        await test.step('Given that I have products in the Cart', async () => {
            await storeMenuPage.navigateToInventoryTab();
            await inventoryPage.fillProductRequiredFields(product);
            await inventoryPage.clickAddProductButton();
            await storeMenuPage.navigateToCatalogTab();
            await catalogPage.addProductToCart(product.name);
            await storeMenuPage.navigateToCartTab();
        });
        await cartPage.clickGoToPaymentButton();
        await cartPage.validateRedirectToPaymentPage();
   });

});