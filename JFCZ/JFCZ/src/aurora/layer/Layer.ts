class Layer extends egret.DisplayObjectContainer{
	public depth:number = 0;
		
	public constructor(depth:number = 0){
		super();
		this.depth = depth;
	}

}
