let el = document.getElementById("text");

let text = el.innerHTML
  .trim()
  .split("")
  .map(char => char.toLowerCase());

el.parentElement.removeChild(el);

export default text;
