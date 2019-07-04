var canvas;
var gl;
var program;

var texCoordsArray 	= [];
var x				= 0;
var pointsArray 	= [];
var colorsArray 	= [];
var normalsArray 	= [];

var vertexColors = [
    vec4( 1.0, 1.0, 0.4, 1.0 ),  // blue
    vec4( 1.0, 1.0, 0.4, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.4, 1.0 ),  // yellow
    vec4( 0.701960, 0.235294, 0.0, 1.0 ),  // green
    vec4( 1.0, 1.0, 0.4, 1.0 ),  // blue
    vec4( 1.0, 1.0, 0.4, 1.0 ),  // magenta
    vec4( 0.701960, 0.701960, 0, 1.0 ),  // cyan
    vec4( 1.0, 1.0, 0.4, 1.0 ),  // white
];

var lightPosition 	= vec4(0, 0, -4.5, 0.0 );
var lightAmbient 	= vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse 	= vec4(  0, 0, 0, 1.0 );
var lightSpecular 	= vec4( 0.8, 0.8, 0.8, 1.0 );

var lightPosition1 	= vec4(5.5, 0, -10, 0.0 );
var lightAmbient1 	= vec4(0.2198, 0.2212, 0.2123, 1.0 );
var lightDiffuse1 	= vec4( 0, 0, 0, 1.0 );
var lightSpecular1 	= vec4( 0.8,0.8,0.8, 1.0 );

var lightPosition2 	= vec4(10, 2, -4.5, 0.0 );
var lightAmbient2 	= vec4(0.2, 0.2, 0.218, 1.0 );
var lightDiffuse2 	= vec4( 0, 0, 0, 1.0 );
var lightSpecular2 	= vec4( 0.8,0.8,0.8, 1.0 );

var lightPosition3 	= vec4(5.5, 2, 1, 0.0 );
var lightAmbient3 	= vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse3 	= vec4( 0, 0, 0, 1.0 );
var lightSpecular3 	= vec4( 0.8,0.8,0.8, 1.0 );

var materialAmbient 	= vec4( 0.8, 0.8, 0.8, 1.0 );
var materialDiffuse 	= vec4( 0.1, 0.1, 0.1, 1.0);
var materialSpecular	= vec4( 0.2, 0.2, 0.2, 1.0 );

var materialShininess 	= 100.0;

var near 	= 0.3;
var far 	= 100.0;
var theta  	= 0.0;
var phi    	= 0.0;
var dr 		= 5.0 * Math.PI/180.0;

var  fovy 	= 45.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio

var mvMatrix, pMatrix;
var modelView, projection;

var eye = vec3(0,0,0.5);
var at = vec3(0, 0.0, -100.5);
var up = vec3(0.0, 1.0, 0.0);

var flag = 1;

var eye1 	= vec3(5,20,20);
var at1 	= vec3(5.5, 0.0, -4.5);
var up1 	= vec3(0.0, 1.0, 0.0);

var lines = [vec4(eye,1) , vec4(eye[0], eye[1]+2, eye[2], 1)]
var linesbuffer,vBuffer,vPosition;

var button1 = false;

var numVertices = 0;

//Tags
var CORRIDOR_1 = 0;
var CORRIDOR_2 = 1;
var CORRIDOR_3 = 2;
var CORRIDOR_4 = 3;

var CEILING  = 0;
var WALL     = 1;
var DOOR	 = 2;
var FLOOR 	 = 3;
var PAINTING = 4;

//Corridor 1 texture
var texCoord1 = [texCoord_ceiling, texCoord_wall, texCoord_door, texCoord_floor, texCoord_painting];

//Corridor 2 texture
var texCoord2 = [texCoord_ceiling_1, texCoord_wall_1, texCoord_door_1, texCoord_floor_1, texCoord_painting_1];

//Corridor 3 texture
var texCoord3 = [texCoord_ceiling_2, texCoord_wall_2, texCoord_door_2, texCoord_floor, texCoord_painting_1];

//Corridor 4 texture
var texCoord4 = [texCoord_ceiling_3, texCoord_wall_3, texCoord_door_3, texCoord_floor_1, texCoord_painting_1];

