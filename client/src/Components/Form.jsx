import React, { useState, useEffect } from "react";
import { Grid, Paper, Container, Button, Typography } from "@mui/material";

import Question from "./Question";
import NameInput from "./NameInput";
import RadioButtons from "./RadioButtons";
import DateRangePicker from "./DatePicker";

const Form = () => {
  const [formData, setFormData] = useState({
    name: { firstName: "", lastName: "" },
    wheels: "",
    vehicleType: "",
    vehicleModel: "",
    startDate: null,
    endDate: null,
  });

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const totalQuestions = 5;

  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  // vehicle types data from server
  const fetchVehicleTypes = async () => {
    try {
      const response = await fetch("http://localhost:8000/vehicle/types");
      const data = await response.json();
      setVehicleTypes(data);
    } catch (error) {
      console.error("Error fetching vehicle types:", error);
    }
  };

  // vehicle models data based on selected vehicle type
  const fetchVehicleModels = async (type) => {
    try {
      const response = await fetch(
        `http://localhost:8000/vehicle/models/?type=${type}`
      );
      const data = await response.json();
      setVehicleModels(data);
    } catch (error) {
      console.error("Error fetching vehicle models:", error);
    }
  };

  // handle form submission
  const handleSubmit = () => {
    const formattedStartDate = formData.startDate.toISOString().split("T")[0];
    const formattedEndDate = formData.endDate.toISOString().split("T")[0];
    // set form data as json
    const postData = {
      firstName: formData.name.firstName,
      lastName: formData.name.lastName,
      numberOfWheels: parseInt(formData.wheels),
      brand: formData.vehicleType,
      model: formData.vehicleModel,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    fetch("http://localhost:8000/user/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form data sent successfully:", data);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
      });
  };

  // handle next button
  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      if (currentQuestion === 1) {
        if (
          formData.name.firstName.trim() === "" ||
          formData.name.lastName.trim() === ""
        ) {
          console.error("Please provide both first name and last name.");
          setIsError(true);
          return;
        }
      }
      if (isAnswered) {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnswered(false);
        setIsError(false);
      } else {
        console.error("Please answer the question before proceeding.");
        setIsError(true);
      }
    }
  };

  // handle updating form data
  const handleFormDataChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    if (fieldName === "vehicleType") {
      fetchVehicleModels(value);
    }
    setIsAnswered(true);
  };

  return (
    <Container style={{ padding: "16px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            style={{
              padding: "16px",
              textAlign: "center",
              height: "400px",
              overflowY: "auto",
            }}
          >
            {currentQuestion === 1 && (
              <Question number={1} onNext={handleNext}>
                <NameInput
                  value={formData.name}
                  onChange={(value) => handleFormDataChange("name", value)}
                />
                {isError && (
                  <Typography variant="body2" color="error">
                    Please answer the question before proceeding.
                  </Typography>
                )}
                <Button
                  sx={{ marginTop: "20px" }}
                  variant="contained"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Question>
            )}
            {currentQuestion === 2 && (
              <Question number={2} onNext={handleNext}>
                <RadioButtons
                  options={["2", "4"]}
                  value={formData.wheels}
                  onChange={(value) => handleFormDataChange("wheels", value)}
                />
                {isError && (
                  <Typography variant="body2" color="error">
                    Please answer the question before proceeding.
                  </Typography>
                )}
                <Button
                  sx={{ marginTop: "20px" }}
                  variant="contained"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Question>
            )}
            {currentQuestion === 3 && (
              <Question number={3} onNext={handleNext}>
                <RadioButtons
                  options={vehicleTypes}
                  value={formData.vehicleType}
                  onChange={(value) =>
                    handleFormDataChange("vehicleType", value)
                  }
                />
                {isError && (
                  <Typography variant="body2" color="error">
                    Please answer the question before proceeding.
                  </Typography>
                )}
                <Button
                  sx={{ marginTop: "20px" }}
                  variant="contained"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Question>
            )}
            {currentQuestion === 4 && (
              <Question number={4} onNext={handleNext}>
                <RadioButtons
                  options={vehicleModels}
                  value={formData.vehicleModel}
                  onChange={(value) =>
                    handleFormDataChange("vehicleModel", value)
                  }
                />
                {isError && (
                  <Typography variant="body2" color="error">
                    Please answer the question before proceeding.
                  </Typography>
                )}
                <Button
                  sx={{ marginTop: "20px" }}
                  variant="contained"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Question>
            )}
            {currentQuestion === totalQuestions && (
              <Question number={totalQuestions}>
                <DateRangePicker
                  onStartChange={(start) =>
                    handleFormDataChange("startDate", start)
                  }
                  onEndChange={(end) => handleFormDataChange("endDate", end)}
                />{" "}
                {isError && (
                  <Typography variant="body2" color="error">
                    Please answer the question before proceeding.
                  </Typography>
                )}
                <Button
                  sx={{ marginTop: "20px" }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Question>
            )}
            {isSubmitted && (
              <Typography
                sx={{ marginTop: "20px" }}
                variant="h4"
                color="primary"
              >
                Form submitted successfully!
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Form;
