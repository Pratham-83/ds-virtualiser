import { useState } from "react"
import { Queue }  from "../ds/Queue"
import type { Step } from "../ds/Queue"

export default function QueueViz() {
  const [queue] = useState(() => new Queue())
  const [steps, setSteps] = useState<Step[]>([])
  const [input, setInput] = useState("")

  const current = steps.length > 0 ? steps[steps.length - 1] : { state: [] as number[], highlight: undefined, action: "" }

  const handleEnqueue = () => {
    const val = parseInt(input)
    if (isNaN(val)) return
    setSteps([...steps, queue.enqueue(val)])
    setInput("")
  }

  const handleDequeue = () => {
    const s = queue.dequeue()
    if (s) setSteps([...steps, s])
  }

  const handleReset = () => {
    while (queue.dequeue()) {}
    setSteps([])
  }

  return (
    <div className="flex gap-6">
      {/* Controls */}
      <div className="flex flex-col gap-2 w-48">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Value"
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
        />
        <button onClick={handleEnqueue} className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-2">
          Enque
        </button>
        <button onClick={handleDequeue} className="bg-red-600 hover:bg-red-700 rounded px-3 py-2">
          Dequeue
        </button>
        <button onClick={handleReset} className="bg-gray-700 hover:bg-gray-600 rounded px-3 py-2">
          Reset
        </button>
        <div className="mt-4 text-sm text-gray-400">
          Last action: <span className="text-white">{current.action || "none"}</span>
        </div>
      </div>

      {/* Visualization */}
      <div className="flex gap-2 min-h-[300px] justify-start">
        {current.state.map((val, idx) => (
          <div
            key={idx}
            className={`w-24 h-12 flex items-center justify-center rounded border font-bold transition-all ${
              current.highlight === idx
                ? "bg-yellow-500 border-yellow-300 text-black"
                : "bg-gray-800 border-gray-600 text-white"
            }`}
          >
            {val}
          </div>
        ))}
        {current.state.length === 0 && (
          <div className="text-gray-500 italic">Queue is empty</div>
        )}
      </div>
    </div>
  )
}

