
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../src/models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const users = [
  {
    username: "alice",
    email: "alice@example.com",
    password: "password123",
    role: "admin",
    phone: "+33601020304",
    address: "1 rue de l'Admin, 75001 Paris, France",
    depot: "Paris"
    // Un admin n'a pas les champs driver
  },
  {
    username: "bob",
    email: "bob@example.com",
    password: "password123",
    role: "driver",
    phone: "+33605060708",
    address: "2 avenue du Driver, 69000 Lyon, France",
    depot: "Lyon",
    datePermis: new Date("2015-06-15"),
    dateEntree: new Date("2020-01-10"),
    lastMissionNumber: "M1234",
    monthlyDriveHours: 120,
    waitHours: 10,
    monthlyRestHours: 30
  },
  {
    username: "charlie",
    email: "charlie@example.com",
    password: "password123",
    role: "driver",
    phone: "+33611121314",
    address: "3 boulevard du Conducteur, 31000 Toulouse, France",
    depot: "Toulouse",
    datePermis: new Date("2018-09-20"),
    dateEntree: new Date("2022-03-01"),
    lastMissionNumber: "M5678",
    monthlyDriveHours: 90,
    waitHours: 5,
    monthlyRestHours: 28
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({ ...user, password: hashedPassword });
    }
    console.log("Sample users inserted");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
