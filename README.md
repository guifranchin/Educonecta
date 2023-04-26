# TypeScript-MySQL2-Knex-Gelf-Pro-Graylog Template

This repository contains a template for creating a new project with TypeScript, MySQL2, Knex, Gelf-Pro and Graylog. It includes a basic project structure, configuration files, and common dependencies such as MySQL2 for database access, Knex for query building and migrations, Gelf-Pro for logging, Graylog for centralized logging and certificate management for security.

## Getting Started

To get started with this template, clone the repository and install the dependencies:

```bash
git clone https://github.com/guifranchin/typescript-mysql2-knex-gelf-pro-graylog-template.git
cd typescript-mysql2-knex-gelf-pro-graylog-template
npm install
```

You will also need to set up a MySQL2 database and configure the connection settings in `src/config/database.config.ts`.

## Usage
The template includes scripts for running the development server, building the project for production, and running database migrations.

# Start the development server
npm run dev

# Build the project for production
npm run build

# Run database migrations
npm run migrate:up

## Contributing
We welcome any contributions to this project. If you are interested in contributing, please read our CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.
