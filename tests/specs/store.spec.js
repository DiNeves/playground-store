import { test } from '@playwright/test';
import { StoreMainPage } from '../pages/store.page';

test.describe('Store Menu Navigation', () => {

    test.beforeEach(async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToStorePage();
    });

    test('Navigate to Home tab', async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToHomeTab();
    });

    test('Navigate to Inventory tab', async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToInventoryTab();
    });

    test('Navigate to Catalog tab', async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToCatalogTab();
    });

    test('Navigate to Cart tab', async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToCartTab();
    });

    test('Navigate to Payments tab', async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToPaymentsTab();
    });

    test('Navigate to Orders tab', async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToOrdersTab();
    });

});