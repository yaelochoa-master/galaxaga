namespace SpriteKind {
    export const Attacker = SpriteKind.create()
}
namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`
    //% blockIdentity=images._tile
    export const tile1 = img`
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
`
    //% blockIdentity=images._tile
    export const tile2 = img`
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f c f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
`
    //% blockIdentity=images._tile
    export const tile3 = img`
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f 
f f f f f f f c c f f f f f f f 
`
}
function newship (level: number) {
    mySprite = sprites.create(img`
. . . . . . . . 
. . . 7 2 . . . 
6 . . 2 7 . . 6 
6 . 2 7 2 7 . 6 
6 6 7 2 7 2 6 6 
6 6 2 7 2 7 6 6 
6 . 7 2 7 2 . 6 
6 . . . . . . 6 
`, SpriteKind.Player)
    controller.moveSprite(mySprite, 100, 100)
    mySprite.setPosition(scene.screenWidth() / 2, scene.screenHeight() * 0.9)
}
scene.onOverlapTile(SpriteKind.Attacker, myTiles.tile3, function (sprite, location) {
    sprite.setKind(SpriteKind.Enemy)
    sprite.y = scene.screenHeight() * 0.3
})
function enemy1 (num: number) {
    x1 = scene.screenWidth() / 2 - 10 * (num / 2)
    for (let index = 0; index < num; index++) {
        Enemy1 = sprites.create(img`
7 2 7 . . 7 2 7 
7 2 7 . . 7 2 7 
7 7 7 5 5 7 7 7 
. 7 6 6 6 6 7 . 
7 6 6 7 7 6 6 7 
7 6 7 7 7 7 6 7 
7 6 6 8 8 6 6 7 
. 7 7 7 7 7 7 . 
`, SpriteKind.Enemy)
        Enemy1.setPosition(x1, scene.screenHeight() * 0.5)
        x1 += 12
        Enemy1.setVelocity(-5, 0)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.halo, 500)
    info.changeScoreBy(1)
    remainingEnemy += -1
    if (remainingEnemy < 1) {
        currentlevel += 1
        newlevel(currentlevel)
    }
})
function newlevel (num: number) {
    enemy1(7 + num)
    enemy2(8 + num)
    enemy3(3 * num)
    remainingEnemy = 3 * (num + (15 + 3 * num))
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
a 7 
7 a 
a 7 
7 a 
`, mySprite, 0, -100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Attacker, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.halo, 200)
    info.changeScoreBy(2)
    remainingEnemy += -1
    if (remainingEnemy < 1) {
        currentlevel += 1
        newlevel(currentlevel)
    }
})
function enemy3 (num: number) {
    x3 = scene.screenWidth() / 2 - 10 * (num / 2)
    for (let index = 0; index < num; index++) {
        Enemy3 = sprites.create(img`
. 7 7 . . 7 7 . 
3 3 6 3 3 6 3 3 
3 7 6 7 7 6 7 3 
3 7 7 7 7 7 7 3 
3 7 7 6 6 7 7 3 
3 3 6 6 6 6 3 3 
. . 3 3 3 3 . . 
. . . . . . . . 
`, SpriteKind.Enemy)
        Enemy3.setPosition(x3, scene.screenHeight() * 0.3)
        x3 += 12
        Enemy3.setVelocity(-5, 0)
    }
}
sprites.onOverlap(SpriteKind.Attacker, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy(effects.fire, 500)
    otherSprite.destroy(effects.rings, 500)
    info.changeLifeBy(-1)
    pause(100)
    newship(1)
})
function enemy2 (num: number) {
    x2 = scene.screenWidth() / 2 - 10 * (num / 2)
    for (let index = 0; index < num; index++) {
        Enemy2 = sprites.create(img`
. 5 5 . . 5 5 . 
. . 5 5 5 5 . . 
. 5 9 9 9 9 5 . 
5 9 b 6 6 b 9 5 
5 9 b 6 6 b 9 5 
5 5 9 9 9 9 5 5 
. . 5 5 5 5 . . 
. . 5 . . 5 . . 
`, SpriteKind.Enemy)
        Enemy2.setPosition(x2, scene.screenHeight() * 0.4)
        x2 += 12
        Enemy2.setVelocity(-5, 0)
    }
}
scene.onOverlapTile(SpriteKind.Enemy, myTiles.tile1, function (sprite, location) {
    sprite.setVelocity(5 * Direction, 0)
})
scene.onOverlapTile(SpriteKind.Enemy, myTiles.tile2, function (sprite, location) {
    sprite.setKind(SpriteKind.Attacker)
    sprite.setVelocity(0, 20)
})
let Randomy = 0
let Randomx = 0
let Enemy2: Sprite = null
let x2 = 0
let Enemy3: Sprite = null
let x3 = 0
let projectile: Sprite = null
let remainingEnemy = 0
let Enemy1: Sprite = null
let x1 = 0
let mySprite: Sprite = null
let currentlevel = 0
let Direction = 0
game.showLongText("Welcome to Galaxaga! Press A to Start.", DialogLayout.Bottom)
info.setScore(0)
info.setLife(3)
Direction = 1
currentlevel = 1
tiles.setTilemap(tiles.createTilemap(
            hex`0a0008000101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010103030303030303030303`,
            img`
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
`,
            [myTiles.tile0,myTiles.tile1,myTiles.tile2,myTiles.tile3],
            TileScale.Sixteen
        ))
effects.starField.startScreenEffect()
newship(1)
newlevel(currentlevel)
game.onUpdateInterval(2000, function () {
    tiles.setTileAt(tiles.getTileLocation(Randomx, Randomy), myTiles.tile1)
    Randomy = Math.randomRange(2, 8)
    Randomx = Math.randomRange(2, 3)
    tiles.setTileAt(tiles.getTileLocation(Randomx, Randomy), myTiles.tile2)
})
game.onUpdateInterval(2000, function () {
    Direction = Direction * -1
})
