import { test, expect } from '@playwright/test';
import { STORELOCATORS } from '../data/store.data';
import { CATALOGLOCATORS } from '../data/catalog.data';

export class CatalogPage {
    constructor(page) {
        this.page = page;

        this.catalogTab = page.getByTestId(STORELOCATORS.catalog.tab);
        this.catalogTitle = page.getByTestId(STORELOCATORS.catalog.title);

        this.table = page.getByTestId(CATALOGLOCATORS.table.list);
        this.tableListItems = this.table.getByRole(CATALOGLOCATORS.table.listItem);
        this.tableProduct = (product) =>  this.tableListItems.filter({ hasText: `${product}` });
        
        this.addToCartButton = (product) =>  this.tableProduct(product).getByRole('button', { name: CATALOGLOCATORS.table.addToCartButton });

        this.productQuantity = (product) => this.tableProduct(product).locator("[data-testid^=" + CATALOGLOCATORS.table.productQuantity + "]");
   
    }

    async addProductToCart(product) {
        
        const initialQuantity = Number((await this.productQuantity(product).textContent()).replace(' units', ''));

        await test.step('Click on Add to Cart button', async () => {
            await this.addToCartButton(product).click();
        });
        await test.step('Validate if quantity decreased on selected product', async () => {
            const finalQuantity = Number((await this.productQuantity(product).textContent()).replace(' units', ''));
            await expect(finalQuantity).toBe(initialQuantity-1);
        });
    }

    async getProductQuantity(product) {
        return this.productQuantity(product);
    }

    async validateOutOfStockButtonInAllItems(){
        await test.step('Validate Out of Stock button and disabled state for all out of stock products', async () => {
            const allProducts = await this.tableListItems.all();
            for (const product of allProducts){
                const unitsLocator = product.locator('text=units');
                await unitsLocator.click();
                const text = await unitsLocator.textContent();
                const stockQuantity = parseInt(text);
                const button = product.getByRole('button');

                if (stockQuantity === 0){
                    await expect(button).toHaveText('Out of Stock');
                    await expect(button).toBeDisabled();
                } else{
                    await expect(button).toHaveText('Add to Cart');
                    await expect(button).toBeEnabled();
                }
            }
        });
    }

}