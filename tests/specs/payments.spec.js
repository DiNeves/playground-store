import { test } from '@playwright/test';
import { StoreMenuPage } from '../pages/storeMenu.page'; 
import { PaymentPage } from '../pages/payments.page';
import { InventoryPage } from '../pages/inventory.page';
import { CatalogPage } from '../pages/catalog.page';
import { CartPage } from '../pages/cart.page';
import { PAYMENTSLOCATORS } from '../data/payments.data';
import { STOREPRODUCTS } from '../data/storeMenu.data';
import { StorePage } from '../pages/store.page';

test.describe('Payments section', () => {

    test.beforeEach(async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        await storeMenuPage.navigateToStorePage();
        await storeMenuPage.navigateToPaymentsTab();
    });

     /**
     * Scenario 1: Validate payment summary
     * 
     * Given I have items in the cart
     * When  I navigate to the Payments page
     * Then  I should see a summary with name, quantity, and subtotal
     * And   I should see the total amount at the bottom.
     * 
    */
    test('Display cart items and totals in cart page', async ({ page }) => {
        const storePage = new StorePage(page);
        await storePage.addAndValidatePaymentSummary(STOREPRODUCTS);
    });

    /**
     * Scenario 2: Complete a purchase
     * 
     * Given I selected a payment method
     * When I click "Confirm Payment"
     * Then the order should be created
     * And I should be redirected to the Orders page
    */
    const methods = Object.keys(PAYMENTSLOCATORS.paymentMethods);
    for (const method of methods) {
        test(`Complete a Purchase using ${method}`, async ({ page }) => {
            const storeMenuPage = new StoreMenuPage(page);
            const paymentPage = new PaymentPage(page);
            const inventoryPage = new InventoryPage(page);
            const catalogPage = new CatalogPage(page);
            const cartPage = new CartPage(page);

            const product = STOREPRODUCTS[0];

            await test.step('Pre-Conditions: Create Product - Add to Cart - Go to Payment', async () => {
                await storeMenuPage.navigateToInventoryTab();
                await inventoryPage.fillProductRequiredFields(product);
                await inventoryPage.clickAddProductButton();
                await storeMenuPage.navigateToCatalogTab();
                await catalogPage.addProductToCart(product.name);
                await storeMenuPage.navigateToCartTab();
                await cartPage.clickGoToPaymentButton();
            });
            await paymentPage.selectPaymentMethod(method);
            await paymentPage.clickConfirmPaymentButton();
            await paymentPage.validateRedirectToOrdersPage();
        });
    }

    /**
     * Scenario 3: Block payment without method
     * Given I have items in the cart
     * When I click "Confirm Payment" without selecting a method
     * Then an alert should appear
     * And the payment should not be completed
     */
    test('Validate alert when confirming payment without selecting a method', async ({ page }) => {
        const storeMenuPage = new StoreMenuPage(page);
        const paymentPage = new PaymentPage(page);
        const inventoryPage = new InventoryPage(page);
        const catalogPage = new CatalogPage(page);
        const cartPage = new CartPage(page);

        const product = STOREPRODUCTS[0];

        await test.step('Pre-Conditions: Create Product - Add to Cart - Go to Payment', async () => {
            await storeMenuPage.navigateToInventoryTab();
            await inventoryPage.fillProductRequiredFields(product);
            await inventoryPage.clickAddProductButton();
            await storeMenuPage.navigateToCatalogTab();
            await catalogPage.addProductToCart(product.name);
            await storeMenuPage.navigateToCartTab();
            await cartPage.clickGoToPaymentButton();
        });
        await paymentPage.clickConfirmPaymentWithoutSelectingMethod();
    });
  });
