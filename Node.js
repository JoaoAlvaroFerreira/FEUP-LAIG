//Node no = new Node(...);
//console.log(no);

function Node(){		
		this.material= null;
		this.texture = null;
		this.mattransf = null;
		this.descendants = [];
	};
	
	node.prototype.insert = function (nodenome){
		this.descendents.push(nodenome);
	};

	node.prototype,getSize = function(){
		return this.descendents.length;
	};
	
	node.prototype.setMaterial = function(material){
		this.material = material;
	};
	
	node.prototype.setMatrix = fmotion(m){
		this.mattransf = math.clone(m);
		console.log(this.mattransf);
	}