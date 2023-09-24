import express from "express";
import bodyParser from "body-parser";
import { Schematic } from "mindustry-schematic-parser";

const app = express()
const textParser = bodyParser.text({
  extends: false
})
async function parse(code) {
  const data = {}
  const schematic = Schematic.decode(code)
  data['name'] = schematic.name
  data['description'] = schematic.description
  data['height'] = schematic.height
  data['width'] = schematic.width
  data['requirements'] = schematic.requirements
  data['powerBalance'] = schematic.powerBalance
  data['image'] = (await schematic.render()).toBuffer().toString('base64')
  return data
}

app.post('/get', textParser, async (req, res) => {
  const body = req.body
  res.send(await parse(body))
})

app.listen(3001, (e) => {
  console.log("Port : 3001")
})