var texCoord = [texCoord1, texCoord2, texCoord3, texCoord4];

function configureTexture( image, textureIindex) {
	
	if(textureIindex == 0)
		gl.activeTexture(gl.TEXTURE0);
	else
		gl.activeTexture(gl.TEXTURE1);
	
	// create a GL texture object
    var texture = gl.createTexture();
	// bind it
    gl.bindTexture( gl.TEXTURE_2D, texture );
	// image operations - flip y
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	// specify a 2D image texture, pass the image to it
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image );
	// generate a mip map
	gl.generateMipmap( gl.TEXTURE_2D );
	// texture parameters for mip maps
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
						gl.NEAREST_MIPMAP_LINEAR );
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
	
	if(textureIindex == 0)
	{
		//link the texture object with vertex shader
		gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
	}
	else
	{
		//link the texture1 object with vertex shader
		gl.uniform1i(gl.getUniformLocation(program, "texture1"), 1);
	}
}

function quad(a, b, c, d, e, corridorNum, objectType) {

	var t1 = subtract(vertices[b], vertices[a]);
	var t2 = subtract(vertices[c], vertices[b]);
	var normal = cross(t1, t2);
	var normal = vec3(normal);
	normal = normalize(normal);

     pointsArray.push(vertices[a]); 
     colorsArray.push(vertexColors[e]); 
	 texCoordsArray.push(texCoord[corridorNum][objectType][0]);
	 normalsArray.push(normal);
     pointsArray.push(vertices[b]); 
     colorsArray.push(vertexColors[e]); 
	 texCoordsArray.push(texCoord[corridorNum][objectType][1]);
	 normalsArray.push(normal);
     pointsArray.push(vertices[c]); 
     colorsArray.push(vertexColors[e]); 
	 texCoordsArray.push(texCoord[corridorNum][objectType][2]);	
	 normalsArray.push(normal); 
     pointsArray.push(vertices[a]); 
     colorsArray.push(vertexColors[e]); 
	 texCoordsArray.push(texCoord[corridorNum][objectType][0]);
	 normalsArray.push(normal);
     pointsArray.push(vertices[c]); 
     colorsArray.push(vertexColors[e]); 
	 texCoordsArray.push(texCoord[corridorNum][objectType][2]);
	 normalsArray.push(normal);
     pointsArray.push(vertices[d]); 
     colorsArray.push(vertexColors[e]);  
	 texCoordsArray.push(texCoord[corridorNum][objectType][3]);
	 normalsArray.push(normal);
}

