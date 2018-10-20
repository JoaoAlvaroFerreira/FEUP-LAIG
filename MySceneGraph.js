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

var SCENE_INDEX = 0;
var VIEWS_INDEX = 1;
var AMBIENT_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var TRANSFORMATIONS_INDEX = 6;
var PRIMITIVES_INDEX = 7;
var COMPONENTS_INDEX = 8;

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

        //<SCENE> - 0
        var index;
        if ((index = nodeNames.indexOf("scene")) == -1)
            return "tag <SCENE> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <SCENE> out of order");

            //Parse INITIAL block
            if ((error = this.parseScene(nodes[index])) != null)
                return error;
        }

        // <VIEWS> - 1
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

        // <AMBIENT> - 2
        if ((index = nodeNames.indexOf("ambient")) == -1)
            return "tag <AMBIENT> missing";
        else {
            if (index != AMBIENT_INDEX)
                this.onXMLMinorError("tag <AMBIENT> out of order");

            //Parse AMBIENT block
            if ((error = this.parseAmbient(nodes[index])) != null)
                return error;
        }



        // <LIGHTS> - 3
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <LIGHTS> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <LIGHTS> out of order");

            //Parse LIGHTS block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }

        // <TEXTURES> - 4
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <TEXTURES> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse TEXTURES block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <MATERIALS> - 5
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <MATERIALS> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <MATERIALS> out of order");

            //Parse MATERIALS block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <TRANSFORMATIONS> - 6
        if ((index = nodeNames.indexOf("transformations")) == -1)
            return "tag <TRANSFORMATIONS> missing";
        else {
            if (index != TRANSFORMATIONS_INDEX)
                this.onXMLMinorError("tag <TRANSFORMATIONS> out of order");

            //Parse NODES block
            if ((error = this.parseTransformations(nodes[index])) != null)
                return error;
        }

        // <PRIMITIVES> - 7
        if ((index = nodeNames.indexOf("primitives")) == -1)
            return "tag <PRIMITIVES> missing";
        else {
            if (index != PRIMITIVES_INDEX)
                this.onXMLMinorError("tag <PRIMITIVES> out of order");

            //Parse NODES block
            if ((error = this.parsePrimitives(nodes[index])) != null)
                return error;
        }

        // <COMPONENTS> -8
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
     * Parses the <SCENE> block 
     */

    parseScene(sceneNode){

        
        
        var sceneRoot = this.reader.getFloat(sceneNode, 'root');
        var axisLength = this.reader.getFloat(sceneNode, 'axis_length');

        this.sceneInfo = [sceneRoot, axisLength];

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

        var viewId = this.reader.getString(viewsNode, 'default');

        this.viewsInfo = [];
        this.viewsInfo.push(viewId);

    

        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "perspective") {
                this.onXMLMinorError("Perspective is not <" + children[i].nodeName + ">");
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

            
            var perspectiveDetails = [perspectiveId, near, far, angles];
            

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

            perspectiveDetails.push(fromCoordinates);
            perspectiveDetails.push(toCoordinates);
            this.viewsInfo.push(perspectiveDetails);



            if (children[i].nodeName != "ortho") {
                this.onXMLMinorError("ortho is not <" + children[i].nodeName + ">");
                continue;
            }
            else {
                var near = this.reader.getFloat(children[indexOrtho], 'near');
                var far = this.reader.getFloat(children[indexOrtho], 'far');
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

                var perspectiveDetails = [near, far, angles, left,right, top, bottom];
                this.viewsInfo.push(perspectiveDetails);
                            
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
        var grandNodeNames = [];


        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            var omnis=[];
            var spots=[];
            

            if (children[i].nodeName != "omni") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
              
            }
            else {
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


                omnis = [enabled,[locationCoordinates], [ambientColor], [diffuseColor], [specularColor]];

            }






            if (children[i].nodeName != "spot") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                
            }
            else {
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
                        diffuseColor.push(a);
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


                spots = [enabled,[locationCoordinates], [ambientColor], [diffuseColor], [specularColor],[targetCoordinates]];
               
            }
            if(omnis.length==0) this.lights.push(spots);
            else this.lights.push(omnis);
            
            
          
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

        var textureTemp = [];
        this.textures = [];


        var nodeNames = [];

        for (var i = 0; i < children.length; i++) {

            var grandChildren = children[i].children;
            if (children[i].nodeName != "texture") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                var idTextura = this.reader.getString(children[i], 'id');
                var path = this.reader.getString(children[i], 'file');
            }
            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }
            textureTemp = [idTextura, path];
            this.textures.push(textureTemp);
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
                    diffuseColor.push(a);
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


            this.materials.push([materialid, shininess, emissionColor, ambientColor, diffuseColor, specularColor]);

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

        for (var i = 0; i < children.length; i++) {


            if (children[i].nodeName != "transformation") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            var transformationId = this.reader.getString(children[i], 'id');
            if (transformationId == null)
                return "no ID defined for transformation";

            var grandChildren = children[i].children;
            var grandNodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                grandNodeNames.push(grandChildren[j].nodeName);
            }


            var translateIndex = grandNodeNames.indexOf("translate");
            var rotateIndex = grandNodeNames.indexOf("rotate");
            var scaleIndex = grandNodeNames.indexOf("scale");


            var translateCoordinates = [];
            if (translateIndex != -1) {


                // x
                var x = this.reader.getFloat(grandChildren[translateIndex], 'x');
                /*if (!(x != null && !isNaN(x)))
                    return "unable to parse x-coordinate of the transformation = " + transformationId;
                else*/
                    translateCoordinates.push(x);

                // y
                var y = this.reader.getFloat(grandChildren[translateIndex], 'y');
                /*if (!(y != null && !isNaN(y)))
                    return "unable to parse y-coordinate of the transformation = " + transformationId;
                else*/
                    translateCoordinates.push(y);

                // z
                var z = this.reader.getFloat(grandChildren[translateIndex], 'z');
                /*if (!(z != null && !isNaN(z)))
                    return "unable to parse z-coordinate of the transformation = " + transformationId;
                else*/
                    translateCoordinates.push(z);
            }

            else
                return "translation coordinates undefined for ID = " + transformationId;

            var rotatingCoordinates = [];
            if (rotateIndex != -1) {
                // axis
                var axis = this.reader.getString(grandChildren[rotateIndex], 'axis');
                /*if (!(axis != null && !isNaN(axis)))
                    return "unable to parse axis of the transformation = " + transformationId;
                else*/
                    rotatingCoordinates.push(axis);

                // angle
                var angle = this.reader.getFloat(grandChildren[rotateIndex], 'angle');
                /*if (!(angle != null && !isNaN(angle)))
                    return "unable to parse angle of the transformation = " + transformationId;
                else*/
                    rotatingCoordinates.push(y);

            }

            else
                return "rotation coordinates undefined for ID = " + transformationId;

            var scaleCoordinates = [];
            if (scaleIndex != -1) {
                // x
                var x = this.reader.getFloat(grandChildren[scaleIndex], 'x');
                /*if (!(x != null && !isNaN(x)))
                    return "unable to parse x-coordinate of the transformation = " + transformationId;
                else*/
                    scaleCoordinates.push(x);

                // y
                var y = this.reader.getFloat(grandChildren[scaleIndex], 'y');
                /*if (!(y != null && !isNaN(y)))
                    return "unable to parse y-coordinate of the transformation = " + transformationId;
                else*/
                    scaleCoordinates.push(y);

                // z
                var z = this.reader.getFloat(grandChildren[scaleIndex], 'z');
                /*if (!(z != null && !isNaN(z)))
                    return "unable to parse z-coordinate of the transformation = " + transformationId;
                else*/
                    scaleCoordinates.push(z);
            }

            else
                return "scaling coordinates undefined for ID = " + transformationId;

            this.transformations.push([transformationId, translateCoordinates, scaleCoordinates, rotatingCoordinates]);

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
        this.primitiveVector = [];



        var nodeNames = [];


        for (var i = 0; i < children.length; i++) {

            var grandChildren = children[i].children;
            var primitiveId = grandChildren[0].nodeName;
            var primitive = this.reader.getString(children[i], 'id');

            if (primitiveId == "rectangle") {

               
                var rectangleCoordinates = [];
               
                    // x1
                    var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                    if (!(x1 != null && !isNaN(x1)))
                        return "unable to parse x-coordinate  "
                    else
                        rectangleCoordinates.push(x1);

                    // y1
                    var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                    if (!(y1 != null && !isNaN(y1)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        rectangleCoordinates.push(y1);

                    // x2
                    var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                    if (!(x2 != null && !isNaN(x2)))
                        return "unable to parse x-coordinate of the primitive = " + primitiveId;
                    else
                        rectangleCoordinates.push(x2);

                    // y2
                    var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                    if (!(y2 != null && !isNaN(y2)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        rectangleCoordinates.push(y2);
                

                this.primitiveVector.push([primitive,primitiveId,rectangleCoordinates]);
            }


            else if (primitiveId == "triangle") {

              
                var triangleCoordinates = [];
                
                    // x1
                    var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                    if (!(x1 != null && !isNaN(x1)))
                        return "unable to parse x-coordinate  "
                    else
                        triangleCoordinates.push(x1);

                    // y1
                    var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                    if (!(y1 != null && !isNaN(y1)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        triangleCoordinates.push(y1);

                    // x2
                    var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                    if (!(x2 != null && !isNaN(x2)))
                        return "unable to parse x-coordinate of the primitive = " + primitiveId;
                    else
                        triangleCoordinates.push(x2);

                    // y2
                    var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                    if (!(y2 != null && !isNaN(y2)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        triangleCoordinates.push(y2);

                    // x3
                    var x3 = this.reader.getFloat(grandChildren[0], 'x3');
                    if (!(x3 != null && !isNaN(x3)))
                        return "unable to parse x-coordinate of the primitive = " + primitiveId;
                    else
                        triangleCoordinates.push(x3);

                    // y3
                    var y3 = this.reader.getFloat(grandChildren[0], 'y3');
                    if (!(y3 != null && !isNaN(y3)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        triangleCoordinates.push(y3);

                    //z1
                    var z1 = this.reader.getFloat(grandChildren[0], 'z1');
                    if (!(z1 != null && !isNaN(z1)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        triangleCoordinates.push(z1);
                    //z2
                    var z2 = this.reader.getFloat(grandChildren[0], 'z2');
                    if (!(z2 != null && !isNaN(z2)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        triangleCoordinates.push(z2);
                    //z3
                    var z3 = this.reader.getFloat(grandChildren[0], 'z3');
                    if (!(z3 != null && !isNaN(z3)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        triangleCoordinates.push(z3);
                

                this.primitiveVector.push([primitive,primitiveId,triangleCoordinates]);

            }
            else if (primitiveId == "cylinder") {
                var cylinderCoordinates = [];
                    // base
                    var base = this.reader.getFloat(grandChildren[0], 'base');
                    if (!(base != null && !isNaN(base)))
                        return "unable to parse x-coordinate  "
                    else
                        cylinderCoordinates.push(base);

                    // top
                    var top = this.reader.getFloat(grandChildren[0], 'top');
                    if (!(top != null && !isNaN(top)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        cylinderCoordinates.push(top);

                    // height
                    var height = this.reader.getFloat(grandChildren[0], 'height');
                    if (!(height != null && !isNaN(height)))
                        return "unable to parse x-coordinate of the primitive = " + primitiveId;
                    else
                        cylinderCoordinates.push(height);

                    // slices
                    var slices = this.reader.getFloat(grandChildren[0], 'slices');
                    if (!(slices != null && !isNaN(slices)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        cylinderCoordinates.push(slices);

                    // stacks
                    var stacks = this.reader.getFloat(grandChildren[0], 'stacks');
                    if (!(stacks != null && !isNaN(stacks)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        cylinderCoordinates.push(stacks);
                

                this.primitiveVector.push([primitive,primitiveId,cylinderCoordinates]);

            }
            else if (primitiveId == "sphere") {

                var sphereCoordinates = [];

                    // radius
                    var radius = this.reader.getFloat(grandChildren[0], 'radius');
                    if (!(radius != null && !isNaN(radius)))
                        return "unable to parse x-coordinate of the primitive = " + primitiveId;
                    else
                        sphereCoordinates.push(radius);

                    // slices
                    var slices = this.reader.getFloat(grandChildren[0], 'slices');
                    if (!(slices != null && !isNaN(slices)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        sphereCoordinates.push(slices);

                    // stacks
                    var stacks = this.reader.getFloat(grandChildren[0], 'stacks');
                    if (!(stacks != null && !isNaN(stacks)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        sphereCoordinates.push(stacks);
                

                this.primitiveVector.push([primitive,primitiveId,sphereCoordinates]);
            }

            else if (primitiveId == "torus") {


                var torusCoordinates = [];

              
                    // inner
                    var inner = this.reader.getFloat(grandChildren[0], 'inner');
                    if (!(inner != null && !isNaN(inner)))
                        return "unable to parse x-coordinate of the primitive = " + primitiveId;
                    else
                        torusCoordinates.push(inner);

                    // outer
                    var outer = this.reader.getFloat(grandChildren[0], 'outer');
                    if (!(outer != null && !isNaN(outer)))
                        return "unable to parse x-coordinate of the primitive = " + primitiveId;
                    else
                        torusCoordinates.push(outer);

                    // slices
                    var slices = this.reader.getFloat(grandChildren[0], 'slices');
                    if (!(slices != null && !isNaN(slices)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        torusCoordinates.push(slices);

                    // loops
                    var loops = this.reader.getFloat(grandChildren[0], 'loops');
                    if (!(loops != null && !isNaN(loops)))
                        return "unable to parse y-coordinate of the primitive = " + primitiveId;
                    else
                        torusCoordinates.push(loops);
                
                    this.primitiveVector.push([primitive,primitiveId,torusCoordinates]);
            }

           
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

        for (var i = 0; i < children.length; i++) {
            //var nodeName = this.reader.getString(children[i], 'id');
            nodeNames.push(children[i].nodeName);
        }


        for (var i = 0; i < children.length; i++) {
            
            var componentName = "";
            var transformationValues = mat4.create();
            mat4.identity(transformationValues);
            var materialRefs = [];
            var textureInfo = [];
            var primitiveFind = "";
            var primitiveRefs = [];
            var componentRefs = [];

            if (children[i].nodeName != "component") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                var componentId = this.reader.getString(children[i], 'id');
                if (componentId == null)
                    return "no ID defined for component";
                else
                    componentName = componentId;

                console.log(componentId);


                var grandChildren = children[i].children;

                var grandNodeNames = [];
                for (var j = 0; j < grandChildren.length; j++) {
                    grandNodeNames.push(grandChildren[j].nodeName);
                }

                for (var k = 0; k < grandChildren.length; k++) {

                    //Component Transformation
                    //Todas as transformações sao guardadas em transformationValues

                    if (grandNodeNames[k] == "transformation") {

                        //variables
                        var grandGrandChildren = grandChildren[k].children;
                        var grandGrandNodeNames = [];
                        //END variables

                        for (var j = 0; j < grandGrandChildren.length; j++) {
                            grandGrandNodeNames.push(grandGrandChildren[j].nodeName);
                        }





                        for (var j = 0; j < grandGrandChildren.length; j++) {

                            var transformationType = grandGrandNodeNames[j]; //Tinha aqui 0
                            if (transformationType == "transformationref") {
                                var transformationId = this.reader.getString(grandGrandChildren[j], "id");
                                for (var k = 0; k < this.transformations.length; k++) {
                                    if (this.transformations[k][0] == transformationId) {
                                        mat4.translate(transformationValues, transformationValues, [this.transformations[k][1][0],this.transformations[k][1][1],this.transformations[k][1][2]]);
                                        mat4.scale(transformationValues, transformationValues, [this.transformations[k][2][0],this.transformations[k][2][1],this.transformations[k][2][2]]);
                                        var axis =[];
                                        if(this.transformations[k][3][0]=='x') axis = [1,0,0];
                                        if(this.transformations[k][3][0]=='y') axis = [0,1,0];
                                        if(this.transformations[k][3][0]=='z') axis = [0,0,1];
                                        mat4.rotate(transformationValues, transformationValues, DEGREE_TO_RAD * this.transformations[k][3][1], axis);
                                    }
                                }

                            }


                            console.log(grandGrandNodeNames[j]);

                            if (grandGrandNodeNames[j] == "translate") {


                                // x
                                var x = this.reader.getFloat(grandGrandChildren[j], 'x');
                                /*if (!(x != null && !isNaN(x)))
                                    return "unable to parse x-coordinate of the transformation = " + this.reader.getString(grandGrandChildren[i], "id");*/

                                // y
                                var y = this.reader.getFloat(grandGrandChildren[j], 'y');
                                /*if (!(y != null && !isNaN(y)))
                                    return "unable to parse y-coordinate of the transformation = " + this.reader.getString(grandGrandChildren[i], "id");*/


                                // z
                                var z = this.reader.getFloat(grandGrandChildren[j], 'z');
                                /*if (!(z != null && !isNaN(z)))
                                    return "unable to parse z-coordinate of the transformation = " + this.reader.getString(grandGrandChildren[i], "id");*/


                                mat4.translate(transformationValues, transformationValues, [x, y, z]);

                            }
                            if (grandGrandNodeNames[j] == "rotate") {

                                var axis = this.reader.getString(grandGrandChildren[j], "axis");
                                /*if (!(axis != null))
                                    return "unable to parse axis on a rotate on the component " + this.reader.getString(grandGrandChildren[i], "id");*/

                                var angle = this.reader.getFloat(grandGrandChildren[j], "angle");
                                /*if (!(angle != null && !isNaN(x)))
                                    return "unable to parse angle on a rotate on the component " + this.reader.getString(grandGrandChildren[i], "id");*/
                                var axisCoord =[];
                                    if(axis=='x') axisCoord = [1,0,0];
                                    if(axis=='y') axisCoord = [0,1,0];
                                    if(axis=='z') axisCoord = [0,0,1];

                                mat4.rotate(transformationValues, transformationValues, DEGREE_TO_RAD * angle, axisCoord);

                            }

                            if (grandGrandNodeNames[j] == "scale") {
                                var x = this.reader.getFloat(grandGrandChildren[j], 'x');
                                /*if (!(x != null && !isNaN(x)))
                                    return "unable to parse x-coordinate on a scale on the component  " + this.reader.getString(grandGrandChildren[i], "id");*/
                                var y = this.reader.getFloat(grandGrandChildren[j], 'y');
                                /*if (!(y != null && !isNaN(y)))
                                    return "unable to parse y-coordinate on a scale on the component " + this.reader.getString(grandGrandChildren[i], "id");*/
                                var z = this.reader.getFloat(grandGrandChildren[j], 'z');
                                /*if (!(z != null && !isNaN(z)))
                                    return "unable to parse z-coordinate on a translation on the component " + this.reader.getString(grandGrandChildren[i], "id");*/
                                mat4.scale(transformationValues, transformationValues, [x, y, z]);
                                
                            }



                        }
                    }



                    //Component Materials

                    if (grandNodeNames[k] == "materials") {
                        var grandGrandChildren = grandChildren[k].children;
                        for (var l = 0; l < grandChildren[k].children.length; l++)
                            for(var j=0;j<this.materials.length;j++){
                                if(this.reader.getString(grandGrandChildren[0], "id")=="inherit" || this.reader.getString(grandGrandChildren[0], "id")=="none"){
                                    materialRefs.push((this.reader.getString(grandGrandChildren[0], "id")));
                                }
                                else {
                                if(this.materials[j][0]==this.reader.getString(grandGrandChildren[0], "id"))
                                materialRefs.push(this.materials[j]);
                                }
                            }
                    }

                    //Component Texture

                    if (grandNodeNames[k] == "texture") {
                        var textureId = this.reader.getString(grandChildren[k], "id");
                        var textureLS = this.reader.getFloat(grandChildren[k], "length_s");
                        var textureLT = this.reader.getFloat(grandChildren[k], "length_t");
                        var path = ""
                        
                        for(var j=0;j<this.textures.length;j++){
                            if(this.textures[j][0]==textureId){
                                path=this.textures[j][1];
                            }
                        }
                        
                        textureInfo.push(textureId);
                        if(textureId!="inherit" && textureId!="none") textureInfo.push(path);
                        textureInfo.push(textureLS);
                        textureInfo.push(textureLT);
                        console.log(textureId);
                    }

                   
                    //Component Children


                    if (grandNodeNames[k] == "children") {
                        var grandGrandChildren = grandChildren[k].children;
                        for (var j = 0; j < grandGrandChildren.length; j++) {
                           // console.log("This is : " + grandGrandChildren[j].nodeName);
                            if (grandGrandChildren[j].nodeName == "primitiveref") {

                                for(var l=0;l<this.primitiveVector.length;l++){

                                if(this.primitiveVector[l][0]==this.reader.getString(grandGrandChildren[j], "id"))
                                primitiveRefs.push(this.primitiveVector[l]);
                                console.log("Primitive Refs A:" + primitiveRefs[l]);

                                }
                                //primitiveRefs.push(this.reader.getString(grandGrandChildren[j], "id"));
                            }
                            if (grandGrandChildren[j].nodeName == "componentref") {
                                componentRefs.push(this.reader.getString(grandGrandChildren[j], "id"));
                            }
                        }
                    }
                }
                var component = [];
                component.push(componentName);
                component.push(transformationValues);
                component.push(textureInfo);
                component.push(materialRefs);
                component.push(primitiveRefs);
                component.push(componentRefs);
                

                this.components.push(component);
            }
        }
        

        this.components = this.topNodes(this.components);


        this.log("Parsed nodes");
        return null;
    }

    


    topNodes(componentList) {
        var topComponents = [];
        for (var i = 0; i < componentList.length; i++) {
            var notTop = false;
            for (var j = 0; j < componentList.length; j++) {
                for (var k = 0; k < componentList[j][5].length; k++) {
                    if (componentList[i][0] == componentList[j][5][k]) {
                        notTop = true;
                    }
                }
            }
            if (notTop == false) {
                topComponents.push(componentList[i]);
            }
        }
        for (var i = 0; i < topComponents.length; i++) {
            topComponents[i] = this.componentTree(topComponents[i], componentList);
        }
        return topComponents;
    }
   

    componentTree(component, componentList) {
        for (var i = 0; i < component[5].length; i++) {
            for (var j = 0; j < componentList.length; j++) {
                if (componentList[j][0] == component[5][i]) {
                    component[5][i] = componentList[j];
                    this.componentTree(componentList[j], componentList);
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

    sceneComponentDisplay(materialPos) {

        
        for (var i = 0; i < this.components.length; i++) {

            //creating a default material
            //var defaultMaterial = new CGFappearance(this.scene);
            var defaultMaterial=this.materials[0];

            //creating a default texture
            //var defaultTexture = new CGFappearance(this.scene, "./scenes/" + this.textures[0][1]);
            var defaultTexture=this.textures[0];

            //creating a default texture Inf
            //var textureInf = [this.textures[0][0],this.textures[0][1],1,1];

            this.sceneDisplay(this.components[i], materialPos,defaultMaterial,defaultTexture);
        }
    }


    sceneDisplay(component, materialPos,material,texture) {

        
        this.scene.pushMatrix();

        var savePos = materialPos;
  
        var newTexture = null;

        this.scene.multMatrix(component[1]); //transformations

        if(component[2][0]=="none"){
            texture=null;
        }
        else if(component[2][0]!="inherit"){
            texture = component[2];
                     
        }

        if(materialPos>=component[3].length){
            materialPos = materialPos-parseInt(materialPos/component[3].length)*component[3].length;
        }
        if(component[3][materialPos][0]=="none"){
            material= null;
       
        }

        else if(component[3][materialPos][0]!="inherit")   {
        material = component[3][materialPos];    
     
        }

        /*newMaterial.setShininess(component[3][materialPos][1]);
        newMaterial.setAmbient(component[3][materialPos][3][0], component[3][materialPos][3][1], component[3][materialPos][3][2], component[3][materialPos][3][3]);
        newMaterial.setDiffuse(component[3][materialPos][4][0], component[3][materialPos][4][1], component[3][materialPos][4][2], component[3][materialPos][4][3]);
        newMaterial.setSpecular(component[3][materialPos][5][0], component[3][materialPos][5][1], component[3][materialPos][5][2], component[3][materialPos][5][3]);
        newMaterial.setEmission(component[3][materialPos][2][0], component[3][materialPos][2][1], component[3][materialPos][2][2], component[3][materialPos][2][3]);  */  
     

      
        for (var i = 0; i < component[4].length; i++) { //PRIMITIVE REFS
            var name = component[4][i][1];

            //this.scene.currMaterial=new CGFappearance(this.scene);
            //this.scene.currMaterial.loadTexture("./scenes/images/vidral.jpg");
            //this.scene.currMaterial=newMaterial;
            //this.scene.currMaterial.apply();   

            
            //this.scene.currTexture=new CGFtexture(this.scene, "./scenes/" + component[2][1]);
            //this.scene.currTexutre=newTexture;
            //this.scene.currTexture.bind();

            //this.scene.load(material,texture);
            /*this.scene.newmaterial=new CGFappearance(this.scene);
            this.scene.newmaterial.loadTexture("./scenes/images/vidral.jpg");
            this.scene.newmaterial.apply();*/
            this.scene.material.apply();


           switch(name){
               case "rectangle":
                this.scene.square=new MyQuad(this.scene,component[4][i][2][0],component[4][i][2][1],component[4][i][2][2],
                    component[4][i][2][3],component[2][component[2].length-2],component[2][component[2].length-1]);
                this.scene.square.display();     
               
               break;

               case "triangle":
                this.scene.triangle=new MyTriangle(this.scene,component[4][i][2][0],component[4][i][2][1],component[4][i][2][6],
                    component[4][i][2][2],component[4][i][2][3],component[4][i][2][7], component[4][i][2][4],
                    component[4][i][2][5],component[4][i][2][8],component[2][component[2].length-2],component[2][component[2].length-1]);    
                this.scene.triangle.display();
               break;

               case "cylinder":
                this.scene.cylinder=new Wheel(this.scene,component[4][i][2][3],component[4][i][2][4]);    
                this.scene.cylinder.display();
               break;

               case "sphere":
                this.scene.sphere=new MySphere(this.scene,component[4][i][2][0],component[4][i][2][1],component[4][i][2][2]);
                this.scene.sphere.display();
               break;

               case "torus":
                this.scene.torus=new MyTorus(this.scene,component[4][i][2][0],component[4][i][2][1],component[4][i][2][2],component[4][i][2][3]);
                this.scene.torus.display();
               continue;                             

           }
           
        }
      
        

        for (var i = 0; i < component[5].length; i++) {
           this.scene.pushMatrix();
            this.sceneDisplay(component[5][i],savePos,material,texture);
            this.scene.popMatrix();
        }

        this.scene.popMatrix();

    }


}