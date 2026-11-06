import { useState } from "react"
import { LinkedList } from "../ds/LinkedList"
import type { Step } from "../ds/LinkedList"


export default function LinkedListViz() {
  const [list] = useState(() => new LinkedList())
  const [steps, setSteps] = useState<Step[]>([])
  const [input, setInput] = useState("")

  const current = steps.length > 0
    ? steps[steps.length - 1]
    : { state: [], action: "", highlight: undefined, highlight2: undefined }

  const withValue = (fn: (v: number) => void) => {
    const val = parseInt(input)
    if (isNaN(val)) return
    fn(val)
    setInput("")
  }

  const handleInsertHead = () => withValue(v => setSteps([...steps, list.insertHead(v)]))
  const handleInsertTail = () => withValue(v => setSteps([...steps, list.insertTail(v)]))
  const handleDelete = () => withValue(v => {
    const s = list.deleteValue(v)
    if (s) setSteps([...steps, s])
  })
  const handleSearch = () => withValue(v => {
    const newSteps = list.search(v)
    if (newSteps.length > 0) setSteps([...steps, ...newSteps])
  })
  const handleReset = () => {
    // rebuild
    while (list.getState().length > 0) {
      list.deleteValue(list.getState()[0].value)
    }
    setSteps([])
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Value"
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white w-24"
        />
        <button onClick={handleInsertHead} className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-2">
          Insert Head
        </button>
        <button onClick={handleInsertTail} className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-2">
          Insert Tail
        </button>
        <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 rounded px-3 py-2">
          Delete
        </button>
        <button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700 rounded px-3 py-2">
          Search
        </button>
        <button onClick={handleReset} className="bg-gray-700 hover:bg-gray-600 rounded px-3 py-2">
          Reset
        </button>
        <div className="text-sm text-gray-400 ml-4">
          Last: <span className="text-white">{current.action || "none"}</span>
        </div>
      </div>

      {/* Visualization */}
      <div className="flex items-center gap-1 min-h-[100px] flex-wrap">
        {current.state.length === 0 && (
          <div className="text-gray-500 italic">List is empty</div>
        )}
        {current.state.map((node, idx) => (
          <div key={node.id} className="flex items-center">
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full border-2 font-bold transition-all ${
                current.highlight === idx
                  ? "bg-yellow-500 border-yellow-300 text-black"
                  : "bg-gray-800 border-gray-600 text-white"
              }`}
            >
              {node.value}
            </div>
            {idx < current.state.length - 1 && (
              <div className="text-gray-500 text-2xl px-1">→</div>
            )}
          </div>
        ))}
        {current.state.length > 0 && (
          <div className="text-gray-500 text-2xl px-1">→ <span className="text-xs">NULL</span></div>
        )}
      </div>
    </div>
  )
}