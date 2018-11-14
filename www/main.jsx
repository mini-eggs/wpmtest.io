// @jsx wigly.h

import wigly from "wigly";
import text from "./static/text";
import Arena from "./scenes/arena";
import "./styles/main.scss";

function App() {
  return <Arena letters={text} />;
}

wigly.render(<App />, document.body);
