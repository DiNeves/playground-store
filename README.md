# 🎭 Test Automation for Playground Store 

---

## 📖 About The Project

This project automates the testing of the **Playground Store**, ensuring the quality and stability of critical business flows.

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
```

---

## 🚀 Getting Started
Follow these steps to get a local copy up and running.

**Pre-Conditions**
* Node.js (v14 or higher)
* npm (Node Package Manager)

**Installation**
1. Clone the repository
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Install Playwright browsers
   ```bash
   npx playwright install
   ```

---

## 🏃‍♂️ Running the Tests
You can run the tests in different modes depending on your needs.

**Run all tests (Headless mode)**
Executes all specs in the background.
```bash
npx playwright test
```

**Run with UI Mode (Recommended for Debugging) 🕵️**
Opens an interactive interface to watch the tests running step-by-step and inspect logs.
```bash
npx playwright test --ui
```

**Run a specific test file**
Example: Run only the Order scenarios.
```bash
npx playwright test specs/orders.spec.js
```

**View the Report**
After a run, generate an HTML report to see passes, failures, and screenshots.
```bash
npx playwright show-report
```

---

## 👥 Meet the Team
This project was developed by a dedicated team of QA Engineers.

| Name | Role | 
| :--- | :--- | 
| **Tatiana Taketsuma** | QA Automation Engineer | 
| **Diana Neves** | QA Automation Engineer | 


---

## 🛠️ Technologies Used
* **Playwright** - The main testing framework.
* **JavaScript** - Programming language.
* **Node.js** - Runtime environment.

