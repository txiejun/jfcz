class MethodInfo {
    public handler: Handler;
		
	/**
		*	延迟时间 相对于mainDelay
		*/
    public delay: number = 0;
	/**
		*	重复次数 
		*/
    public repeatCount: number = 0;
	/**
		*	上次执行的时间 
		*/
    public lastTime: number = 0;
	/**
		*	当前重复的次数 
		*/
    public repeatTimes: number = 0;

    public constructor(thisObj:any, method: Function, delay: number, repeatCount: number, lastTime: number, repeatTimes: number, param: Array<any>) {
        this.handler = new Handler(thisObj, method, param);
        this.delay = delay;
        this.repeatCount = repeatCount;
        this.lastTime = lastTime;
        this.repeatTimes = repeatTimes;
    }

    public resetParam(param: Array<any>): void {
        if (this.handler) {
            this.handler.params = param;
        }
    }

    public dispose(): void {
        if (this.handler) {
            this.handler.unload();
            this.handler = null;
        }

        this.delay = 0;
        this.repeatCount = 0;
        this.lastTime = 0;
        this.repeatTimes = 0;
    }
}