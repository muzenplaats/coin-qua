
class Gua {
  constructor() {
    this.LowerQua = BaGua.getQua()
    this.UpperQua = BaGua.getQua()
  }

  toString() {
    // Todo
  }

  toJSON() {
    let { lowerQua, upperQua } = this
    return { lowerQua, upperQua }
  }
}