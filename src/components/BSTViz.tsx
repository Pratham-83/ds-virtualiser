import { useState } from "react"
import { BST } from "../ds/BST"
import type { Step, BSTNode } from "../ds/BST"

const NODE_RADIUS = 20
const X_SPACING = 60
const Y_SPACING = 70
const PADDING = 40

type Positioned = {
  node: BSTNode
  x: number
  y: number
}

function layout(root: BSTNode | null): Positioned[] {
  const positions: Positioned[] = []
  let counter = 0

  const walk = (node: BSTNode | null, depth: number) => {
    if (!node) return
    walk(node.left, depth + 1)
    positions.push({ node, x: PADDING + counter * X_SPACING, y: PADDING + depth * Y_SPACING })
    counter++
    walk(node.right, depth + 1)
  }

  walk(root, 0)
  return positions
}

export default function BSTViz() {
  const [bst] = useState(() => new BST())
  const [steps, setSteps] = useState<Step[]>([])
  const [stepIdx, setStepIdx] = useState(-1)
  const [input, setInput] = useState("")

  const current = stepIdx >= 0 && steps[stepIdx] ? steps[stepIdx] : { root: bst.getRoot(), action: "", highlight: undefined, visitedIds: [] }

  const positions = layout(current.root)
  const posMap = new Map(positions.map(p => [p.node.id, p]))

  const width = Math.max(400, positions.length * X_SPACING + PADDING * 2)
  const maxDepth = positions.reduce((max, p) => Math.max(max, p.y), 0)
  const height = Math.max(200, maxDepth + NODE_RADIUS + PADDING * 2)

  const runSteps = (newSteps: Step[]) => {
    setSteps(newSteps)
    setStepIdx(newSteps.length - 1)  // jump to final state for insert/search
  }

  const handleInsert = () => {
    const v = parseInt(input)
    if (isNaN(v)) return
    runSteps(bst.insert(v))
    setInput("")
  }

  const handleSearch = () => {
    const v = parseInt(input)
    if (isNaN(v)) return
    runSteps(bst.search(v))
    setInput("")
  }

  const handleDFS = () => {
    const s = bst.dfs()
    setSteps(s)
    setStepIdx(0)         // start at first step for animation
  }

  const handleBFS = () => {
    const s = bst.bfs()
    setSteps(s)
    setStepIdx(0)
  }

  const handleReset = () => {
    // recreate BST (can't clear easily otherwise)
    window.location.reload()
  }

  const isVisited = (id: number) => current.visitedIds?.includes(id) ?? false

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
        <button onClick={handleInsert} className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-2">Insert</button>
        <button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700 rounded px-3 py-2">Search</button>
        <button onClick={handleDFS} className="bg-green-600 hover:bg-green-700 rounded px-3 py-2">DFS</button>
        <button onClick={handleBFS} className="bg-teal-600 hover:bg-teal-700 rounded px-3 py-2">BFS</button>
        <button onClick={handleReset} className="bg-gray-700 hover:bg-gray-600 rounded px-3 py-2">Reset</button>

        {(current.action === "dfs" || current.action === "bfs") && (
          <div className="flex gap-2 ml-4">
            <button onClick={() => setStepIdx(i => Math.max(0, i - 1))} className="bg-gray-700 px-3 py-2 rounded">◀</button>
            <button onClick={() => setStepIdx(i => Math.min(steps.length - 1, i + 1))} className="bg-gray-700 px-3 py-2 rounded">▶</button>
            <span className="text-sm text-gray-400 self-center">{stepIdx + 1} / {steps.length}</span>
          </div>
        )}
      </div>

      {/* SVG Tree */}
      <div className="overflow-auto bg-gray-950 rounded p-2">
        <svg width={width} height={height}>
          {/* edges */}
          {positions.map(({ node, x, y }) => (
            <g key={`edges-${node.id}`}>
              {node.left && posMap.get(node.left.id) && (
                <line
                  x1={x} y1={y}
                  x2={posMap.get(node.left.id)!.x} y2={posMap.get(node.left.id)!.y}
                  stroke="#4b5563" strokeWidth={2}
                />
              )}
              {node.right && posMap.get(node.right.id) && (
                <line
                  x1={x} y1={y}
                  x2={posMap.get(node.right.id)!.x} y2={posMap.get(node.right.id)!.y}
                  stroke="#4b5563" strokeWidth={2}
                />
              )}
            </g>
          ))}

          {/* nodes */}
          {positions.map(({ node, x, y }) => {
            const isHighlight = current.highlight === node.id
            const visited = isVisited(node.id)
            return (
              <g key={node.id}>
                <circle
                  cx={x} cy={y} r={NODE_RADIUS}
                  fill={isHighlight ? "#eab308" : visited ? "#16a34a" : "#1f2937"}
                  stroke={isHighlight ? "#fde047" : visited ? "#22c55e" : "#4b5563"}
                  strokeWidth={2}
                />
                <text
                  x={x} y={y + 5}
                  textAnchor="middle"
                  fill={isHighlight ? "#000" : "#fff"}
                  fontWeight="bold"
                  fontSize="14"
                >
                  {node.value}
                </text>
              </g>
            )
          })}

          {positions.length === 0 && (
            <text x={20} y={40} fill="#6b7280" fontStyle="italic">Tree is empty</text>
          )}
        </svg>
      </div>
    </div>
  )
}