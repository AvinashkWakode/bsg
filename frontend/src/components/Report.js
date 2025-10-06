import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, LabelList
} from "recharts";

const Report = () => {
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [filters, setFilters] = useState({
    place: "",
    instructor: "",
    startDate: "",
    endDate: "",
    search: ""
  });

  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/feedback")
      .then(res => res.json())
      .then(feedbacks => {
        setAllFeedbacks(feedbacks);
        setFilteredFeedbacks(feedbacks); // default to all
      })
      .catch(err => console.error("❌ Error fetching feedbacks:", err));
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    let data = [...allFeedbacks];
    if (filters.place) data = data.filter(f => f.place === filters.place);
    if (filters.instructor) data = data.filter(f => f.instructor === filters.instructor);
    if (filters.startDate) data = data.filter(f => new Date(f.date) >= new Date(filters.startDate));
    if (filters.endDate) data = data.filter(f => new Date(f.date) <= new Date(filters.endDate));
    if (filters.search) {
      const query = filters.search.toLowerCase();
      data = data.filter(f =>
        f.name.toLowerCase().includes(query) ||
        f.place.toLowerCase().includes(query) ||
        f.instructor.toLowerCase().includes(query)
      );
    }
    setFilteredFeedbacks(data);
  }, [filters, allFeedbacks]);

  if (!allFeedbacks.length) return <p>Loading report...</p>;

  // Get unique options for dropdowns
  const places = [...new Set(allFeedbacks.map(f => f.place))];
  const instructors = [...new Set(allFeedbacks.map(f => f.instructor))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const totalStudents = filteredFeedbacks.length;

  const ratingCounts = { Poor: 0, Fair: 0, Good: 0, "Very Good": 0, Excellent: 0 };
  filteredFeedbacks.forEach(fb => {
    fb.ratings.forEach(r => {
      if (r === "1") ratingCounts.Poor += 1;
      else if (r === "2") ratingCounts.Fair += 1;
      else if (r === "3") ratingCounts.Good += 1;
      else if (r === "4") ratingCounts["Very Good"] += 1;
      else if (r === "5") ratingCounts.Excellent += 1;
    });
  });

  const pivotData = Object.entries(ratingCounts).map(([category, count]) => ({ category, count }));

  const questionData = [];
  const maxQuestions = Math.max(...filteredFeedbacks.map(fb => fb.ratings.length));
  for (let i = 0; i < maxQuestions; i++) {
    const counts = { Poor: 0, Fair: 0, Good: 0, "Very Good": 0, Excellent: 0 };
    filteredFeedbacks.forEach(fb => {
      const r = fb.ratings[i];
      if (r === "1") counts.Poor += 1;
      else if (r === "2") counts.Fair += 1;
      else if (r === "3") counts.Good += 1;
      else if (r === "4") counts["Very Good"] += 1;
      else if (r === "5") counts.Excellent += 1;
    });
    questionData.push({ question: `Q${i + 1}`, ...counts });
  }

  const COLORS = ["#EF4444", "#F59E0B", "#3B82F6", "#10B981", "#8B5CF6"];
  const sectionStyle = {
    backgroundColor: "#ffffff",
    padding: "1rem",
    marginBottom: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  };

  return (
    <div style={{ padding: "2rem", minHeight: "100vh" }}>
     <h2 style={{
  textAlign: "center",
  marginBottom: "1rem",
  marginTop: "0.5rem",
  fontSize: "2.5rem",
  fontWeight: "700",
  color: "#1E40AF",       // deep blue
  textShadow: "1px 1px 2px rgba(0,0,0,0.2)" // subtle shadow for depth
}}>
    Adventure Programme Camp</h2>

      {/* Filter Bar */}
      <div style={{
  display: "flex",
  gap: "1rem",
  marginBottom: "2rem",
  flexWrap: "wrap",
  padding: "1rem",          // added padding
  backgroundColor: "#fffffeff", // light gray background
  borderRadius: "8px"       // optional: rounded corners
}}>
        <select name="place" value={filters.place} onChange={handleFilterChange}>
          <option value="">All Camp Locations</option>
          {places.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select name="instructor" value={filters.instructor} onChange={handleFilterChange}>
          <option value="">All Camp Instructors</option>
          {instructors.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
        <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
        <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
        {/* Search Bar */}
        <input
          type="text"
          name="search"
          placeholder="Search by Name, Location, Instructor"
          value={filters.search}
          onChange={handleFilterChange}
          style={{ flex: "1", minWidth: "200px", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      {/* Existing Report Layout */}
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* Left Column */}
        <div style={{ flex: "1 1 400px" }}>
          {/* Pie Chart */}
          <div style={sectionStyle}>
            <h3 style={{ textAlign: "center" }}>Total Feedback Received: {totalStudents}</h3>
            <ResponsiveContainer width="100%" height={270}>
              <PieChart>
                <Pie
                  data={pivotData}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={40}
                  label={({ percent, category }) => `${category}: ${(percent * 100).toFixed(1)}%`}
                >
                  {pivotData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Overall Ratings Bar Chart */}
          <div style={sectionStyle}>
            <h3 style={{ textAlign: "center" }}>Overall Ratings Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={(() => {
                  const counts = { Poor: 0, Fair: 0, Good: 0, "Very Good": 0, Excellent: 0 };
                  filteredFeedbacks.forEach(fb => {
                    const avg = Math.round(fb.ratings.reduce((sum, r) => sum + parseInt(r), 0) / fb.ratings.length);
                    if (avg === 1) counts.Poor += 1;
                    else if (avg === 2) counts.Fair += 1;
                    else if (avg === 3) counts.Good += 1;
                    else if (avg === 4) counts["Very Good"] += 1;
                    else if (avg === 5) counts.Excellent += 1;
                  });
                  return Object.entries(counts).map(([category, count]) => ({ category, count }));
                })()}
              >
                <XAxis dataKey="category" />
                <YAxis
                  label={{ value: "Total BSG Members", angle: -90, position: "insideLeft", style: { textAnchor: "middle" } }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="count">
                  <LabelList
                    dataKey="count"
                    position="top"
                    formatter={(value) => `${((value / totalStudents) * 100).toFixed(1)}%`}
                  />
                  {pivotData.map((entry, index) => (
                    <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: "1 1 400px" }}>
          <div style={sectionStyle}>
            <h3 style={{ textAlign: "center" }}>Ratings per Question</h3>
            <ResponsiveContainer width="100%" height={690}>
              <BarChart layout="vertical" data={questionData} margin={{ top: 10, right: 10, left: 1, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="question" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Poor" stackId="a" fill="#EF4444" />
                <Bar dataKey="Fair" stackId="a" fill="#F59E0B" />
                <Bar dataKey="Good" stackId="a" fill="#3B82F6" />
                <Bar dataKey="Very Good" stackId="a" fill="#10B981" />
                <Bar dataKey="Excellent" stackId="a" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Feedback Table */}
      <div style={sectionStyle}>
        <h3 style={{ textAlign: "center" }}> BSG Members Feedback</h3>
        <div style={{ overflowX: "auto", marginTop: "1rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#1E40AF", color: "#fff" }}>
                <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Sr.No.</th>
                <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Name</th>
                <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Mobile</th>
                <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>BSG UID</th>
                <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Camp Location</th>
                <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Instructor</th>
                <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Date</th>
                <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Ratings</th>
                <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Comments</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((f, index) => {
                const formattedDate = new Date(f.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
                return (
                  <tr key={f._id} style={{ textAlign: "center" }}>
                    <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{index + 1}</td>
                    <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{f.name}</td>
                    <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{f.mobile}</td>
                    <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{f.uid}</td>
                    <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{f.place}</td>
                    <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{f.instructor}</td>
                    <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{formattedDate}</td>
                    <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{f.ratings.join(", ")}</td>
                    <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{f.comments}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
