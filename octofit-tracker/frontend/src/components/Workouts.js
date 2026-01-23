import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : '/api/workouts/';

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-lg mb-4 border-0">
      <div className="card-header bg-warning text-dark d-flex align-items-center justify-content-between">
        <h2 className="h4 mb-0"><i className="bi bi-bar-chart-steps me-2"></i>Workouts</h2>
        <button className="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#addWorkoutModal">
          <i className="bi bi-plus-circle me-1"></i>Add Workout
        </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-warning">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted">No workouts found.</td></tr>
              ) : (
                workouts.map((workout, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{workout.name}</td>
                    <td>{workout.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add Workout (Bootstrap modal markup, not functional yet) */}
      <div className="modal fade" id="addWorkoutModal" tabIndex="-1" aria-labelledby="addWorkoutModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addWorkoutModalLabel">Add Workout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="workoutName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="workoutName" placeholder="Workout name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="workoutDescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="workoutDescription" placeholder="Workout description" />
                </div>
                <button type="submit" className="btn btn-warning text-dark">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
// Removed duplicate/erroneous JSX and export
