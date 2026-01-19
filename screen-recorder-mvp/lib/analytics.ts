import fs from 'fs'

export function trackView(id: string) {
  const data = JSON.parse(fs.readFileSync('data/analytics.json','utf8'))
  data[id] = data[id] || { views: 0, completed: 0 }
  data[id].views++
  fs.writeFileSync('data/analytics.json', JSON.stringify(data))
}

export function trackCompletion(id: string) {
  const data = JSON.parse(fs.readFileSync('data/analytics.json','utf8'))
  data[id].completed++
  fs.writeFileSync('data/analytics.json', JSON.stringify(data))
}
