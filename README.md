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
- Payments: PayFast (in progress)

## Key Technical Challenges Solved

- Subscription renewal logic with due dates
- Order state machine with real-world logistics stages
- Data consistency between Account and Transaction entities
- Safe MongoDB connection handling in serverless environments

## Why this project?

This is a real-world shoe care business management system designed to handle
subscriptions, orders, logistics tracking, and admin operations. It focuses on
scalability, clean architecture, and real business constraints rather than
demo-only functionality.

## Project status
> This project is actively evolving as the business grows.
> Live business deployment: https://voltandvarnish.co.za
> Note: Sensitive business logic and credentials are excluded from this repository.

