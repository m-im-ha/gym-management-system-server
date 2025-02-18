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

## Testing Guide with Postman

###  Authentication Testing
#### Register trainer
   * POST https://gym-management-system-rose.vercel.app/api/auth/register
   * Body:
```
{
  "name": "<exqample_name>",
  "email": "<example_email>@gym.com",
  "password": "<example_password>",
  "role": "trainer"
}
```
#### Register trainee
   * POST https://gym-management-system-rose.vercel.app/api/auth/register
   * Body:
```
{
  "name": "<exqample_name>",
  "email": "<example_email>@gym.com",
  "password": "<example_password>",
  "role": "trainee"
}
```
#### login
   * POST https://gym-management-system-rose.vercel.app/api/auth/login
   * Body:
```
{
  "email": "<example_email>@gym.com",
  "password": "<example_password>"
}
```
###  Create Class Schedule (as Admin)
  * POST https://gym-management-system-rose.vercel.app/api/classes
  * Headers: 
  * Authorization: Bearer <admin_token>
  * Body:
 ```
{
  "date": "2025-03-19",
  "startTime": "08:00",
  "endTime": "10:00",
  "trainer": "<trainer_id>"
}
```
###  View Class Schedules (as Trainer)
  * GET https://gym-management-system-rose.vercel.app/api/classes/trainer-schedules
  * Headers: 
  * Authorization: Bearer <trainer_token>
 
### Book a Class (as Trainee)
  * POST https://gym-management-system-rose.vercel.app/api/classes/<schedule_id>/book
  * Headers:
  * Authorization: Bearer <trainee_token>

### Cancel Booking (as Trainee)
  * DELETE https://gym-management-system-rose.vercel.app/api/classes/<schedule_id>/cancel-booking
  * Headers:
  * Authorization: Bearer <trainee_token>


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
