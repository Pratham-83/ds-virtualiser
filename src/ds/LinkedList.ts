export type LLNode = {
  id: number       // unique id for React keys
  value: number
}

export type Step = {
  action: string
  state: LLNode[]
  highlight?: number   // index of node currently focused
  highlight2?: number  // index of second node (e.g. for search path)
}

let nextId = 1

export class LinkedList {
  private nodes: LLNode[] = []

  insertHead(value: number): Step {
    this.nodes.unshift({ id: nextId++, value })
    return { action: "insertHead", state: [...this.nodes], highlight: 0 }
  }

  insertTail(value: number): Step {
    this.nodes.push({ id: nextId++, value })
    return { action: "insertTail", state: [...this.nodes], highlight: this.nodes.length - 1 }
  }

  deleteValue(value: number): Step | null {
    const idx = this.nodes.findIndex(n => n.value === value)
    if (idx === -1) return null
    this.nodes.splice(idx, 1)
    return { action: "delete", state: [...this.nodes] }
  }

  search(value: number): Step[] {
    const steps: Step[] = []
    for (let i = 0; i < this.nodes.length; i++) {
      steps.push({
        action: "search",
        state: [...this.nodes],
        highlight: i,
      })
      if (this.nodes[i].value === value) break
    }
    return steps
  }

  getState(): LLNode[] {
    return [...this.nodes]
  }
}