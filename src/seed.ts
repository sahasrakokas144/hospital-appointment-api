import prisma from "./lib/prisma.js";

async function main() {
  const doctor1 = await prisma.doctor.create({
    data: {
      name: "Dr. Rao",
      specialty: "Cardiology",
      email: "rao@hospital.com",
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: "Dr. Sharma",
      specialty: "General Medicine",
      email: "sharma@hospital.com",
    },
  });

  const patient1 = await prisma.patient.create({
    data: {
      name: "Test Patient",
      email: "patient1@example.com",
      phone: "9999999999",
      dateOfBirth: new Date("2000-05-15"),
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: "Another Patient",
      email: "patient2@example.com",
      phone: "8888888888",
      dateOfBirth: new Date("1998-10-20"),
    },
  });

  await prisma.appointment.create({
    data: {
      appointmentDate: new Date("2024-12-20T10:00:00"),
      status: "scheduled",
      notes: "Regular check-up",
      patient: {
        connect: { id: patient1.id },
      },
      doctor: {
        connect: { id: doctor1.id },
      },
    },
  });

  await prisma.appointment.create({
    data: {
      appointmentDate: new Date("2024-12-21T14:00:00"),
      status: "scheduled",
      notes: "Follow-up",
      patient: {
        connect: { id: patient2.id },
      },
      doctor: {
        connect: { id: doctor2.id },
      },
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });