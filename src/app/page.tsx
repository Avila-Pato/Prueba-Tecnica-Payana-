

"use client"
import { useState } from "react";
import { preguntas as questions } from "../data.json"


interface Questions {
  id: number;
  texto: string
}

interface Answer extends Questions {
  valoracion: 1 | 2 | 3 | 4 | 5 
} 

function Rating ({
  value,
  onChange,
  isReadOnly,
}:
| {
  value: Answer["valoracion"];
  onChange: (value: Answer["valoracion"]) => void
  isReadOnly?: boolean
} 
| {
  value: Answer["valoracion"];
  onChange?: never
  isReadOnly?: never
}) {
  const [hoverValue, setHoverValue] = useState<Answer["valoracion"] | null>(null);
  
  return (
    <div className="text-2xl text-yellow-500" onMouseLeave={() => setHoverValue(null)}>
      {"★"
      .repeat(hoverValue || value)
      .padEnd(5, "☆")
      .split("")
      .map((elem, index) => (
        <span key={index}
        className={!isReadOnly ? "cursor-pointer" : "" }
        onClick={() => !isReadOnly && typeof onChange === 'function' && onChange((index + 1) as Answer["valoracion"])}
        onMouseOver={() => !isReadOnly && setHoverValue((index + 1) as Answer["valoracion"])}
        >
          {elem}
        </span>
      ))}
  </div>
)
}

export default function Home() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const currentQuestion: Questions = questions[answers.length]

  function handleRate(rating: Answer["valoracion"]) {
    setAnswers(() => 
    answers.concat({
      ...currentQuestion,
      valoracion: rating,
    })
   )
  }
  if(!currentQuestion) {
    return(
      <ul className="rounded-md border">
        {answers.map((answers) => (
          <li key={answers.id} className="flex items-center justify-between">
            {answers.texto} <Rating isReadOnly value={answers.valoracion} onChange={() => {}}></Rating>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="text-center">
      <h1 className="text-xl">{currentQuestion.texto}</h1>
      <Rating value={1} onChange={handleRate} />
       </div>
  )
}
