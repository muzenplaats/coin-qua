const guas = zhouYi.guas
const baGuas = zhouYi.baGuas

// 六十四卦

const getGuaByName = name => guas.find(item => item.name === name)
const getGuaBySerial = serial => guas.find(item => item.serial === serial)
const getGuaByCode = code => guas.find(item => item.code === code)
const getGuaByCodeNumber = codeNumber => guas.find(item => item.codeNumber === codeNumber)

const gua = selector => {
  switch (typeof selector) {
    case 'string':
      if (isNaN(selector)) return getGuaByName(selector)
      return getGuaByCode(selector)
    case 'number':
      return getGuaBySerial(selector)
    case 'object':
      return selector
    default:
      throw new Error('Invalid selector')
  }
}

// 八卦

const getBaGuaByName = name => baGuas.find(item => item.name === name)
const getBaGuaByCode = code => baGuas.find(item => item.code === code)
const getBaGuaByCodeNumber = codeNumber => baGuas.find(item => item.codeNumber === codeNumber)

const baGua = selector => {
  switch (typeof selector) {
    case 'string':
      if (isNaN(selector)) return getBaGuaByName(selector)
      return getBaGuaByCode(selector)
    case 'number':
      return getBaGuaByCodeNumber(selector)
    case 'object':
      return selector
    default:
      throw new Error('Invalid selector')
  }
}


// 上卦 外卦
const upperGua = selector => {
  const g = gua(selector)
  return baGua(g.code.substr(3))
}

// 下卦 內卦
const lowerGua = selector => {
  const g = gua(selector)
  return baGua(g.code.substr(0, 3))
}

// 交卦
const crossGua = selector => {
  const g = gua(selector)
  return baGua(g.code.substr(1, 3))
}

// 互卦
const mutualGua = selector => {
  const g = gua(selector)
  return baGua(g.code.substr(2, 3))
}


// 錯卦
const cuoGua = selector => {
  const g = gua(selector)
  return getGuaByCodeNumber(63 - g.codeNumber)
}

const inverseCode = code => {
  let result = ''
  for (let i = 5; i >= 0; i--) result += code[i]
  return result
}

// 綜卦
const zongGua = selector => {
  const g = gua(selector)
  return gua(inverseCode(g.code))
}

const changeCode = (code, positions) => {
  let result = code
  positions.forEach(position => {
    const pos = position - 1
    result = result.slice(0, pos) + (code[pos] === '0' ? '1' : '0') + result.slice(position)
  })
  return result
}

// 之卦
const zhiGua = (selector, ...positions) => {
  const g = gua(selector)
  return gua(changeCode(g.code, positions))
}

// 交互卦
const alterGua = selector => {
  const c = crossGua(selector)
  const m = mutualGua(selector)
  return gua(c.code + m.code)
}


class Gua {
  constructor(gua) {
    Object.assign(this, gua)
  }

  get 上() { return upperGua(this) }
  get 下() { return lowerGua(this) }

  get 錯() { return cuoGua(this) }
  get 綜() { return zongGua(this) }
  get 交互() { return alterGua(this) }
  之(...positions) { return zhiGua(this, ...positions) }
}

// const a = new Gua(gua(3))
// console.log(a, a.錯, a.綜, a.交互, a.上, a.下, a.之(1, 2))



// console.log(zhiGua('乾', 1, 5))//, cuoGua('姤'), zongGua('姤'))
// console.log(upperGua('姤'), lowerGua('姤'))
// console.log(upperGua('噬嗑'), lowerGua('噬嗑'), crossGua('噬嗑'), mutualGua('噬嗑'), alternateGua('噬嗑') )