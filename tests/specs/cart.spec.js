import { test } from '@playwright/test';
import { StoreMenuPage } from '../pages/storeMenu.page'; 

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

});