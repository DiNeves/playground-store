import { test, expect } from '@playwright/test';
import { CatalogPage } from './catalog.page';
import { CartPage } from './cart.page';
import { StoreMenuPage } from './storeMenu.page';
import { InventoryPage } from './inventory.page';
import { PaymentPage } from './payments.page';

export class StorePage {
    constructor(page) {
        this.page = page;

        this.storeMenuPage = new StoreMenuPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.catalogPage = new CatalogPage(page);
        this.cartPage = new CartPage(page);
        this.paymentsPage = new PaymentPage(page);
    }

    async addProductFromCatalogToCart(product) {
        await test.step('Add single product from database to cart', async () => {
            await this.storeMenuPage.navigateToInventoryTab();
            await this.inventoryPage.addAndValidateProduct(product);

            await this.storeMenuPage.navigateToCatalogTab();
            await this.catalogPage.addProductToCart(product.name);

            await this.storeMenuPage.navigateToCartTab();
            await this.cartPage.validateProductSuccessfullyAddedtoCart(product);
        });
    }

    async addAndValidateDataProductListToCart(productList) {
        await test.step('Add product list from database to cart', async () => {
            await this.storeMenuPage.navigateToInventoryTab();
            await this.inventoryPage.addMultipleProducts(productList);

            await this.storeMenuPage.navigateToCatalogTab();
            await this.catalogPage.addProductListToCart(productList);

            await this.storeMenuPage.navigateToCartTab();
            await this.cartPage.validateProductListAddedtoCart(productList);
            await this.cartPage.validateTotalCartPrice();
        });
    }

    async addAndValidatePaymentSummary(productList) {
        await test.step('Add and validate product list from database to payments page', async () => {
            await this.addAndValidateDataProductListToCart(productList);
            await this.storeMenuPage.navigateToPaymentsTab();
            await this.paymentsPage.validateProductListExistsInPayments(productList);
            await this.paymentsPage.validateTotalPaymentSummary();
        });
    }

}