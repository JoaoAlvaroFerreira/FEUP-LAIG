class Terrain extends Plane{
    
    constructor(scene, idTexture, idheightmap, divs, heightscale){
        super(scene, divs, divs);
        this.scene.initShaders(idTexture, idheightmap, heightscale,0);}
        


    
    applyHeightMap(){
        var img = new Image();
        //  img.src = idheightmap;
        
         // this.scene.terrainShader.setUniformValues({normScale: heightdata});
  
          img.onload = function () {
          
              //get height data from img
          
          
              var img = new Image();
              img.onload = function () {
                  var data = getHeightData(img);
  
                  // plane
                  //plane = new Plane( 100, 100, 127, 127 );
                var plane = []
  
                  for ( var i = 0, l = plane.vertices.length; i < l; i++ ) {
                      plane.vertices[i].position.z = data[i];
                  }
  
                  var planeMesh = addMesh( plane, 100,  0, FLOOR, 0, -1.57,0,0, getTerrainMaterial() );
                  //waterMesh.visible = true;
              };
              img.src = idheightmap+".jpg";
      }
          //super(scene, divs, divs);
          //this.scene.initShaders(idTexture, idheightmap, heightscale,0);
      
        };


    getHeightData(img) {
        var canvas = document.createElement( 'canvas' );
        canvas.width = 512;
        canvas.height = 512;
        var context = canvas.getContext( '2d' );
    
        var size = 512 * 512, data = new Float32Array( size );
    
        context.drawImage(img,0,0);
    
        for ( var i = 0; i < size; i ++ ) {
            data[i] = 0
        }
    
        var imgd = context.getImageData(0, 0, 512, 512);
        var pix = imgd.data;
    
        var j=0;
        for (var i = 0, n = pix.length; i < n; i += (4)) {
            var all = pix[i]+pix[i+1]+pix[i+2];
            data[j++] = all/30;
        }
    
        return data;
    }

	display(){
        this.scene.setActiveShader(this.scene.terrainShader);
        this.scene.pushMatrix();
        this.scene.testTexture.bind(0);
        this.scene.translate(15,10,15);
        this.obj.display();
         this.scene.popMatrix();
         this.scene.setActiveShader(this.scene.defaultShader);
		
    };
    
    
};