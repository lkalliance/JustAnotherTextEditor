import { Workbox } from "workbox-window";
import Editor from "./editor";
import { registerSW } from "./register-sw.js";
const { Install } = await import("./install.js");
import "../css/style.css";

const main = document.querySelector("#main");
main.innerHTML = "";

new Install(document.querySelector("#buttonInstall"));

const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === "undefined") {
  loadSpinner();
}

registerSW();
