import React, { useState } from "react";

const Registration = () => {
  const [totalStudents, setTotalStudents] = useState("");
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // DOB range calculation
  const today = new Date();
  const maxDOB = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
  const minDOB = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
  const formatDate = (date) => date.toISOString().split("T")[0];

  // Handle total students input (allow 1–32 only)
  const handleTotalChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // only numbers
    if (value === "" || (parseInt(value, 10) <= 32 && parseInt(value, 10) >= 1)) {
      setTotalStudents(value);
    }
  };

  // Generate empty student objects
  const handleGenerateForms = () => {
    const num = parseInt(totalStudents, 10);
    if (num > 0 && num <= 32) {
      const emptyStudents = Array.from({ length: num }, () => ({
        fullName: "",
        motherName: "",
        email: "",
        mobile: "",
        aadhar: "",
        dob: "",
      }));
      setStudents(emptyStudents);
      setShowForm(true);
    } else {
      alert("Please enter a valid number of students (1 to 32).");
    }
  };

  // Update input values
  const handleInputChange = (index, field, value) => {
    const updatedStudents = [...students];
    if (field === "fullName" && value.length > 30) return;
    if (field === "motherName" && value.length > 12) return;

    if (field === "mobile") value = value.replace(/\D/g, "").slice(0, 10);
    if (field === "aadhar") {
      value = value.replace(/\D/g, "").slice(0, 12);
      if (value.length > 4 && value.length <= 8) value = value.replace(/(\d{4})(\d+)/, "$1 $2");
      if (value.length > 8) value = value.replace(/(\d{4})(\d{4})(\d+)/, "$1 $2 $3");
    }

    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered Students Data:", students);
    alert("All student registrations submitted successfully!");
  };

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "30px auto",
        padding: "0 10px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#1D4ED8" }}>
        Unit Registration Form
      </h1>

      {/* Step 1: Enter total members */}
      {!showForm && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <label style={{ fontWeight: "bold" }}>Enter Total Members:</label>
          <input
            type="text"
            inputMode="numeric"
            value={totalStudents}
            onChange={handleTotalChange}
            placeholder="Enter up to 32"
            style={{
              padding: "10px 12px",
              width: "120px",
              borderRadius: "6px",
              border: "1px solid #ced4da",
            }}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
            }}
          />
          <button
            onClick={handleGenerateForms}
            style={{
              padding: "10px 16px",
              backgroundColor: "#1D4ED8",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Generate Form
          </button>
        </div>
      )}

      {/* Step 2: Student Registration Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "30px",
            backgroundColor: "#ffffff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          {/* ✅ Scrollable wrapper for mobile */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "5px 20px",
                minWidth: "800px", // prevent squishing
              }}
            >
              <thead>
                <tr>
                  {["Sr.No", "Full Name", "Mother's Name", "Email", "Mobile", "Aadhar", "DOB"].map(
                    (header, i) => (
                      <th
                        key={i}
                        style={{
                          padding: "12px",
                          backgroundColor: "#1D4ED8",
                          color: "#fff",
                          borderRadius: "6px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center", padding: "10px" }}>{index + 1}</td>
                    {["fullName", "motherName", "email", "mobile", "aadhar", "dob"].map((field, i) => (
                      <td key={i}>
                        <input
                          type={
                            field === "dob"
                              ? "date"
                              : field === "email"
                              ? "email"
                              : field === "mobile"
                              ? "tel"
                              : "text"
                          }
                          value={student[field]}
                          onChange={(e) => handleInputChange(index, field, e.target.value)}
                          required
                          min={field === "dob" ? formatDate(minDOB) : undefined}
                          max={field === "dob" ? formatDate(maxDOB) : undefined}
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "6px",
                            border: "1px solid #ced4da",
                            boxSizing: "border-box",
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                padding: "10px 16px",
                backgroundColor: "#6c757d",
                color: "#fff",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              ⬅ Back
            </button>
            <button
              type="submit"
              style={{
                padding: "10px 16px",
                backgroundColor: "#28a745",
                color: "#fff",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Submit All
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Registration;
