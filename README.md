# Hospital Appointment API

A TypeScript CRUD application built with Prisma 7.10.0 and PostgreSQL for managing patients, doctors, and hospital appointments.

## Tech Stack

* TypeScript
* Prisma 7.10.0
* PostgreSQL
* Prisma PostgreSQL (`pg`) adapter
* Node.js
* tsx

## Features

### Patients

* Create a patient
* Get a patient by ID
* Search patients by name
* Update a patient's phone number
* Delete a patient

### Doctors

* Create a doctor
* Get a doctor by ID
* List doctors by specialty
* Delete a doctor

### Appointments

* Book an appointment
* Get an appointment with patient and doctor details
* Get upcoming appointments for a doctor
* Update appointment status
* Cancel all scheduled appointments for a patient
* Delete an appointment

## Database

The application uses three PostgreSQL tables:

* `patients`
* `doctors`
* `appointments`

The Prisma schema uses mapped PascalCase models and camelCase fields while preserving the existing PostgreSQL table and column names.

## Verification

The project was verified with:

```bash
npx tsc --noEmit
npx tsx src/test.ts
```

All required CRUD functions were exercised successfully, including creation, retrieval, searching, updating, appointment booking, status updates, cancellation, and cleanup of test data.

## Seed Data

The project includes Prisma seed configuration and sample data for patients, doctors, and appointments.

Run:

```bash
npx prisma db seed
```
