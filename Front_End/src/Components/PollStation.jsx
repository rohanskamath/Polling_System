import React from 'react'

const PollStation = () => {
  
  return (
    <section className="vh-100 loginPage">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong border" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5">
                <h3 className="mb-2 text-center fs-1">Poll Options</h3>

                <div className="form-outline mb-3">
                  <label htmlFor="name">Email</label>
                  <input type="name" name="name" className="form-control form-control-md shadow-none" placeholder='Enter your candidate name' />
                </div>

                <div className="form-outline mb-3">
                  <label htmlFor="VoC">Vote of Choice</label>
                  <select className="form-select shadow-none" aria-label="Default select example" name='VoC'>
                    <option selected>---- Select ----</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </select>
                </div>

                <div className="form-outline mb-5">
                  <label htmlFor="dateofsub">Date of Submission</label>
                  <input type="date" name="dateofsub" className="form-control form-control-md shadow-none" />
                </div>

                <button className="btn btn-success w-100" type="submit">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PollStation