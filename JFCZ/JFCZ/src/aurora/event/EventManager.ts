class EventManager{
	private static instance:EventManager = null;
		
	private observers:any = null;
		
	private mapping:any = null;
		
	public constructor(){
        this.observers = {};
        this.mapping = {};
	}
		
	private static getInstance():EventManager{
		if(EventManager.instance == null){
			EventManager.instance = new EventManager();
		}
			
		return EventManager.instance;
	}
		
	/**
		*  
		* @param type
		* @param listener
		* @param module
		* @param method
		* 以后优化：增加优先级功能priority
		*/		
	private add(thisObj:any, type:string,listener:any, module:string=null, method:string=null):void{
		var funcs:Array<Handler> = this.observers[type];
		if(funcs == null){
            funcs = new Array<Handler>();
			this.observers[type] = funcs;
		}
		else{
            if (EventManager.getInstance().getHandlerIndex(funcs, listener)!= -1) {
                return;
            }
		}
			
		funcs.push(new Handler(thisObj, listener));
			
		this.mapping[listener] = {'module':module, 'method':method};
	}
		
    private remove(type: string, listener: any):void{
        var funcs: Array<Handler> = this.observers[type];
		if(funcs){
            var index: number = EventManager.getInstance().getHandlerIndex(funcs, listener);
			if(index != -1){
				funcs.splice(index,1);
			}
		}
			
		delete this.mapping[listener];
	}
		
	/**
		* execute在调用每个回调函数的时候 中途可能会导致当前正在执行的列表长度发生改变(增加或减少)
		* 解决方案一：每次执行前，拷贝一个副本进行处理，
		* 解决方案二：采用倒序执行（只能适合对没有优先级要求的需求）
		* @param type
		* @param args
		* 
		*/		
	private execute(type:string, args:Array<any> = null):void{
		var funcs:Array<Handler> = this.observers[type];
		if( funcs && funcs.length > 0 ){
			var list:Array<Handler> = funcs.concat();
            var listener: Handler;
			var index:number = 0;
			var len:number = list.length;
			while(index < len){
				listener = list[index];
                if (listener != null) {
                    listener.executeByParams(args);
				}
				++index;
			}
				
			list = null;
		}
	}
		
	/**
		* 发送事件 - 支持更多参数传递
		* @param type 事件类型
		* @param args 参数列表
		* 
		*/		
	public static dispatchEvent(type:string, args:Array<any> = null):void{ 
		EventManager.getInstance().execute(type, args);
	}

	/**
		* 注册事件监听 
		* @param type 事件类型
		* @param listener 监听函数
		* @param module 模块名
		* @param method 方法名
		* 
		*/
    public static addEvent(thisObj:any, type:string,listener:Function, module:string=null, method:string=null):void{
        EventManager.getInstance().add(thisObj, type,listener,module,method);
	}
		
	/**
		* listener == null 返回是否已经注册了type类似的侦听
		* listener != null 返回是否注册了此listener的侦听 
		* @param type
		* @return 
		* 
		*/		
	private hasEvent2(type:string,listener:Function=null):boolean{
		var result:boolean = false;
        var funcs: Array<Handler> = this.observers[type];
		if(funcs){
			if( listener == null ){
				result = true;
			}
			else{
                var index: number = EventManager.getInstance().getHandlerIndex(funcs, listener);
				if(index != -1){
					result = true;
				}
			}
		}
			
		return result;
	}
	
    private getHandlerIndex(funcs: Array<Handler>, h: Function): number {
        var result: number = -1;
        if (funcs && h) {
            var len: number = funcs.length;
            var item: any = null;
            for (var i: number = 0; i < len; ++i) {
                item = funcs[i];
                if (item && item.handler == h)
                {
                    result = i;
                    break;
                }
            }
        }

        return result;
    }

	public static hasEvent(type:string, listener:Function=null):boolean{
		return EventManager.getInstance().hasEvent2(type, listener);
	}
		
	/**
		* 删除事件监听 
		* @param type 事件类型
		* @param listener 监听函数
		* 
		*/		
	public static removeEvent(type:string,listener:Function):void{
		EventManager.getInstance().remove(type,listener);
	}
}