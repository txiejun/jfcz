class DepthContainer{
	/**
		* 添加IDepth的显示容器 
		*/		
	public _container:egret.DisplayObjectContainer;
	public _layerList:Array<Layer>;
		
	public constructor(){
        this._layerList = new Array<Layer>();
	}
		
    public compareDepth(a: Layer, b: Layer):number{
		var result:number = 0;
		if(a.depth < b.depth){
			result = -1;
		}
		else if(a.depth > b.depth){
			result = 1;
		}
			
		return result;
	}
		
	/**
		* 注册容器 - 表明 IDepth是显示对象 否则不要注册此容器
		* @param container
		* 
		*/		
    public register(container: egret.DisplayObjectContainer):void{
		this._container = container;
	}
		
    public getContainer(): egret.DisplayObjectContainer{
		return this._container;
	}
		
    public getLayerList(): Array<Layer>{
		return this._layerList;
	}
		
    public push(layer: Layer):void{
		if(this._layerList.indexOf(layer) == -1){
			this._layerList.push(layer);
		}
	}
		
	public sortLayers():void{
		this._layerList.sort(this.compareDepth);
		if(this._container){
			var len:number = this._layerList.length;
			for(var i:number = 0; i< len; ++i){
                this._container.addChild(<egret.DisplayObject><any> (this._layerList[i]));
			}
		}
	}
		
    public addLayer(layer: Layer):void{
		if(layer){
			if(this._layerList.indexOf(layer) == -1){
				this._layerList.push(layer);
				this.sortLayers();
			}
		}
	}
		
    public removeLayer(layer: Layer, sort:boolean = true):void{
		if(layer){
			var index:number = this._layerList.indexOf(layer);
			if(index != -1){
				this._layerList.splice(index, 1);
                if (this._container && this._container == (<egret.DisplayObject><any> layer).parent){
                    (<egret.DisplayObject><any> layer).parent.removeChild(<egret.DisplayObject><any> layer);
				}
				if(sort){
					this.sortLayers();
				}
			}
		}
	}
		
	/**
		* 交换对象在显示列表中的深度 
		* 交换深度值-交换数组中顺序-交换显示列表深度
		* @param a
		* @param b
		* 
		*/		
    public swapLayer(a: Layer, b: Layer):void{
		if(a && b){
			var aDepth:number = a.depth;
			var aIndex:number = this._layerList.indexOf(a);
			var bIndex:number = this._layerList.indexOf(b);
			if(aIndex >=0 && bIndex >=0){
				a.depth = b.depth;
				b.depth = aDepth;
				this._layerList[aIndex] = b;
				this._layerList[bIndex] = a;
                if (this._container && this._container.contains(<egret.DisplayObject><any> a) && this._container.contains(<egret.DisplayObject><any> b)){
                    this._container.swapChildren(<egret.DisplayObject><any> a, <egret.DisplayObject><any> b);
				}
			}
		}
	}
		
    public getLayer(depth: number = 0): Layer{
        var result: Layer = null;
		var len:number = this._layerList.length;
		for(var i:number = 0; i< len; ++i){
			if(this._layerList[i].depth == depth){
				result = this._layerList[i];
				break;
			}
		}
		return result;
	}
		
	/**
		* 是否调用清除 
		* @param isDispose
		* 
		*/		
	public clearLayer(isDispose:boolean = false):void{
		var len:number = this._layerList.length;
        var target: egret.DisplayObject;
		for(var i:number = 0; i< len; ++i){
            target = <egret.DisplayObject><any> (this._layerList[i]);
			if(target && this._container && this._container == target.parent){
				target.parent.removeChild(target);
                if (isDispose && (<aurora.IDisposable><any> target) != null /*&& target instanceof aurora.IDisposable*/){
                    (<aurora.IDisposable><any> target).dispose();
				}
			}
		}
		this._layerList.length = 0;
	}
}
