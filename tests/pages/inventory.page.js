import { test, expect } from '@playwright/test';
import { STORELOCATORS } from '../data/storeMenu.data';
import { INVENTORYLOCATORS } from '../data/inventory.data';

/**
 * Page Object Model for the Inventory tab inside the Store page.
 * This class exposes:
 * - navigation helpers;
 * - actions (fill, click, add, get);
 * - expect assertions.
 */
export class InventoryPage {
    constructor(page) {
        this.page = page;

        // ===== Fixed locators =====
        this.inventoryTab = page.getByTestId(STORELOCATORS.inventory.tab);
        this.inventoryTitle = page.getByTestId(STORELOCATORS.inventory.title);

        this.productName = page.getByTestId(INVENTORYLOCATORS.productName);
        this.productPrice = page.getByTestId(INVENTORYLOCATORS.productPrice);
        this.productQuantity = page.getByTestId(INVENTORYLOCATORS.productQuantity);

        this.addProductButton = page.getByTestId(INVENTORYLOCATORS.addProductButton);

        this.rows = page.getByTestId(INVENTORYLOCATORS.table.list).getByRole(INVENTORYLOCATORS.table.listItem);
    }

    // ===== Generic actions =====
    
   /**
   * Fill the Product Name input with a given text (does not submit).
   * @param {string} productName - Text to be typed in the Product Name input.
   */
    async fillProductName(productName) {
        await test.step('Fill product name', async () => {
            await this.productName.fill(productName);
        });
    };

   /**
   * Fill the Product Price input with a given float number (does not submit).
   * The number can contain a maximum of 2 decimal places.
   * @param {float} productPrice - Number to be typed in the Product Price input.
   */
    async fillProductPrice(productPrice) {
        await test.step('Fill product price', async () => {
            await this.productPrice.fill(productPrice);
        });
    };

   /**
   * Fill the Product Quantity input with a given int number (does not submit).
   * @param {int} productQuantity - Number to be typed in the Product Quantity input.
   */
    async fillProductQuantity(productQuantity) {
        await test.step('Fill product quantity', async () => {
            await this.productQuantity.fill(productQuantity);
        });
    };

    /**
    * Fill the 3 product inputs (Name, Price and Quantity) with given values (does not submit).
    * @param {string} productName - Text to be typed in the Product Name input.
    * @param {float} productPrice - Number to be typed in the Product Price input.
    * @param {int} productQuantity - Number to be typed in the Product Quantity input.
    */
    async fillProductRequiredFields(product) {
        await test.step('Fill product required fields', async () => {
            await this.productName.fill(product.name);
            await this.productPrice.fill(product.price);
            await this.productQuantity.fill(product.quantity);
        });
    };
    
    /**
    * Click the "Add Product" button to add the new product to the inventory list.
    */
    async clickAddProductButton() {
        await test.step('Click on Add product button', async () => {
            await this.addProductButton.click();
        });
    };

    /**
    * Validate if the single added product:
    *  - exists in the inventory list;
    *  - contains the correct name, price and quantity.
    * 
    * @param {array[i]} product - Array of product-related properties, which contains name,
    *                             price and quantity options. 
    *                             (single product example: STOREPRODUCTS[0] in storeMenu.data.js).
    */
    async validateProductAddedOnTable(product) {
        await test.step('Validate if product exists on list', async () => {
            // Get only the table's line that contains the product name.
            const row = this.rows.filter({ hasText: product.name });

            // Get fields from the selected table row.
            await expect(row.locator("[data-testid^=" + INVENTORYLOCATORS.table.productName + "]")).toHaveText(product.name);
            await expect(row.locator("[data-testid^=" + INVENTORYLOCATORS.table.productPrice + "]")).toHaveText(product.price);
            await expect(row.locator("[data-testid^=" + INVENTORYLOCATORS.table.productQuantity + "]")).toHaveText(product.quantity);
        });
    };

    /**
    * Add a product to the inventory list and validate if its details are correctly displayed.
    *  - fill the 3 product inputs (Name, Price and Quantity) with given values;
    *  - click "Add Product" button;
    *  - validate if product's details (name, price and quantity) are correct.
    * 
    * @param {array[i]} product - Array of product-related properties, which contains name,
    *                             price and quantity options. 
    *                             (single product example: STOREPRODUCTS[0] in storeMenu.data.js).
    */
    async addAndValidateProduct(product) {
        await test.step('Add and validate if product exists on list', async () => {
            await this.fillProductRequiredFields(product);
            await this.clickAddProductButton();
            await this.validateProductAddedOnTable(product);
        });
    };

    /**
    * Add multiple products to the inventory list.
    * @param {array[]} productsList - List of products, that contains product-related
    *                                 properties like name, price and quantity options. 
    *                                 (product list example: STOREPRODUCTS[] in storeMenu.data.js).
    */
    async addMultipleProducts(productsList) {
        await test.step('Add multiple products to inventory', async () => {
            for (const product of productsList) {
                await this.addAndValidateProduct(product);
            };
        });
    };

    /**
    * Click "+" stock button in a product's row.
    * @param {string} productName - Name of the product from which its stock increased.
    */
    async clickIncreaseStockButton(productName) {
        await test.step('Click on "+" button for product: ' + productName, async () => {
            const row = this.rows.filter({ hasText: productName });
            await row.locator("[data-testid^=" + INVENTORYLOCATORS.table.increaseButton + "]").click();
        });
    }

    /**
    * Click "-" stock button in a product's row.
    * @param {string} productName - Name of the product from which its stock decreased.
    */
    async clickDecreaseStockButton(productName) {
        await test.step('Click on "-" button for product: ' + productName, async () => {
            const row = this.rows.filter({ hasText: productName });
            await row.locator("[data-testid^=" + INVENTORYLOCATORS.table.decreaseButton + "]").click();
        });
    }

    /**
    * Get the stock quantity of a single product.
    * @param {string} productName - Name of the product from which we want to get the current stock quantity.
    * @returns {int} quantity after conversion from string
    */
    async getProductStockQuantity(productName) {
        return await test.step('Get stock quantity for product: ' + productName, async () => {
            const row = this.rows.filter({ hasText: productName });
            const quantityText = await row.locator("[data-testid^=" + INVENTORYLOCATORS.table.productQuantity + "]").textContent();
            return parseInt(quantityText, 10);
        });
    }
}