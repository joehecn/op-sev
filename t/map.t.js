const connMap = new Map()

// connMap.set('k1', { name: 'v1' })
// connMap.set('k2', { name: 'v2' })

console.log([...connMap].map(([, value]) => value))