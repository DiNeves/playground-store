import { test } from '@playwright/test';
import { StoreMainPage } from '../pages/store.page';

test.describe('Payments section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToStorePage();
        await storeMainPage.navigateToPaymentsTab();
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
    test('Add Payments test here', async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        // await storeMainPage.navigateToHomeTab();
    });

});