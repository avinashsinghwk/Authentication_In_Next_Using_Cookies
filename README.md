# Next.js Authentication App

This is a Next.js application that demonstrates the use of cookies for authentication. It includes a forgot password feature and uses PostgreSQL as the database with Prisma ORM for database management. This repository also uses Nodemailer to send emails, React-Hot-Toast for better alert information, Axios to fetch data, Bcryptjs to hash passwords, and Jsonwebtoken to generate cookies.

## Features

- User authentication using cookies
- Forgot password functionality
- PostgreSQL database
- Prisma ORM for database management
- Nodemailer for sending emails
- React-Hot-Toast for alert information
- Axios for data fetching
- Bcryptjs for password hashing
- Jsonwebtoken for generating cookies

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- Prisma

### Contribution

#### Clone the repo and intall dependencies

```bash
git clone https://github.com/avinashsinghwk/Authentication_In_Next_Using_Cookies.git
```
```bash
cd Authentication_In_Next_Using_Cookies
```
```bash
yarn install
```
#### Make a file .env in the root and copy everything from .env.sample

#### Get your own database url and paste it in DATABASE_URL in .env

```bash
npx prisma migrate dev
```
#### Now go to `https://ethereal.email` website and create account and get uername and password
#### Paste it in `/src/utils/email/sendEmail/forgotPasswordEmailSend.ts` and `/src/utils/email/sendEmail/verifyEmailSend.ts` files

```bash
yarn dev
```

#### Thank you!! 😊💖
