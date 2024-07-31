import React, {useContext} from 'react';
import {CardsContext} from "./helpers.js";

const SideCards = (props) => {
  const cardContext = useContext(CardsContext)
  let value, setValue;
  if (props.val === 'minus') {
    value = cardContext.minusCard
    setValue = cardContext.setMinusCard
  } else {
    value = cardContext.plusCard
    setValue = cardContext.setPlusCard
  }

  // React.useEffect(() => {
  //   const money = JSON.parse(localStorage.getItem('money'))
  //   if (!money || !value)  {
  //     return
  //   }
  //
  //   const val = input.current.value
  //   input.current.value = money[value];
  //   const id = setTimeout(() => {
  //     input.current.value = val || 0
  //   }, 1000)

  //   return () => clearTimeout(id)
  // }, [value])

  return (
    <div className={'flex flex-col mt-8 h-full gap-3 px-1'}>
      {
        ["bg-red-500", "bg-green-500", "bg-pink-300", "bg-blue-400", "bg-yellow-400", "bg-blue-600", "bg-violet-500"].map((i, index) => {
          return (
            <div key={i} onClick={() => setValue(index)}
                 className={`w-10 h-10 ${i} rounded-lg flex justify-center items-center border-black ${value === index && "border-4"} ${!index ? "text-2xl font-bold":""}`}>
              {index ? index : props.val === "minus" ?"-": "+"}
            </div>
          )
        })
      }
    </div>
  );
};

export default SideCards;
