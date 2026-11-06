export type BSTNode = {
  id: number
  value: number
  left: BSTNode | null
  right: BSTNode | null
}

export type Step = {
  action: string
  root: BSTNode | null
  highlight?: number      // id of node being highlighted
  visitedIds?: number[]   // for traversal
}

let nextId = 1

function cloneTree(node: BSTNode | null): BSTNode | null {
  if (!node) return null
  return {
    id: node.id,
    value: node.value,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
  }
}

export class BST {
  private root: BSTNode | null = null

  insert(value: number): Step[] {
    const steps: Step[] = []
    const newNode: BSTNode = { id: nextId++, value, left: null, right: null }

    if (!this.root) {
      this.root = newNode
      steps.push({ action: "insert", root: cloneTree(this.root), highlight: newNode.id })
      return steps
    }

    let cur = this.root
    while (true) {
      steps.push({ action: "compare", root: cloneTree(this.root), highlight: cur.id })
      if (value < cur.value) {
        if (!cur.left) {
          cur.left = newNode
          steps.push({ action: "insert", root: cloneTree(this.root), highlight: newNode.id })
          return steps
        }
        cur = cur.left
      } else if (value > cur.value) {
        if (!cur.right) {
          cur.right = newNode
          steps.push({ action: "insert", root: cloneTree(this.root), highlight: newNode.id })
          return steps
        }
        cur = cur.right
      } else {
        steps.push({ action: "duplicate", root: cloneTree(this.root), highlight: cur.id })
        return steps
      }
    }
  }

  search(value: number): Step[] {
    const steps: Step[] = []
    let cur = this.root
    while (cur) {
      steps.push({ action: "search", root: cloneTree(this.root), highlight: cur.id })
      if (value === cur.value) return steps
      cur = value < cur.value ? cur.left : cur.right
    }
    steps.push({ action: "notFound", root: cloneTree(this.root) })
    return steps
  }

  dfs(): Step[] {
    const steps: Step[] = []
    const visited: number[] = []
    const walk = (node: BSTNode | null) => {
      if (!node) return
      visited.push(node.id)
      steps.push({ action: "dfs", root: cloneTree(this.root), highlight: node.id, visitedIds: [...visited] })
      walk(node.left)
      walk(node.right)
    }
    walk(this.root)
    return steps
  }

  bfs(): Step[] {
    const steps: Step[] = []
    const visited: number[] = []
    if (!this.root) return steps
    const queue: BSTNode[] = [this.root]
    while (queue.length > 0) {
      const node = queue.shift()!
      visited.push(node.id)
      steps.push({ action: "bfs", root: cloneTree(this.root), highlight: node.id, visitedIds: [...visited] })
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    return steps
  }

  getRoot(): BSTNode | null {
    return cloneTree(this.root)
  }
}