class Node {
  constructor(value) {
    this.id = `Tile-${value}`;
    this.value = value;
    this.width = 2 * value;
    this.next = null;
  }
}

class Stack {
  constructor(maxSize) {
    this.top = null
    this.maxSize = maxSize
    this.size = 0
  }

  push(value) {

    let newNode = new Node(value)

    if (!this.top && this.isEmpty) {
      this.top = newNode;
      this.size++;
      return this
    }

    if (this.size >= this.maxSize) return this
    
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
    return this;
  }

  peek() {
    return this.top;
  }

  isEmpty() {
    return this.size <= 0
  }

  pop() {
    let top = this.top
    this.top = this.top.next
    this.size--;
    return top;
  }

  deletStacks(maxSize) {
    if (!this.isEmpty) this.top.next = null
    this.top = null
    this.size = 0
    this.updateMaxSize(maxSize)
    return this
  }

  updateMaxSize(maxSize) {
    if (maxSize >= 0) {
      this.maxSize = maxSize
    }
    return this
  }

  traverse() {
    let list = [];
    
    if (!this.isEmpty) return list;

    let currentNode = this.top

    while (currentNode) {

      let tempNode = Object.assign({}, currentNode)
      tempNode.next = null
      list.push(tempNode)

      currentNode = currentNode.next
    }

    return list;
  }
}

export default Stack