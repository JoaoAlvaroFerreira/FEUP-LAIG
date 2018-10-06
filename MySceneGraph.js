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
        this.log("XML Loading finished.");
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
        if (rootElement.nodeName != "SCENE")
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
        if ((index = nodeNames.indexOf("VIEWS")) == -1)
            return "tag <VIEWS> missing";
        else {
            if (index != INITIALS_INDEX)
                this.onXMLMinorError("tag <VIEWS> out of order");

            //Parse INITIAL block
            if ((error = this.parseViews(nodes[index])) != null)
                return error;
        }
		
		 // <AMBIENT>
        if ((index = nodeNames.indexOf("AMBIENT")) == -1)
            return "tag <AMBIENT> missing";
        else {
            if (index != AMBIENT_INDEX)
                this.onXMLMinorError("tag <AMBIENT> out of order");

            //Parse ILLUMINATION block
            if ((error = this.parseAmbient(nodes[index])) != null)
                return error;
        }

        // <ILLUMINATION>
        if ((index = nodeNames.indexOf("ILLUMINATION")) == -1)
            return "tag <ILLUMINATION> missing";
        else {
            if (index != ILLUMINATION_INDEX)
                this.onXMLMinorError("tag <ILLUMINATION> out of order");

            //Parse ILLUMINATION block
            if ((error = this.parseIllumination(nodes[index])) != null)
                return error;
        }

        // <LIGHTS>
        if ((index = nodeNames.indexOf("LIGHTS")) == -1)
            return "tag <LIGHTS> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <LIGHTS> out of order");

            //Parse LIGHTS block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }

        // <TEXTURES>
        if ((index = nodeNames.indexOf("TEXTURES")) == -1)
            return "tag <TEXTURES> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <TEXTURES> out of order");

            //Parse TEXTURES block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <MATERIALS>
        if ((index = nodeNames.indexOf("MATERIALS")) == -1)
            return "tag <MATERIALS> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <MATERIALS> out of order");

            //Parse MATERIALS block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <TRANSFORMATIONS>
        if ((index = nodeNames.indexOf("TRANSFORMATIONS")) == -1)
            return "tag <TRANSFORMATIONS> missing";
        else {
            if (index != TRANSFORMATIONS_INDEX)
                this.onXMLMinorError("tag <TRANSFORMATIONS> out of order");

            //Parse NODES block
            if ((error = this.parseTransformations(nodes[index])) != null)
                return error;
        }
		
		   // <PRIMITIVES>
        if ((index = nodeNames.indexOf("PRIMITIVES")) == -1)
            return "tag <PRIMITIVES> missing";
        else {
            if (index != PRIMITIVES_INDEX)
                this.onXMLMinorError("tag <PRIMITIVES> out of order");

            //Parse NODES block
            if ((error = this.parsePrimitives(nodes[index])) != null)
                return error;
        }
		
		   // <COMPONENTS>
        if ((index = nodeNames.indexOf("COMPONENTS")) == -1)
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

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

		this.near = 0.1;
        this.far = 500;
		this.angles = 0;
		var indexOrtho = nodeNames.indexOf("perspective");
        if (indexOrtho == -1) {
            this.onXMLMinorError("perspective missing; assuming 'near = 0.1' and 'far = 500'");
        }
		else {
            this.near = this.reader.getFloat(children[indexPerspective], 'near');
            this.far = this.reader.getFloat(children[indexPerspective], 'far');
			this.angles = this.reader.getFloat(children[indexPerspective], 'angles');
			
		if(this.angles.isNaN)
			angles = 0;
		
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
			
			
        grandChildren = children[i].children;
        // Specifications for the current perspective
		
		
        // Gets indices of each element.
        var fromIndex = nodeNames.indexOf("to");
        var toIndex = nodeNames.indexOf("from");
			
			var pxi = this.reader.getFloat(children[fromIndex], 'x');
            var pyi = this.reader.getFloat(children[fromIndex], 'y');
            var pzi = this.reader.getFloat(children[fromIndex], 'z');

            if (pxi == null || pyi == null || pxi == null) {
                pxi = 0;
                pyi = 0;
                pzi = 0;
                this.onXMLMinorError("failed to parse coordinates of initial perspective position; assuming zero");
            }
			
			var pxf = this.reader.getFloat(children[toIndex], 'x');
            var pyf = this.reader.getFloat(children[toIndex], 'y');
            var pzf = this.reader.getFloat(children[toIndex], 'z');

            if (pxf == null || pyf == null || pxf == null) {
                pxf = 20;
                pyf = 20;
                pzf = 20;
                this.onXMLMinorError("failed to parse coordinates of final perspective position; assuming 20");
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

        this.ambientSources = [];
        var ambientNum = 0;

       

		  for (var i = 0; i < children.length; i++) {

		
			
          var ambientIndex = nodeNames.indexOf("ambient");
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
			
			var backgroundIndex = nodeNames.indexOf("background");
			var backgroundColor = [];
            if (backgroundIndex != -1) {
                
                // r
                var r = this.reader.getFloat(grandChildren[backgroundIndex], 'r');
                if (!(r != null && !isNaN(r)))
                    return "unable to parse r color for the background color for the ID = " + materialId;
                else
                    backgroundColor.push(r);

                // g
                var g = this.reader.getFloat(grandChildren[backgroundIndex], 'g');
                if (!(g != null && !isNaN(g)))
                    return "unable to parse r color for the background color for the I D= " + materialId;
                else
                    backgroundColor.push(g);

                // b
                var b = this.reader.getFloat(grandChildren[backgroundIndex], 'b');
                if (!(b != null && !isNaN(b)))
                    return "unable to parse b color for the background color for the ID = " + materialId;
                else
                    backgroundColor.push(b);

                // a
                var a = this.reader.getFloat(grandChildren[backgroundIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 100))
                    return "unable to parse transparency for the background color for the ID = " + materialId;
                else
                    backgroundColor.push(a);
            }
		  
       
				
				
            this.ambientSources[ambientIndex] = [ambientColor, backgroundColor];
            ambientNum++;
            }
			
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

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "LIGHT") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            // Gets indices of each element.
            var enableIndex = nodeNames.indexOf("enable");
            var positionIndex = nodeNames.indexOf("position");
            var ambientIndex = nodeNames.indexOf("ambient");
            var diffuseIndex = nodeNames.indexOf("diffuse");
            var specularIndex = nodeNames.indexOf("specular");

            // Light enable/disable
            var enableLight = true;
            if (enableIndex == -1) {
                this.onXMLMinorError("enable value missing for ID = " + lightId + "; assuming 'value = 1'");
            }
            else {
                var aux = this.reader.getFloat(grandChildren[enableIndex], 'value');
                if (!(aux != null && !isNaN(aux) && (aux == 0 || aux == 1)))
                    this.onXMLMinorError("unable to parse value component of the 'enable light' field for ID = " + lightId + "; assuming 'value = 1'");
                else
                    enableLight = aux == 0 ? false : true;
            }

            // Retrieves the light position.
            var positionLight = [];
            if (positionIndex != -1) {
                // x
                var x = this.reader.getFloat(grandChildren[positionIndex], 'x');
                if (!(x != null && !isNaN(x)))
                    return "unable to parse x-coordinate of the light position for ID = " + lightId;
                else
                    positionLight.push(x);

                // y
                var y = this.reader.getFloat(grandChildren[positionIndex], 'y');
                if (!(y != null && !isNaN(y)))
                    return "unable to parse y-coordinate of the light position for ID = " + lightId;
                else
                    positionLight.push(y);

                // z
                var z = this.reader.getFloat(grandChildren[positionIndex], 'z');
                if (!(z != null && !isNaN(z)))
                    return "unable to parse z-coordinate of the light position for ID = " + lightId;
                else
                    positionLight.push(z);

                // w
                var w = this.reader.getFloat(grandChildren[positionIndex], 'w');
                if (!(w != null && !isNaN(w) && w >= 0 && w <= 1))
                    return "unable to parse x-coordinate of the light position for ID = " + lightId;
                else
                    positionLight.push(w);
            }
            else
                return "light position undefined for ID = " + lightId;

            // Retrieves the ambient component.
            var ambientIllumination = [];
            if (ambientIndex != -1) {
                // R
                var r = this.reader.getFloat(grandChildren[ambientIndex], 'r');
                if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
                    return "unable to parse R component of the ambient illumination for ID = " + lightId;
                else
                    ambientIllumination.push(r);

                // G
                var g = this.reader.getFloat(grandChildren[ambientIndex], 'g');
                if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
                    return "unable to parse G component of the ambient illumination for ID = " + lightId;
                else
                    ambientIllumination.push(g);

                // B
                var b = this.reader.getFloat(grandChildren[ambientIndex], 'b');
                if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
                    return "unable to parse B component of the ambient illumination for ID = " + lightId;
                else
                    ambientIllumination.push(b);

                // A
                var a = this.reader.getFloat(grandChildren[ambientIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
                    return "unable to parse A component of the ambient illumination for ID = " + lightId;
                else
                    ambientIllumination.push(a);
            }
            else
                return "ambient component undefined for ID = " + lightId;

            // TODO: Retrieve the diffuse component
			      var diffuseIllumination = [];
            if (diffuseIndex != -1) {
                // R
                var r = this.reader.getFloat(grandChildren[diffuseIndex], 'r');
                if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
                    return "unable to parse R component of the diffuse illumination for ID = " + lightId;
                else
                    diffuseIllumination.push(r);

                // G
                var g = this.reader.getFloat(grandChildren[diffuseIndex], 'g');
                if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
                    return "unable to parse G component of the diffuse illumination for ID = " + lightId;
                else
                    diffuseIllumination.push(g);

                // B
                var b = this.reader.getFloat(grandChildren[diffuseIndex], 'b');
                if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
                    return "unable to parse B component of the diffuse illumination for ID = " + lightId;
                else
                    diffuseIllumination.push(b);

                // A
                var a = this.reader.getFloat(grandChildren[diffuseIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
                    return "unable to parse A component of the diffuse illumination for ID = " + lightId;
                else
                    diffuseIllumination.push(a);
            }
            else
                return "diffuse component undefined for ID = " + lightId;
			
			//Isto esta tudo feito com base no ambiente component

            // TODO: Retrieve the specular component
			      var specularIllumination = [];
            if (specularIndex != -1) {
                // R
                var r = this.reader.getFloat(grandChildren[specularIndex], 'r');
                if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
                    return "unable to parse R component of the specular illumination for ID = " + lightId;
                else
                    specularIllumination.push(r);

                // G
                var g = this.reader.getFloat(grandChildren[specularIndex], 'g');
                if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
                    return "unable to parse G component of the specular illumination for ID = " + lightId;
                else
                    specularIllumination.push(g);

                // B
                var b = this.reader.getFloat(grandChildren[specularIndex], 'b');
                if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
                    return "unable to parse B component of the specular illumination for ID = " + lightId;
                else
                    specularIllumination.push(b);

                // A
                var a = this.reader.getFloat(grandChildren[specularIndex], 'a');
                if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
                    return "unable to parse A component of the specular illumination for ID = " + lightId;
                else
                    specularIllumination.push(a);
            }
            else
                return "specular component undefined for ID = " + lightId;

            // TODO: Store Light global information.
            this.lights[lightId] = [enableLight, positionLight, ambientIllumination, diffuseIllumination, specularIllumination];
            numLights++;
        }

        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

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
            if (children[i].nodeName != "TEXTURE") {
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
				
				 
			this.materials[materialId] = [emissionColor, ambientColor, diffuseColor, specularColor];
            numMaterials++;
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
		
		
		for(var i = 0; i < children.length; i++){
			
			
			  if (children[i].nodeName != "transformations") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            var transformationId = this.reader.getString(children[i], 'id');
            if (transformationId == null)
                return "no ID defined for transformation";
			
			grandchildren = children[i].children;
			nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }
			
			
            var translateIndex = nodeNames.indexOf("translate");
            var rotateIndex  = nodeNames.indexOf("rotate");
            var scaleIndex = nodeNames.indexOf("scale");
 
			
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
			
			this.transformations[transformationId] = [translateCoordinates, scaleCoordinates, rotatingCoordinates];
            numTransformations++;
		}
		
		
		
        this.log("Parsed nodes");
        return null;
    }

    /**
     * Parses the <NODES> block.
     * @param {nodes block element} nodesNode
     */
    parseComponents(nodesNode) {
        
		var children = nodesNode.children;
		
		
        this.components = [];
        var numComponents = 0;

        var grandChildren = [];
        var nodeNames = [];
		
		
		
		
		
		
        this.log("Parsed nodes");
        return null;
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
    onXMLMinorErro(message) {
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
    displayScene() {
        // entry point for graph rendering
        //TODO: Render loop starting at root of graph
    }
}