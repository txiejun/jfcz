class Engine{
	public static VERSION:string = "1.0.0.0";
		
	public constructor(){
	}
		
	/**
		* 初始化 - MainGame
		* @param root 游戏根
		* 
		*/		
	public static initialize(root:egret.DisplayObjectContainer):void{
		if(root == null){
			throw <Error><any> ("Root is null, Engine initialize error.");
		}
			
		if(root.stage == null){
			throw <Error><any> ("Can't get the stage.");
		}
        GlobalSetting.initialize(root);
		TimerManager.initialize(root.stage);
		LayerManager.initialize(root);
        LayerManager.createMainLayer();
	}
}