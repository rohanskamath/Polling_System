import React, { useEffect, useState } from "react";
import axios from "axios";
import "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";

const PollTrends = () => {
  const [votes, setVotes] = useState([]);
  const [votingChoice, setVotingChoice] = useState("true");
  const [chartData, setChartData] = useState({ datasets: [] });
  const [overallScore, setOverallScore] = useState({ datasets: [] });

  useEffect(() => {
    axios
      .get("http://localhost:3000/polltrends/")
      .then((result) => {
        setVotes(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:3000/results")
      .then((result) => {
        setOverallScore({
          labels: result.data.data.map((entry) =>
            entry.voting_choice ? "False" : "True"
          ),
          datasets: [
            {
              label: "Overall Score",
              data: result.data.data.map((entry) => entry.count),
              backgroundColor: ["green", "red"],
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/counts?voting_choice=${votingChoice}`)
      .then((result) => {
        setChartData({
          labels: result.data.data.map((entry) => entry.casted_at),
          datasets: [
            {
              label: `Votes for ${votingChoice}`,
              data: result.data.data.map((entry) => entry.count),
              borderColor: votingChoice === "true" ? "green" : "red",
              fill: false,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [votingChoice]);

  return (
    <div className="container">
      <h3 className="mb-4 text-center fs-1 text-white mt-4">Poll Trends</h3>
      <table className="table mt-5 table-striped">
        <thead>
          <tr>
            <th scope="col">Name of Candidate</th>
            <th scope="col">Vote Choice</th>
            <th scope="col">Date of Submission</th>
          </tr>
        </thead>
        <tbody>
          {votes.length > 0 &&
            votes.map((v, index) => (
              <tr key={index}>
                <td>{v.name}</td>
                <td>{v.voting_choice === 0 ? "No" : "Yes"}</td>
                <td>{v.casted_at.substring(0, 10)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="container bg-white bg-2 text-center p-3 mb-4">
              <h2 className="mt-5">{`Line Chart for ${votingChoice}`}</h2>
              <button
                onClick={() => setVotingChoice("true")}
                className="btn btn-outline-success mt-4 mb-4"
              >
                Show True Votes
              </button>
              <button
                onClick={() => setVotingChoice("false")}
                className="btn btn-outline-danger mt-4 ms-3 mb-4"
              >
                Show False Votes
              </button>
              <Line data={chartData} height={290} width={400} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="container bg-white bg-2 text-center p-3 mb-4">
              <h2 className="mt-5">Bar Chart</h2>
              <Bar data={overallScore} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollTrends;
