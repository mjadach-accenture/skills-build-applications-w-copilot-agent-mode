import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : '/api/teams/';

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-lg mb-4 border-0">
      <div className="card-header bg-info text-white d-flex align-items-center justify-content-between">
        <h2 className="h4 mb-0"><i className="bi bi-people me-2"></i>Teams</h2>
        <button className="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#addTeamModal">
          <i className="bi bi-plus-circle me-1"></i>Add Team
        </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-info">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted">No teams found.</td></tr>
              ) : (
                teams.map((team, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{team.name}</td>
                    <td>{team.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add Team (Bootstrap modal markup, not functional yet) */}
      <div className="modal fade" id="addTeamModal" tabIndex="-1" aria-labelledby="addTeamModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTeamModalLabel">Add Team</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="teamName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="teamName" placeholder="Team name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="teamDescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="teamDescription" placeholder="Team description" />
                </div>
                <button type="submit" className="btn btn-info text-white">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
