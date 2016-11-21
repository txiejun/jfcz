class TimerManager{
    private static timerLoops: Object = {};
	//用作保持先后顺序-只保存key
	private static timerList:Array<any> = new Array<any>();
	private static _timeoutIdCounter:number = 0;
    private static frameLoops: any = {};
	private static frameList:Array<any> = new Array<any>();
    private static nextFrames: any = {};
	private static nextFrameList:Array<any> = new Array<any>();
	private static mainDelay:number = 20;	//minisecond
	private static _mainTimer:egret.Timer;
    private static _stage: any = null;

	/**
		* 用于计算帧频 
		*/		
	private static lastTime:number = 0;
	/**
		* 存放帧频 
		*/		
	private static _frameRate:number=0;
		
	public constructor(){
	}
		
	public static initialize(s:any):void{
        TimerManager._stage = s;
		if(TimerManager._stage){
            TimerManager._stage.addEventListener(egret.Event.ENTER_FRAME, TimerManager.frameLoop, TimerManager);
		}
	}
		
	private static get mainTimer():egret.Timer{
		if(TimerManager._mainTimer==null){
            TimerManager._mainTimer = new egret.Timer(TimerManager.mainDelay);
			TimerManager._mainTimer.addEventListener(egret.TimerEvent.TIMER,TimerManager.doTimer,TimerManager);
		}
		return TimerManager._mainTimer;
	}
		
    private static doTimer(evt: egret.TimerEvent):void{	
		var count:number = 0;
		var funObj:MethodInfo;
		var newList:Array<any> = TimerManager.timerList.concat();
		var len:number = newList.length;
		var key:any;
		for(var i:number = 0; i<len; ++i){
			count++;
			key = newList[i];
			funObj = TimerManager.timerLoops[key];
			if(funObj!=null&&funObj.handler!=null){
                var nowTime: number = egret.getTimer();
				var gapTime:number = nowTime-funObj.lastTime;
				if(gapTime>=funObj.delay){
					if(funObj.repeatCount<=0||(funObj.repeatCount>0&&funObj.repeatTimes<funObj.repeatCount)){
						funObj.lastTime = nowTime;
						funObj.repeatTimes++;
						funObj.handler.execute();
					}
					else{
						//清除
						TimerManager.removeFunction(key);
					}
						
				}
					
			}
		}
		newList = null;
			
		//如果没有函数需要执行 则关闭mainTimer
		if(count==0){
			TimerManager.mainTimer.reset();
			TimerManager.mainTimer.stop();
		}
	}
		
	/**
		* 帧频循环-[待优化：单个循环里面操作影响到循环列表的长度会有问题]
		* @param e
		*
		*/
	private static frameLoop(event:Event):void{
		var i:Handler = null;
		var len:number = TimerManager.nextFrameList.length;
		var key:any;
		for(var j:number = 0; j<len; ++j){
			key = TimerManager.nextFrameList[j];
			i = TimerManager.nextFrames[key];
			if(i){
				
				i.execute();
				
				i.unload();
				i = null;
			}
			TimerManager.nextFrameList.splice(j, 1);
			delete TimerManager.nextFrames[key];
			--len;
			--j;
		}
			
		i = null;
		var newList:Array<any> = TimerManager.frameList.concat();
		len = newList.length;
		for(j = 0; j<len; ++j){
			key = newList[j];
			i = TimerManager.frameLoops[key];
			if(i){
				i.execute();
			}
		}
		newList = null;
			
		TimerManager.doFrameRate();
	}
		
	/**
		* 添加 timer 回调函数注册  
        * @param thisObj 
		* @param func 回调函数
		* @param delay 计时器事件间的延迟（以毫秒为单位）。  最小值为20 ms 最好是20的倍数 默认间隔为1秒
		* @param repeatCount 指定重复次数。如果为 0，则计时器重复无限次数。如果不为 0，则将运行计时器，运行次数为指定的次数，然后停止。
		* 
		*/			
	public static addFunction(thisObj:any, func:Function,delay:number=1000,repeatCount:number=0, param:Array<any> = null):void{
		if(func==null){
			return;
		}
        TimerManager.addFuncByKey(thisObj, func, func, delay, repeatCount, param);
		if(TimerManager.mainTimer.running==false){
			TimerManager.mainTimer.start();
		}
	}
		
    private static addFuncByKey(thisObj: any,key:any, func:Function,delay:number=1000,repeatCount:number=0, param:Array<any> = null):void{
		var info:MethodInfo = TimerManager.timerLoops[key];
		if(info){	
			info.delay = delay;
			info.repeatCount = repeatCount;
			info.resetParam(param);
		}
		else{
            info = new MethodInfo(thisObj, func,delay,repeatCount,egret.getTimer(),0, param);
			TimerManager.timerLoops[key] = info;
		}
		var index:number = TimerManager.timerList.indexOf(key);
		if(index != -1){
			//有记录, 提升次序
			TimerManager.timerList.splice(index, 1);
		}
		TimerManager.timerList.push(key);
	}
		
	/**
		* 删除函数注册 
		* @param func
		* 
		*/
	public static removeFunction(key:any):void{
		if(key!=null){
			var info:MethodInfo = TimerManager.timerLoops[key];
			if(info){
				delete TimerManager.timerLoops[key];
				info.dispose();
				info = null;
			}
			var index:number = TimerManager.timerList.indexOf(key);
			if(index != -1){
				//有记录, 提升次序
				TimerManager.timerList.splice(index, 1);
			}
		}
	}
		
	/**
		* 是否已经注册了timer回调函数
		* @param func 
		* @return 
		* 
		*/			
	public static hasFunction(func:any):boolean{
		if(TimerManager.timerLoops[func]!=null){
			return true;
		}
		else{
			return false;
		}
	}
		
	/**
		* 加入一个方法 在下一帧触发
		* @param method
		* @param args
		* 
		*/		
    public static addNextFrame(thisObj:any, method: any,args:Array<any> = null):void{
		if(method!=null){
			if(TimerManager.nextFrames[method] == null){
                TimerManager.nextFrames[method] = new Handler(thisObj, method,args);
			}
			var index:number = TimerManager.nextFrameList.indexOf(method);
			if(index != -1){
				TimerManager.nextFrameList.splice(index, 1);
			}
			TimerManager.nextFrameList.push(method);
		}
	}
		
	/**
		* 加入到桢循环
		* @param method
		* @param args
		*
		*/
    public static addToFrame(thisObj: any, method: any, args:Array<any> = null):void{
		if(method == null){
			return;
		}
		if(TimerManager.frameLoops[method] == null){
            TimerManager.frameLoops[method] = new Handler(thisObj, method,args);
		}
		var index:number = TimerManager.frameList.indexOf(method);
		if(index != -1){
			TimerManager.frameList.splice(index, 1);
		}
		TimerManager.frameList.push(method);
	}
		
	/**
		* 移除出桢循环
		* @param method
		*
		*/
    public static removeFromFrame(method: any):void{
		if(method == null){
			return;
		}
		if(TimerManager.frameLoops[method]){
			TimerManager.frameLoops[method].unload();
			TimerManager.frameLoops[method] = null;
			delete TimerManager.frameLoops[method];
			var index:number = TimerManager.frameList.indexOf(method);
			if(index != -1){
				TimerManager.frameList.splice(index, 1);
			}
		}
	}
		
    public static hasFrame(method: any):boolean{
		return TimerManager.frameLoops[method] != null;
	}
		
	/**
		* 模拟setTimeout 
		* @param method
		* @param delay		单位毫秒
		* @param args
		* 
		*/		
	public static setTimeout(thisObj:any, method:Function, delay:number, args:Array<any> = null):number{
		var result:number = 0;
		if(method!=null){
			result = ++TimerManager._timeoutIdCounter;
			TimerManager.addFuncByKey(thisObj, "timeout_" + result, method, delay, 1, args);
			if(TimerManager.mainTimer.running==false){
				TimerManager.mainTimer.start();
			}
		}
		return result;
	}
		
	public static clearTimeout(id:number = 0):void{
		TimerManager.removeFunction("timeout_" + id);
	}
		
	/**
		* 计算帧频 
		* 
		*/		
	private static doFrameRate():void{
		var t:number=egret.getTimer();
		TimerManager._frameRate=1000 / (t - TimerManager.lastTime);
		TimerManager.lastTime=t;
	}
		
	/**
		* 获取最近的平均帧频
		* 记录了12个帧频，排除最快和最慢2个
		* @return
		*
		*/
	public static get realRate():number{
		return TimerManager._frameRate;
	}
}

