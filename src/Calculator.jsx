import React, {useEffect} from 'react';
import {CardsContext} from './helpers';


const Buttons = (props) => {
  const cardsContext = React.useContext(CardsContext);
  const {minusCard, plusCard, setMinusCard, setPlusCard, history, setHistory} = cardsContext;

  useEffect(() => {
    console.log(props)
  }, []);
  const addValue = (value) => () => {
    let money = JSON.parse(localStorage.getItem("money"));
    if (value === "C") {
      setMinusCard("");
      setPlusCard("");
      props.input.current.value = 0;
      return;
    }
    if (value === "G") {
      if (plusCard === 0) return;
      money[plusCard] += 2000;
      setMinusCard(0);
      setPlusCard(0);
      setHistory([...history, `Player ${plusCard} Recieved Go Money (2M)`]);
      return localStorage.setItem("money", JSON.stringify(money));
    }

    if (value === "K") {
      const val = props.input.current.value;
      if (val !== 0) {
        if (val.includes(".")) {
          alert("You can't transfer decimal values in K");
          return;
        }
        if (minusCard !== 0) money[minusCard] -= val;
        if (plusCard !== 0) money[plusCard] = parseInt(money[plusCard]) +  parseInt(val);
`        setMinusCard(0);`
        setPlusCard(0);

        if (minusCard && plusCard) setHistory([...history, `Player ${minusCard} transfered ${val}K to Player ${plusCard}`])
        if (minusCard && !plusCard) setHistory([...history, `Player ${minusCard} paid ${val}K`])
        if (!minusCard && plusCard) setHistory([...history, `Player ${plusCard} recieved ${val}K`])


        return localStorage.setItem("money", JSON.stringify(money));
      }
    }
    if (value === "M") {
      const val = props.input.current.value;
      if (parseInt(val) > 15) {
        alert("You can't transfer more than 15M");
        return;
      }

      if (val !== 0) {
        if (minusCard !== 0) money[minusCard] -= val * 1000;
        if (plusCard !== 0) money[plusCard] = parseInt(money[plusCard]) +  (parseFloat(val) * 1000);
        setMinusCard(0);
        setPlusCard(0);
        if (minusCard && plusCard) setHistory([...history, `Player ${minusCard} transfered ${val}M to Player ${plusCard}`])
        if (minusCard && !plusCard) setHistory([...history, `Player ${minusCard} paid ${val}M`])
        if (!minusCard && plusCard) setHistory([...history, `Player ${plusCard} recieved ${val}M`])
        return localStorage.setItem("money", JSON.stringify(money));
      }
    }
    if (value === ".") {
      if (props.input.current.value.includes(".")) return;
      props.input.current.value += ".";
    }

    if (typeof value === "number") {
      const val = props.input.current.value;
      props.input.current.value = val === "0" ? value : val + value;


    }
  }

  return (
    <div className={"grid grid-cols-3 gap-x-3 gap-y-5 mt-4"}>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue("M")}>M</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue("G")}>GO</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue("K")}>K</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue(7)}>7</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue(8)}>8</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue(9)}>9</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue(4)}>4</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue(5)}>5</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue(6)}>6</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue(1)}>1</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue(2)}>2</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue(3)}>3</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue("C")}>C</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue(0)}>0</button>
      <button className={"font-semibold bg-gray-300 h-12 rounded-md"} onClick={addValue(".")}>.</button>
    </div>
  );
}

const Calculator = () => {
  const cardsContext = React.useContext(CardsContext);
  const {input} = cardsContext;
  return (
    <div className={"flex flex-col h-full mt-1 w-full px-4"}>
      <div className="flex justify-between">
        <span className={"text-2xl font-bold"}>{cardsContext.minusCard ? (JSON.parse(localStorage.getItem("money")))[cardsContext.minusCard] : "X"}</span>
        <span className={"text-2xl font-bold"}>{cardsContext.plusCard ? (JSON.parse(localStorage.getItem("money")))[cardsContext.plusCard] : "X"}</span>

      </div>
      <input className={"border border-gray-300 h-12 w-full rounded-md text-end px-5 font-bold text-xl"} ref={input}
             readOnly={true}
             value={0}/>
      <Buttons input={input}/>

      {
        cardsContext.history.length > 0 &&
        <div className={"my-4"}>
          <h1 className={"text-xl font-semibold"}>History</h1>
          <div className={"mt-2"}>
            {
              cardsContext.history.toReversed().map((i, index) => {
                return (
                  <div key={index} className={"flex"}>
                    <span>{i}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      }

      <div className="h-10"></div>


    </div>
  );
};

export default Calculator;
