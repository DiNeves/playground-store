import { test, expect } from '@playwright/test';
import { STORELOCATORS, STORELABELS } from '../data/storeMenu.data';

/**
 * Page Object Model for navigating between Store tabs in Playground website.
 * This class exposes:
 * - navigation helpers;
 * - expect assertions.
 */
export class StoreMenuPage {
    constructor(page) {
        this.page = page;
        
        // ===== Fixed locators =====
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

    // ===== Navigation =====

   /**
   * Navigate to the /store page in playground website and validate 
   * if the main title of the page is visible and properly displayed.
   */
    async navigateToStorePage() {
        await test.step('Go to store page', async () => {
            await this.page.goto(STORELOCATORS.goTo.storeUrl);
            await expect(this.homeTitle).toBeVisible();
            await expect(this.homeTitle).toHaveText(STORELABELS.home.pageTitle);
        });
    };

   /**
   * Navigate to the Home tab inside the store page and validate if 
   * the main title of the page is visible and properly displayed.
   */
    async navigateToHomeTab() {
        await test.step('Go to Home Store tab', async () => {
            await this.homeTab.click();
            await expect(this.homeTitle).toBeVisible();
            await expect(this.homeTitle).toHaveText(STORELABELS.home.pageTitle);
        });
    };

   /**
   * Navigate to the Inventory tab inside the store page and validate if 
   * the main title of the page is visible and properly displayed.
   */
    async navigateToInventoryTab() {
        await test.step('Go to Inventory tab', async () => {
            await this.inventoryTab.click();
            await expect(this.inventoryTitle).toBeVisible();
            await expect(this.inventoryTitle).toHaveText(STORELABELS.inventory.pageTitle);
        });
    };

   /**
   * Navigate to the Catalog tab inside the store page and validate if 
   * the main title of the page is visible and properly displayed.
   */
    async navigateToCatalogTab() {
        await test.step('Go to Catalog tab', async () => {
            await this.catalogTab.click();
            await expect(this.catalogTitle).toBeVisible();
            await expect(this.catalogTitle).toHaveText(STORELABELS.catalog.pageTitle);
        });
    };

   /**
   * Navigate to the Cart tab inside the store page and validate if 
   * the main title of the page is visible and properly displayed.
   */
    async navigateToCartTab() {
        await test.step('Go to Cart tab', async () => {
            await this.cartTab.click();
            await expect(this.cartTitle).toBeVisible();
            await expect(this.cartTitle).toHaveText(STORELABELS.cart.pageTitle);
        });
    };

   /**
   * Navigate to the Payments tab inside the store page and validate if 
   * the main title of the page is visible and properly displayed.
   */
    async navigateToPaymentsTab() {
        await test.step('Go to Payments tab', async () => {
            await this.paymentsTab.click();
            await expect(this.paymentsTitle).toBeVisible();
            await expect(this.paymentsTitle).toHaveText(STORELABELS.payments.pageTitle);
        });
    };

   /**
   * Navigate to the Orders tab inside the store page and validate if 
   * the main title of the page is visible and properly displayed.
   */
    async navigateToOrdersTab() {
        await test.step('Go to Orders tab', async () => {
            await this.ordersTab.click();
            await expect(this.ordersTitle).toBeVisible();
            await expect(this.ordersTitle).toHaveText(STORELABELS.orders.pageTitle);
        });
    };

};