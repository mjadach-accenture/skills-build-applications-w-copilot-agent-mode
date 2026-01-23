import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : '/api/users/';

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-lg mb-4 border-0">
      <div className="card-header bg-secondary text-white d-flex align-items-center justify-content-between">
        <h2 className="h4 mb-0"><i className="bi bi-person-lines-fill me-2"></i>Users</h2>
        <button className="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#addUserModal">
          <i className="bi bi-plus-circle me-1"></i>Add User
        </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-secondary">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
                <th scope="col">Superhero</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted">No users found.</td></tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.team ? (user.team.name || user.team) : ''}</td>
                    <td>{user.is_superhero ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add User (Bootstrap modal markup, not functional yet) */}
      <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">Add User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="userName" placeholder="User name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="userEmail" placeholder="User email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="userTeam" className="form-label">Team</label>
                  <input type="text" className="form-control" id="userTeam" placeholder="Team name" />
                </div>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" id="userSuperhero" />
                  <label className="form-check-label" htmlFor="userSuperhero">Superhero</label>
                </div>
                <button type="submit" className="btn btn-secondary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
