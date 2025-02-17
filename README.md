# Gym Class Scheduling and Membership Management System

* This is a gym management project that allows efficient handling of class schedules, trainer assignments, and member bookings.
* Built with TypeScript, Express.js, MongoDB with focus on clean code and modular architecture.
* Features secure authentication and authorization with JWT for three user roles: Admin, Trainer, and Trainee.
* The project follows strict business rules for class scheduling and booking management.

### Technologies Used

* TypeScript & Express.js
* MongoDB with Mongoose
* JWT Authentication 
* Node.js Runtime

### Key Features

* Role-based access control (Admin, Trainer, Trainee)
* Class scheduling with time slot management 
* Capacity control (max 5 classes/day, 10 trainees/class)
* Booking management system
* Schedule tracking for trainers

### API Routes

#### Authentication
* POST /api/auth/register
* POST /api/auth/login

#### Class Management
* POST /api/classes (Admin: Create schedule)
* POST /api/classes/:scheduleId/book (Trainee: Book class)
* GET /api/classes/trainer-schedules (Trainer: View schedules)
* DELETE /api/classes/:scheduleId/cancel-booking (Trainee: Cancel booking)
