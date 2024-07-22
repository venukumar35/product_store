## Inventory_we

Inventory management frontend service implemented in React Starter Template with Vite, TailwindCSS, and TypeScript.This application features email and password authorization page , user register page , and various pages for managing users products, and invoice .

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Pages](#pages) -[Log in](#login-page)
- [User registor modal](#user-registor)
- [Product Page](#product-page)
- [Invoice Page](#invoice-Products-Page)

## Features

- Vite for a modern and fast development experience
- React for building user interfaces
- TailwindCSS for rapid style development
- TypeScript for type safety

- Email and Password based authorization page.
- User Registory page in the login page if they are not register they can register and then they can login.
- Inventory nav-bar which contains, add Inventory model and update Inventory model and fetch Inventory page.
- Inventory page module to map users to controllers with time-bound access.

## Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:venukumar35/task.git
   cd INVENTORY_WEB
   ```

```bash
2. insatallation:

  npm create vite@latest

  npm install

  npm install -D tailwindcss postcss autoprefixer

  npx tailwindcss init -p

  npm install @mantine/core @mantine/hooks
```

## Running the application

```bash
3. npm run dev

## Usage

- Once the application is running, you can use various Pages to manage Authentication, registor user,user Product and Invoices.

###pages
- Authentication: Manage user login processes to secure the application.
- User Registration: Register new users and manage existing user accounts.
- Product Management: Add, update, and view products in the inventory.
- Invoice Management: Create,  and view invoices for transactions.

### Deployment
- Add .env

#### Build
- npm run build

#### Build image
- docker build -t your-image-name .

### Run
-docker run -p 3000:3000 your-image-name
```
