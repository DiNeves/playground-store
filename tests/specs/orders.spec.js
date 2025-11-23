import { test } from '@playwright/test';
import { StoreMenuPage } from '../pages/storeMenu.page';

test.describe('Orders section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToStorePage();
        await storeMenuPage.navigateToOrdersTab();
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
    test('Add Orders test here', async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        // await storeMenuPage.navigateToHomeTab();
    });

});