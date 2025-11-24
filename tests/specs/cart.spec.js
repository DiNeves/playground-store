import { test } from '@playwright/test';
import { StoreMenuPage } from '../pages/storeMenu.page'; 
import { CartPage } from '../pages/cart.pages';
import { STOREPRODUCTS } from '../data/storeMenu.data';
import { InventoryPage } from '../pages/inventory.page';
import { CatalogPage } from '../pages/catalog.page';

test.describe('Cart section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToStorePage();
        await storeMenuPage.navigateToCartTab();
    });

    /**
     * Scenario 1: Add scenario here
     * 
     * Given
     * When
     * And
     * Then
     * And
    */
    test('Add Cart test here', async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        // await storeMenuPage.navigateToHomeTab();
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