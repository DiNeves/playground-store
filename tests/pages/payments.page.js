import { test, expect } from '@playwright/test';
import { PAYMENTSLOCATORS } from "../data/payments.data";
import { STORELABELS, STORELOCATORS } from '../data/storeMenu.data';
import { ORDERSLOCATORS } from '../data/orders.data';

export class PaymentPage{
    constructor(page){
        this.page = page;
        this.confirmPaymentButton = page.getByTestId(PAYMENTSLOCATORS.confirmPaymentButton);
    }

    async selectPaymentMethod(paymentMethodType){
        await test.step(`Select Payment Type: ${paymentMethodType}`, async () => {
            const paymentLocatorID = PAYMENTSLOCATORS.paymentMethods[paymentMethodType];
            await this.page.getByTestId(paymentLocatorID).click();
        });
    }

    async clickConfirmPaymentButton(){
        await test.step('Click on "Confirm Payment" button', async () => {
            await this.confirmPaymentButton.click();
        });
    }

    async validateRedirectToOrdersPage(){
        await test.step('Validate Redirect to Orders page', async () => {
            await expect(this.page.getByRole('heading', { name: ORDERSLOCATORS.labels.pageTitle })).toBeVisible();
        });
    }

    async clickConfirmPaymentWithoutSelectingMethod(){
        await test.step('Click on "Confirm Payment" button without selecting a payment method', async () => {
            this.page.once('dialog', async dialog => {
                expect(dialog.message()).toBe(PAYMENTSLOCATORS.labels.alertMessage);
                await dialog.accept();
            });
            await this.confirmPaymentButton.click();
            await expect(this.page.getByRole('heading', { name: PAYMENTSLOCATORS.labels.pageTitle })).toBeVisible();
        });
    }

    
}