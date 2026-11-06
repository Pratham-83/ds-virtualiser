import StackViz from "./components/StackViz"
import QueueViz from "./components/QueueViz"
import LinkedListViz from "./components/LinkedListViz"
import BSTViz from "./components/BSTViz"

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">DS Visualizer</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-300">Stack</h2>
        <StackViz />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-300">Queue</h2>
        <QueueViz />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-300">Linked List</h2>
        <LinkedListViz />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-300">BST</h2>
        <BSTViz />
      </section>
    </div>
  )
}

export default App