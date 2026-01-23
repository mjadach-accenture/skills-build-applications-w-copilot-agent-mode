import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/';

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setEntries(results);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-lg mb-4 border-0">
      <div className="card-header bg-success text-white d-flex align-items-center justify-content-between">
        <h2 className="h4 mb-0"><i className="bi bi-trophy me-2"></i>Leaderboard</h2>
        <button className="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#addLeaderboardModal" disabled>
          <i className="bi bi-plus-circle me-1"></i>Add Entry
        </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-success">
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted">No leaderboard entries found.</td></tr>
              ) : (
                entries.map((entry, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{entry.user ? (entry.user.name || entry.user.email || entry.user) : 'Unknown'}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add Leaderboard Entry (Bootstrap modal markup, not functional yet) */}
      <div className="modal fade" id="addLeaderboardModal" tabIndex="-1" aria-labelledby="addLeaderboardModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addLeaderboardModalLabel">Add Leaderboard Entry</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="entryUser" className="form-label">User</label>
                  <input type="text" className="form-control" id="entryUser" placeholder="User name or email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="entryScore" className="form-label">Score</label>
                  <input type="number" className="form-control" id="entryScore" placeholder="e.g. 100" />
                </div>
                <button type="submit" className="btn btn-success">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
