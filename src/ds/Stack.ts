export type Step = {
  action: string
  state: number[]
  highlight?: number
  popped?: number
}

export  class Stack {
  private arr: number[] = []

  push(value: number): Step {
    this.arr.push(value)
    return { action: "push", state: [...this.arr], highlight: this.arr.length - 1 }
  }

  pop(): Step | null {
    if (this.arr.length === 0) return null
    const popped = this.arr.pop()!
    return { action: "pop", state: [...this.arr], popped }
  }

  getState(): number[] {
    return [...this.arr]
  }
}