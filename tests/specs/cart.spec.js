import { test } from '@playwright/test';
import { StoreMainPage } from '../pages/store.page';

test.describe('Cart section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToStorePage();
        await storeMainPage.navigateToCartTab();
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
        const storeMainPage = new StoreMainPage(page);
        // await storeMainPage.navigateToHomeTab();
    });

});