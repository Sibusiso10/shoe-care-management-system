# Shoe Care Management Platform

A full-stack system designed to manage a real-world shoe care business,
including order logistics, subscriptions, payments, and admin operations.

## Key Features

- Order lifecycle management (pending → complete)
- Subscription-based accounts (basic, normal, premium)
- Automatic subscription expiry handling
- Coupon system with expiry validation
- Role-based admin and client flows

## Architecture

- Frontend: Next.js (App Router)
- Backend: Next.js API routes
- Database: MongoDB + Mongoose
- Auth: Local auth (JWT planned)
- Payments: Stripe/PayFast (in progress)

## Key Technical Challenges Solved

- Subscription renewal logic with due dates
- Order state machine with real-world logistics stages
- Data consistency between Account and Transaction entities
- Safe MongoDB connection handling in serverless environments

## Why this project?

This project was built to solve real business problems, not as a tutorial.
It demonstrates backend design, business logic, and scalability planning.
