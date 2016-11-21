class LayerManager{
	private static _container:DepthContainer = new DepthContainer();
		
	/**
		* 是否已经初始化 
		*/		
	private static initialized:boolean = false;
		
	/**
		* 世界场景层 - 就是World
		*/		
	public static worldLayer:Layer;
	/**
		* UI层 
		*/		
	public static uiLayer:Layer;
	/**
		* 窗口弹出层 
		*/		
	public static popUpLayer:Layer;
	/**
		* 引导层 
		*/		
	public static guideLayer:Layer;
	/**
		* 引导上层
		*/		
	public static topLayer:Layer;
	/**
		* 工具提示层 
		*/		
	public static toolTipLayer:Layer;
	/**
		* 光标层 
		*/		
	public static cursorLayer:Layer;
		
	public constructor(){
	}
		
	/**
		* 注册整个层的根 
		* @param r
		* 
		*/		
	public static initialize(r:egret.DisplayObjectContainer):void{
		LayerManager._container.register(r);
			
	}
		
	/**
		* 构建游戏层次 - 此处并没有一开始就构建worldLayer
		* 
		*/		
	public static createMainLayer():void{
		if(LayerManager.initialized == false){
			LayerManager.initialized = true;
			LayerManager.worldLayer = new Layer(LayerConst.DEPTH_WORLD);
			LayerManager.worldLayer.name = "worldLayer";
			LayerManager.uiLayer = new Layer(LayerConst.DEPTH_UI);
			LayerManager.popUpLayer = new Layer(LayerConst.DEPTH_POPUP);
			LayerManager.popUpLayer.name = "popUpLayer";
			LayerManager.guideLayer = new Layer(LayerConst.DEPTH_GUILD);
			LayerManager.guideLayer.name = "guideLayer";
			LayerManager.topLayer = new Layer(LayerConst.DEPTH_TOP);
			LayerManager.topLayer.name = "topLayer";
			LayerManager.toolTipLayer = new Layer(LayerConst.DEPTH_TOOLTIP);
			LayerManager.toolTipLayer.name = "toolTipLayer";
			LayerManager.cursorLayer = new Layer(LayerConst.DEPTH_CURSOR);
			LayerManager.cursorLayer.name = "cursorLayer";
				
			LayerManager._container.push(LayerManager.worldLayer);
			LayerManager._container.push(LayerManager.uiLayer);
			LayerManager._container.push(LayerManager.popUpLayer);
			LayerManager._container.push(LayerManager.guideLayer);
			LayerManager._container.push(LayerManager.topLayer);
			LayerManager._container.push(LayerManager.toolTipLayer);
			LayerManager._container.push(LayerManager.cursorLayer);
			LayerManager._container.sortLayers();
		}
	}
		
	public static sortLayers():void{
		LayerManager._container.sortLayers();
	}
		
	public static addLayer(layer:Layer):void{
		if(layer){
			if(layer.depth == LayerConst.DEPTH_WORLD){
				//添加地图层
//					worldLayer = layer;
				LayerManager.worldLayer.addChild(layer);
			}
			else if(layer.depth == LayerConst.DEPTH_UI){
				//UI层
				LayerManager.uiLayer = layer;
			}
			if(layer.depth != LayerConst.DEPTH_WORLD){
				LayerManager._container.addLayer(layer);
			}
		}
	}
		
	public static removeLayer(layer:Layer):void{
		if(layer && layer.depth == LayerConst.DEPTH_WORLD){
			//删除地图层
			LayerManager.worldLayer = null;
		}
		LayerManager._container.removeLayer(layer);
	}
		
	public static getLayer(depth:number = 0):Layer{
		return <Layer><any> (LayerManager._container.getLayer(depth));
	}
		
	public static swapLayer(a:Layer, b:Layer):void{
		LayerManager._container.swapLayer(a, b);
	}
		
	public static clearLayer():void{
		LayerManager._container.clearLayer();
	}
}
