const mysqlDb = require("../config/db");
const jsonData = require("../InitialData/data");

// Function to create the database if it doesn't exist
const createDatabase = async () => {
  try {
    const connection = await mysqlDb.getConnection();
    await connection.query("CREATE DATABASE IF NOT EXISTS vehicleBooking");
    connection.release();
    console.log("Database created or already exists.");
  } catch (error) {
    console.error("Error creating database:", error);
  }
};

// Function to create the table inside the database
const createTable = async () => {
  try {
    const connection = await mysqlDb.getConnection({
      database: "vehicleBooking",
    });
    await connection.query(`
      CREATE TABLE IF NOT EXISTS vehicleBooking.vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        brand VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL
      )
    `);
    connection.release();
    console.log("Table created or already exists.");
  } catch (error) {
    console.error("Error creating table:", error.message);
  }
};
// Function to add data to the table
const seedData = async () => {
  try {
    const connection = await mysqlDb.getConnection({
      database: "vehicleBooking",
    });

    for (const category of Object.keys(jsonData.vehicles)) {
      for (const type of jsonData.vehicles[category]) {
        const vehicles = type.vehicles;
        for (const vehicle of vehicles) {
          try {
            // Check if the data already exists
            const [existingRows] = await connection.query(
              `
              SELECT COUNT(*) as count
              FROM vehicleBooking.vehicles
              WHERE type = ? AND brand = ? AND model = ?
            `,
              [type.type, vehicle.brand, vehicle.model]
            );

            if (existingRows[0].count === 0) {
              // If the data doesn't exist, insert it
              await connection.query(
                `
                INSERT INTO vehicleBooking.vehicles (type, brand, model) VALUES (?, ?, ?)
              `,
                [type.type, vehicle.brand, vehicle.model]
              );
              console.log("Data seeded successfully.");
            }
          } catch (error) {
            console.error("Error seeding data:", error);
          }
        }
      }
    }
    connection.release();
    console.log("Data seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

module.exports = { createDatabase, createTable, seedData };
