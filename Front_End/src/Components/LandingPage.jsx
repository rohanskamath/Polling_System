import React from 'react'
import PollStation from '../assets/poll_station_img.jpg'
import PollTrends from '../assets/trend_img.jpg'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="container-fluid bg-1 text-center py-3">
      <h3 className="my-4">Polling System</h3>

      <div className="row row-cols-1 row-cols-md-2 g-4 mt-3">

        <Link to="/pollstation" className="col mouse-hover text-decoration-none">
          <div className="card text-center">
            <img src={PollStation} className="card-img-top" alt="Poll Station" style={{ height: "280px" }} />
            <div className="card-body">
              <h5 className="card-title">Poll Station</h5>
            </div>
          </div>
        </Link>

        <Link to="/polltrends" className="col mouse-hover text-decoration-none">
          <div className="card">
            <img src={PollTrends} className="card-img-top" alt="Poll Trends" style={{ height: "280px" }} />
            <div className="card-body">
              <h5 className="card-title">Poll Trends</h5>
            </div>
          </div>
        </Link>

      </div>

    </div>
  )
}

export default LandingPage