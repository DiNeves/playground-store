import { test, expect } from '@playwright/test';
import { STORELOCATORS, STORELABELS } from '../data/store.data';

export class StoreMainPage {
    constructor(page) {
        this.page = page;
        
        this.homeTab = page.getByTestId(STORELOCATORS.home.tab);
        this.homeTitle = page.getByTestId(STORELOCATORS.home.title);
        
        this.inventoryTab = page.getByTestId(STORELOCATORS.inventory.tab);
        this.inventoryTitle = page.getByTestId(STORELOCATORS.inventory.title);
        
        this.catalogTab = page.getByTestId(STORELOCATORS.catalog.tab);
        this.catalogTitle = page.getByTestId(STORELOCATORS.catalog.title);
        
        this.cartTab = page.getByTestId(STORELOCATORS.cart.tab);
        this.cartTitle = page.getByTestId(STORELOCATORS.cart.title);
        
        this.paymentsTab = page.getByTestId(STORELOCATORS.payments.tab);
        this.paymentsTitle = page.getByTestId(STORELOCATORS.payments.title);
        
        this.ordersTab = page.getByTestId(STORELOCATORS.orders.tab);
        this.ordersTitle = page.getByTestId(STORELOCATORS.orders.title);
    }

    async navigateToStorePage() {
        await test.step('Go to store page', async () => {
            await this.page.goto(STORELOCATORS.goTo.storeUrl);
            await expect(this.homeTitle).toBeVisible();
            await expect(this.homeTitle).toHaveText(STORELABELS.home.pageTitle);
        });
    };

    async navigateToHomeTab() {
        await test.step('Go to Home Store tab', async () => {
            await this.homeTab.click();
            await expect(this.homeTitle).toBeVisible();
            await expect(this.homeTitle).toHaveText(STORELABELS.home.pageTitle);
        });
    };

    async navigateToInventoryTab() {
        await test.step('Go to Inventory tab', async () => {
            await this.inventoryTab.click();
            await expect(this.inventoryTitle).toBeVisible();
            await expect(this.inventoryTitle).toHaveText(STORELABELS.inventory.pageTitle);
        });
    };

    async navigateToCatalogTab() {
        await test.step('Go to Catalog tab', async () => {
            await this.catalogTab.click();
            await expect(this.catalogTitle).toBeVisible();
            await expect(this.catalogTitle).toHaveText(STORELABELS.catalog.pageTitle);
        });
    };

    async navigateToCartTab() {
        await test.step('Go to Cart tab', async () => {
            await this.cartTab.click();
            await expect(this.cartTitle).toBeVisible();
            await expect(this.cartTitle).toHaveText(STORELABELS.cart.pageTitle);
        });
    };

    async navigateToPaymentsTab() {
        await test.step('Go to Payments tab', async () => {
            await this.paymentsTab.click();
            await expect(this.paymentsTitle).toBeVisible();
            await expect(this.paymentsTitle).toHaveText(STORELABELS.payments.pageTitle);
        });
    };

    async navigateToOrdersTab() {
        await test.step('Go to Orders tab', async () => {
            await this.ordersTab.click();
            await expect(this.ordersTitle).toBeVisible();
            await expect(this.ordersTitle).toHaveText(STORELABELS.orders.pageTitle);
        });
    };

};