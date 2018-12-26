/**
 * Practical Work 1 done by Group 9 of Class 4
 * João Álvaro Ferreira - up201605592
 * Henrique Ferreira - up201605003
 */

//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}	 
//Include additional files here
serialInclude(['../lib/CGF.js', 'XMLscene.js', 'MySceneGraph.js', 'MyInterface.js',
'./library/MyQuad.js', './library/MyTriangle.js', './library/MyUnitCube.js','./library/MyCylinder.js',
'./library/MySphere.js','./library/MyTorus.js', './library/Wheel.js', './library/MyTriangleInverted.js', 
'./library/MyVehicle.js','./library/Animation.js','./library/LinearAnimation.js','./library/CircularAnimation.js',
'./library/Patch.js','./library/MyCylinder2.js','./library/MyPyramid.js','./library/MyCity.js','./library/MyWings.js', './library/Plane.js', './library/Terrain.js','./library/Water.js',
'./Prolog/script.js', './Prolog/cannon.js',

main=function()
{
	// Standard application, scene and interface setup
    var app = new CGFapplication(document.body);
    var myInterface = new MyInterface();
    var myScene = new XMLscene(myInterface);

    app.init();

    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);

	// get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml 
	// or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor) 
	
    var space=getUrlVars()['file'] || "Space.xml";
    var pool=getUrlVars()['file'] || "Pool.xml";
    var field=getUrlVars()['file'] || "Field.xml";

    myScene.filenames = [field,pool,space];
    
    

	// create and load graph, and associate it to scene. 
	// Check console for loading errors
	var myGraph = new MySceneGraph(myScene.filenames, myScene);
	
	// start
    app.run();
}

]);