//Function to create polygons to be rendered in a hierarchical fashion
//Each face is classified according to the corridor it will be rendered in (Eg: CORRIDOR_1)
//Each face is tagged with the type of texture it is going to be rendered with (Eg: DOOR)
function colorCube()
{
	//Corridor 1
    quad( 1, 0, 3, 2, 1, CORRIDOR_1, DOOR );
    quad( 2, 3, 7, 6, 2, CORRIDOR_1, WALL );
    quad( 3, 0, 4, 7, 3, CORRIDOR_1, FLOOR );
    quad( 6, 5, 1, 2, 6, CORRIDOR_1, CEILING );
    quad( 4, 5, 6, 7, 4, CORRIDOR_1, WALL ); //Wall behind door
    quad( 5, 4, 0, 1, 5, CORRIDOR_1, WALL );
	
	numVertices += 36;
    
	//Corridor 2
 	quad( 9,  8,  11, 10, 1, CORRIDOR_1, WALL );
    quad( 10, 11, 15, 14, 2, CORRIDOR_1, DOOR );
    quad( 11, 8,  12, 15, 3, CORRIDOR_1, FLOOR );
    quad( 14, 13, 9,  10, 6, CORRIDOR_1, CEILING );
    quad( 12, 13, 14, 15, 4, CORRIDOR_1, WALL );
    quad( 13, 12, 8,  9,  5, CORRIDOR_1, WALL );   //Wall behind door 
	
	numVertices += 36;
    
	//Corridor 3
    quad( 17, 16, 19, 18, 1, CORRIDOR_3, WALL );   //Wall behind door
    quad( 18, 19, 23, 22, 5, CORRIDOR_3, WALL );
    quad( 19, 16, 20, 23, 3, CORRIDOR_3, FLOOR );
    quad( 22, 21, 17, 18, 6, CORRIDOR_3, CEILING );
    quad( 20, 21, 22, 23, 4, CORRIDOR_3, DOOR );
    quad( 21, 20, 16, 17, 2, CORRIDOR_3, WALL );
	
	numVertices += 36;
    
	//Corridor 4
    quad( 25, 24, 27, 26, 4, CORRIDOR_3, WALL );
    quad( 26, 27, 31, 30, 2, CORRIDOR_3, WALL );   //Wall behind door
    quad( 27, 24, 28, 31, 3, CORRIDOR_3, FLOOR );
    quad( 30, 29, 25, 26, 6, CORRIDOR_3, CEILING );
    quad( 28, 29, 30, 31, 1, CORRIDOR_3, WALL );
    quad( 29, 28, 24, 25, 5, CORRIDOR_3, DOOR );
	
	numVertices += 36;
    
	//Exit doors for all 4 corridors
    quad( 32,33,34,35,0, CORRIDOR_1, DOOR );
    quad( 36,37,38,39,0, CORRIDOR_4, DOOR );
    quad( 40,41,42,43,0, CORRIDOR_2, DOOR );
    quad( 44,45,46,47,0, CORRIDOR_4, DOOR );
	
	numVertices += 24;
	
	//Corridor 1 painting
	quad( 48, 49, 51, 50, 3, CORRIDOR_1, PAINTING);
	
	numVertices += 6;
    
	//Corridor 1 Classroom 1
	quad( 53, 52, 55, 54, 1, CORRIDOR_1, WALL);
    quad( 54, 55, 59, 58, 2, CORRIDOR_1, WALL);
    quad( 55, 52, 56, 59, 3, CORRIDOR_1, WALL);
    quad( 58, 57, 53, 54, 6, CORRIDOR_1, WALL);
    quad( 56, 57, 58, 59, 4, CORRIDOR_1, WALL);
    quad( 57, 56, 52, 53, 5, CORRIDOR_1, DOOR);
	
	numVertices += 36;
    
	//Corridor 1 Classroom 2
    quad( 61, 60, 63, 62, 1, CORRIDOR_1, WALL);
    quad( 62, 63, 67, 66, 2, CORRIDOR_1, WALL);
    quad( 63, 60, 64, 67, 3, CORRIDOR_1, WALL);
    quad( 66, 65, 61, 62, 6, CORRIDOR_1, WALL);
    quad( 64, 65, 66, 67, 4, CORRIDOR_1, WALL);
    quad( 65, 64, 60, 61, 5, CORRIDOR_1, DOOR);
	
	numVertices += 36;
    
	//Corridor 1 Classroom 3
    quad( 69, 68, 71, 70, 1, CORRIDOR_1, WALL);
    quad( 70, 71, 75, 74, 2, CORRIDOR_1, WALL);
    quad( 71, 68, 72, 75, 3, CORRIDOR_1, WALL);
    quad( 74, 73, 69, 70, 6, CORRIDOR_1, WALL);
    quad( 72, 73, 74, 75, 4, CORRIDOR_1, WALL);
    quad( 73, 72, 68, 69, 5, CORRIDOR_1, DOOR);
	
	numVertices += 36;
    
	//Corridor 1 Classroom 4
    quad( 77, 76, 79, 78, 1, CORRIDOR_1, WALL);
    quad( 78, 79, 83, 82, 2, CORRIDOR_1, WALL);
    quad( 79, 76, 80, 83, 3, CORRIDOR_1, WALL);
    quad( 82, 81, 77, 78, 6, CORRIDOR_1, WALL);
    quad( 80, 81, 82, 83, 4, CORRIDOR_1, WALL);
    quad( 81, 80, 76, 77, 5, CORRIDOR_1, DOOR);
	
	numVertices += 36;
    
	//Corridor 2 Classroom 1
    quad( 85, 84, 87, 86, 1, CORRIDOR_2, DOOR);
    quad( 86, 87, 91, 90, 2, CORRIDOR_2, WALL);
    quad( 87, 84, 88, 91, 3, CORRIDOR_2, WALL);
    quad( 90, 89, 85, 86, 6, CORRIDOR_2, WALL);
    quad( 88, 89, 90, 91, 4, CORRIDOR_2, WALL);
    quad( 89, 88, 84, 85, 5, CORRIDOR_2, WALL);
	
	numVertices += 36;
    
	//Corridor 2 Classroom 2
    quad( 93, 92, 95, 94, 1, CORRIDOR_2, DOOR);
    quad( 94, 95, 99, 98, 2, CORRIDOR_2, WALL);
    quad( 95, 92, 96, 99, 3, CORRIDOR_2, WALL);
    quad( 98, 97, 93, 94, 6, CORRIDOR_2, WALL);
    quad( 96, 97, 98, 99, 4, CORRIDOR_2, WALL);
    quad( 97, 96, 92, 93, 5, CORRIDOR_2, WALL);
	
	numVertices += 36;
    
	//Corridor 2 Classroom 3
    quad( 101, 100, 103, 102, 1, CORRIDOR_2, WALL);
    quad( 102, 103, 107, 106, 2, CORRIDOR_2, WALL);
    quad( 103, 100, 104, 107, 3, CORRIDOR_2, WALL);
    quad( 106, 105, 101, 102, 6, CORRIDOR_2, WALL);
    quad( 104, 105, 106, 107, 4, CORRIDOR_2, DOOR);
    quad( 105, 104, 100, 101, 5, CORRIDOR_2, WALL);
	
	numVertices += 36;
    
	//Corridor 2 Classroom 4
    quad( 109, 108, 111, 110, 1, CORRIDOR_2, WALL);
    quad( 110, 111, 115, 114, 2, CORRIDOR_2, WALL);
    quad( 111, 108, 112, 115, 3, CORRIDOR_2, WALL);
    quad( 114, 113, 109, 110, 6, CORRIDOR_2, WALL);
    quad( 112, 113, 114, 115, 4, CORRIDOR_2, DOOR);
    quad( 113, 112, 108, 109, 5, CORRIDOR_2, WALL);
	
	numVertices += 36;
    
	//Corridor 4 Classroom 1
    quad( 117, 116, 119, 118, 1, CORRIDOR_4, DOOR);
    quad( 118, 119, 123, 122, 2, CORRIDOR_4, WALL);
    quad( 119, 116, 120, 123, 3, CORRIDOR_4, WALL);
    quad( 122, 121, 117, 118, 6, CORRIDOR_4, WALL);
    quad( 120, 121, 122, 123, 4, CORRIDOR_4, WALL);
    quad( 121, 120, 116, 117, 5, CORRIDOR_4, WALL);
	
	numVertices += 36;
    
	//Corridor 4 Classroom 2
	quad( 125, 124, 127, 126, 1, CORRIDOR_4, DOOR);
    quad( 126, 127, 131, 130, 2, CORRIDOR_4, WALL);
    quad( 127, 124, 128, 131, 3, CORRIDOR_4, WALL);
    quad( 130, 129, 125, 126, 6, CORRIDOR_4, WALL);
    quad( 128, 129, 130, 131, 4, CORRIDOR_4, WALL);
    quad( 129, 128, 124, 125, 5, CORRIDOR_4, WALL);
    
	numVertices += 36;    
    
	//Corridor 4 Classroom 3
    quad( 133, 132, 135, 134, 1, CORRIDOR_4, WALL);
    quad( 134, 135, 139, 138, 2, CORRIDOR_4, WALL);
    quad( 135, 132, 136, 139, 3, CORRIDOR_4, WALL);
    quad( 138, 137, 133, 134, 6, CORRIDOR_4, WALL);
    quad( 136, 137, 138, 139, 4, CORRIDOR_4, DOOR);
    quad( 137, 136, 132, 133, 5, CORRIDOR_4, WALL);
	
	numVertices += 36;
    
	//Corridor 4 Classroom 4
    quad( 141, 140, 143, 142, 1, CORRIDOR_4, WALL);
    quad( 142, 143, 147, 146, 2, CORRIDOR_4, WALL);
    quad( 143, 140, 144, 147, 3, CORRIDOR_4, WALL);
    quad( 146, 145, 141, 142, 6, CORRIDOR_4, WALL);
    quad( 144, 145, 146, 147, 4, CORRIDOR_4, DOOR);
    quad( 145, 144, 140, 141, 5, CORRIDOR_4, WALL);
	
	numVertices += 36;
    
	//Corridor 3 Classroom 1
    var x=8;
    quad( 141+x, 140+x, 143+x, 142+x, 1, CORRIDOR_3, WALL);
    quad( 142+x, 143+x, 147+x, 146+x, 2, CORRIDOR_3, WALL);
    quad( 143+x, 140+x, 144+x, 147+x, 3, CORRIDOR_3, WALL);
    quad( 146+x, 145+x, 141+x, 142+x, 6, CORRIDOR_3, WALL);
    quad( 144+x, 145+x, 146+x, 147+x, 4, CORRIDOR_3, WALL);
    quad( 145+x, 144+x, 140+x, 141+x, 5, CORRIDOR_3, DOOR);
	
	numVertices += 36;
    
	//Corridor 3 Classroom 2
    x=x+8;
    quad( 141+x, 140+x, 143+x, 142+x, 1, CORRIDOR_3, WALL);
    quad( 142+x, 143+x, 147+x, 146+x, 2, CORRIDOR_3, WALL);
    quad( 143+x, 140+x, 144+x, 147+x, 3, CORRIDOR_3, WALL);
    quad( 146+x, 145+x, 141+x, 142+x, 6, CORRIDOR_3, WALL);
    quad( 144+x, 145+x, 146+x, 147+x, 4, CORRIDOR_3, WALL);
    quad( 145+x, 144+x, 140+x, 141+x, 5, CORRIDOR_3, DOOR);
	
	numVertices += 36;
    
	//Corridor 3 Classroom 3
    x=x+8;
    quad( 141+x, 140+x, 143+x, 142+x, 1, CORRIDOR_3, WALL);
    quad( 142+x, 143+x, 147+x, 146+x, 2, CORRIDOR_3, WALL);
    quad( 143+x, 140+x, 144+x, 147+x, 3, CORRIDOR_3, WALL);
    quad( 146+x, 145+x, 141+x, 142+x, 6, CORRIDOR_3, WALL);
    quad( 144+x, 145+x, 146+x, 147+x, 4, CORRIDOR_3, WALL);
    quad( 145+x, 144+x, 140+x, 141+x, 5, CORRIDOR_3, DOOR);
	
	numVertices += 36;
    
	//Corridor 3 Classroom 4
    x=x+8;
    quad( 141+x, 140+x, 143+x, 142+x, 1, CORRIDOR_3, WALL);
    quad( 142+x, 143+x, 147+x, 146+x, 2, CORRIDOR_3, WALL);
    quad( 143+x, 140+x, 144+x, 147+x, 3, CORRIDOR_3, WALL);
    quad( 146+x, 145+x, 141+x, 142+x, 6, CORRIDOR_3, WALL);
    quad( 144+x, 145+x, 146+x, 147+x, 4, CORRIDOR_3, WALL);
    quad( 145+x, 144+x, 140+x, 141+x, 5, CORRIDOR_3, DOOR);
	
	numVertices += 36;
    
	
    x=x+8;
    quad( 140+x, 141+x, 143+x, 142+x, 5, CORRIDOR_1, PAINTING);
    quad( 144+x, 145+x, 147+x, 146+x, 5, CORRIDOR_1, DOOR);
    quad( 148+x, 149+x, 151+x, 150+x, 5, CORRIDOR_1, DOOR);
    quad( 152+x, 153+x, 155+x, 154+x, 5, CORRIDOR_2, PAINTING);
	
	
	numVertices += 24;
    
    quad( 156+x, 157+x, 158+x, 159+x, 5, CORRIDOR_3, DOOR);
    quad( 160+x, 161+x, 162+x, 163+x, 5, CORRIDOR_3, DOOR);
    quad( 164+x, 165+x, 166+x, 167+x, 5, CORRIDOR_3, DOOR);
    quad( 208, 209, 210, 211, 5,         CORRIDOR_3, DOOR);
	
	numVertices += 24;
    
    x=4;
    quad( 208+x, 209+x, 211+x, 210+x, 5, CORRIDOR_1, DOOR);
    x=x+4;
    quad( 208+x, 209+x, 211+x, 210+x, 5, CORRIDOR_1, DOOR);
    x=x+4;
    quad( 208+x, 209+x, 211+x, 210+x, 5, CORRIDOR_2, DOOR);
    x=x+4;
    quad( 208+x, 209+x, 211+x, 210+x, 5, CORRIDOR_2, DOOR);
	
	numVertices += 24;
	
    x=x+4;
    quad( 208+x, 209+x, 211+x, 210+x, 5, CORRIDOR_2, DOOR);
    x=x+4;
    quad( 208+x, 209+x, 211+x, 210+x, 5, CORRIDOR_2, DOOR);
    x=x+4;
    quad( 208+x, 209+x, 211+x, 210+x, 5, CORRIDOR_1, DOOR);
    x=x+4;
    quad( 208+x, 209+x, 211+x, 210+x, 5, CORRIDOR_1, DOOR);
    
	numVertices += 24;
}

