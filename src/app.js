import Controller from "./controller.js"
import Model from "./Model.js"
import View from "./View.js"

const _Model = new Model();
const _View = new View();
const Todo = new Controller ( _View, _Model);

console.log("loaded");

