export type Step = {
  action: string
  state: number[]
  highlight?: number
}

export class Queue {
  private arr: number[] = []

  enqueue(value: number): Step {
    this.arr.push(value)
    return { action: "enqueue", state: [...this.arr], highlight: this.arr.length - 1 }
  }

  dequeue(): Step | null {
    if (this.arr.length === 0) return null
    this.arr.shift()
    return { action: "dequeue", state: [...this.arr] }
  }

  getState(): number[] {
    return [...this.arr]
  }
}