//Init function at program load
window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    
    aspect =  canvas.width/canvas.height;
    
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
    
    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
	//Create the necessary vertex buffer, texture buffer, color buffer contents
    colorCube();

	//Create the necessary GPU buffers and copy content to them
    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );
    
    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor);

    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    linesbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, linesbuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(lines), gl.STATIC_DRAW );

    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	// texture coordinate buffer
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW );
    
	// texture coordinate variables shared with  shader
    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );
	
	//
    // Initialize a texture
    //
	// specify the texture image (can be jpg, tiff, gif) or 
	// can specify your own image array
    var image 	= new Image();
	image.src 	= "Texture.jpg"
	image.crossOrigin = "anonymous"
		
    image.onload = function() { 
        configureTexture( image, 0);
    }
 
    modelView = gl.getUniformLocation( program, "modelView" );
    projection = gl.getUniformLocation( program, "projection" );

	//Code to handle navigation within the created building structure
    var e=2;
    var a=0;
    var diff=0.25
    var diff1=0.25
    window.onkeydown = function(event) {
        var key = event.keyCode;
        if (eye[0] >= -0.5 && eye[0] <= 0.5 && eye[2] >= -10.5 && eye[2] <= -9.5)
        {
        	at=vec3(100,0,-10.5);
        	eye=vec3(0.6,0,-10);
        	e=0;
        	a=2;
        	diff = -0.5;
        	diff1 = 0.5;
        }
        if (eye[0] <= 10.5 && eye[0] >= 9.5 && eye[2] <= -9.5 && eye[2] >= -10.5)
        {
        	at=vec3(100,0,-10.5);
        	eye=vec3(9.6,0,-10);
        	e=2;
        	a=2;
        	diff = 0;
        	diff1 = -0.5;
        	if(key==76)
        	{
        		eye=vec3(11,2,-10.4);
        		at=vec3(11,2,100);
        		diff = -0.5;
        		diff1 = -0.5;
        		a=0;
        	}
        }
        if (eye[0] <= 11.5 && eye[0] >= 10.5 && eye[2] <= 0.5 && eye[2] >= -0.5)
        {
        	at=vec3(-100,2,1);
        	eye=vec3(9.4,2,1);
        	e=0;
        	a=2;
        	diff = 0.5;
        	diff1 = -0.5;
        }
        if (eye[0] <= 1.5 && eye[0] >= 1 && eye[2] <= 1.5 && eye[2] >= 0.5)
        {
        	at=vec3(-100,2,1);
        	eye=vec3(1.4,2,1.0);
        	e=2;
        	a=0;
        	diff = 0;
        	diff1 = -0.5;
        	if(key==76)
        	{
        		eye = vec3(0,0,0.5);
				at = vec3(0, 0.0, -100.5);
				diff=0.5;
				diff1=0.5;
        	}
        }
        if (key == 38)			//Arrow Down Key
        {
        	eye[e] = eye[e] - diff;
        }
        else if(key == 40)		//Arrow Up Key
        {
        	eye[e] = eye[e] + diff;
        }
		else if(key == 65) 		//A Key
		{
			at[a] = at[a] - 10 * diff1
		}
		else if(key == 68)		//D Key
		{
			at[a] = at[a] + 10 * diff1;
		}
		else if(key == 87)		//W Key
		{
			at[1] = at[1] + 10 * diff1
		}
		else if(key == 90)		//Z Key
		{
			at[1] = at[1] - 10 * diff1;
		}
		
        lines = [vec4(eye,1) , vec4(eye[0],eye[1]+2,eye[2],1)];
        gl.bindBuffer(gl.ARRAY_BUFFER, linesbuffer);
    	gl.bufferData( gl.ARRAY_BUFFER, flatten(lines), gl.STATIC_DRAW );
    }
    var light = gl.getUniformLocation( program, "lightflag" );
    gl.uniform1f(light,button1);

	//Button to tun lights ON/OFF
    document.getElementById("switch").onclick = function(){
        button1=!button1;
        gl.uniform1f(light,button1);
    };
    render(); 
}

