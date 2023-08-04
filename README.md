# Onboarding GraphQL TS

This is a sample application that demonstrates a multi-step registration process using GraphQL and NestJS.

## Features

- User Management
  - Registration
  - Login
  - Email Verification
  - Authentication & Authorization
- Form
  - Set Forms For Each Step Of Registration
  - Update Forms
  - Retrieve Form For Step(s)
- Files
  - Upload File(s) For Each Form
  - Update File(s) For Each Form
  - Delete FIle(s) For Each Form

## Technologies Used

This project uses the following technologies:

- **GraphQL**: GraphQL is a query language for APIs and a runtime for executing queries with your existing data. It provides a more efficient and flexible alternative to traditional REST APIs.

- **NestJS**: NestJS is a progressive Node.js framework for building efficient, scalable, and reliable server-side applications. It is built with TypeScript and leverages modern JavaScript features and design patterns.

- **PostgreSQL**: PostgreSQL is a powerful and open-source relational database management system. It offers scalable, reliable, and high-performance storage for your application's data.

- **Prisma**: Prisma is an open-source database toolkit that simplifies database access and management. It provides an intuitive API for database queries, migrations, and schema management.

- **Apollo Server**: Apollo Server is a GraphQL server implementation for Node.js. It allows you to build GraphQL APIs with ease, providing features like schema generation, resolvers, and data fetching.

- **JWT (JSON Web Tokens)**: JWT is an open standard for securely transmitting information between parties as a JSON object. It is commonly used for authentication and authorization purposes in web applications.

- **Jest**: Jest is a JavaScript testing framework that is widely used for testing JavaScript applications, including NestJS projects. It provides a simple and intuitive API for writing unit tests, integration tests, and end-to-end tests.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/registration-app.git
   ```

2. Navigate into the project directory:

   ```bash
   cd registration-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up your PostgreSQL database and update the database connection settings in the `.env` file(use `.env.sample`).

5. Run the migration to create the database tables:

   ```bash
   npx prisma migrate dev
   ```

6. Start the server:

   ```bash
   npm run start:dev
   ```

7. The app will now be running at `http://localhost:3000`.

## Testing

This project includes unit tests and integration tests for the backend functionality.

To run the tests, use the following command:

```bash
npm test
```

Jest will execute all the tests and display the results.

## Documentation

use `onBoardGraphQLTS.postman_collection.json` file and import it in `postman`

Copyright 2023, Max Base
