import { test } from '@playwright/test';
import { StoreMenuPage } from '../pages/storeMenu.page';
import { STOREPRODUCTS } from '../data/storeMenu.data';
import { PAYMENTSLOCATORS } from '../data/payments.data';
import { InventoryPage } from '../pages/inventory.page';
import { CatalogPage } from '../pages/catalog.page';
import { CartPage } from '../pages/cart.page';
import { PaymentPage } from '../pages/payments.page';
import { OrdersPage } from '../pages/orders.page';

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

    /**
     * Scenario 2: Display order details
     * 
     * Given an order exists
     * When I view the order
     * Then I should see:
     * date
     * payment method
     * items (name + quantity)
     * final total
    */
   const validProduct = STOREPRODUCTS.find(product => parseInt(product.quantity) > 0);
   const allMethods = Object.keys(PAYMENTSLOCATORS.paymentMethods);
   const methodType = allMethods[0];

   const locatorString = PAYMENTSLOCATORS.paymentMethods[methodType];
   const paymentLabel = locatorString.split('-').pop();

   test(`Validate Order Details for product: ${validProduct.name} using payment method: ${paymentLabel}`, async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        const inventoryPage = new InventoryPage(page);
        const catalogPage = new CatalogPage(page);
        const cartPage = new CartPage(page);
        const paymentPage = new PaymentPage(page);
        const ordersPage = new OrdersPage(page);

        await test.step('Pre-Conditions: Create Product - Add to Cart - Go to Payment - Complete Purchase', async () => {
            await storeMenuPage.navigateToInventoryTab();
            await inventoryPage.fillProductRequiredFields(validProduct);
            await inventoryPage.clickAddProductButton();

            await storeMenuPage.navigateToCatalogTab();
            let quantity = parseInt(validProduct.addedQuantity);
            if (!quantity || quantity < 1) 
                quantity = 1;

            for (let i = 0; i < quantity; i++) {
                await catalogPage.addProductToCart(validProduct.name);
            }
            
            await storeMenuPage.navigateToCartTab();
            await cartPage.clickGoToPaymentButton();

            await paymentPage.selectPaymentMethod(methodType);
            await paymentPage.clickConfirmPaymentButton();
            await paymentPage.validateRedirectToOrdersPage();
        });

        await ordersPage.validateOrderDetails(validProduct, paymentLabel);
    });
});