// node t/addUser.t.js
// admin 123123

import crypto from 'crypto'
const PASSWORD_SALT = 'salt for one punch, which is salty'

const asyncPbkdf2 = password => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, PASSWORD_SALT, 512, 128, 'sha1', (err, derivedKey) => {
      if (err) {
        reject(err)
      } else {
        resolve(derivedKey.toString('hex'))
      }
    })
  })
}

// 'fdc0cfa51519730a130046e4264b1636dcae7c3c3ed02c11d3571b2565ad7eeddbccfa543dc485051a0a5af24b4ab071ea2d837086233cc7216913472f627e0938254bae79c76a3f05a73289f717f41cf30b5009da73fc0326cc61f8a8525708665c8765a5220519a264ec985f956ed9b13d2945518a9cd6154371e80055efb3'
asyncPbkdf2('123123').then(res => {
  console.log({ res })
})