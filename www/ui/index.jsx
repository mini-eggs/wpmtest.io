// @jsx wigly.h
import wigly from "wigly";

export function Stat({ children, top, left, bottom, right }) {
  return <div style={{ position: "fixed", zIndex: 20, top, left, bottom, right }}>{children}</div>;
}

function DefaultSpace() {
  return <div style={{ display: "inline-block", width: "5px" }} />;
}

function DefaultLetter({ letter, correct = true }) {
  return <div style={{ display: "inline-block", textDecoration: correct ? "initial" : "line-through" }}>{letter}</div>;
}

export function CompletedCharacter({ letter: { letter, correct } }) {
  return letter === " " ? <DefaultSpace /> : <DefaultLetter letter={letter} correct={correct} />;
}

export function TodoCharacter({ letter }) {
  return letter === " " ? <DefaultSpace /> : <DefaultLetter letter={letter} />;
}
