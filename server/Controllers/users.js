const mysqlDb = require("../config/db");

//Adding new user and details
const addUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      numberOfWheels,
      brand,
      model,
      startDate,
      endDate,
    } = req.body;
    const connection = await mysqlDb.getConnection({
      database: "vehicleBooking",
    });

    // Checking if user already exists based on data
    const [existingUser] = await connection.query(
      `
      SELECT * FROM vehicleBooking.user 
      WHERE firstName = ? 
      AND lastName = ? 
      AND brand = ? 
      AND model = ? 
      AND startDate = ? 
      AND endDate = ?
    `,
      [firstName, lastName, brand, model, startDate, endDate]
    );

    if (existingUser.length === 0) {
      // If user does not exist, insert new record
      await connection.query(
        `
        INSERT INTO vehicleBooking.user (firstName, lastName, numberOfWheels, brand, model, startDate, endDate) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
        [firstName, lastName, numberOfWheels, brand, model, startDate, endDate]
      );

      console.log("User added to the table.");
      res.status(200).json({ message: "User added successfully" });
    } else {
      console.log("User already exists in the table.");
      res.status(400).json({ error: "User already exists" });
    }

    connection.release();
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all details of users
const getUserDatas = async (req, res) => {
  try {
    const [userDetails] = await mysqlDb.query(
      "SELECT * FROM vehicleBooking.user"
    );
    res.json(userDetails);
  } catch (error) {
    console.error("Error fetching car types:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addUser, getUserDatas };
