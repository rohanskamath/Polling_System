import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const PollStation = () => {

  const [pollValues, setPollValues] = useState({
    name: "",
    vote_choice: "",
    casted_vote: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/pollstation/', pollValues)
      .then(result => {

        toast.success(result.data.success, {
          theme: "dark"
        });

        setTimeout(() => {
          window.location.reload();
        }, 8000);
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <section className="vh-100">
      <ToastContainer />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong border" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5">
                <h3 className="mb-2 text-center fs-1">Poll Options</h3>

                <div className="form-outline mb-3">
                  <label htmlFor="name">Name of Candidate</label>
                  <input type="name" name="name" className="form-control form-control-md shadow-none" placeholder='Enter your candidate name' onChange={(e) => setPollValues({ ...pollValues, name: e.target.value })} />
                </div>

                <div className="form-outline mb-3">
                  <label htmlFor="VoC">Vote of Choice</label>
                  <select className="form-select shadow-none" aria-label="Default select example" name='VoC' onChange={(e) => setPollValues({ ...pollValues, Voc: e.target.value })}>
                    <option value="">---- Select ----</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <div className="form-outline mb-5">
                  <label htmlFor="dateofsub">Date of Submission</label>
                  <input type="date" name="dateofsub" className="form-control form-control-md shadow-none" onChange={(e) => setPollValues({ ...pollValues, casted_vote: e.target.value })} />
                </div>

                <button className="btn btn-success w-100" type="submit" onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PollStation