const fs = require('fs')

const guaFilenames = fs.readdirSync('.').filter(
  name => name.includes('.txt') && !name.includes('傳') && !name.includes('歌')
)

// 卦序
const getSerial = source => {
  const match = source.match(/\d+\s*/)
  return {
    result: +match[0],
    source: source.substr(match.index + match[0].length)
  }
}

// 卦象編碼
const getCode = source => {
  const match = source.match(/[01]+\s*/)
  return {
    result: match[0].trim(),
    source: source.substr(match.index + match[0].length)
  }
}

// 卦辭
const getSentence = source => {
  const match = source.match(/[^t]+/)
  return {
    result: match[0].trim().replace(/[ \t]+/g, ''),
    source: source.substr(match.index + match[0].length + 1)
  }
}

// 彖
const getTuan = source => {
  const match = source.match(/[^x]+/)
  return {
    result: match[0].trim().replace(/[ \t]+/g, ''),
    source: source.substr(match.index + match[0].length + 1)
  }
}

// 象
const getXiang = source => {
  const match = source.match(/[^1]+/)
  return {
    result: match[0].trim().replace(/[ \t]+/g, ''),
    source: source.substr(match.index + match[0].length + 1)
  }
}

// 爻辭
const getYaoSentence = source => {
  const match = source.match(/[^x]+/)
  return {
    result: match[0].trim().replace(/[ \t]+/g, ''),
    source: source.substr(match.index + match[0].length + 1)
  }
}

// 爻象
const getYaoXiang = source => {
  const match = source.match(/[^\d]+/)
  return {
    result: match[0].trim().replace(/[ \t]+/g, ''),
    source: source.substr(match.index + match[0].length + 1)
  }
}

// 爻
const getYao = source => {
  const sentence = getYaoSentence(source)
  const xiang = getYaoXiang(sentence.source)
  return {
    result: {
      sentence: sentence.result,
      xiang: xiang.result
    },
    source: xiang.source
  }
}

// 六爻
const getYaos = source => {
  const first = getYao(source)
  const second = getYao(first.source)
  const third = getYao(second.source)
  const fourth = getYao(third.source)
  const fifth = getYao(fourth.source)
  const sixth = getYao(fifth.source)
  const yaos = {
    result: {
      1: first.result,
      2: second.result,
      3: third.result,
      4: fourth.result,
      5: fifth.result,
      6: sixth.result
    }
  }
  if (sixth.source) {
    const seventh = getYao(sixth.source)
    yaos.result[7] = seventh.result
    yaos.source = seventh.source
  }
  return yaos
}

// 六十四卦經傳編碼
const guas = guaFilenames.map(guaFilename => {
  const name = guaFilename.replace('.txt', '')
  const source = fs.readFileSync(guaFilename, 'utf8')

  const serial = getSerial(source)
  const code = getCode(serial.source)
  const sentence = getSentence(code.source)
  const tuan = getTuan(sentence.source)
  const xiang = getXiang(tuan.source)
  const yaos = getYaos(xiang.source)

  const gua = {
    name,
    serial: serial.result,
    code: code.result,
    codeNumber: parseInt(code.result, 2),
    sentence: sentence.result,
    tuan: tuan.result,
    xiang: xiang.result,
    yaos: yaos.result
  }
  
  if (yaos.source) {
    gua.wenyan = yaos.source.trim()
  }
  
  return gua
})

// 依序卦排序
guas.sort((a, b) => a.serial - b.serial)


const getSerialSong = () => fs.readFileSync('卦名次序歌.txt', 'utf8')
const getSerialGuas = () => fs.readFileSync('序卦傳.txt', 'utf8')
const getXiCiFirstHalf = () => fs.readFileSync('繫辭上傳.txt', 'utf8')
const getXiCiSecondHalf = () => fs.readFileSync('繫辭下傳.txt', 'utf8')
const getSpeakGuas = () => fs.readFileSync('說卦傳.txt', 'utf8')
const getZaGuas = () => fs.readFileSync('雜卦傳.txt', 'utf8')

const zhouYi = {
  guas,
  serialSong: getSerialSong(),
  serialGuas: getSerialGuas(),
  xiCiFirstHalf: getXiCiFirstHalf(),
  xiCiSecondHalf: getXiCiSecondHalf(),
  speakGuas: getSpeakGuas(),
  zaGuas: getZaGuas(),
  baGuas: require('./ba-guas.json')
}



for (let i = 0; i < 64; i++) {
  let gua = guas[i]
  console.log(gua.serial, gua.name, gua.code, gua.codeNumber, gua.sentence)
}

fs.writeFileSync('zhou-yi.json', JSON.stringify(zhouYi, null, 2))
