// node t/deserialization.t.js

//           '00000000020100000000'
//           '00000000060000000035633d6226743d313734363030333336323530315f30266d3d76657273696f6e265f69643d31302e31322e312e3136353a3531373037'
// const data = '00000000010000000035633d6226743d313734363030313031373939385f30266d3d76657273696f6e265f69643d31302e31322e312e3136353a3531333033'

// const hexLength = data.slice(12, 20)
// console.log({ hexLength })
// const bufLength = Buffer.from(hexLength, 'hex')
// console.log(bufLength)
// const length = bufLength.readUInt32BE()
// console.log({ length })

// const hex = data.slice(20)
// const buf = Buffer.from(hex, 'hex')
// console.log(buf.length)
// const str = buf.toString('utf8')
// console.log({ str })

const hex = '633d6126743d313734363030393939303833345f30266d3d76657273696f6e6261636b2676657273696f6e3d5541432d5441432d3434574945472e302d'
const buf = Buffer.from(hex, 'hex')
console.log(buf.length)
const str = buf.toString('utf8')
console.log({ str })
