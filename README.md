# Gym API

## Introduction
This is a project to develop an API designed to help gyms manage their daily operations efficiently. The API will handle user memberships, workout session bookings, progress tracking, billing, and more. The goal is to provide gym staff and users with an easy-to-use system for managing their gym experience.

## Features
- **User Management:** Register, edit profiles, and manage memberships.
- **Workout Sessions:** Book and manage workout sessions.
- **Progress Tracking:** Track workout progress and receive AI-based analyses.
- **Billing:** Create, manage, and track billing for users.
- **Admin Tools:** Manage gym equipment, staff members, and generate reports.

## Technologies
- **Backend:** Node.js (Express)
- **Database:** MySQL / PostgreSQL
- **ORM:** Prisma or Knex
- **Authentication:** JWT-based authentication
- **Additional Tools:** Docker for containerization



### USER MEMBERSHIPS
[] - Users must be able to update their personal details 
[] - Users can get AI analyses
[] - Users can just start one lesson per day according with their plan


### ADMINS
[] - Can create a new user, edit or delete
[] - Can search for a specific user based on name or id
[] - Can add more 30 days in users plans or upgrade or ungraded a plan
[] - Create bills, edit or delete
[] - Create staff members, edit or delete
[] - Create gym equipment, edit or delete
[] - Generate a PDF once a week based on bills or users report
[] - Can create, execute or delete prize draws

### BUSINESS RULES
[] - Users are allowed to update their profile only once per week.
[] - Users are limited to receiving AI-based workout analysis only once every 7 days.
[] - Password must be encrypted for security
[] - Gym activities cannot be started between 11:00 PM and 5:59 AM.