//Function to render the created building structure coordinates
var render = function(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    matrixcalculation();
	matrixcalculation1();
	matrixcalculation2();
	matrixcalculation3();
    gl.viewport( 0, canvas.height/2 , canvas.width/2, canvas.height/2 );
    gl.scissor(0, canvas.height/2 ,canvas.width/2, canvas.height/2 );

	//Set up the ModelView and Perspective transformation matrices
    mvMatrix = lookAt(eye, at , up);
    pMatrix = perspective(fovy, aspect, near, far);

	//Copy to GPU
    gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
    gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );

	//Draw a line to display navigator's position in the building structure
    gl.bindBuffer(gl.ARRAY_BUFFER, linesbuffer);
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.drawArrays(gl.LINES,0,2);

    gl.viewport( canvas.width/2, canvas.height/2 , canvas.width/2, canvas.height/2 );
    gl.scissor(canvas.width/2, canvas.height/2 ,canvas.width/2, canvas.height/2 );

   	mvMatrix = lookAt(eye1, at1 , up1);
    pMatrix = perspective(fovy, aspect, near, far);

	//Render the calculation points
    gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
    gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );

    gl.bindBuffer(gl.ARRAY_BUFFER, linesbuffer);
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.drawArrays(gl.LINES,0,2);
    requestAnimFrame(render);
}

