## Inventory

Inventory management backend service implemented in NestJS using TypeScript and prisma ORM and database postgresql.This application features email and password authorization, user register, and various modules for managing users products, and invoice .

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Modules](#modules)
  - [User Module](#)
  - [Product Module](#role-module)
  - [QuantityHistory Module](#controller-module)
  - [Invoice Module](#access-module)
  - [InvoiceProducts Module](#mobile-module)how to send a snap from camera roll as normal snap
  - [Report Module](#report-module)
  - [InvoiceCost Module](#tcp-module)

## Features

- Email and Password based authorization.
- User module with create functionalities.
- Invoice module module with create invoice wich has been added to queue, update and fetch and invoice cost caculation functionalities.
- Inventory module to add users Inventory and update user Inventory quantity and find all Inventory of user functionalities.

## Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:venukumar35/task.git
   cd SERVER
   ```

```bash
2. npm install
```

```bash
3.Redis server insatallation:

  sudo apt install redis

  sudo systemctl start redis

  sudo systemctl enable redis
```

## Running the application

````bash
# development
4. npm run start

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
````

## Usage

Once the application is running, you can use various endpoints to manage user, Inventorys, Invoices.

## Modules

### User Module

- **Create User**: Allows creating a user.

### Inventory Module

- **Create Inventory**: Allows creating a inventories of the user.
- **Fetch Inventory**: Allows fetching inventories details.
- **Update Inventory**: Allows user to update the inventory stocks.

### Invoice Module

- **Create Invoice**: Allows creating a selected inventory invoice.
- **Fetch Invoice**: Allows fetching inventories details.

### Deployment

- Add .env

#### Build

- npm run build

#### Build image

- docker build -t your-image-name .

### Run

-docker run -p 3000:3000 your-image-name
