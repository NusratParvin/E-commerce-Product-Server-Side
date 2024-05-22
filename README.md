# E-commerce-Product-Server-Side

# Ecommerce API

This project is an ecommerce API built using Node.js, Express, TypeScript, and MongoDB. It provides endpoints for managing products and orders.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (version 6 or later)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ecommerce-api.git
   cd ecommerce-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Usage

1. **Start the application:**

   ```bash
   npm run start:dev
   ```

   The application should now be running on `http://localhost:5000`.

2. **Access the API:**

   You can use a tool like [Postman](https://www.postman.com/) to test the API endpoints.

## API Endpoints

### Product Management

- **Create a New Product**

  - **Endpoint:** `/api/products`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "name": "iPhone 13",
      "description": "A sleek and powerful smartphone with cutting-edge features.",
      "price": 999,
      "category": "Electronics",
      "tags": ["smartphone", "Apple", "iOS"],
      "variants": [
        {
          "type": "Color",
          "value": "Midnight Blue"
        },
        {
          "type": "Storage Capacity",
          "value": "256GB"
        }
      ],
      "inventory": {
        "quantity": 50,
        "inStock": true
      }
    }
    ```

- **Retrieve a List of All Products**

  - **Endpoint:** `/api/products`
  - **Method:** `GET`

- **Retrieve a Specific Product by ID**

  - **Endpoint:** `/api/products/:productId`
  - **Method:** `GET`

- **Update Product Information**

  - **Endpoint:** `/api/products/:productId`
  - **Method:** `PUT`
  - **Request Body:** Same as product creation

- **Delete a Product**
  - **Endpoint:** `/api/products/:productId`
  - **Method:** `DELETE`

### Order Management

- **Create a New Order**

  - **Endpoint:** `/api/orders`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "email": "level2@programming-hero.com",
      "productId": "5fd67e890b60c903cd8544a3",
      "price": 999,
      "quantity": 1
    }
    ```

- **Retrieve All Orders**

  - **Endpoint:** `/api/orders`
  - **Method:** `GET`

- **Retrieve Orders by User Email**
  - **Endpoint:** `/api/orders?email=level2@programming-hero.com`
  - **Method:** `GET`

## Error Handling

Validation errors from Zod are handled explicitly in the controllers, and other errors are passed to the error handling middleware.

- **Validation Errors:**

  - If validation fails, a 400 status code is returned with a detailed error message.

- **Not Found Errors:**

  - Unmatched routes return a 400 status code with a "Route not found" message.

- **General Errors:**
  - A 500 status code is returned for any unhandled errors, with a generic error message.
