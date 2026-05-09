
class BaQua {
  constructor(bq) {
    if (typeof bq === 'string') {

    } else if (tyoeof bq === 'number') {
      this.number = bq
    } else {
      throw new TypeError()
    }
  }

  get code() {
    // Todo
  }

  get name() {
    // Todo
  }

  toString() {
    // Todo
  }

  toJSON() {
    let {} = this
    return {}
  }

  static getYao() {
    return Math.radom() >= 0.5 ? 1 : 0
  }

  static getQua() {

  }
}
