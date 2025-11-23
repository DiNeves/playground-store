import { test } from '@playwright/test';
import { StoreMenuPage } from '../pages/storeMenu.page'; 

test.describe('Store Menu Navigation', () => {

    test.beforeEach(async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToStorePage();
    });

    test('Navigate to Home tab', async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToHomeTab();
    });

    test('Navigate to Inventory tab', async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToInventoryTab();
    });

    test('Navigate to Catalog tab', async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToCatalogTab();
    });

    test('Navigate to Cart tab', async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToCartTab();
    });

    test('Navigate to Payments tab', async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToPaymentsTab();
    });

    test('Navigate to Orders tab', async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToOrdersTab();
    });

});