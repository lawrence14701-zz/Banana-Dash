import Tile from "./tile";
import Player from "./player";

class LevelMaker {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.levelCols = 16; // level width, in tiles
    this.levelRows = 15; // level height, in tiles
    this.tileSize = 50; // tile size, in pixels
    this.playerCol = 0; // player starting column
    this.playerRow = 0; // player starting column
    this.levelsIndex = 0;
    this.levels = [
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //1
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], //2
        [7, 0, 0, 0, 0, 4, 3, 5, 0, 0, 0, 0, 0, 'B', 0, 6], //3
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], //4
        [7, 0, 0, 4, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], //5
        [7, 0, 0, 0, 0, 0, 4, 3, 5, 0, 0, 0, 0, 0, 0, 6], //6
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 5, 0, 0, 0, 6], //7
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 6], //8
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 5, 0, 6], //9
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 6], //10
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 6], //11
        [7, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 6], //12
        [7, 0, 0, 4, 3, 3, 3, 3, 3, 3, 3, 5, 0, 0, 0, 6], //13
        [7, "P", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], //14
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] //15
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //1
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], //2
        [7, 0, 0, 0, 0, 0, 'B', 0, 0, 0, 0, 0, 0, 0, 0, 6], //3
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], //4
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], //5
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 5, 0, 6], //6
        [7, 0, 0, 4, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], //7
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], //8
        [7, 0, 0, 0, 0, 0, 0, 4, 3, 5, 0, 0, 0, 0, 0, 6], //9
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], //10
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 6], //11
        [7, 0, 0, 0, 0, 0, 0, 0, 4, 3, 3, 3, 5, 0, 0, 6], //12
        [7, 0, 0, 4, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], //13
        [7, 'P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], //14
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] //15
      ]
    ];
    // 1, 2, 3, 4, 5, 6, 7, 8, 9 ,10,11,12,13,14,15,16
    this.platforms = {
      tiles: [],
      bananas: []
    };
  }

  draw(x, y, width, height, url) {
    let image = new Image();
    image.src = "/src/img/" + url;
    this.context.drawImage(image, x, y, width, height);
  }

  draw_platforms() {
    //p = player
    //b = banana
    //1 = grass
    //2 = wooden box
    //3 = middle platform
    //4 = left platform
    //5 = right platform
    //6 = right edge
    //7 = left edge
    if (this.levelsIndex === this.levels.length) return //don't run code if the levels are finished
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let level = this.levels[this.levelsIndex]; //single level
  

    for (let i = 0; i < this.levelRows; i++) {
      for (let j = 0; j < this.levelCols; j++) {
        let x = j * this.tileSize;
        let y = i * this.tileSize;
        if (this.levelsIndex === 1) {
        }
        if (level[i][j] === 1) {
          this.platforms.tiles.push({
            x: x,
            y: y,
            width: this.tileSize,
            height: this.tileSize
          });
          this.draw(x, y, this.tileSize, this.tileSize, "tiles/grass.png");
        }
        if (level[i][j] === 2) {
          this.platforms.tiles.push({
            x: x,
            y: y,
            width: this.tileSize,
            height: this.tileSize
          });
          this.draw(x, y, this.tileSize, this.tileSize, "tiles/wooden_box.png");
        }
        if (level[i][j] === 4) {
          this.platforms.tiles.push({
            x: x,
            y: y,
            width: this.tileSize,
            height: this.tileSize
          });
          this.draw(
            x,
            y,
            this.tileSize,
            this.tileSize,
            "tiles/platform_edge_left.png"
          );
        }
        if (level[i][j] === 3) {
          this.platforms.tiles.push({
            x: x,
            y: y,
            width: this.tileSize,
            height: this.tileSize
          });
          this.draw(x, y, this.tileSize, this.tileSize, "tiles/platform.png");
        }
        if (level[i][j] === 5) {
          this.platforms.tiles.push({
            x: x,
            y: y,
            width: this.tileSize,
            height: this.tileSize
          });
          this.draw(
            x,
            y,
            this.tileSize,
            this.tileSize,
            "tiles/platform_edge_right.png"
          );
        }
        if (level[i][j] === 6) {
          this.platforms.tiles.push({
            x: x,
            y: y,
            width: this.tileSize,
            height: this.tileSize
          });
          this.draw(x, y, this.tileSize, this.tileSize, "tiles/right.png");
        }
        if (level[i][j] === 7) {
          this.platforms.tiles.push({
            x: x,
            y: y,
            width: this.tileSize,
            height: this.tileSize
          });
          this.draw(x, y, this.tileSize, this.tileSize, "tiles/left.png");
        }
        if (level[i][j] === "B") {
          this.platforms.bananas.push({
            x: x,
            y: y,
            width: this.tileSize,
            height: this.tileSize
          });
          this.draw(
            x,
            y,
            this.tileSize,
            this.tileSize,
            "collectable/banana.png"
          );
        }
      }
    }
  }

  start() {
    if (this.levelsIndex === this.levels.length) return; //dont run code if levels are finished
    const level = this.levels[this.levelsIndex]; //single level

    for (let i = 0; i < this.levelRows; i++) {
      for (let j = 0; j < this.levelCols; j++) {
        if (level[i][j] === "P") {
          this.playerRow = i;
          this.playerCol = j;
        }
      }
    }
    var playerXPos = this.playerCol * this.tileSize; // converting X player position from tiles to pixels
    var playerYPos = this.playerRow * this.tileSize; // converting Y player position from tiles to pixels
    return [playerXPos, playerYPos];
  }

  nextLevel() {
    this.platforms = {
      tiles: [],
      bananas: []
    };
    this.levelsIndex += 1;
  }
}

export default LevelMaker;
