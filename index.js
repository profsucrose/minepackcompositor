const Jimp = require('Jimp')
const fs = require('fs-extra')
const path = require('path')
const argv = require('yargs').argv

let SEARCH_QUEUE = []
const checkPNG = str => str.substring(str.length - 3, str.length) == 'png'

const IMAGE = argv._.shift()
console.log(argv)
const FADE_AMOUNT = argv.fade >= 0 ? argv.fade : 0.3 // Default FADE_AMOUNT
const AVOID_FOLDERS = [
	'.DS_Store',
	'.mcmeta'
].concat(argv._)
const PACK_NAME = argv.name || 'Resource_Pack'
const DESCRIPTION = argv.desc || 'Generated with MinePackCompositor'
const TEXTURES_DIR = path.join(PACK_NAME, 'assets', 'minecraft', 'textures')

if (!IMAGE) throw 'Mask image path must be specified'

fs.copy(path.join(process.env.HOME, '/.minepackcompositor/default_pack'), PACK_NAME, err => {
	if (err) return console.log(err)
	createMetaData()
	mask()
})

function createMetaData() {
	fs.writeFile(path.join(PACK_NAME, 'pack.mcmeta'), `
	{
		"pack": {
		   "pack_format": 5,
		   "description": "${DESCRIPTION}"
		}
	 }
	 `, err => {
		if (err) throw err
		console.log('pack.mcmeta successfully written')
	})
}

function mask() {
	console.log('Generating resource pack', '\'' + PACK_NAME + '\'', 'with FADE_AMOUNT', FADE_AMOUNT, AVOID_FOLDERS.length > 2 ? '; will not mask texture folders ' + AVOID_FOLDERS.splice(2, AVOID_FOLDERS.length).map(f => `'${f}'`).join(', ') : '')
	Jimp.read(IMAGE)
		.then(mask =>
			mask
				.resize(64, 64)
				.write(path.join(PACK_NAME, 'pack.png'))
				.fade(FADE_AMOUNT)
		)
		.then(maskAllTextures)
}

function maskAllTextures(mask) {
	fs.readdir(TEXTURES_DIR, async (_err, files) => {
		SEARCH_QUEUE = SEARCH_QUEUE.concat(files)
		while (SEARCH_QUEUE.length) {
			const file = SEARCH_QUEUE.pop()

			let avoid = false
			for (fold of AVOID_FOLDERS)
				if (file.includes(fold)) avoid = true
			if (avoid) continue

			let fullPath = path.join(TEXTURES_DIR, file)

			if (checkPNG(file)) {
				if (fullPath.includes('block/'))
					maskTexture(mask, fullPath)
				else {
					tileTexture(mask, fullPath)
				}
			} else {
				await new Promise((res, _rej) => {
					fs.readdir(fullPath, (_err, files) => {
						if (!files) return
						SEARCH_QUEUE = SEARCH_QUEUE.concat(files.map(f => path.join(file, f)))
						res()
					})
				})
			}
		}

		console.log(PACK_NAME, 'successfully generated')
	})
}

function tileTexture(mask, fullPath) {
	if (!fullPath.includes('png')) return
	console.log('Tiling', fullPath, 'with mask')
	Jimp.read(fullPath)
		.then(async texture => {
			const height = texture.bitmap.height
			const width = texture.bitmap.width
			for (let y = 0; y < Math.ceil(width / 8) * 2; y++) {
				for (let x = 0; x < Math.ceil(height / 8) * 2; x++) {
					await texture.composite(mask.resize(8, 8), x * 8, y * 8)
				}
			}
			texture.write(fullPath)
		})
		.catch(err => console.log('Error in tiling', fullPath, 'Error: ', err))
}

function maskTexture(mask, fullPath) {
	if (!fullPath.includes('png')) return
	console.log('Masking', fullPath, 'with mask')
	Jimp.read(fullPath)
		.then(texture =>
			texture
				.composite(mask.resize(16, 16), 0, 0)
				.write(fullPath)
		)
		.catch(err => console.log('Error in masking', fullPath, 'Error:', err))
}