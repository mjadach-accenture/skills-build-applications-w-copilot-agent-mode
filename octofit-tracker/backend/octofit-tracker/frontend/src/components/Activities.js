import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : '/api/activities/';

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-lg mb-4 border-0">
      <div className="card-header bg-primary text-white d-flex align-items-center justify-content-between">
        <h2 className="h4 mb-0"><i className="bi bi-activity me-2"></i>Activities</h2>
        <button className="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#addActivityModal">
          <i className="bi bi-plus-circle me-1"></i>Add Activity
        </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Date</th>
                <th scope="col">User</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted">No activities found.</td></tr>
              ) : (
                activities.map((activity, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{activity.type}</td>
                    <td>{activity.duration}</td>
                    <td>{activity.date}</td>
                    <td>{activity.user ? (activity.user.name || activity.user.email || activity.user) : ''}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add Activity (Bootstrap modal markup, not functional yet) */}
      <div className="modal fade" id="addActivityModal" tabIndex="-1" aria-labelledby="addActivityModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addActivityModalLabel">Add Activity</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="activityType" className="form-label">Type</label>
                  <input type="text" className="form-control" id="activityType" placeholder="e.g. Running" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDuration" className="form-label">Duration (min)</label>
                  <input type="number" className="form-control" id="activityDuration" placeholder="e.g. 30" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDate" className="form-label">Date</label>
                  <input type="date" className="form-control" id="activityDate" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityUser" className="form-label">User</label>
                  <input type="text" className="form-control" id="activityUser" placeholder="User name or email" />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
