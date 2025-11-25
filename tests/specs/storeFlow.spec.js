import { test } from '@playwright/test';
import { StoreMenuPage } from '../pages/storeMenu.page';

test.describe('Integration tests between store pages', () => {

    test.beforeEach(async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToStorePage();
        await storeMenuPage.navigateToInventoryTab();
    });

});