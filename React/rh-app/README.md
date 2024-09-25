# App Recursos humanos

> React aplication, need to connecto to Back-End to full response.

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
- **Date Created**: 25/09/2024

---

## Technologies

This project was built using the following technologies:

- **React**: Version (18.3.1)
- **Node.js**: Version (20.17.0)
- **NPM**: Version (10.8.2)


---

## Setup and Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/miguelGar/Web/React/rh-app

2. **Install dependencies**:
   
    ```bash
   npm install
4. Run the development server:
    ```bash
   npm start
6. Access the app:
   
   Open your browser and go to
   ```bash
   http://localhost:3000.

Note: create app:

   - **npx create-react-app .**

## API Endpoints

 
http://localhost:8080/rhApp

Example:
- **GET:** /empleados: Get products.
- **GET:** /empleados/{id}: Get product by Id.
- **POST:** /empleados: Add product.
   - Request body (JSON):
  ```bash
  {
        "nombre": "Carlitos",
        "departamento": "finanzas",
        "sueldo": 1000.0
  }
- **PUT:** /empleados/{id}: Update product by Id.
   - Request body (JSON):
    ```bash
   {
        "nombre": "Carlitos Juan",
        "departamento": "finanzas",
        "sueldo": 1200.0
  }
- **DELETE:** /empleados/{id} : Delete product by Id.

## Contact

For any questions, feel free to reach out:

- **Email:** miguelgarciarob@gmail.com
- **GitHub:** https://github.com/miguelGar
- **LinkedIn:** Miguel Garcia
