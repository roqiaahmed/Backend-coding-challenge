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
# Usage

Use your favorite API development tool (Postman, Insomnia, etc.) to interact with the API endpoints.
Authenticate requests using bearer tokens provided upon login.

# Contributors

- roqiaahmed
