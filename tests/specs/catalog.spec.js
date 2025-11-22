import { test } from '@playwright/test';
import { StoreMainPage } from '../pages/store.page';

test.describe('Catalog section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        await storeMainPage.navigateToStorePage();
        await storeMainPage.navigateToCatalogTab();
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
    test('Add Catalog test here', async ({ page }) => {
        const storeMainPage = new StoreMainPage(page);
        // await storeMainPage.navigateToHomeTab();
    });

});