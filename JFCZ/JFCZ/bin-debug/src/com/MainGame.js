var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainGame = (function (_super) {
    __extends(MainGame, _super);
    function MainGame() {
        _super.call(this);
        this.topTestY = 0;
        this.bottomY = 0;
        this.isGaming = false;
        this._speed = 1;
        this._speedCount = 0;
        //旋转速度-角度
        this._rotationGap = 1;
        this._rotationDir = 1;
        //private curItem: ThrowNeedle;
        this.needleMoving = false;
        this.throwSpeed = 5;
        this.level = 1;
        this.levelData = null;
        this.width = 480;
        this.height = 480;
        this.initConfig();
        this.initView();
        this.initTouchEvent();
    }
    MainGame.prototype.initConfig = function () {
        this.levelConfig = Style.getConfig("levels");
    };
    MainGame.prototype.getInfoByLevel = function (level) {
        var result = null;
        if (this.levelConfig) {
            if (level <= this.levelConfig.length) {
                result = this.levelConfig[level - 1];
            }
        }
        return result;
    };
    MainGame.prototype.initView = function () {
        this.needlePanel = new NeedlePanel();
        this.addChild(this.needlePanel);
        this.needlePanel.x = this.width / 2;
        this.needlePanel.y = this.height / 2 - 60;
        this.disc = new Disc();
        this.addChild(this.disc);
        this.disc.x = this.needlePanel.x;
        this.disc.y = this.needlePanel.y;
        this.disc.setNum(1);
        this.txtLevel = new egret.TextField();
        this.addChild(this.txtLevel);
        this.txtLevel.width = 150;
        this.txtLevel.x = this.needlePanel.x - this.txtLevel.width - 50;
        this.txtLevel.y = (this.height - 50);
        this.txtLevel.textColor = 0x000000;
        this.txtLevel.size = 20;
        this.txtLevel.textAlign = egret.HorizontalAlign.CENTER;
        this.txtLevel.bold = true;
        this.txtLevel.text = "";
        this.txtTip = new egret.TextField();
        this.addChild(this.txtTip);
        this.txtTip.width = 200;
        this.txtTip.x = this.needlePanel.x + 30;
        this.txtTip.y = (this.height - 50);
        this.txtTip.textColor = 0x000000;
        this.txtTip.size = 20;
        this.txtTip.textAlign = egret.HorizontalAlign.RIGHT;
        this.txtTip.bold = true;
        this.txtTip.text = "Level:";
        this.throwList = new ThrowNeedleList();
        this.addChild(this.throwList);
        this.throwList.x = (this.width / 2);
        this.throwList.y = (this.height - 100);
        this.throwList.pushNeedle(0);
        this.topTestY = this.needlePanel.y + this.needlePanel.height / 2;
        this.bottomY = this.throwList.y;
        //this.graphics.lineStyle(1, 0xFF0000);
        //this.graphics.moveTo(0, this.topTestY);
        //this.graphics.lineTo(this.width, this.topTestY);
        //this.graphics.lineStyle(1, 0x00FF00);
        //this.graphics.moveTo(0, this.bottomY);
        //this.graphics.lineTo(this.width, this.bottomY);
        this.startPos = new egret.Point(this.needlePanel.x, this.needlePanel.y);
    };
    MainGame.prototype.initTouchEvent = function () {
        this.touchLayer = new egret.Sprite();
        this.addChild(this.touchLayer);
        this.touchLayer.touchEnabled = true;
        var graphics = this.touchLayer.graphics;
        graphics.lineStyle(1, 0xFFFFFF, 0);
        graphics.beginFill(0xFF0000, 0);
        graphics.drawRect(0, 0, GlobalSetting.gameWidth, GlobalSetting.gameHeight);
        graphics.endFill();
        this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    };
    //显示提示内容
    MainGame.prototype.showTip = function (msg, color) {
        if (this.txtTip) {
            this.txtTip.text = msg;
            this.txtTip.textColor = color;
            this.txtTip.visible = true;
        }
    };
    MainGame.prototype.showLevel = function (level) {
        if (this.txtLevel) {
            this.txtLevel.text = "Level:" + level;
        }
        if (this.disc) {
            this.disc.setNum(level);
        }
    };
    MainGame.prototype.onTouch = function (event) {
        if (this.isGaming) {
            var curItem = this.throwList.popNeedle();
            if (curItem) {
                this.needleMoving = true;
                this.addChild(curItem);
                curItem.x = this.width / 2;
                curItem.y = this.bottomY;
                this.curItemList.push(curItem);
            }
        }
    };
    MainGame.prototype.onUpdate = function () {
        if (this.isGaming) {
            this._speedCount += 1;
            if (this._speedCount >= this._speed) {
                this.updateStep();
                this._speedCount = 0;
            }
            this.moveAndHitTestList();
        }
    };
    MainGame.prototype.moveAndHitTestList = function () {
        if (this.curItemList) {
            for (var i = (this.curItemList.length - 1); i >= 0; --i) {
                if (this.moveAndHitTest(this.curItemList[i])) {
                    break;
                }
            }
        }
    };
    //返回是否结束游戏
    MainGame.prototype.moveAndHitTest = function (curItem) {
        var result = false;
        if (this.needleMoving && curItem && this.curItemList) {
            curItem.y -= this.throwSpeed;
            if (curItem.y <= this.topTestY) {
                var endPos = new egret.Point(curItem.x, curItem.y);
                var angle = MathUtil.getAngleByLine(this.startPos, endPos);
                var oldAngle = this.needlePanel.rotation % 360;
                var index = this.curItemList.indexOf(curItem);
                if (index != -1) {
                    this.curItemList.splice(index, 1);
                }
                curItem.dispose();
                curItem = null;
                var newNeedle = new Needle();
                this.needlePanel.addNeedle(newNeedle);
                newNeedle.rotation = angle - oldAngle + 90;
                console.log("angle :" + angle + ",needlePanel.rotation:" + this.needlePanel.rotation + ", oldAngle:" + oldAngle + ",newNeedle.rotation:" + newNeedle.rotation);
                //检测是否丢完所有针
                if (this.throwList.getLeftNum() == 0 && this.curItemList.length == 0) {
                    this.endGame();
                    this.showLevelUp();
                    result = true;
                }
            }
            else {
                if (this.needlePanel.checkHitTest(curItem)) {
                    this.endGame();
                    this.showGameOver();
                    result = true;
                }
            }
        }
        return result;
    };
    MainGame.prototype.showLevelUp = function () {
        this.showTip("完美过关\n1秒后进入下一关", 0x00FF00);
        TimerManager.setTimeout(this, this.nextLevel, 1000);
    };
    MainGame.prototype.showGameOver = function () {
        this.showTip("失败了\n1秒钟以后重新开始", 0xFF0000);
        TimerManager.setTimeout(this, this.onResetGame, 1000);
    };
    MainGame.prototype.nextLevel = function () {
        this.level++;
        this.startGame(this.level);
    };
    MainGame.prototype.onResetGame = function () {
        this.startGame(this.level);
    };
    /**
        * 帧数增量
        *
        */
    MainGame.prototype.updateStep = function () {
        if (this.needlePanel) {
            this.needlePanel.rotation = this.needlePanel.rotation + this._rotationGap * this._rotationDir;
        }
    };
    MainGame.prototype.clearCurItemList = function () {
        if (this.curItemList) {
            var len = this.curItemList.length;
            for (var i = 0; i < len; ++i) {
                this.curItemList[i].dispose();
            }
        }
        this.curItemList = new Array();
    };
    MainGame.prototype.startGame = function (level) {
        if (level === void 0) { level = 1; }
        this.clearCurItemList();
        if (this.txtTip) {
            this.txtTip.visible = false;
        }
        this.level = level;
        if (this._rotationDir == 1) {
            this._rotationDir = -1;
        }
        else {
            this._rotationDir = 1;
        }
        this.showLevel(this.level);
        this.needleMoving = false;
        this.isGaming = true;
        this._speedCount = 0;
        this.levelData = this.getInfoByLevel(this.level);
        var count = 3;
        var listCount = 6;
        if (this.levelData) {
            count = this.levelData.defaultNeedles;
            listCount = this.levelData.throwNeedles;
            this._rotationGap = this.levelData.angleSpeed;
        }
        this.needlePanel.reset(count);
        this.throwList.pushNeedle(listCount);
        TimerManager.addToFrame(this, this.onUpdate);
    };
    MainGame.prototype.endGame = function () {
        this.needleMoving = false;
        this.isGaming = false;
        TimerManager.removeFromFrame(this.onUpdate);
        this._speedCount = 0;
    };
    return MainGame;
})(egret.Sprite);
//# sourceMappingURL=MainGame.js.map