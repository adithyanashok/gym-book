# Gym Book 🏋️

A full-stack gym management solution built with React Native and NestJS, designed to streamline gym operations.

![alt](assets/images/banner.png)

## ✨ Core Features

- Complete Member Profiles - Personal details, membership history, preferences
- Membership Tier Management - Flexible plans with different benefits and pricing
- Flexible Plan Creation - Customizable membership tiers and packages
- Expiration Day Alert - Member expiration notifications

## 👥 Member Management

- Complete Member CRM - Add, edit, and delete member profiles
- AWS S3 Image Upload - Secure member photo storage

## 💳 Subscription & Billing Engine

- Flexible Plan System - Create unlimited membership tiers and packages
- Stripe Integration - Secure payment processing for subscriptions

## 📊 Advanced Analytics Dashboard

- Monthly Statistics - Comprehensive overview by selected month
- Revenue Trend Analysis - Monthly revenue tracking
- Plan Distribution Charts - Visual breakdown of membership types

## 🔐 Security & Authentication

- Twillio OTP Verification - Secure phone verification for owners and members
- Redis - Token blacklisting system using Redis to immediately invalidate tokens on logout
- JWT Token Authentication - Stateless, secure API authentication

## Development Tools

    TypeORM - Database abstraction and migrations

    Swagger - API documentation and testing

    Docker - Containerized development environment

## Clone repository

git clone https://github.com/yourusername/gymflow-manager.git
cd gymflow-manager

## Backend setup

cd backend
npm install
cp .env.example .env

## Configure your database and JWT secrets

npm run migration:run
npm run start:dev

## Mobile app setup

cd ../mobile
npm install
npm run ios # or npm run android
