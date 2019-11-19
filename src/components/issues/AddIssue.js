import React from "react";

function AddIssue() {
  return (
    <div id="wrapper">
      <section class="add-issue">
        <form>
          <label>Project</label>
          <select>
            <option value="Projecte de prova 1">Projecte de prova 1</option>
            <option value="Projecte de prova 2">Projecte de prova 2</option>
            <option value="TFG">TFG</option>
          </select>
          <label>Issue Type</label>
          <select>
            <option value="Bug">Bug</option>
            <option value="Task">Task</option>
            <option value="New Feature">New Feature</option>
          </select>
          <hr />
          <label>Summary *</label>
          <input type="text" placeholder="Title of the issue" />
          <span id="separator"></span>
          <label>Description</label>
          <textarea> </textarea>
          <input type="submit" />
        </form>
      </section>
    </div>
  );
}

export default AddIssue;
