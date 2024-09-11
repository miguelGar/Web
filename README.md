# Project Name

> Angular aplication for inventory, need to connecto to Back-End to full response.

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints) 
- [Contact](#contact)

---

## Overview

- **Version**: `1.0.0`
- **Author**: Miguel García Pérez
- **Date Created**: 10/09/2024

---

## Technologies

This project was built using the following technologies:

- **Angular**: Version (18.2.2)
- **Node.js**: Version (20.17.0)
- **NPM**: Version (10.8.2)


---

## Setup and Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/miguelGar/Web/Angular/inventario-angular

2. **Install dependencies**:
   
    ```bash
   npm install
4. Run the development server:
    ```bash
   ng serve -o
6. Access the app:
   
   Open your browser and go to
   ```bash
   http://localhost:4200.

## API Endpoints

 
http://localhost:8085/inventario-app/

Example:
- **GET:** productos: Get products.
- **GET:** productos/{id}: Get product by Id.
- **POST:** productos: Add product.
   - Request body (JSON):
  ```bash
  {
        "descripcion": "Camisa",
        "precio": 300.0,
        "existencia": 13
  }
- **PUT:** productos/{id}: Update product by Id.
   - Request body (JSON):
    ```bash
   {
        "descripcion": "Tirantes",
        "precio": 150.0,
        "existencia": 13
  }
- **DELETE:** productos/{id} : Delete product by Id.

## Contact

For any questions, feel free to reach out:

- **Email:** miguelgarciarob@gmail.com
- **GitHub:** https://github.com/miguelGar
- **LinkedIn:** Miguel Garcia
