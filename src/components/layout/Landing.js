import React from "react";
import {Link} from 'react-router-dom';
const Landing = () => {
  return (
    <main>
      <section className="card">
        <ul className="card-items">
          <li>
            <span></span>
            <strong>
              NOMEMPRESA lets you work more collaboratebly with your project
              partners
            </strong>
          </li>
          <li>
            <span></span>
            <strong>
              Organize your duties and keep track of all the issues of your
              current project
            </strong>
          </li>
          <li>
            <span></span>
            <strong>
              Get work done! Don't worry anymore about comunication between your
              project peers!
            </strong>
          </li>
        </ul>
      </section>
      <section id="primary">
        <h1>Start now!</h1>
        <p>Start now! Register below, it's free!</p>

        <Link to="/register" className="register-button">
          Register here
        </Link>
      </section>
    </main>
  );
};

export default Landing;
