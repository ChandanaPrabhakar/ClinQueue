// src/types.ts
export interface User {
  _id: string;
  fullName: string;
  age: number;
  phoneNumber: number;
  role: string;
}

export interface Doctor {
  _id: string;
  doctorName: string;
  specialization: string;
  experience: number;
  rating: number;
  reviews: number;
  availableDays: string[];
  image?: string;
}

export interface Appointment {
  _id: string;
  patientName: string;
  patientAge: number;
  patientPhone: number;
  doctorName: string;
  doctorSpec: string;
  timeSlot: string;
  userId: string;
  doctorId: string;
  createdAt: string;
  updatedAt: string;
}
