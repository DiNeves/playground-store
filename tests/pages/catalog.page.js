import { test, expect } from '@playwright/test';
import { STORELOCATORS } from '../data/storeMenu.data';
import { CATALOGLOCATORS } from '../data/catalog.data';

/**
 * Page Object Model for the Catalog tab inside the Store page.
 * This class exposes:
 * - navigation helpers;
 * - actions (get, add);
 * - expect assertions.
 */
export class CatalogPage {
    constructor(page) {
        this.page = page;

        // ===== Fixed locators =====

        this.catalogTab = page.getByTestId(STORELOCATORS.catalog.tab);
        this.catalogTitle = page.getByTestId(STORELOCATORS.catalog.title);

        // find the main table list
        this.table = page.getByTestId(CATALOGLOCATORS.table.list);
        
        // find all rows in the table list
        this.tableListItems = this.table.getByRole(CATALOGLOCATORS.table.listItem);

        // find the row for a given product
        this.tableProduct = (product) => this.tableListItems.filter({ hasText: `${product}` });

        // find the below elements inside the product's row above
        this.addToCartButton = (product) => this.tableProduct(product).getByRole('button', { name: CATALOGLOCATORS.table.addToCartButton });
        this.productQuantity = (product) => this.tableProduct(product).locator("[data-testid^=" + CATALOGLOCATORS.table.productQuantity + "]");

    }

    // ===== Dynamic locators (by Index) =====

    /**
     * Get product quantity of the index row.
     * 
     * This is an alternative aproach to list index.
     * 
     * @param {int} index 
     * @returns the locator of the product quantity
     */
    getProductQuantityByIndex(index) {
        return this.page.getByTestId('catalog-item-quantity-' + index);
    }

    // ===== Generic actions =====

    /**
    * Add a single product to cart and validate if the product's quantity decreases in Catalog.
    * @param {string} productName - Name of the product to be added.
    */
    async addProductToCart(productName) {

        // get the initial quantity of the product before clicking on the "Add to Cart" button
        const initialQuantity = Number((await this.productQuantity(productName).textContent()).replace(' units', ''));

        await test.step('Click on Add to Cart button', async () => {
            await this.addToCartButton(productName).click();
        });
        await test.step('Validate if quantity decreased on selected product', async () => {

            // get the final quantity of the product after clicking on the 'Add to Cart' button
            const finalQuantity = Number((await this.productQuantity(productName).textContent()).replace(' units', ''));

            // compare the initial and final quantity values.
            // it's expect to decrease by 1 unit.
            await expect(finalQuantity).toBe(initialQuantity - 1);
        });
    }

    /**
    * Add a single product to cart multiple times.
    * @param {array[i]} product - Array of product-related properties, which contains name,
    *                             price, quantity and addedQuantity options. 
    *                             (single product example: STOREPRODUCTS[0] in storeMenu.data.js).
    */
    async addProductToCartMultipleTimes(product) {
        await test.step('Add a product multiple times to cart', async () => {
            if (product.addedQuantity > 0) {
                for (let i = 0; i < product.addedQuantity; i++) {
                    await this.addProductToCart(product.name);
                }
            };
        });
    }

    /**
    * Add multiple products to cart multiple times.
    * @param {array[]} productsList - List of products, that contains product-related
    *                                 properties like name, price and quantity options. 
    *                                 (product list example: STOREPRODUCTS[] in storeMenu.data.js).
    */
    async addProductListToCart(productsList) {
        await test.step('Add product list to cart', async () => {
            for (const product of productsList) {
                await this.addProductToCartMultipleTimes(product);
            };
        });
    }

    async getProductQuantity(product) {
        return this.productQuantity(product);
    }

    async validateOutOfStockButtonInAllItems() {
        await test.step('Validate Out of Stock button and disabled state for all out of stock products', async () => {
            const allProducts = await this.tableListItems.all();
            for (const product of allProducts) {
                const unitsLocator = product.locator('text=units');
                await unitsLocator.click();
                const text = await unitsLocator.textContent();
                const stockQuantity = parseInt(text);
                const button = product.getByRole('button');

                if (stockQuantity === 0) {
                    await expect(button).toHaveText('Out of Stock');
                    await expect(button).toBeDisabled();
                } else {
                    await expect(button).toHaveText('Add to Cart');
                    await expect(button).toBeEnabled();
                }
            }
        });
    }

}