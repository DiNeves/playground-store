# 🎭 Test Automation for Playground Store 

---

## 📖 About The Project

This project automates the testing of the **Test Playground Store**, ensuring the quality and stability of critical business flows.

The framework is built using **Playwright** and follows the **Page Object Model (POM)** design pattern to ensure code reusability and maintainability. It also implements **Data-Driven Testing** to validate multiple scenarios dynamically.

### 🎯 Key Features Covered
* **Inventory Management:** Creating and validating new products.
* **Product Catalog:** Browsing and adding items to the cart.
* **Shopping Cart:** Validating totals and proceeding to checkout.
* **Payments:** Dynamic payment method selection (Visa, MBWay, PayPal, etc.).
* **Order Processing:** Verifying order details, dates, and final calculations.

---

## 📂 Project Structure

The project follows a strict modular structure:

```text
├── 📁 data          # Static data (Products, Locators, Labels)
│   ├── inventory.data.js
│   ├── orders.data.js
│   ├── ...
├── 📁 pages         # Page Object Classes (Interaction logic)
│   ├── inventory.page.js
│   ├── catalog.page.js
│   ├── ...
├── 📁 specs         # Test Files (Scenarios)
│   ├── inventory.spec.js
│   ├── orders.spec.js
│   ├── ...
├── package.json
└── playwright.config.js

