//Node no = new Node(...);
//console.log(no);

class Node{

    constructor(obj,idNode){

        this.graph = obj;
        this.idNode = idNode;
        this.material = null;
        this.texture = null;
        this.mattransf = null;
        this.descendents = [];
    };

    insert(nodeName){
        this.descendents.push(nodeName);
    }

    getSize(){
        return this.descendents.length;
    }

    setMaterial(material){
        this.material = material;
    }

    setMatrix(m){
        this.mattransf = math.clone(m);
    }
}