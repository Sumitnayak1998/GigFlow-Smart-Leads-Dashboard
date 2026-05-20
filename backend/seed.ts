import { setServers } from "node:dns/promises";
try {
  setServers(["1.1.1.1", "8.8.8.8"]);
} catch (e) {}

import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./src/models/user.model";
import { Lead } from "./src/models/lead.model";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

const seed = async () => {
  try {
    if (!MONGO_URI) {
      console.error("MONGO_URI is not defined in .env file");
      process.exit(1);
    }

    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected successfully!");

    // Clear existing data
    console.log("Clearing existing users and leads...");
    await User.deleteMany({});
    await Lead.deleteMany({});

    // Create Admin
    console.log("Creating admin user...");
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      role: "admin",
    });

    // Create Sales User
    console.log("Creating sales user...");
    const sales = await User.create({
      name: "Sales User",
      email: "sales@example.com",
      password: "password123",
      role: "sales",
    });

    console.log("Users created successfully!");

    // Create Sample Leads
    console.log("Creating sample leads...");
    const leadsData = [
      { name: "Aarav Mehta", email: "aarav.mehta@example.com", status: "New", source: "Website" },
      { name: "Priya Sharma", email: "priya.sharma@example.com", status: "Contacted", source: "Instagram" },
      { name: "Rohan Gupta", email: "rohan.gupta@example.com", status: "Qualified", source: "Referral" },
      { name: "Ananya Iyer", email: "ananya.iyer@example.com", status: "Lost", source: "Website" },
      { name: "Kabir Singh", email: "kabir.singh@example.com", status: "New", source: "Instagram" },
      { name: "Diya Patel", email: "diya.patel@example.com", status: "Contacted", source: "Referral" },
      { name: "Vikram Malhotra", email: "vikram.malhotra@example.com", status: "Qualified", source: "Website" },
      { name: "Neha Verma", email: "neha.verma@example.com", status: "New", source: "Instagram" },
      { name: "Arjun Reddy", email: "arjun.reddy@example.com", status: "Contacted", source: "Website" },
      { name: "Aditi Rao", email: "aditi.rao@example.com", status: "Qualified", source: "Referral" },
      { name: "Siddharth Sen", email: "siddharth.sen@example.com", status: "Lost", source: "Website" },
      { name: "Karan Johar", email: "karan.johar@example.com", status: "New", source: "Instagram" },
      { name: "Meera Nair", email: "meera.nair@example.com", status: "Contacted", source: "Referral" },
      { name: "Ranveer Singh", email: "ranveer.singh@example.com", status: "Qualified", source: "Website" },
      { name: "Deepika Padukone", email: "deepika.padukone@example.com", status: "New", source: "Instagram" },
    ];

    const leads = leadsData.map((lead, index) => ({
      ...lead,
      createdBy: index % 2 === 0 ? admin._id : sales._id,
    }));

    await Lead.insertMany(leads);
    console.log(`Successfully seeded ${leads.length} leads!`);

    console.log("Seeding complete!");
    console.log("--------------------------------------------------");
    console.log("ADMIN LOGIN:");
    console.log("  Email:    admin@example.com");
    console.log("  Password: password123");
    console.log("--------------------------------------------------");
    console.log("SALES LOGIN:");
    console.log("  Email:    sales@example.com");
    console.log("  Password: password123");
    console.log("--------------------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
