# MinePack Compositor

MinePack Compositor can generate Minecraft resource packs by masking an input image over original textures.

## Installation
```
git clone https://github.com/profsucrose/minepackcompositor && cd minepackcompositor && ./init.sh
```

## Usage
Run
```
gen-res-pack 'mask_image.png' 
```
while in minepackcompositor folder and new resource pack will be generated

Apply to your Minecraft Java Edition client and have fun!

## Flags
--fade=0-1 
  * Number between 0 and 1 that specifies how faded your mask image will be when overlayed with textures

--name='My Resource Pack'
  * Specifies name of resource pack

--desc='My Resource Pack's Description'
  * Specifies description of resource pack

block
  * Avoid changing block textures

effect
  * Avoid changing 'effect' folder (no longer used as of Minecraft 1.15)
  
entity
  * Avoid changing entity textures
  
environment
  * Avoid changing environment textures (rain texture, sun texture, clouds, etc..)
  
font
  * Avoid mapping texture over font characters (recommended)
  
gui
  * Avoid mapping texture over GUI assets
  
item
  * Avoid item textures
  
map
  * Avoid changing textures used in Minecraft maps
  
misc
  * Avoid directory 'misc' when masking textures
  
mob_effect
  * Avoid directory 'mob_effect' when masking textures
  
models
  * Avoid changing textures in 'models' folder (used as asssets for various outer armor assets)
  
painting
  * Avoid changing painting textures
  
particle
  * Avoid changing particle textures

  
