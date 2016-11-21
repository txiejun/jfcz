class MainGame extends egret.Sprite{
    private needlePanel: NeedlePanel;
    private disc: Disc;
    private txtLevel: egret.TextField;
    private txtTip: egret.TextField;
    private throwList: ThrowNeedleList;
    private topTestY: number = 0;
    private bottomY: number = 0;
    private touchLayer: egret.Sprite;
    private isGaming: boolean = false;
    private _speed: number = 1;
    private _speedCount: number = 0;
    //旋转速度-角度
    private _rotationGap: number = 1;
    private _rotationDir: number = 1;

    private curItemList: Array<ThrowNeedle>;
    //private curItem: ThrowNeedle;
    private needleMoving: boolean = false;
    private throwSpeed: number = 5;
    private startPos: egret.Point;
    private level: number = 1;
    private levelData: any = null;
    private levelConfig: any;

    public constructor() {
        super();
        this.width = 480;
        this.height = 480;

        this.initConfig();

        this.initView();

        this.initTouchEvent();
    }

    private initConfig(): void {
        this.levelConfig = Style.getConfig("levels");
    }

    private getInfoByLevel(level: number): any {
        var result: any = null;
        if (this.levelConfig) {
            if (level <= this.levelConfig.length) {
                result = this.levelConfig[level - 1];
            }
        }
        return result;
    }

    private initView(): void {

        this.needlePanel = new NeedlePanel();
        this.addChild(this.needlePanel);
        this.needlePanel.x = this.width / 2;
        this.needlePanel.y = this.height/ 2 - 60;

        this.disc = new Disc();
        this.addChild(this.disc);
        this.disc.x = this.needlePanel.x;
        this.disc.y = this.needlePanel.y;
        this.disc.setNum(1);

        this.txtLevel = new egret.TextField();
        this.addChild(this.txtLevel);
        this.txtLevel.width = 150;
        this.txtLevel.x = this.needlePanel.x - this.txtLevel.width - 50;
        this.txtLevel.y = (this.height -50);
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

        this.topTestY = this.needlePanel.y + this.needlePanel.height/2;
        this.bottomY = this.throwList.y;

        //this.graphics.lineStyle(1, 0xFF0000);
        //this.graphics.moveTo(0, this.topTestY);
        //this.graphics.lineTo(this.width, this.topTestY);

        //this.graphics.lineStyle(1, 0x00FF00);
        //this.graphics.moveTo(0, this.bottomY);
        //this.graphics.lineTo(this.width, this.bottomY);

        this.startPos = new egret.Point(this.needlePanel.x, this.needlePanel.y);
        
    }

    private initTouchEvent(): void {
        this.touchLayer = new egret.Sprite();
        this.addChild(this.touchLayer);
        this.touchLayer.touchEnabled = true;
        
        var graphics: egret.Graphics = this.touchLayer.graphics;
        graphics.lineStyle(1, 0xFFFFFF, 0);
        graphics.beginFill(0xFF0000, 0);
        graphics.drawRect(0, 0, GlobalSetting.gameWidth, GlobalSetting.gameHeight);
        graphics.endFill();

        this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);

    }

    //显示提示内容
    private showTip(msg: string, color: number): void {
        if (this.txtTip) {
            this.txtTip.text = msg;
            this.txtTip.textColor = color;
            this.txtTip.visible = true;
        }
    }

    private showLevel(level: number): void {
        if (this.txtLevel) {
            this.txtLevel.text = "Level:" + level;
        }
        if (this.disc) {
            this.disc.setNum(level);
        }
    }

    private onTouch(event: egret.TouchEvent): void {
        if (this.isGaming) {
            var curItem:ThrowNeedle = this.throwList.popNeedle();
            if (curItem) {
                this.needleMoving = true;
                this.addChild(curItem);
                curItem.x = this.width / 2;
                curItem.y = this.bottomY;
                this.curItemList.push(curItem);
            }
        }
    }

    private onUpdate(): void {
        if (this.isGaming) {
            this._speedCount += 1;
            if (this._speedCount >= this._speed) {
                this.updateStep();
                this._speedCount = 0;
            }

            this.moveAndHitTestList();
        }
    }

    private moveAndHitTestList(): void {
        if (this.curItemList) {
            for (var i: number = (this.curItemList.length - 1); i >=0; --i) {
                if (this.moveAndHitTest(this.curItemList[i])) {
                    break;
                }
            }
        }
    }

    //返回是否结束游戏
    private moveAndHitTest(curItem: ThrowNeedle): boolean {
        var result: boolean = false;
        if (this.needleMoving && curItem && this.curItemList) {
            curItem.y -= this.throwSpeed;
            if (curItem.y <= this.topTestY) {
                var endPos: egret.Point = new egret.Point(curItem.x, curItem.y);
                var angle: number = MathUtil.getAngleByLine(this.startPos, endPos);
                var oldAngle: number = this.needlePanel.rotation % 360;

                var index: number = this.curItemList.indexOf(curItem);
                if (index != -1) {
                    this.curItemList.splice(index, 1);
                }
                curItem.dispose();
                curItem = null;
                var newNeedle: Needle = new Needle();
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
    }

    private showLevelUp(): void {
        this.showTip("完美过关\n1秒后进入下一关", 0x00FF00);
        TimerManager.setTimeout(this, this.nextLevel, 1000);
    }

    private showGameOver(): void {
        this.showTip("失败了\n1秒钟以后重新开始", 0xFF0000);
        TimerManager.setTimeout(this, this.onResetGame, 1000);
    }

    private nextLevel(): void {
        this.level++;
        this.startGame(this.level);
    }

    private onResetGame(): void {
        this.startGame(this.level);
    }

    /**
		* 帧数增量 
		* 
		*/		
	private updateStep(): void {
        if (this.needlePanel) {
            this.needlePanel.rotation = this.needlePanel.rotation + this._rotationGap * this._rotationDir;
        }
    }

    private clearCurItemList(): void {
        if (this.curItemList) {
            var len: number = this.curItemList.length;
            for (var i: number = 0; i < len; ++i) {
                this.curItemList[i].dispose();
            }
        }
        this.curItemList = new Array<ThrowNeedle>();
    }

    public startGame(level: number = 1): void {
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
        var count: number = 3;
        var listCount: number = 6;
        if (this.levelData) {
            count = this.levelData.defaultNeedles;
            listCount = this.levelData.throwNeedles;
            this._rotationGap = this.levelData.angleSpeed;
        }
        this.needlePanel.reset(count);
        this.throwList.pushNeedle(listCount);
        TimerManager.addToFrame(this, this.onUpdate);
    }

    public endGame(): void {
        this.needleMoving = false;
        this.isGaming = false;
        TimerManager.removeFromFrame(this.onUpdate);
        this._speedCount = 0;
    }

}
