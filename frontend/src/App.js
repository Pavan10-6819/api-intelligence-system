import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function App() {
  const [logs, setLogs] = useState([]);
  const [analysis, setAnalysis] = useState({});
  const [topFailures, setTopFailures] = useState([]);
  const [slowApis, setSlowApis] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://api-intelligence-backend.onrender.com/api/logs";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const logsRes = await axios.get(BASE_URL);
      const analysisRes = await axios.get(`${BASE_URL}/analysis`);
      const failuresRes = await axios.get(`${BASE_URL}/top-failures`);
      const slowRes = await axios.get(`${BASE_URL}/slow-apis`);

      setLogs(logsRes.data);
      setAnalysis(analysisRes.data);
      setTopFailures(failuresRes.data);
      setSlowApis(slowRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Card styling
  const cardStyle = {
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#f4f4f4",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    width: "200px",
    textAlign: "center",
  };

  // 🔄 Loading state
  if (loading) return <h2>Loading dashboard...</h2>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚀 API Intelligence Dashboard</h1>

      {/* 📊 Stats Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={cardStyle}>
          <h3>Total Requests</h3>
          <p>{analysis.totalRequests}</p>
        </div>
        <div style={cardStyle}>
          <h3>Total Failures</h3>
          <p>{analysis.totalFailures}</p>
        </div>
        <div style={cardStyle}>
          <h3>Failure Rate</h3>
          <p>{analysis.failureRate}</p>
        </div>
      </div>

      {/* 📊 Chart */}
      <h2>📊 Failure Chart</h2>
      <Bar
        data={{
          labels: ["Total Requests", "Failures"],
          datasets: [
            {
              label: "API Stats",
              data: [analysis.totalRequests || 0, analysis.totalFailures || 0],
              backgroundColor: ["#36A2EB", "#FF6384"],
            },
          ],
        }}
      />

      {/* 🔥 Top Failures */}
      <h2>🔥 Top Failures</h2>
      <ul>
        {topFailures.map((item, index) => (
          <li key={index}>
            {item.apiName} - {item.count}
          </li>
        ))}
      </ul>

      {/* ⏱ Slow APIs */}
      <h2>⏱ Slow APIs</h2>
      <ul>
        {slowApis.map((api, index) => (
          <li key={index}>
            {api.apiName} - {api.responseTime} ms
          </li>
        ))}
      </ul>

      {/* 📡 Logs */}
      <h2>📡 Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            {log.apiName} |{" "}
            <span
              style={{
                color: log.statusCode >= 400 ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              {log.statusCode}
            </span>{" "}
            | {log.responseTime}ms | {log.suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
