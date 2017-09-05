var Chunk

var Vec3 = require('vec3').Vec3
var { readUInt4LE, writeUInt4LE } = require('uint4')
const nbt = require('prismarine-nbt')

function nbtChunkToPrismarineChunk (data) {
  let nbtd = nbt.simplify(data)
  const chunk = new Chunk()
  readSections(chunk, nbtd.Level.Sections)
  readBiomes(chunk, nbtd.Level.Biomes)
  return chunk
}

function prismarineChunkToNbt (chunk) {
  return {
    'name': '',
    'type': 'compound',
    'value': {
      'Level': {
        'type': 'compound',
        'value': {
          Biomes: writeBiomes(chunk),
          Sections: writeSections(chunk)
        }
      }
    }
  }
}

function readSections (chunk, sections) {
  sections.forEach(section => readSection(chunk, section))
}

function writeSections (chunk) {
  const sections = []
  for (let sectionY = 0; sectionY < 16; sectionY++) { sections.push(writeSection(chunk, sectionY)) }

  return {
    'type': 'list',
    'value': {
      'type': 'compound',
      'value': sections
    }
  }
}

function readSection (chunk, {Y, Blocks, Add, Data, BlockLight, SkyLight}) {
  readBlocks(chunk, Y, Blocks)
  readSkyLight(chunk, Y, SkyLight)
  readBlockLight(chunk, Y, BlockLight)
  readData(chunk, Y, Data)
}

function writeSection (chunk, sectionY) {
  return {
    Y: {
      type: 'byte',
      value: sectionY
    },
    Blocks: writeBlocks(chunk, sectionY),
    Data: writeData(chunk, sectionY),
    BlockLight: writeBlockLight(chunk, sectionY),
    SkyLight: writeSkyLight(chunk, sectionY)
  }
}

function indexToPos (index, sectionY) {
  const y = index >> 8
  const z = (index >> 4) & 0xf
  const x = index & 0xf
  return new Vec3(x, sectionY * 16 + y, z)
}

function readBlocks (chunk, sectionY, blocks) {
<<<<<<< HEAD
  blocks = Buffer.from(blocks)
=======
  blocks = Buffer.alloc(blocks)
>>>>>>> 79950d1a916d4e39e3aad794677d75da12b635b0
  for (let index = 0; index < blocks.length; index++) {
    const blockType = blocks.readUInt8(index)
    const pos = indexToPos(index, sectionY)
    chunk.setBlockType(pos, blockType)
  }
}

function toSignedArray (buffer) {
  let arr = []
  for (let index = 0; index < buffer.length; index++) { arr.push(buffer.readInt8(index)) }
  return arr
}

function writeBlocks (chunk, sectionY) {
  const buffer = Buffer.alloc(16 * 16 * 16)
  for (let y = 0; y < 16; y++) {
    for (let z = 0; z < 16; z++) {
      for (let x = 0; x < 16; x++) {
        buffer.writeUInt8(chunk.getBlockType(new Vec3(x, y + sectionY * 16, z)), x + 16 * (z + 16 * y))
      }
    }
  }
  return {
    'type': 'byteArray',
    'value': toSignedArray(buffer)
  }
}

function readData (chunk, sectionY, metadata) {
<<<<<<< HEAD
  metadata = Buffer.from(metadata)
=======
  metadata = Buffer.alloc(metadata)
>>>>>>> 79950d1a916d4e39e3aad794677d75da12b635b0
  for (let index = 0; index < metadata.length; index += 0.5) {
    const meta = readUInt4LE(metadata, index)
    const pos = indexToPos(index * 2, sectionY)
    chunk.setBlockData(pos, meta)
  }
}

function writeData (chunk, sectionY) {
  const buffer = Buffer.alloc(16 * 16 * 8)
  for (let y = 0; y < 16; y++) {
    for (let z = 0; z < 16; z++) {
      for (let x = 0; x < 16; x++) { writeUInt4LE(buffer, chunk.getBlockData(new Vec3(x, y + sectionY * 16, z)), (x + 16 * (z + 16 * y)) * 0.5) }
    }
  }
  return {
    'type': 'byteArray',
    'value': toSignedArray(buffer)
  }
}

function readBlockLight (chunk, sectionY, blockLights) {
<<<<<<< HEAD
  blockLights = Buffer.from(blockLights)
=======
  blockLights = Buffer.alloc(blockLights)
>>>>>>> 79950d1a916d4e39e3aad794677d75da12b635b0
  for (let index = 0; index < blockLights.length; index += 0.5) {
    const blockLight = readUInt4LE(blockLights, index)
    const pos = indexToPos(index * 2, sectionY)
    chunk.setBlockLight(pos, blockLight)
  }
}

function writeBlockLight (chunk, sectionY) {
  const buffer = Buffer.alloc(16 * 16 * 8)
  for (let y = 0; y < 16; y++) {
    for (let z = 0; z < 16; z++) {
      for (let x = 0; x < 16; x++) { writeUInt4LE(buffer, chunk.getBlockLight(new Vec3(x, y + sectionY * 16, z)), (x + 16 * (z + 16 * y)) * 0.5) }
    }
  }
  return {
    'type': 'byteArray',
    'value': toSignedArray(buffer)
  }
}

function readSkyLight (chunk, sectionY, skylights) {
<<<<<<< HEAD
  skylights = Buffer.from(skylights)
=======
  skylights = Buffer.alloc(skylights)
>>>>>>> 79950d1a916d4e39e3aad794677d75da12b635b0
  for (let index = 0; index < skylights.length; index += 0.5) {
    const skylight = readUInt4LE(skylights, index)
    const pos = indexToPos(index * 2, sectionY)
    chunk.setSkyLight(pos, skylight)
  }
}

function writeSkyLight (chunk, sectionY) {
  const buffer = Buffer.alloc(16 * 16 * 8)
  for (let y = 0; y < 16; y++) {
    for (let z = 0; z < 16; z++) {
      for (let x = 0; x < 16; x++) { writeUInt4LE(buffer, chunk.getSkyLight(new Vec3(x, y + sectionY * 16, z)), (x + 16 * (z + 16 * y)) * 0.5) }
    }
  }
  return {
    'type': 'byteArray',
    'value': toSignedArray(buffer)
  }
}

function readBiomes (chunk, biomes) {
<<<<<<< HEAD
  biomes = Buffer.from(biomes)
=======
  biomes = Buffer.alloc(biomes)
>>>>>>> 79950d1a916d4e39e3aad794677d75da12b635b0
  for (let index = 0; index < biomes.length; index++) {
    const biome = biomes.readUInt8(index)
    const z = index >> 4
    const x = index & 0xF
    chunk.setBiome(new Vec3(x, 0, z), biome)
  }
}

function writeBiomes (chunk) {
  const biomes = []
  for (let z = 0; z < 16; z++) {
    for (let x = 0; x < 16; x++) { biomes.push(chunk.getBiome(new Vec3(x, 0, z))) }
  }
  return {
    'value': biomes,
    'type': 'byteArray'
  }
}

function loader (mcVersion) {
  Chunk = require('prismarine-chunk')(mcVersion)
  return {nbtChunkToPrismarineChunk, prismarineChunkToNbt}
}

module.exports = loader
