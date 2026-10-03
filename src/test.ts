import prisma from "./lib/prisma.js";
import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient,
} from "./patients.js";
import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor,
} from "./doctors.js";
import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
  cancelAllPatientAppointments,
  deleteAppointment,
} from "./appointments.js";

async function main() {
  console.log("\n── Patients ──────────────────────────");

  const patient = await createPatient({
    name: "Test Patient 3",
    email: "testpatient3@example.com",
    phone: "7777777777",
    dateOfBirth: new Date("2001-01-15"),
  });

  console.log("Created:", patient.name);

  const foundPatient = await getPatient(patient.id);
  console.log("Found:", foundPatient.name);

  const searchResults = await searchPatients("Test Patient");
  console.log("Search results:", searchResults.length);

  const updatedPatient = await updatePatientPhone(
    patient.id,
    "8888888888"
  );
  console.log("Updated phone:", updatedPatient.phone);


  console.log("\n── Doctors ───────────────────────────");

  const doctor = await createDoctor({
    name: "Dr. Test 3",
    specialty: "General Medicine",
    email: "testdoctor3@hospital.com",
  });

  console.log("Created:", doctor.name);

  const foundDoctor = await getDoctor(doctor.id);
  console.log("Found:", foundDoctor.name);

  const doctorsBySpecialty =
    await listDoctorsBySpecialty("General Medicine");

  console.log(
    "General Medicine doctors:",
    doctorsBySpecialty.length
  );


  console.log("\n── Appointments ──────────────────────");

  // Use a future date so the upcoming-appointments function can find it.
  const appointment = await bookAppointment(
    patient.id,
    doctor.id,
    new Date("2027-01-15T10:00:00"),
    "Test appointment"
  );

  console.log(
    "Booked:",
    appointment.id,
    "for",
    appointment.patient.name
  );

  const fullAppointment =
    await getAppointmentFull(appointment.id);

  console.log(
    "Full fetch:",
    fullAppointment.patient.name,
    "with",
    fullAppointment.doctor.name
  );

  const upcomingAppointments =
    await getDoctorUpcomingAppointments(doctor.id);

  console.log(
    "Doctor schedule:",
    upcomingAppointments.length,
    "appointment(s)"
  );

  const cancelledAppointment =
    await setAppointmentStatus(
      appointment.id,
      "cancelled"
    );

  console.log(
    "Status updated to:",
    cancelledAppointment.status
  );


  // Create another appointment to test cancelAllPatientAppointments.
  const appointment2 = await bookAppointment(
    patient.id,
    doctor.id,
    new Date("2027-02-15T10:00:00"),
    "Second test appointment"
  );

  const cancelledCount =
    await cancelAllPatientAppointments(patient.id);

  console.log(
    "Appointments cancelled for patient:",
    cancelledCount
  );


  console.log("\n── Cleanup ───────────────────────────");

  await deleteAppointment(appointment.id);
  await deleteAppointment(appointment2.id);

  await deleteDoctor(doctor.id);
  await deletePatient(patient.id);

  console.log("Test data cleaned up.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });