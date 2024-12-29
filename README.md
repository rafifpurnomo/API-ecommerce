# E-Commerce API Documentation

![Express Logo](https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png)

## Introduction
This API is built for an e-commerce platform, allowing users to manage their accounts, products, and transactions. It supports roles such as **Pembeli**, **Penjual**, and **Admin** with distinct permissions.

**Framework:** [Express.js](https://expressjs.com/)  
**Database:** MySQL

---

## Database Structure

![Entity Relationship Diagram](https://raw.githubusercontent.com/rafifpurnomo/API-ecommerce/dev/src/docs/ERD.png)
The database consists of the following tables:

1. **pembeli**: Stores buyer information.
2. **penjual**: Stores seller information.
3. **admin**: Stores admin information.
4. **produk**: Stores product details.
5. **keranjang**: Manages shopping cart items.
6. **checkout**: Handles the checkout process.
7. **kategori**: Categorizes products.
8. **metode_pembayaran**: Lists payment methods.

Refer to the [SQL schema](#database-schema) for more details.

---



---

## License
This API is licensed under the [MIT License](https://opensource.org/licenses/MIT).

