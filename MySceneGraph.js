var DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.

//views, ambient, lights, textures, materials, transformations, primitives, components
/*
var INITIALS_INDEX = 0;
var ILLUMINATION_INDEX = 1;
var LIGHTS_INDEX = 2;
var TEXTURES_INDEX = 3;
var MATERIALS_INDEX = 4;
var NODES_INDEX = 5;
*/

var VIEWS_INDEX = 0;
var AMBIENT_INDEX = 1;
var LIGHTS_INDEX = 2;
var TEXTURES_INDEX = 3
var MATERIALS_INDEX = 4;
var TRANSFORMATIONS_INDEX = 5;
var PRIMITIVES_INDEX = 6;
var COMPONENTS_INDEX = 7;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * @constructor
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        this.nodes = [];

        this.idRoot = null;                    // The id of the root element.

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */

        this.reader.open('scenes/' + filename, this);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        console.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
		
		console.log(rootElement.nodeName);
        if (rootElement.nodeName != "yas")
            return "root tag <SCENE> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }
	
        var error;

        // Processes each node, verifying errors.

        // <VIEWS>
        var index;
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <VIEWS> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <VIEWS> out of order");

            //Parse INITIAL block
            if ((error = this.parseViews(nodes[index])) != null)
                return error;
        }
		
		 // <AMBIENT>
        if ((index = nodeNames.indexOf("ambient")) == -1)
            return "tag <AMBIENT> missing";
        else {
            if (index != AMBIENT_INDEX)
                this.onXMLMinorError("tag <AMBIENT> out of order");

            //Parse AMBIENT block
            if ((error = this.parseAmbient(nodes[index])) != null)
                return error;
        }

     

        // <LIGHTS>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <LIGHTS> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <LIGHTS> out of order");

            //Parse LIGHTS block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }

        // <TEXTURES>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <TEXTURES> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse TEXTURES block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <MATERIALS>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <MATERIALS> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <MATERIALS> out of order");

            //Parse MATERIALS block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <TRANSFORMATIONS>
        if ((index = nodeNames.indexOf("transformations")) == -1)
            return "tag <TRANSFORMATIONS> missing";
        else {
            if (index != TRANSFORMATIONS_INDEX)
                this.onXMLMinorError("tag <TRANSFORMATIONS> out of order");

            //Parse NODES block
            if ((error = this.parseTransformations(nodes[index])) != null)
                return error;
        }
		
		   // <PRIMITIVES>
        if ((index = nodeNames.indexOf("primitives")) == -1)
            return "tag <PRIMITIVES> missing";
        else {
            if (index != PRIMITIVES_INDEX)
                this.onXMLMinorError("tag <PRIMITIVES> out of order");

            //Parse NODES block
            if ((error = this.parsePrimitives(nodes[index])) != null)
                return error;
        }
		
		   // <COMPONENTS>
        if ((index = nodeNames.indexOf("components")) == -1)
            return "tag <COMPONENTS> missing";
        else {
            if (index != COMPONENTS_INDEX)
                this.onXMLMinorError("tag <COMPONENTS> out of order");

            //Parse NODES block
            if ((error = this.parseComponents(nodes[index])) != null)
                return error;
        }
    }
	
	
    /**
     * Parses the <VIEWS> block.
     */
    parseViews(viewsNode) {

        var children = viewsNode.children;
		var grandChildren;

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

		this.near = 0.1;
        this.far = 500;
		this.angles = 0;
		
		for(var i = 0; i < children.length; i++){
			
			  if (children[i].nodeName != "perspective") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
				
			}
		
		    var perspectiveId = this.reader.getString(children[i], 'id');
            if (perspectiveId == null)
                return "no ID defined for perspective";
			
			var near = this.reader.getString(children[i], 'near');
            if (near == null)
                return "no near defined for transformation";
			
			var far = this.reader.getString(children[i], 'far');
            if (far == null)
                return "no far defined for perspective";
			
			var angles = this.reader.getString(children[i], 'angles');
            if (angles == null)
                return "no angles defined for perspective";
			
			
			grandChildren = children[i].children;
			nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }
			
			var fromIndex = nodeNames.indexOf("from");
			var toIndex = nodeNames.indexOf("to");
			
			
			var fromCoordinates = []; 
            if (fromIndex != -1) {
                // x
                var x = this.reader.getFloat(grandChildren[fromIndex], 'x');
                if (!(x != null && !isNaN(x)))
                    return "unable to parse x-coordinate = " + perspectiveId;
                else
                    fromCoordinates.push(x);

                // y
                var y = this.reader.getFloat(grandChildren[fromIndex], 'y');
                if (!(y != null && !isNaN(y)))
                    return "unable to parse y-coordinate = " + perspectiveId;
                else
                    fromCoordinates.push(y);

                // z
                var z = this.reader.getFloat(grandChildren[fromIndex], 'z');
                if (!(z != null && !isNaN(z)))
                    return "unable to parse z-coordinate = " + perspectiveId;
                else
                    fromCoordinates.push(z); 
            }
			
			var toCoordinates = []; 
            if (toIndex != -1) {
                // x
                var x = this.reader.getFloat(grandChildren[toIndex], 'x');
                if (!(x != null && !isNaN(x)))
                    return "unable to parse x-coordinate = " + perspectiveId;
                else
                    toCoordinates.push(x);

                // y
                var y = this.reader.getFloat(grandChildren[toIndex], 'y');
                if (!(y != null && !isNaN(y)))
                    return "unable to parse y-coordinate = " + perspectiveId;
                else
                    toCoordinates.push(y);

                // z
                var z = this.reader.getFloat(grandChildren[toIndex], 'z');
                if (!(z != null && !isNaN(z)))
                    return "unable to parse z-coordinate = " + perspectiveId;
                else
                    toCoordinates.push(z); 
            }
			
			
			}

       
		var indexOrtho = nodeNames.indexOf("ortho");
        if (indexOrtho == -1) {
            this.onXMLMinorError("ortho missing");
        }
		else {
            this.near = this.reader.getFloat(children[indexOrtho], 'near');
            this.far = this.reader.getFloat(children[indexOrtho], 'far');
			var left = this.reader.getFloat(children[indexOrtho], 'left');
            var right = this.reader.getFloat(children[indexOrtho], 'right');
            var top = this.reader.getFloat(children[indexOrtho], 'top');
            var bottom = this.reader.getFloat(children[indexOrtho], 'bottom');
		
		 if (!(this.near != null && !isNaN(this.near))) {
                this.near = 0.1;
                this.onXMLMinorError("unable to parse value for near plane; assuming 'near = 0.1'");
            }
			  else if (!(this.far != null && !isNaN(this.far))) {
                this.far = 500;
                this.onXMLMinorError("unable to parse value for far plane; assuming 'far = 500'");
            }
		       if (this.near >= this.far)
                return "'near' must be smaller than 'far'";

            if (top == null || bottom == null || left == null || right == null) {
				left = "-5";
				right = "5";
				top = "5";
				bottom = "-5";
                this.onXMLMinorError("failed to parse coordinates of final perspective position; assuming standard ones");
            }
        }


        this.log("Parsed views");

        return null;
    }
	
	  /**
     * Parses the <AMBIENT> block.
     * @param {ambient block element} illuminationNode
     */
    parseAmbient(ambientNode) {
    
		
        var children = ambientNode.children;
		var grandChildren;

        this.ambientSources = [];
        var ambientNum = 0;
		
		var nodeNames = [];

       

	   
    for (var i = 0; i < children.length; i++)
        nodeNames.push(children[i].nodeName);
	
		  for (var i = 0; i < children.length; i++) {

		
			
          var ambientIndex = nodeNames.indexOf("ambient");
			var ambientColor = [];
            if (ambientIndex != -1) {
                
                // r
                var r = this.reader.getFloat(children[ambientIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the ambient color for the ID = " + materialId;
                else
                    ambientColor.push(r);

                // g
                var g = this.reader.getFloat(children[ambientIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse r color for the ambient color for the I D= " + materialId;
                else
                    ambientColor.push(g);

                // b
                var b = this.reader.getFloat(children[ambientIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the ambient color for the ID = " + materialId;
                else
                    ambientColor.push(b);

                // a
                var a = this.reader.getFloat(children[ambientIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the ambient color for the ID = " + materialId;
                else
                    ambientColor.push(a);
            }
			
			var backgroundIndex = nodeNames.indexOf("background");
			var backgroundColor = [];
            if (backgroundIndex != -1) {
                
                // r
                var r = this.reader.getFloat(children[backgroundIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the background color for the ID = " + materialId;
                else
                    backgroundColor.push(r);

                // g
                var g = this.reader.getFloat(children[backgroundIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse r color for the background color for the I D= " + materialId;
                else
                    backgroundColor.push(g);

                // b
                var b = this.reader.getFloat(children[backgroundIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the background color for the ID = " + materialId;
                else
                    backgroundColor.push(b);

                // a
                var a = this.reader.getFloat(children[backgroundIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the background color for the ID = " + materialId;
                else
                    backgroundColor.push(a);
            }
		  
       
				
				
            this.ambientSources[ambientIndex] = [ambientColor, backgroundColor];
            ambientNum++;
            }
			
		  

        return null;
    }
	
	
    /**
     * Parses the <LIGHTS> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {

        var children = lightsNode.children;

        this.lights = [];
        var numLights = 0;

        var grandChildren = [];
        var nodeNames = [];

		
    for (var i = 0; i < children.length; i++)
        nodeNames.push(children[i].nodeName);
		
        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

		 if (children[i].nodeName != "omni") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
			else{
            var omniId = this.reader.getString(children[i], 'id');
            if (omniId == null)
                return "no ID defined for omni";
			
			  var enabled = this.reader.getString(children[i], 'enabled');
            if (enabled == null)
                return "no enabled defined for omni";
			
			  
            grandChildren = children[i].children;
            // Specifications for the current light.

              grandNodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                grandNodeNames.push(grandChildren[j].nodeName);
            }

            // Gets indices of each element.
          
            var ambientIndex = grandNodeNames.indexOf("ambient");
            var diffuseIndex = grandNodeNames.indexOf("diffuse");
            var specularIndex = grandNodeNames.indexOf("specular");
			var locationIndex = grandNodeNames.indexOf("location");
      
 
			
			  var locationCoordinates = [];
            if (locationIndex != -1) {
                // x
                var x = this.reader.getFloat(grandChildren[locationIndex], 'x');
                if (!(x != null && !isNaN(x)))
                    return "unable to parse x-coordinate of the omni = " + omniId;
                else
                    locationCoordinates.push(x);

                // y
                var y = this.reader.getFloat(grandChildren[locationIndex], 'y');
                if (!(y != null && !isNaN(y)))
                    return "unable to parse y-coordinate of the omni = " + omniId;
                else
                    locationCoordinates.push(y);

                // z
                var z = this.reader.getFloat(grandChildren[locationIndex], 'z');
                if (!(z != null && !isNaN(z)))
                    return "unable to parse z-coordinate of the omni = " + omniId;
                else
                    locationCoordinates.push(z); 
				
					// w
                var w = this.reader.getFloat(grandChildren[locationIndex], 'w');
                if (!(w != null && !isNaN(w)))
                    return "unable to parse w-coordinate of the spot = " + spotId;
                else
                    locationCoordinates.push(w); 
            }
            else
                return "translation coordinates undefined for ID = " + omniId;
		
			
			var ambientColor = [];
            if (ambientIndex != -1) {
                // r
                var r = this.reader.getFloat(grandChildren[ambientIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the ambient color for the ID = " + omniId;
                else
                    ambientColor.push(r);

                // g
                var g = this.reader.getFloat(grandChildren[ambientIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse g color for the ambient color for the I D= " + omniId;
                else
                    ambientColor.push(g);

                // b
                var b = this.reader.getFloat(grandChildren[ambientIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the ambient color for the ID = " + omniId;
                else
                    ambientColor.push(b);

                // a
                var a = this.reader.getFloat(grandChildren[ambientIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the ambient color for the ID = " + omniId;
                else
                    ambientColor.push(a);
            }
			
			var diffuseColor = [];
            if (diffuseIndex != -1) {
                // r
                var r = this.reader.getFloat(grandChildren[diffuseIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the diffuse color for the ID = " + omniId;
                else
                    diffuseColor.push(r);

                // g
                var g = this.reader.getFloat(grandChildren[diffuseIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse g color for the diffuse color for the I D= " + omniId;
                else
                    diffuseColor.push(g);

                // b
                var b = this.reader.getFloat(grandChildren[diffuseIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the diffuse color for the ID = " + omniId;
                else
                    diffuseColor.push(b);

                // a
                var a = this.reader.getFloat(grandChildren[diffuseIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the ambient color for the ID = " + omniId;
                else
                    diffuseColor.push(a);
			}
			
			var specularColor = [];
            if (specularIndex != -1) {
                // r
                var r = this.reader.getFloat(grandChildren[specularIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the specular color for the ID = " + omniId;
                else
                    specularColor.push(r);

                // g
                var g = this.reader.getFloat(grandChildren[specularIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse g color for the specular color for the I D= " + omniId;
                else
                    specularColor.push(g);

                // b
                var b = this.reader.getFloat(grandChildren[specularIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the specular color for the ID = " + omniId;
                else
                    specularColor.push(b);

                // a
                var a = this.reader.getFloat(grandChildren[specularIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the specular color for the ID = " + omniId;
                else
                    specularColor.push(a);
				}
				
				 
			this.omnis = [locationCoordinates, ambientColor, diffuseColor, specularColor];
           
			}
			
			
			
			
			
			
			if (children[i].nodeName != "spot") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
			else{
            var spotId = this.reader.getString(children[i], 'id');
            if (spotId == null)
                return "no ID defined for spot";
			
			  var enabled = this.reader.getString(children[i], 'enabled');
            if (enabled == null)
                return "no enabled defined for spot";
			
			  
            grandChildren = children[i].children;
            // Specifications for the current light.

              grandNodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                grandNodeNames.push(grandChildren[j].nodeName);
            }

            // Gets indices of each element.
          
            var ambientIndex = grandNodeNames.indexOf("ambient");
            var diffuseIndex = grandNodeNames.indexOf("diffuse");
            var specularIndex = grandNodeNames.indexOf("specular");
			var locationIndex = grandNodeNames.indexOf("location");
			var targetIndex = grandNodeNames.indexOf("target");
 
			
			  var locationCoordinates = [];
            if (locationIndex != -1) {
                // x
                var x = this.reader.getFloat(grandChildren[locationIndex], 'x');
                if (!(x != null && !isNaN(x)))
                    return "unable to parse x-coordinate of the spot = " + spotId;
                else
                    locationCoordinates.push(x);

                // y
                var y = this.reader.getFloat(grandChildren[locationIndex], 'y');
                if (!(y != null && !isNaN(y)))
                    return "unable to parse y-coordinate of the spot = " + spotId;
                else
                    locationCoordinates.push(y);

                // z
                var z = this.reader.getFloat(grandChildren[locationIndex], 'z');
                if (!(z != null && !isNaN(z)))
                    return "unable to parse z-coordinate of the spot = " + spotId;
                else
                    locationCoordinates.push(z); 
				
				// w
                var w = this.reader.getFloat(grandChildren[locationIndex], 'w');
                if (!(w != null && !isNaN(w)))
                    return "unable to parse w-coordinate of the spot = " + spotId;
                else
                    locationCoordinates.push(w); 
            }
            else
                return "translation coordinates undefined for ID = " + spotId;
			
				  var targetCoordinates = [];
            if (targetIndex != -1) {
                // x
                var x = this.reader.getFloat(grandChildren[targetIndex], 'x');
                if (!(x != null && !isNaN(x)))
                    return "unable to parse x-coordinate of the spot = " + spotId;
                else
                    targetCoordinates.push(x);

                // y
                var y = this.reader.getFloat(grandChildren[targetIndex], 'y');
                if (!(y != null && !isNaN(y)))
                    return "unable to parse y-coordinate of the spot = " + spotId;
                else
                    targetCoordinates.push(y);

                // z
                var z = this.reader.getFloat(grandChildren[targetIndex], 'z');
                if (!(z != null && !isNaN(z)))
                    return "unable to parse z-coordinate of the spot = " + spotId;
                else
                    targetCoordinates.push(z); 
            }
            else
                return "translation coordinates undefined for ID = " + spotId;
		
			
			var ambientColor = [];
            if (ambientIndex != -1) {
                // r
                var r = this.reader.getFloat(grandChildren[ambientIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the ambient color for the ID = " + spotId;
                else
                    ambientColor.push(r);

                // g
                var g = this.reader.getFloat(grandChildren[ambientIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse g color for the ambient color for the I D= " + spotId;
                else
                    ambientColor.push(g);

                // b
                var b = this.reader.getFloat(grandChildren[ambientIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the ambient color for the ID = " + spotId;
                else
                    ambientColor.push(b);

                // a
                var a = this.reader.getFloat(grandChildren[ambientIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the ambient color for the ID = " + spotId;
                else
                    ambientColor.push(a);
            }
			
			var diffuseColor = [];
            if (diffuseIndex != -1) {
                // r
                var r = this.reader.getFloat(grandChildren[diffuseIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the diffuse color for the ID = " + spotId;
                else
                    diffuseColor.push(r);

                // g
                var g = this.reader.getFloat(grandChildren[diffuseIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse g color for the diffuse color for the I D= " + spotId;
                else
                    diffuseColor.push(g);

                // b
                var b = this.reader.getFloat(grandChildren[diffuseIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the diffuse color for the ID = " + spotId;
                else
                    diffuseColor.push(b);

                // a
                var a = this.reader.getFloat(grandChildren[diffuseIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the ambient color for the ID = " + spotId;
                else
                    emissionColor.push(a);
			}
			
			var specularColor = [];
            if (specularIndex != -1) {
                // r
                var r = this.reader.getFloat(grandChildren[specularIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the specular color for the ID = " + spotId;
                else
                    specularColor.push(r);

                // g
                var g = this.reader.getFloat(grandChildren[specularIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse g color for the specular color for the I D= " + spotId;
                else
                    specularColor.push(g);

                // b
                var b = this.reader.getFloat(grandChildren[specularIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the specular color for the ID = " + spotId;
                else
                    specularColor.push(b);

                // a
                var a = this.reader.getFloat(grandChildren[specularIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the specular color for the ID = " + spotId;
                else
                    specularColor.push(a);
				}
				
				 
			this.spots[spotId] = [locationCoordinates, targetCoordinates, ambientColor, diffuseColor, specularColor];
            numSpots++;
			}
		
		
		}
        this.log("Parsed lights");

        return null;
    }

	
	
    /**
     * Parses the <TEXTURES> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {
       
	   var children = texturesNode.children;
	
		
        this.components = [];
        var numComponents = 0;

        
        var nodeNames = [];
		
		 for (var i = 0; i < children.length; i++) {

		 var grandChildren = children[i].children;
            if (children[i].nodeName != "texture") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
		 else{
			 var idTextura = this.reader.getString(children[i], 'id');
			 var path = this.reader.getString(children[i], 'file');
		 }
			 nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }
		 }
		
        console.log("Parsed textures");

        return null;
    }
	
	
    /**
     * Parses the <MATERIALS> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
      
        var children = materialsNode.children;
		var numMaterial = 0;
		
		
        this.materials = [];

        var grandChildren = [];
        var nodeNames = [];
		
		
    for (var i = 0; i < children.length; i++)
        nodeNames.push(children[i].nodeName);
		
	 for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
			
            var materialid = this.reader.getString(children[i], 'id');
            if (materialid == null)
                return "no ID defined for material";
			
			  var shininess = this.reader.getString(children[i], 'shininess');
            if (materialid == null)
                return "no shininess defined for material";
			
			  
            grandChildren = children[i].children;
            // Specifications for the current light.

              nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            // Gets indices of each element.
            var emissionIndex = nodeNames.indexOf("emission");
            var ambientIndex = nodeNames.indexOf("ambient");
            var diffuseIndex = nodeNames.indexOf("diffuse");
            var specularIndex = nodeNames.indexOf("specular");
			
			var emissionColor = [];
            if (emissionIndex != -1) {
                // r
                var r = this.reader.getFloat(grandChildren[emissionIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the emission color for the ID = " + materialId;
                else
                    emissionColor.push(r);

                // g
                var g = this.reader.getFloat(grandChildren[emissionIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse r color for the emission color for the I D= " + materialId;
                else
                    emissionColor.push(g);

                // b
                var b = this.reader.getFloat(grandChildren[emissionIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the emission color for the ID = " + materialId;
                else
                    emissionColor.push(b);

                // a
                var a = this.reader.getFloat(grandChildren[emissionIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the emission color for the ID = " + materialId;
                else
                    emissionColor.push(a);
            }
			
			var ambientColor = [];
            if (ambientIndex != -1) {
                // r
                var r = this.reader.getFloat(grandChildren[ambientIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the ambient color for the ID = " + materialId;
                else
                    ambientColor.push(r);

                // g
                var g = this.reader.getFloat(grandChildren[ambientIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse r color for the ambient color for the I D= " + materialId;
                else
                    ambientColor.push(g);

                // b
                var b = this.reader.getFloat(grandChildren[ambientIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the ambient color for the ID = " + materialId;
                else
                    ambientColor.push(b);

                // a
                var a = this.reader.getFloat(grandChildren[ambientIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the ambient color for the ID = " + materialId;
                else
                    ambientColor.push(a);
            }
			
			var diffuseColor = [];
            if (diffuseIndex != -1) {
                // r
                var r = this.reader.getFloat(grandChildren[diffuseIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the diffuse color for the ID = " + materialId;
                else
                    diffuseColor.push(r);

                // g
                var g = this.reader.getFloat(grandChildren[diffuseIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse r color for the diffuse color for the I D= " + materialId;
                else
                    diffuseColor.push(g);

                // b
                var b = this.reader.getFloat(grandChildren[diffuseIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the diffuse color for the ID = " + materialId;
                else
                    diffuseColor.push(b);

                // a
                var a = this.reader.getFloat(grandChildren[diffuseIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the ambient color for the ID = " + materialId;
                else
                    emissionColor.push(a);
			}
			
			var specularColor = [];
            if (specularIndex != -1) {
                // r
                var r = this.reader.getFloat(grandChildren[specularIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the specular color for the ID = " + materialId;
                else
                    specularColor.push(r);

                // g
                var g = this.reader.getFloat(grandChildren[specularIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse r color for the specular color for the I D= " + materialId;
                else
                    specularColor.push(g);

                // b
                var b = this.reader.getFloat(grandChildren[specularIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the specular color for the ID = " + materialId;
                else
                    specularColor.push(b);

                // a
                var a = this.reader.getFloat(grandChildren[specularIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the specular color for the ID = " + materialId;
                else
                    specularColor.push(a);
				}
				
				 
			this.materials = [emissionColor, ambientColor, diffuseColor, specularColor];
           
			}
		
		
        this.log("Parsed materials");
		return null;

	 }


	    /**
     * Parses the <TRANSFORMATIONS> block.
     * @param {transformations block element} transformationsNode
     */
    parseTransformations(transformationsNode) {
        
		var children = transformationsNode.children;
		
		
        this.transformations = [];
        var numTransformations = 0;

        var grandChildren = [];
        var nodeNames = [];
		
		
    for (var i = 0; i < children.length; i++)
        nodeNames.push(children[i].nodeName);
		
		for(var i = 0; i < children.length; i++){
			
			
			  if (children[i].nodeName != "transformations") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            var transformationId = this.reader.getString(children[i], 'id');
            if (transformationId == null)
                return "no ID defined for transformation";
			
			grandchildren = children[i].children;
			grandNodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                grandNodeNames.push(grandChildren[j].nodeName);
            }
			
			
            var translateIndex = grandNodeNames.indexOf("translate");
            var rotateIndex  = grandNodeNames.indexOf("rotate");
            var scaleIndex = grandNodeNames.indexOf("scale");
 
			
			  var translateCoordinates = [];
            if (translateIndex != -1) {
                // x
                var x = this.reader.getFloat(grandChildren[translateIndex], 'x');
                if (!(x != null && !isNaN(x)))
                    return "unable to parse x-coordinate of the transformation = " + transformationId;
                else
                    translateCoordinates.push(x);

                // y
                var y = this.reader.getFloat(grandChildren[translateIndex], 'y');
                if (!(y != null && !isNaN(y)))
                    return "unable to parse y-coordinate of the transformation = " + transformationId;
                else
                    translateCoordinates.push(y);

                // z
                var z = this.reader.getFloat(grandChildren[translateIndex], 'z');
                if (!(z != null && !isNaN(z)))
                    return "unable to parse z-coordinate of the transformation = " + transformationId;
                else
                    translateCoordinates.push(z); 
            }
			
            else
                return "translation coordinates undefined for ID = " + transformationId;
			
			  var rotatingCoordinates = [];
            if (rotateIndex != -1) {
                // axis
                var axis = this.reader.getFloat(grandChildren[rotateIndex], 'axis');
                if (!(axis != null && !isNaN(axis)))
                    return "unable to parse axis of the transformation = " + transformationId;
                else
                    rotatingCoordinates.push(axis);

                // angle
                var angle = this.reader.getFloat(grandChildren[rotateIndex], 'angle');
                if (!(angle != null && !isNaN(angle)))
                    return "unable to parse angle of the transformation = " + transformationId;
                else
                    rotatingCoordinates.push(y);

            }
			
            else
                return "rotation coordinates undefined for ID = " + transformationId;
			
				  var scaleCoordinates = [];
            if (scaleIndex != -1) {
                // x
                var x = this.reader.getFloat(grandChildren[scaleIndex], 'x');
                if (!(x != null && !isNaN(x)))
                    return "unable to parse x-coordinate of the transformation = " + transformationId;
                else
                    scaleCoordinates.push(x);

                // y
                var y = this.reader.getFloat(grandChildren[scaleIndex], 'y');
                if (!(y != null && !isNaN(y)))
                    return "unable to parse y-coordinate of the transformation = " + transformationId;
                else
                    scaleCoordinates.push(y);

                // z
                var z = this.reader.getFloat(grandChildren[scaleIndex], 'z');
                if (!(z != null && !isNaN(z)))
                    return "unable to parse z-coordinate of the transformation = " + transformationId;
                else
                    scaleCoordinates.push(z); 
            }
			
            else
                return "scaling coordinates undefined for ID = " + transformationId;
			
			this.transformations = [transformationId, translateCoordinates, scaleCoordinates, rotatingCoordinates];
         
		}
		
		
		
        this.log("Parsed transformations");
        return null;
    }
	 

	 
	
	  /**
     * Parses the <PRIMITIVES> block.
     * @param {primitives block element} nodesNode
     */
    parsePrimitives(primitivesNode) {
        
		var children = primitivesNode.children;
		
		
       
        var numComponents = 0;
	
        var grandChildren = [];
        var nodeNames = [];
		var possibleValues = ["DefaultZero", "DefaultSquare", "DefaultTriangleRectangle", "DefaultCylinder", "DefaultSphere", "DefaultTorus"];
		
		
		  for (var i = 0; i < children.length; i++)
        nodeNames.push(children[i].nodeName);
		
		for (var i = 0; i < children.length; i++) {
			
        if (children[i].nodeName != "primitive") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
			
			
            var primitiveId = this.reader.getString(children[i], 'id');
			
            if (primitiveId == null)
                return "no ID defined for primitive";
			
			
            var grandChildren = children[i].children;
			 nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }
			
			console.log(possibleValues[0]);
  
		//	var primitiveNumber = possibleValues.findIndex(primitiveId);
			var primitiveDetails = [];
		}
    }
	
    /**
     * Parses the <NODES> block.
     * @param {nodes block element} nodesNode
     */
    parseComponents(nodesNode) {
        
		var children = nodesNode.children;
        
        //Variables
        this.components = [];
        //var numComponents = 0;
        var nodeNames = [];
		
		for (var i = 0; i < children.length; i++)
        nodeNames.push(children[i].nodeName);
        
        for (var i = 0; i < children.length; i++) {
        
        var componentName="";
        var transformationValues = [];
        var materialId=[];
        var textureInfo =[];
        var primitiveRefs = [];
        var componentRefs = [];
        var component=[];


            if (children[i].nodeName != "component") {
                   this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                   continue;
               }
               else{
               var componentId = this.reader.getString(children[i], 'id');
               if (componentId == null)
                   return "no ID defined for component";
                else 
                componentName=componentId;
               
                         
                 
               var grandChildren = children[i].children;
                  
                grandNodeNames = [];
                for (var j = 0; j < grandChildren.length; j++) {
                   grandNodeNames.push(grandChildren[j].nodeName);
                }
                for(k=0;k<grandChildren.length;k++){

                //Component Transformation
                //Todas as transformações sao guardadas em transformationValues

                if(grandChildren[k].nodeName != "transformation") {
                    this.onXMLMinorError("unknown transformation tag <" + grandChildren[k].nodeName + ">");
                    continue;
                }
                else{
   
                //variables
                var grandGrandChildren = grandChildren[0].children;
                var grandGrandNodeNames = [];
                var final = [];
                //END variables

                for (var j = 0; j < grandGrandChildren.length; j++) {
                    grandGrandNodeNames.push(grandGrandChildren[j].nodeName);
                }
                
                var transformationType = grandGrandChildren[0].nodeName;
                if(transformationType=="transformationref") {
                    var transformationId = this.reader.getString(grandGrandChildren[0], "id");
                    var transPos = -1;
                    for(k=0;k<this.transformations.length;k++){
                        if(this.transformations[k][0]==transformationId) transPos = k;
                    }
                    //translate
                    var sep = 0;
                    var x = 0;
                    var y = 0;
                    var z = 0;
                    if(this.transformations[transPos][1].length!=0){
                        for(k=0;k<this.transformations[transPos][1].length;k++){
                            switch (sep) {
                                case 0:
                                x+=this.transformations[transPos][1][sep];
                                break;
                                case 1:
                                y+=this.transformations[transPos][1][sep];
                                break;
                                case 2:
                                z+=this.transformations[transPos][1][sep];
                                break;
                            }
                            sep++;
                            if(sep==3) sep =0;
                        }
                        final.push(['t',x,y,z]);
                    }
                    //rotate
                    sep=0;
                    var axis = '';
                    var angle = 0;
                    if(this.transformations[transPos][2].length!=0){
                        for(k=0;k<this.transformations[transPos][2].length;k++){
                            switch (sep) {
                                case 0:
                                axis=this.transformations[transPos][2][sep];
                                break;
                                case 1:
                                angle=this.transformations[transPos][2][sep];
                                break;
                               
                            }
                            sep++;
                            if(sep==2) {
                                sep =0;
                                final.push(['r',axis,angle]);
                            }
                        }
                        
                    }

                    //scale
                    sep=0;
                    var x = 0;
                    var y = 0;
                    var z = 0;
                    if(this.transformations[transPos][3].length!=0){
                        for(k=0;k<this.transformations[transPos][3].length;k++){
                            switch (sep) {
                                case 0:
                                x*=this.transformations[transPos][3][sep];
                                break;
                                case 1:
                                y*=this.transformations[transPos][3][sep];
                                break;
                                case 2:
                                z*=this.transformations[transPos][3][sep];
                                break;
                            }
                            sep++;
                            if(sep==3) sep =0;
                        }
                        final.push(['s',x,y,z]);
                    }
                }
                else{
                    for(j=0; j<grandGrandChildren.length;j++){
                        //the transformations will be distinguished as t-translate r-rotate and s-scale                        
                         

                        switch (grandGrandChildren[j].nodeName) {
                        
                        case "translate":

                        var x = this.reader.getFloat(grandGrandChildren[j], 'x');
                        if (!(x != null && !isNaN(x)))
                        return "unable to parse x-coordinate on a translation on the component " + this.reader.getFloat(children[i],"id");
                        var y = this.reader.getFloat(grandGrandChildren[j], 'y');
                        if (!(y != null && !isNaN(y)))
                        return "unable to parse y-coordinate on a translation on the component " + this.reader.getFloat(children[i],"id");
                        var z = this.reader.getFloat(grandGrandChildren[j], 'z');
                        if (!(z != null && !isNaN(z)))
                        return "unable to parse x-coordinate on a translation on the component " + this.reader.getFloat(children[i],"id");
                        final.push('t');
                        final.push(x);
                        final.push(y);
                        final.push(z);
                        break;

                        case "rotate":

                        var axis = this.reader.getString(grandGrandChildren[j], "axis");
                        if (!(axis != null && !isNaN(x)))
                        return "unable to parse axis on a rotate on the component " + this.reader.getString(children[i],"id");
                        var angle = this.reader.getFloat(grandGrandChildren[j], "angle");
                        if (!(angle != null && !isNaN(x)))
                        return "unable to parse angle on a rotate on the component " + this.reader.getString(children[i],"id");
                        final.push('r');
                        final.push(axis);
                        final.push(angle);
                        break;

                        case "scale":

                        var final = [];
                        var x = this.reader.getFloat(grandGrandChildren[j], 'x');
                        if (!(x != null && !isNaN(x)))
                        return "unable to parse x-coordinate on a scale on the component " + this.reader.getFloat(children[i],"id");
                        var y = this.reader.getFloat(grandGrandChildren[j], 'y');
                        if (!(y != null && !isNaN(y)))
                        return "unable to parse y-coordinate on a scale on the component " + this.reader.getFloat(children[i],"id");
                        var z = this.reader.getFloat(grandGrandChildren[j], 'z');
                        if (!(z != null && !isNaN(z)))
                        return "unable to parse x-coordinate on a scale on the component " + this.reader.getFloat(children[i],"id");
                        final.push('s');
                        final.push(x);
                        final.push(y);
                        final.push(z);
                        break;

                        
                        }
                    }
                }
                transformationValues.push(final);
            }

            //Component Materials

            if(grandChildren[k].nodeName != "materials") {
                this.onXMLMinorError("unknown materials tag <" + grandChildren[k].nodeName + ">");
                continue;
            }
            else{
                for(j=0;j<grandChildren[k].children.length;j++)
                materialId.push((this.reader.getString(grandChildren[k].children[j],"id")));
            }

            //Component Texture

            if(grandChildren[k].nodeName != "texture") {
                this.onXMLMinorError("unknown texture tag <" + grandChildren[k].nodeName + ">");
                continue;
            }
            else{
                textureId = this.reader.getString(grandChildren[k],"id");
                textureLS = this.reader.getFloat(grandChildren[k],"length_s");
                textureLT = this.reader.getFloat(grandChildren[k],"length_t");

                textureInfo.push(textureId);
                textureInfo.push(textureLS);
                textureInfo.push(textureLT);
            }

            //Component Children

            
            if(grandChildren[k].nodeName != "children") {
                this.onXMLMinorError("unknown texture tag <" + grandChildren[k].nodeName + ">");
                continue;
            }
            else{
                var grandGrandChildren = grandChildren[k].children;
                for(j=0;j<grandGrandChildren.length;j++){
                    if(grandGrandChildren[j].nodeName=="primitiveref") {
                        primitiveRefs.push(this.reader.getString(grandGrandChildren[j],"id"));
                    }
                    if(grandGrandChildren[j].nodeName=="componentref"){
                        componentRefs.push(this.reader.getString(grandGrandChildren[j],"id"));
                    }
                }
            }
        }
        }
             component.push(componentName);
             component.push(transformationValues);
             component.push(textureInfo);
             component.push(materialId);
             component.push(primitiveRefs);
             component.push(componentRefs); 
             
             this.components.push(component);
        }
        
        //Check inheritance Materials 
        //Metiral id's are have index = 2
        

        for(i=0;i<this.components.length;i++){
            var material =[];
            for(j=0;j<this.components[i][2].length;j++){
                if(this.components[i][2][j]!="inherit" && this.components[i][2][j]!="none" ){
                    material.push(this.components[i][2][j]);
                    
                }
            }
            if(material.length!=0){

                for(k=0; k<this.components[i][4].length;k++){
                    var pos = this.components.indexOf(this.components[i][4][k])
                    this.components = this.materialInherit(this.components,material,pos);
                }
            }
        }
        
        //Check inheritance Textures
        //TextureInfo's are on index = 1
        for(i=0;i<this.components.length;i++){
            var texture ="";
                if(this.components[i][1][0]!="inherit" && this.components[i][1][0]!="none" ){
                    texture=this.components[i][1][0];
                    for(k=0; k<this.components[i][4].length;k++){
                        var pos = this.components.indexOf(this.components[i][4][k])
                        this.textureInherit(this.components,texture,pos);
                    }    
                }
            
                
            }

            this.components=topNodes(this.components);
        
		
        this.log("Parsed nodes");
        return null;
    }

    //Material inheritance

    materialInherit(componentList, material,pos){
        for(j=0;j<componentList[pos][2].length;j++){
            if(componentList[pos][2][j]!="inherit" && componentList[pos][2][j]!="none" ){
                material.push(componentList[pos][2][j]);
                
            }
            else if(componentList[pos][2][j]=="none"){
                break;
            }
            else {
                for(k=0;k<material.length;k++){
                    componentList[pos][2].push(material[k]);
                }
            } 
        }
        for(k=0; k<componentList[pos][4].length;k++){
            var pos2 = componentList.indexOf(componentList[pos][4][k])
            this.materialInherit(componentList,material,pos2);
        }
        return componentList;
    }

    textureInherit(componentList, material,pos){
        if(componentList[pos][1][0]=="inherit"){
            componentList[pos][1][0] = texture;                  
        }
        else if(componentList[pos][1][0]!="none"){
            texture=componentList[pos][1][0];
        }
       

        for(k=0; k<componentList[pos][4].length;k++){
            var pos2 = componentList.indexOf(componentList[pos][4][k])
            this.textureInherit(componentList,texture,pos2);
        }
        return this.componentList;
    }

    topNodes(componentList){
        topComponents = [];
        for(i=0;i<componentList.length;i++){
            notTop = false;
            for(j=0;j<componentList.length;j++){
                for(k=0;k<componentList[j][4].length;k++){
                    if(componentList[i].componentName==componentList[j][4][k]){
                        notTop=true;
                    }
                }
            }
            if(notTop==false){
                topComponents.push(componentList[i]);
            }
        }
        for(i=0;i<topComponents.length;i++){
            topComponents[i]=this.componentTree(topComponents[i],componentList);
        }
        return topComponents;
    }

    componentTree(component,componentList){
        for(i=0;i<component[4].length;i++){
            for(j=0;j<componentList.length;j++){
                if(componentList[j].componentName==component[4][i]){
                    component[4][i]=componentList[j];
                    this.componentTree(componentList[j],componentList);
                }
            }
        }
        return component;
    }

	
 
    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }


    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene() { //displayScene(nodeName,tex1,Mat1)
	
	/*
		var material = Mat1;
		var texture = tex1;
		console.log(nodeName);
		
		if(nodeName != null){
			var node = this.graph[nodeName];
			
			if(node.material!=null)
				material = node.material;
			
			if(node.texture!=null)
				texture = node.texture;
			
		
		}
		
		this.multMatrix(node.mat);
		
		for(i= 0; i<node.descendents.length;i++){
			this.pushMatrix();
			this.DisplayScene(node.descendents[i],texture,material);
			this.popMatrix();
		}
		
        //desenhar Geometria
		
		if(node.primitive != null){
			
			//Aplicar material
			//Aplicar textura
			node.primitive.draw();
		}
		*/
		return null;
    }
  
}