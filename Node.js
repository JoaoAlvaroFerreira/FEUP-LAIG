//Node no = new Node(...);
//console.log(no);

class Node(){	

	constructor(obj, idNode){	
		this.graph = obj;
		this.idNode = idNode;
		this.material= null;
		this.texture = null;
		this.mattransf = null;
		this.descendants = [];
	};
	
	insert(nodenome){
		this.descendents.push(nodenome);
	};

	getSize{
		return this.descendents.length;
	};
	
	setMaterial(material){
		this.material = material;
	};
	
	setMatrix(m){
		this.mattransf = math.clone(m);
		//console.log(this.mattransf);
	}
	
	
}