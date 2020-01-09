import React,{useEffect} from "react";

function About() {

  useEffect(() => {
    document.title = "About | Minimal Tracker";
  }, [])

  return (
    <main className="main-about">
      <section className="card">
        <ul className="card-items">
          <li className="card-items__item">
            <strong>
              This page is my bachelor's final year project for Electronical
              Engineering
            </strong>
            <span></span>
          </li>
          <li className="card-items__item">
            <strong>
              Technologies used are Node.js for the backend and React and Redux
              for the client-side
            </strong>
            <span></span>
          </li>
          <li className="card-items__item">
            <strong>
              You can find the whole code for the project in my &nbsp;

            <div style={{textDecoration:"underline", cursor:"pointer", color:"darkblue"}}onClick={e => {
              window.location="https://github.com/ignasiesbr"
              }}>github</div>
            </strong>
            <span></span>
          </li>
          <li className="card-items__item">
            <strong>Contact: ignasiespinosa@gmail.com</strong>
            <span></span>
          </li>
        </ul>
        <button className="btn">Back to home</button>
      </section>
    </main>
  );
}

export default About;
