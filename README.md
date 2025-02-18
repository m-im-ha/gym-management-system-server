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

### Link
  [LINK](https://gym-management-system-rose.vercel.app/)

### Key Features

* Role-based access control (Admin, Trainer, Trainee)
* Class scheduling with time slot management 
* Capacity control (max 5 classes/day, 10 trainees/class)
* Booking management system
* Schedule tracking for trainers


### Admin Credentials 
  * email: admin@gym.com,
  * password: admin123

### Diagram
  [Link of the diagram](https://drive.google.com/file/d/1DQ5mMXe5sHVG5_JIBXUenVKK5B_MYtnN/view?usp=sharing)

### API Routes

#### Authentication
* POST https://gym-management-system-rose.vercel.app/api/auth/register
* POST https://gym-management-system-rose.vercel.app/api/auth/login

#### Class Management
* POST https://gym-management-system-rose.vercel.app/api/classes (Admin: Create schedule)
* POST https://gym-management-system-rose.vercel.app/api/classes/:scheduleId/book (Trainee: Book class)
* GET https://gym-management-system-rose.vercel.app/api/classes/trainer-schedules (Trainer: View schedules)
* DELETE https://gym-management-system-rose.vercel.app/api/classes/:scheduleId/cancel-booking (Trainee: Cancel booking)
