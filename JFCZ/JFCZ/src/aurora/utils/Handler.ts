class Handler{
	private _handler:Function;
	private _params:Array<any>;
    private _thisObj: any;

    public constructor(thisObj:any, handler:Function, params:Array<any>=null){
		this._handler=handler;
        this._params = params;
        this._thisObj = thisObj;
	}
		
	public execute(isUnload:boolean = false):void{
		if (this._handler != null){
            this._handler.apply(this._thisObj, this._params);
			if(isUnload){
				this.unload();
			}
		}
	}
		
    public executeByParams(params: Array<any>): void {
        if (this._handler != null) {
            this._handler.apply(this._thisObj, params);
        }
    }

	public unload():void{
		this._handler=null;
        this._params = null;
        this._thisObj = null;
	}
		
	public get handler():Function{
		return this._handler;
	}
		
	public set handler(value:Function){
		this._handler = value;
	}
		
	public get params():Array<any>{
		return this._params;
	}
		
	public set params(value:Array<any>){
		this._params = value;
	}
}