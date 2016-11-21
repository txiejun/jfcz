class GlobalSetting{
	/**
		* 游戏根 
		*/	
	public static root:egret.DisplayObjectContainer = null;
		
	/**
		* 主程序-MainGame 
		*/		
	public static mainGame:egret.DisplayObjectContainer;
		
	/**
		* 游戏根目录 
		*/		
	public static rootPath:string = "";
		
	/**
		* 后端指定的状态 表示是否为内网还是外网服务器 比如： isDebug=true可以打开GM命令 进行调试等
		*/		
	public static isDebug:boolean = false;
		
	/**
		* 是否为前端调试状态 与后端不相关的调试 比如直接使用前端本地文件resource目录下的资源，js等；
		*/		
	public static localDebug:boolean = false;
		
	/**
		*是否抛出异常 
		*/		
	public static showException:boolean = false;
		
	/**
		* 游戏舞台 
		*/		
	public static stage:egret.Stage = null;
		
	/**
		* 游戏当前屏幕宽度 
		*/		
	public static stageWidth:number = 0;
		
	/**
		* 游戏当前屏幕高度 
		*/		
	public static stageHeight:number = 0;
		
	/**
		* flash传递过来的参数 
		*/		
	public static parameters:any = null;
		
	/**
		* 帧率 
		*/		
	public static frameRate:number = 60;
		
	/**
		*版本 
		*/		
	public static version:number = 0;
		
		
	public static serviceHost:string;
		
	/**
		* 游戏的宽度
		*/		
	public static gameWidth:number = 720;
		
	/**
		* 游戏的高度
		*/		
	public static gameHeight:number = 1200;
		
	/**
		* 游戏最小宽度
		*/		
	public static minWidth:number = 100;
		
	/**
		* 游戏最小高度 
		*/		
	public static minHeight:number = 100;
		
	/**
		* 游戏最大宽度
		*/		
	public static maxWidth:number = 2000;
		
	/**
		* 游戏最大高度 
		*/		
	public static maxHeight:number = 2000;
	public static appScale:number = 1;
		
	public constructor(){
	}

		
	/**
		* 注册游戏根-Main 
		* @param r
		* 
		*/		
	public static initialize(r:egret.DisplayObjectContainer):void{
        GlobalSetting.root = r;
        GlobalSetting.mainGame = r;
		if(GlobalSetting.root){
			GlobalSetting.stage = GlobalSetting.root.stage;
            GlobalSetting.gameWidth = GlobalSetting.stage.stageWidth;
            GlobalSetting.gameHeight = GlobalSetting.stage.stageHeight;

		}
		else{
			throw new Error("GlobalSetting initialize error, root can't been null!");
		}
	}
		
	/**
		* 获得路径 
		* @param url
		* @return 
		* 
		*/		
	public static getRootPath(url:string):string{
		var result:string = "";
			
		if( url ){
			result = url;
			var index:number = result.indexOf( "?" );
			if(index != -1 ){
				result = result.substring(0, index);
			}
				
			index = result.lastIndexOf(".");
			if(index != -1 ){
				result = result.substring(0, index);
			}
				
			index = result.lastIndexOf("/");
			if(index<=0){
				index = result.lastIndexOf("\\");
			}
			if( index != -1 ){
				result = result.substring(0, index+1);
			}
		}
			
		return result;
	}
		
}
