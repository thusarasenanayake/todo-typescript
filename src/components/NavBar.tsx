import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface Props {}

const NavBar: React.FC<Props> = () => {
  const location = useLocation();
  return (
    <>
      <div className="row">
        <div className="col-10">
          <h3>📑 Todos</h3>
        </div>
        <div className="col">
          {location.pathname === '/' ? (
            <Link
              to="/todos"
              className="btn btn-small btn-outline-primary"
              role="button"
            >
              Your todos
            </Link>
          ) : (
            <Link
              to="/"
              className="btn btn-small btn-outline-primary"
              role="button"
            >
              Home
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
