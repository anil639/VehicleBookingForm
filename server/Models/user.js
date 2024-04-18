const mysqlDb = require("../config/db");

// new Table for User
const createUserTable = async () => {
  try {
    const connection = await mysqlDb.getConnection({
      database: "vehicleBooking",
    });
    await connection.query(`
      CREATE TABLE IF NOT EXISTS vehicleBooking.user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        numberOfWheels INT NOT NULL,
        brand VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        startDate DATE,
        endDate DATE
      )
    `);
    connection.release();
    console.log(" userTable created or already exists.");
  } catch (error) {
    console.error("Error creating table:", error.message);
  }
};

module.exports = createUserTable;
