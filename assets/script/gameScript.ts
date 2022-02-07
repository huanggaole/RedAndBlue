// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    lvllabel: cc.Label = null;

    @property(cc.Node)
    map: cc.Node = null;

    @property(cc.Node)
    oper: cc.Node = null;

    @property(cc.Button)
    up: cc.Button = null;

    @property(cc.Button)
    down: cc.Button = null;

    @property(cc.Button)
    left: cc.Button = null;

    @property(cc.Button)
    right: cc.Button = null;

    @property(cc.Button)
    restart: cc.Button = null;

    @property(cc.SpriteFrame)
    ground: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    stone: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    flag: cc.SpriteFrame = null;

    @property(cc.Sprite)
    red: cc.Sprite = null;

    @property(cc.Sprite)
    blue: cc.Sprite = null;

    @property(cc.SpriteFrame)
    upNote: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    downNote: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    leftNote: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    rightNote: cc.SpriteFrame = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    level = 1;
    lvlList = [];
    redx = 0;
    redy = 0;
    bluex = 0;
    bluey = 0;
    aidx = 0;
    aidy = 0;

    redDirectX = 0;
    redDirectY = 0;
    blueDirectX = 0;
    blueDirectY = 0;

    // -1 墙壁 0 空 1 小红 2 小蓝 3 向上 4 向下 5向左 6向右 7 8 9 旗帜 10 锁 
    lv1 = [[1,0,0,0,9,0,0,0,2]];
    lv2 = [ [0,0,0,0,-1,0,0],
            [0,0,0,0,0,0,0],
            [1,0,-1,9,0,0,2],
            [0,0,0,0,0,0,0],
            [0,0,-1,0,0,0,0]
        ];
    lv3 = [ [0,0,0,3,0,0,0],
            [0,0,0,0,0,0,0],
            [1,0,-1,9,0,0,2],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,4]
        ];
    lv4 = [ [0,0,0,-1,-1],
            [0,-1,0,9,0], 
            [1,2,-1,0,0],
            [0,0,0,0,0],
            [6,0,0,0,0]
        ];
    lv5 = [ [-1,-1,0,0,0,0,0],
            [0,0,0,-1,-1,-1,0], 
            [0,0,1,0,2,0,0],
            [0,0,0,0,0,0,-1],
            [0,0,0,0,9,0,0],
            [0,0,-1,0,0,0,0],
            [0,0,0,0,0,0,0]
        ];
    lv6 = [ [0,0,0,0,0,0,0],
            [2,0,0,0,0,0,0], 
            [-1,0,0,0,0,-1,0],
            [0,0,0,-1,0,1,0],
            [0,0,0,0,0,0,0],
            [-1,0,0,0,0,0,-1],
            [0,9,0,0,0,-1,-1]
        ];
    lv7 = [ [0,0,0,0,-1,-1,-1],
            [0,0,9,0,0,-1,-1], 
            [-1,-1,-1,0,2,0,-1],
            [-1,-1,0,0,0,0,0],
            [0,0,0,0,0,-1,0],
            [0,0,-1,0,-1,0,0],
            [0,0,0,0,-1,0,1]
            ];
    lv8 = [ [0,0,-1,-1,3,0,0],
            [0,0,-1,0,0,2,0], 
            [0,0,0,0,9,-1,0],
            [-1,0,-1,0,-1,-1,0],
            [-1,0,-1,0,0,0,0],
            [-1,0,-1,-1,0,1,0],
            [-1,0,0,0,0,0,0]
            ];
    lv9 = [ [-1,0,0,1,-1,-1,-1],
            [-1,0,0,-1,-1,3,0], 
            [0,0,0,0,-1,0,0],
            [2,0,0,0,-1,0,0],
            [0,0,0,-1,-1,0,0],
            [0,0,0,0,0,9,0],
            [-1,0,0,0,0,0,0]
        ];
    lv10 = [
            [2,0,-1,0,0,0,0,0,-1],
            [0,0,0,0,-1,0,0,0,0],
            [0,0,0,0,0,0,-1,0,0],
            [0,-1,0,0,0,9,0,1,0],
            [0,0,0,0,0,0,0,-1,0],
            [-1,0,0,0,0,0,-1,0,0],
            [0,0,-1,0,0,0,0,0,0]
        ];
    
    lvl = [];
    reslvl = [];
    tmpMap = [];
    mapWidth = 0;
    mapHeight = 0;
    start () {
        this.up.node.on("click",()=>{this.oper.active = false; this.redDirectX = 0; this.redDirectY = 1; this.blueDirectX = 0; this.blueDirectY = -1; this.onMove();});
        this.down.node.on("click",()=>{this.oper.active = false; this.redDirectX = 0; this.redDirectY = -1; this.blueDirectX = 0; this.blueDirectY = 1; this.onMove();});
        this.left.node.on("click",()=>{this.oper.active = false; this.redDirectX = -1; this.redDirectY = 0; this.blueDirectX = 1; this.blueDirectY = 0; this.onMove();});
        this.right.node.on("click",()=>{this.oper.active = false;this.redDirectX = 1; this.redDirectY = 0; this.blueDirectX = -1; this.blueDirectY = 0; this.onMove();});
        this.restart.node.on("click",()=>{this.oper.active = true;this.initGame(this.level);});

        this.lvlList[1] = this.lv1;
        this.lvlList[2] = this.lv2;
        this.lvlList[3] = this.lv3;
        this.lvlList[4] = this.lv4;
        this.lvlList[5] = this.lv5;
        this.lvlList[6] = this.lv6;
        this.lvlList[7] = this.lv7;
        this.lvlList[8] = this.lv8;
        this.lvlList[9] = this.lv9;
        this.lvlList[10] = this.lv10;

        this.level = 1;
        this.initGame(this.level);
    }

    onMove(){
        if(this.redDirectX == 0 && this.redDirectY == 0 && this.blueDirectX == 0 && this.blueDirectY == 0){
            this.oper.active = true;
            return;
        }
        const gridWidth = 56;
        const gridHeight = 56;
        // 红色新位置
        const redNewX = this.redx + this.redDirectX;
        const redNewY = this.redy + this.redDirectY;
        if(redNewX < 0 || redNewX >= this.mapWidth || redNewY < 0 || redNewY >= this.mapHeight || this.tmpMap[redNewY][redNewX] == -1){
            this.redDirectX = 0;
            this.redDirectY = 0;
        }else{
            this.redx = redNewX;
            this.redy = redNewY;
        }
        // 蓝色新位置
        const blueNewX = this.bluex + this.blueDirectX;
        const blueNewY = this.bluey + this.blueDirectY;
        if(blueNewX < 0 || blueNewX >= this.mapWidth || blueNewY < 0 || blueNewY >= this.mapHeight || this.tmpMap[blueNewY][blueNewX] == -1){
            this.blueDirectX = 0;
            this.blueDirectY = 0;
        }else{
            this.bluex = blueNewX;
            this.bluey = blueNewY;
        }
        // 判断是否能移动
        if(this.redDirectX == 0 && this.redDirectY == 0 && this.blueDirectX == 0 && this.blueDirectY == 0){
            this.oper.active = true;
            return;
        }
        // 移动到新位置
        cc.tween(this.red.node).to(0.2,{
            x: (this.redx - this.mapWidth / 2.0) * gridWidth + this.map.x,
            y: (this.redy - this.mapHeight / 2.0) * gridHeight + this.map.y
        }).start();
        cc.tween(this.blue.node).to(0.2,{
            x: (this.bluex - this.mapWidth / 2.0) * gridWidth + this.map.x,
            y: (this.bluey - this.mapHeight / 2.0) * gridHeight+ this.map.y
        }).start();
        this.scheduleOnce(()=>{
            // 判断是否符合胜利条件
            if(this.redx == this.aidx && this.redy == this.aidy && this.bluex == this.aidx && this.bluey == this.aidy && this.lvl[this.aidy][this.aidx] == 9){
                cc.Tween.stopAll();
                this.level++;
                this.initGame(this.level);
                this.oper.active = true;
                return;
            }
            // 判断是否改变方向
            if(this.lvl[this.redy][this.redx] == 3){
                this.redDirectX = 0; this.redDirectY = 1;
            }else if(this.lvl[this.redy][this.redx] == 4){
                this.redDirectX = 0; this.redDirectY = -1;
            }else if(this.lvl[this.redy][this.redx] == 5){
                this.redDirectX = -1; this.redDirectY = 0;
            }else if(this.lvl[this.redy][this.redx] == 6){
                this.redDirectX = 1; this.redDirectY = 0;
            }
            if(this.lvl[this.bluey][this.bluex] == 3){
                this.blueDirectX = 0; this.blueDirectY = 1;
            }else if(this.lvl[this.bluey][this.bluex] == 4){
                this.blueDirectX = 0; this.blueDirectY = -1;
            }else if(this.lvl[this.bluey][this.bluex] == 5){
                this.blueDirectX = -1; this.blueDirectY = 0;
            }else if(this.lvl[this.bluey][this.bluex] == 6){
                this.blueDirectX = 1; this.blueDirectY = 0;
            }
            this.onMove();
        },0.2);
    }

    initGame(lvlnum){
        console.log("init");
        this.map.removeAllChildren();
        this.lvllabel.string = "LEVEL "+ lvlnum;
        if(lvlnum < 11){
            this.lvl = [];
            for(let i = 0; i < this.lvlList[lvlnum].length; i++){
                this.lvl.push([]);
                for(let j = 0; j < this.lvlList[lvlnum][0].length; j++){
                    this.lvl[i][j] = this.lvlList[lvlnum][i][j];
                }
            }
        }else{
            alert("Success!\nCongratulations!");
            this.level = lvlnum = 1;
            this.initGame(this.level);
            return;
        }
        const gridWidth = 56;
        const gridHeight = 56;
        this.mapWidth = this.lvl[0].length;
        this.mapHeight = this.lvl.length;
        this.map.width = this.mapWidth * gridWidth;
        this.map.height = this.mapHeight * gridHeight;
        this.tmpMap = [];
        
        for(let j = 0; j < this.mapHeight; j++){
            this.tmpMap.push([]);
            for(let i = 0; i < this.mapWidth; i++){
                const newx = (i - this.mapWidth / 2.0) * gridWidth;
                const newy = (j - this.mapHeight / 2.0) * gridHeight;
                if(this.lvl[j][i] == -1){
                    this.tmpMap[j][i] = -1;
                    const newGrid = new cc.Node();
                    const newSprite = newGrid.addComponent(cc.Sprite);
                    newSprite.spriteFrame = this.stone;
                    newGrid.width = gridWidth;
                    newGrid.height = gridHeight;
                    newGrid.x = newx;
                    newGrid.y = newy;
                    this.map.addChild(newGrid);
                }
                else{
                    this.tmpMap[j][i] = 0;
                    const newGrid = new cc.Node();
                    const newSprite = newGrid.addComponent(cc.Sprite);
                    newSprite.spriteFrame = this.ground;
                    newGrid.width = gridWidth;
                    newGrid.height = gridHeight;
                    newGrid.x = newx;
                    newGrid.y = newy;
                    this.map.addChild(newGrid);
                    

                    if(this.lvl[j][i] == 3){
                        const newGrid = new cc.Node();
                        const newSprite = newGrid.addComponent(cc.Sprite);
                        newSprite.spriteFrame = this.upNote;
                        newGrid.width = gridWidth;
                        newGrid.height = gridHeight;
                        newGrid.x = newx;
                        newGrid.y = newy;
                        this.map.addChild(newGrid);
                    }

                    if(this.lvl[j][i] == 4){
                        const newGrid = new cc.Node();
                        const newSprite = newGrid.addComponent(cc.Sprite);
                        newSprite.spriteFrame = this.downNote;
                        newGrid.width = gridWidth;
                        newGrid.height = gridHeight;
                        newGrid.x = newx;
                        newGrid.y = newy;
                        this.map.addChild(newGrid);
                    }

                    if(this.lvl[j][i] == 5){
                        const newGrid = new cc.Node();
                        const newSprite = newGrid.addComponent(cc.Sprite);
                        newSprite.spriteFrame = this.leftNote;
                        newGrid.width = gridWidth;
                        newGrid.height = gridHeight;
                        newGrid.x = newx;
                        newGrid.y = newy;
                        this.map.addChild(newGrid);
                    }

                    if(this.lvl[j][i] == 6){
                        const newGrid = new cc.Node();
                        const newSprite = newGrid.addComponent(cc.Sprite);
                        newSprite.spriteFrame = this.rightNote;
                        newGrid.width = gridWidth;
                        newGrid.height = gridHeight;
                        newGrid.x = newx;
                        newGrid.y = newy;
                        this.map.addChild(newGrid);
                    }

                    if(this.lvl[j][i] == 9){
                        this.aidx = i;
                        this.aidy = j;
                        const newGrid = new cc.Node();
                        const newSprite = newGrid.addComponent(cc.Sprite);
                        newSprite.spriteFrame = this.flag;
                        newGrid.width = gridWidth;
                        newGrid.height = gridHeight;
                        newGrid.x = newx;
                        newGrid.y = newy;
                        this.map.addChild(newGrid);
                    }
                    
                    if(this.lvl[j][i] == 1){
                        this.lvl[j][i] = 0;
                        this.redx = i;
                        this.redy = j;
                        this.red.node.x = newx + this.map.x;
                        this.red.node.y = newy + this.map.y;
                    }
                    if(this.lvl[j][i] == 2){
                        this.lvl[j][i] = 0;
                        this.bluex = i;
                        this.bluey = j;
                        this.blue.node.x = newx + this.map.x;
                        this.blue.node.y = newy + this.map.y;
                    }
                    
                }
               
            }
            
        }
        
        
    }

    generateLvl(widthNum:number, heightNum:number){
        while(true){
            const res = [];
            for(let j = 0; j < heightNum; j++){
                let line = [];
                for(let i = 0; i < widthNum; i++){
                    let rnd = Math.random();
                    if(rnd < 0.2){
                        line.push(-1);
                    }else if(rnd < 0.22){
                        line.push(3);
                    }else if(rnd < 0.24){
                        line.push(4);
                    }else if(rnd < 0.26){
                        line.push(5);
                    }else if(rnd < 0.28){
                        line.push(6);
                    }else{
                        line.push(0);
                    }
                }
                res.push(line);
            }
            let fx = Math.floor(Math.random() * widthNum);
            let fy = Math.floor(Math.random() * heightNum);
            res[fy][fx] = 9;
            fx = Math.floor(Math.random() * widthNum);
            fy = Math.floor(Math.random() * heightNum);
            if(res[fy][fx]!=9){
                res[fy][fx] = 1;
            }
            fx = Math.floor(Math.random() * widthNum);
            fy = Math.floor(Math.random() * heightNum);
            if(res[fy][fx]!=9 && res[fy][fx]!=1){
                res[fy][fx] = 2;
            }
            
            return res;
            
        }
    }
}