//Matrix calculation functions for lighting
function matrixcalculation()
{
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
       flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
       flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), 
       flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), 
           flatten(lightPosition) );
}

function matrixcalculation1()
{
    ambientProduct1 = mult(lightAmbient1, materialAmbient);
    diffuseProduct1 = mult(lightDiffuse1, materialDiffuse);
    specularProduct1 = mult(lightSpecular1, materialSpecular);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct1"),
       flatten(ambientProduct1));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct1"),
       flatten(diffuseProduct1) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct1"), 
       flatten(specularProduct1) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition1"), 
           flatten(lightPosition1) );
}

function matrixcalculation2()
{
    ambientProduct2 = mult(lightAmbient2, materialAmbient);
    diffuseProduct2 = mult(lightDiffuse2, materialDiffuse);
    specularProduct2 = mult(lightSpecular2, materialSpecular);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct2"),
       flatten(ambientProduct2));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct2"),
       flatten(diffuseProduct2) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct2"), 
       flatten(specularProduct2) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition2"), 
           flatten(lightPosition2) );
}

function matrixcalculation3()
{
    ambientProduct3 = mult(lightAmbient3, materialAmbient);
    diffuseProduct3 = mult(lightDiffuse3, materialDiffuse);
    specularProduct3 = mult(lightSpecular3, materialSpecular);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct3"),
       flatten(ambientProduct3));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct3"),
       flatten(diffuseProduct3) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct3"), 
       flatten(specularProduct3) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition3"), 
           flatten(lightPosition3) );
}