# Cart Pricing System

This is a cart pricing system implemented using Express.js. The system is designed to calculate the total price of a cart that contains products from different countries, apply multiple offers, and display a detailed invoice in USD by default.

## Features

- Add products to the cart, specifying the country of origin and the price.
- Apply various offers and discounts to the cart.
- Calculate the total price of the cart in USD, taking into account the exchange rates.
- Display a detailed invoice showing individual product prices, discounts, and the final total.

## Setup Instructions
1. **Clone the Repository**:

   ```bash
   git clone https://github.com/roqiaahmed/Backend-coding-challenge.git

   ```

2. **Install Dependencies**:

   ```bash
   cd Backend-coding-challenge
   npm install
   ```

3. **Set Environment Variables**:

- Create a .env file in the root directory and add the following variables:
  ```bash
  MONGO_URI=your_mongodb_uri
  US = 2
  UK = 3
  CN = 2
  VAT = 14
  CURRENCY_APIKEY = your_CURRENCY_APIKEY
  ```

4. **Run the Server**:

   ```bash
   npm start
   ```

   
5. **testing**:
   
   ```bash
   mocha test/discounts/
   and
   mocha test/billcart/
   ```

# Design and Architecture

The cart pricing system is designed using a modular approach to ensure code organization and maintainability. The main classes used are BillCart and Discounts, which handle different aspects of the system.

**BillCart Class**:

The BillCart class calculates the subtotal, shipping cost, and VAT for items in the cart. It follows the principle of inheritance, with subclasses Subtotal, ShippingCost, and VAT inheriting from BillCart. This approach allows for code reuse and separation of responsibilities.

**Discounts Class**:

The Discounts class applies offers and discounts to the cart. It uses subclasses ShoseOffer, JacketOffer, and TwoItemsOffer, which inherit from Discounts. Using inheritance allows for extensibility and clear code organization.


The system utilizes Express.js as a web application framework, MongoDB as the database, environment variables for configuration management, and Mocha for testing.

**Reasoning behind Technical Choices**:

- Express.js: Chosen for its simplicity, flexibility, and extensive ecosystem.
- MongoDB: Selected for its scalability and compatibility with Node.js.
- Environment Variables: Used to separate sensitive information and facilitate environment switching.
- Mocha: Preferred as a testing framework to ensure code correctness and maintainability.
  
# Usage

Use your favorite API development tool (Postman, Insomnia, etc.)

# Contributors

- roqiaahmed
