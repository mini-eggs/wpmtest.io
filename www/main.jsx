// @jsx wigly.h

import wigly from "wigly";
import text from "./static/text";
import Arena from "./scenes/arena";
import "./styles/main.scss";

wigly.render(<Arena letters={text} />, document.body);
