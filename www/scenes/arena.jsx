// @jsx wigly.h

import wigly, { useState, useEffect } from "wigly";
import { Stat, CompletedCharacter, TodoCharacter } from "../ui";
import { calcCorrectWords } from "../util";
import { MAX_LENGTH, TIME } from "../constants";

export default function Arena({ letters }) {
  let [completed, setCompleted] = useState([]);
  let [todo, setTodo] = useState(letters);
  let [hasStarted, setStarted] = useState(false);
  let [time, setTime] = useState(TIME);

  let wordCount = completed.reduce((total, curr) => (curr.letter === " " ? total + 1 : total), 0);
  let countDown = TIME - time;
  let wpm = Math.round((wordCount / (countDown === 0 ? TIME : countDown)) * TIME);
  let correctWords = calcCorrectWords(completed);
  let correctPercent = wordCount === 0 ? 0 : Math.round((correctWords / wordCount) * 100);

  let handleInput = e => {
    if (todo.length < 1 || time < 1) return;
    if (!hasStarted) setStarted(true);

    let letter = e.target.value.slice(0, 1).toLowerCase();
    let should = letters[letters.length - todo.length];

    e.target.value = "";

    if (should !== " " && letter === " ") {
      return;
    }

    if (should === " ") {
      letter = " ";
    }

    setCompleted(completed.concat({ correct: letter === todo[0], letter }));
    setTodo(todo.slice(1, todo.length));
  };

  let handleKeyDown = e => {
    if (todo.length < 1 || time < 1) return;

    let key = e.keyCode || e.charCode;
    let should = letters[letters.length - todo.length - 1];

    if ((key === 8 || key === 46) && should && should !== " ") {
      setCompleted(completed.slice(0, completed.length - 1));
      setTodo([should, ...todo]);
    }
  };

  useEffect(el => {
    el.querySelector("input").focus();
  });

  useEffect(() => {
    if (time < 1) alert(`You've scored ${wpm} words per minute.`);
  }, time);

  useEffect(
    () => {
      if (hasStarted) {
        let curr = time;

        let instance = setInterval(() => {
          setTime(--curr);
          if (curr < 1) clearInterval(instance);
        }, 1000);

        return () => clearInterval(instance);
      }
    },
    [0, hasStarted]
  );

  return (
    <div class="arena">
      <input autofocus oninput={handleInput} onkeydown={handleKeyDown} />

      <div class="completed-container">
        {completed.slice(Math.max(completed.length - MAX_LENGTH, 0)).map(letter => (
          <CompletedCharacter letter={letter} />
        ))}
      </div>

      <div class="todo-container">
        {todo.slice(0, MAX_LENGTH).map(letter => (
          <TodoCharacter letter={letter} />
        ))}
      </div>

      <div>
        <Stat top={"25px"} left={"25px"}>
          <div>sec</div>
          <div>{time}</div>
        </Stat>

        <Stat top={"25px"} right={"25px"}>
          <div style={{ color: "white", textAlign: "right" }}>
            <div>correct</div>
            <div>{correctPercent}%</div>
          </div>
        </Stat>

        <Stat bottom={"25px"} right={"25px"}>
          <div style={{ color: "white", textAlign: "right" }}>
            <div>{wordCount}</div>
            <div>words</div>
          </div>
        </Stat>

        <Stat bottom={"25px"} left={"25px"}>
          <div>
            <div>{wpm}</div>
            <div>wpm</div>
          </div>
        </Stat>
      </div>
    </div>
  );
}
