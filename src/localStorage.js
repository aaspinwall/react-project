function save(data) {
  let stringified = JSON.stringify(data);
  window.localStorage.setItem("savedData", stringified);
}

function load() {
  let stringified = window.localStorage.getItem("savedData");
  return JSON.parse(stringified);
}

export { save, load };
