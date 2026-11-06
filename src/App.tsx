import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import BSTViz from "./components/BSTViz"
import LinkedListViz from "./components/LinkedListViz"
import QueueViz from "./components/QueueViz"
import StackViz from "./components/StackViz"





function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <section className="mb-12">
         <h1 className="text-3xl font-bold mb-6">DS Visualizer</h1>
      <StackViz />

      </section>

      <section className="mb-12">
        <h2 className = "text-xl font-semibold mb-4 text-gray-300">Queue</h2>
        <QueueViz/>
      </section>
     

      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-300">Linked List</h2>
        <LinkedListViz/>
      </section>

      <section className="mb-12">
  <h2 className="text-xl font-semibold mb-4 text-gray-300">BST</h2>
  <BSTViz />
</section>

    </div>
  )
}

export default App
