# E-Commerce API Documentation

![Express Logo](https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png)

## Table of Contents

1. [Introduction](#introduction)
2. [Database Structure](#database-structure)
3. [API Endpoints](#api-endpoints)
    - [Pembeli Endpoints](#pembeli-endpoints)
    - [Penjual Endpoints](#penjual-endpoints)
    - [Admin Endpoints](#admin-endpoints)
    - [Produk Endpoints](#produk-endpoints)
    - [Keranjang Endpoints](#keranjang-endpoints)
    - [Checkout Endpoints](#checkout-endpoints)
    - [Kategori Endpoints](#kategori-endpoints)
    - [Metode Pembayaran Endpoints](#metode-pembayaran-endpoints)
4. [Error Handling](#error-handling)
5. [License](#license)

---

## Introduction
This API is built for an e-commerce platform, allowing users to manage their accounts, products, and transactions. It supports roles such as **Pembeli**, **Penjual**, and **Admin** with distinct permissions.

**Framework:** [Express.js](https://expressjs.com/)  
**Database:** MySQL

---

## Database Structure

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

