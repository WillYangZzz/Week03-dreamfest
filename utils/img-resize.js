import sharp from 'sharp'
import fs from 'fs'

// resize animal images (originals 520x520)
const directory1 = './public/images/icons'

fs.readdirSync(directory1).forEach((file) => {
  sharp(`${directory1}/${file}`)
    .resize(150) // width, height
    .toFile(`${directory1}/${file}-150.png`)
})

// resize the header (original 2300x1150)
const directory2 = './public/images'

fs.readdirSync(directory2).forEach((file) => {
  sharp(`${directory2}/${file}`)
    .resize({ width: 1150, height: 241 }) // width, height
    .toFile(`${directory2}/${file}-241.jpg`)
})
