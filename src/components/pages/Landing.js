import React from "react";
import {Link} from 'react-router-dom';
const Landing = () => {
  document.title = "Minimal Tracker";

  return (

    <main className="landing-page">
      <section className="card">
        <ul className="card-items">
          <li className="card-items__item">
            <strong>
              Minimal Tracker lets you work more collaboratebly with your project
              partners
            </strong>
            <span></span>
          </li>
          <li className="card-items__item">
            <strong>
              Organize your duties and keep track of all the issues of your
              current project
            </strong>
            <span></span>
          </li>
          <li className="card-items__item">
            <strong>
              Get work done! Don't worry anymore about comunication between your
              project peers!
            </strong>
            <span></span>
          </li>
        </ul>
      </section>
      <section className="register-ad">
        <strong>Start now!</strong>
        <p>Start now! Register below, it's free!</p>
        <Link to="/register" className="btn btn-link">
          Register here
        </Link>
      </section>
    </main>
  );
};

export default Landing;
