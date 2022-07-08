import Stack from "./Stack";
class Tower extends Stack{

  constructor(maxSize) {
    super(maxSize) 
    this.maxSize = maxSize
  }

  add(disk) {

    if (this.isEmpty() || this.top.value > disk) {
      
      return this.push(disk);
    }
  }

  moveTopTo(destinationTower) {

    if (!this.top) return false

    if (!destinationTower.top || this.top.value < destinationTower.top.value) {

      let disk = this.top.value;
      this.pop(disk)
      destinationTower.add(disk)
      return this
    }

  }

  moveDisks(disks, o, a, d, m) {

    if (disks === 1) o.moveTopTo(d)
    else {
      this.moveDisks(disks - 1, o, d, a)
      o.moveTopTo(d)
      this.moveDisks(disks - 1, a, o, d)
    }
    return {o, a, d}
  }
}

export default Tower;
