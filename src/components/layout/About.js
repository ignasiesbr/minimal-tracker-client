import React from "react";
import {Link, Redirect} from 'react-router-dom';

function About() {

  return (
    <main id="main-about">
      <section className="card">
        <ul className="card-items">
          <li>
            <span id="about"></span>

            <strong>
              This page is my bachelor's final year project for Electronical
              Engineering
            </strong>
          </li>
          <li>
            <span id="about"></span>
            <strong>
              Technologies used are Node.js for the backend and React and Redux
              for the client-side
            </strong>
          </li>
          <li>
            <span id="about"></span>
            <strong>
              You can find the whole code for the project in my github
            </strong>
            <Link to="https://github.com/ignasiesbr">github.com/ignasiesbr</Link>
          </li>
          <li>
            <span id="about"></span>
            <strong>Contact: ignasiespinosa@gmail.com</strong>
          </li>
        </ul>
        <button id="about">Back to home</button>
      </section>
    </main>
  );
}

export default About;
