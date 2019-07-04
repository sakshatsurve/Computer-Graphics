var vertices = [
    vec4(-0.5, -0.5,  1.5, 1.0),
    vec4(-0.5,  0.5,  1.5, 1.0),
    vec4(0.5,  0.5,  1.5, 1.0),
    vec4(0.5, -0.5,  1.5, 1.0),
    vec4(-0.5, -0.5, -10.5, 1.0),
    vec4(-0.5,  0.5, -10.5, 1.0),
    vec4(0.5,  0.5, -10.5, 1.0),
    vec4( 0.5, -0.5, -10.5, 1.0),

    vec4(10.5, -0.5,  -9.5, 1.0),
    vec4(10.5,  0.5,  -9.5, 1.0),
    vec4(0.5001,  0.5,  -9.5, 1.0),
    vec4(0.5001, -0.5,  -9.5, 1.0),
    vec4(10.5, -0.5, -10.5, 1.0),
    vec4(10.5,  0.5, -10.5, 1.0),
    vec4(0.5001,  0.5, -10.5, 1.0),
    vec4( 0.5001, -0.5, -10.5, 1.0),

    vec4(10.5,  1.5,  1.5, 1.0),
    vec4(10.5,  2.5,  1.5, 1.0),
    vec4(11.5,  2.5,  1.5, 1.0),
    vec4(11.5,  1.5,  1.5, 1.0),
    vec4(10.5,  1.5, -10.5, 1.0),
    vec4(10.5,  2.5, -10.5, 1.0),
    vec4(11.5,  2.5, -10.5, 1.0),
    vec4(11.5,  1.5, -10.5, 1.0),

    vec4(10.4999,  1.5,  0.5, 1.0),
    vec4(10.4999,  2.5,  0.5, 1.0),
    vec4(0.5,   2.5,  0.5, 1.0),
    vec4(0.5,   1.5,  0.5, 1.0),
    vec4(10.4999,  1.5, 1.5, 1.0),
    vec4(10.4999,  2.5, 1.5, 1.0),
    vec4(0.5,   2.5, 1.5, 1.0),
    vec4( 0.5,  1.5, 1.5, 1.0),

    vec4(-0.2, -0.5, -10.4999, 1.0),
    vec4(-0.2,  0.1, -10.4999, 1.0),
    vec4(0.2,  0.1, -10.4999, 1.0),
    vec4( 0.2, -0.5, -10.4999, 1.0),

    vec4(10.4999, -0.5, -10.2, 1.0),
    vec4(10.4999,  0.1, -10.2, 1.0),
    vec4(10.4999,  0.1, -9.8, 1.0),
    vec4(10.4999, -0.5, -9.8, 1.0),

    vec4(10.8,  1.5, 1.4999, 1.0),
    vec4(10.8,  2.1, 1.4999, 1.0),
    vec4(11.2,  2.1, 1.4999, 1.0),
    vec4(11.2,  1.5, 1.4999, 1.0),

    vec4(0.5001,  1.5, 0.8, 1.0),
    vec4(0.5001,  2.1, 0.8, 1.0),
    vec4(0.5001,  2.1, 1.2, 1.0),
    vec4(0.5001,  1.5, 1.2, 1.0),
	
	vec4(-0.4999, -0.2, -4,1),
    vec4(-0.4999, 0.2,  -4,1),
    vec4(-0.4999, -0.2, -5,1),
    vec4(-0.4999, 0.2,  -5,1),

    //classrooms on ground floor
    vec4(0.5001, -0.5,  -2.5, 1.0),
    vec4(0.5001,  0.5,  -2.5, 1.0),
    vec4(1.5,  0.5,  -2.5, 1.0),
    vec4(1.5, -0.5,  -2.5, 1.0),
    vec4(0.5001, -0.5, -3.5, 1.0),
    vec4(0.5001,  0.5, -3.5, 1.0),
    vec4(1.5,  0.5, -3.5, 1.0),
    vec4(1.5, -0.5, -3.5, 1.0),


    vec4(0.5001, -0.5,  -6.5, 1.0),
    vec4(0.5001,  0.5,  -6.5, 1.0),
    vec4(1.5,  0.5,  -6.5, 1.0),
    vec4(1.5, -0.5,  -6.5, 1.0),
    vec4(0.5001, -0.5, -7.5, 1.0),
    vec4(0.5001,  0.5, -7.5, 1.0),
    vec4(1.5,  0.5, -7.5, 1.0),
    vec4(1.5, -0.5, -7.5, 1.0),

    vec4(-0.5001, -0.5,  -2.5, 1.0),
    vec4(-0.5001,  0.5,  -2.5, 1.0),
    vec4(-1.5,  0.5,  -2.5, 1.0),
    vec4(-1.5, -0.5,  -2.5, 1.0),
    vec4(-0.5001, -0.5, -3.5, 1.0),
    vec4(-0.5001,  0.5, -3.5, 1.0),
    vec4(-1.5,  0.5, -3.5, 1.0),
    vec4(-1.5, -0.5, -3.5, 1.0),


    vec4(-0.5001, -0.5,  -6.5, 1.0),
    vec4(-0.5001,  0.5,  -6.5, 1.0),
    vec4(-1.5,  0.5,  -6.5, 1.0),
    vec4(-1.5, -0.5,  -6.5, 1.0),
    vec4(-0.5001, -0.5, -7.5, 1.0),
    vec4(-0.5001,  0.5, -7.5, 1.0),
    vec4(-1.5,  0.5, -7.5, 1.0),
    vec4(-1.5, -0.5, -7.5, 1.0),

    vec4(3.5, -0.5,  -9.4999, 1.0),
    vec4(3.5,  0.5,  -9.4999, 1.0),
    vec4(4.5,  0.5,  -9.4999, 1.0),
    vec4(4.5, -0.5,  -9.4999, 1.0),
    vec4(3.5, -0.5,  -8.5, 1.0),
    vec4(3.5,  0.5,  -8.5, 1.0),
    vec4(4.5,  0.5,  -8.5, 1.0),
    vec4(4.5, -0.5,  -8.5, 1.0),

    vec4(7.5, -0.5,  -9.4999, 1.0),
    vec4(7.5,  0.5,  -9.4999, 1.0),
    vec4(8.5,  0.5,  -9.4999, 1.0),
    vec4(8.5, -0.5,  -9.4999, 1.0),
    vec4(7.5, -0.5,  -8.5, 1.0),
    vec4(7.5,  0.5,  -8.5, 1.0),
    vec4(8.5,  0.5,  -8.5, 1.0),
    vec4(8.5, -0.5,  -8.5, 1.0),

    vec4(3.5, -0.5,  -11.5, 1.0),
    vec4(3.5,  0.5,  -11.5, 1.0),
    vec4(4.5,  0.5,  -11.5, 1.0),
    vec4(4.5, -0.5,  -11.5, 1.0),
    vec4(3.5, -0.5,  -10.5001, 1.0),
    vec4(3.5,  0.5,  -10.5001, 1.0),
    vec4(4.5,  0.5,  -10.5001, 1.0),
    vec4(4.5, -0.5,  -10.5001, 1.0),

    vec4(7.5, -0.5,  -11.5, 1.0),
    vec4(7.5,  0.5,  -11.5, 1.0),
    vec4(8.5,  0.5,  -11.5, 1.0),
    vec4(8.5, -0.5,  -11.5, 1.0),
    vec4(7.5, -0.5,  -10.5001, 1.0),
    vec4(7.5,  0.5,  -10.5001, 1.0),
    vec4(8.5,  0.5,  -10.5001, 1.0),
    vec4(8.5, -0.5,  -10.5001, 1.0),


    //classrooms on first floor
    vec4(7.5,  1.5,   1.5001, 1.0),
    vec4(7.5,  2.5,   1.5001, 1.0),
    vec4(8.5,  2.5,   1.5001, 1.0),
    vec4(8.5,  1.5,   1.5001, 1.0),
    vec4(7.5,  1.5,   2.5, 1.0),
    vec4(7.5,  2.5,   2.5, 1.0),
    vec4(8.5,  2.5,   2.5, 1.0),
    vec4(8.5,  1.5,   2.5, 1.0),

    vec4(3.5,  1.5,   1.5001, 1.0),
    vec4(3.5,  2.5,   1.5001, 1.0),
    vec4(4.5,  2.5,   1.5001, 1.0),
    vec4(4.5,  1.5,   1.5001, 1.0),
    vec4(3.5,  1.5,   2.5, 1.0),
    vec4(3.5,  2.5,   2.5, 1.0),
    vec4(4.5,  2.5,   2.5, 1.0),
    vec4(4.5,  1.5,   2.5, 1.0),

    vec4(7.5,  1.5,   -0.5, 1.0),
    vec4(7.5,  2.5,   -0.5, 1.0),
    vec4(8.5,  2.5,   -0.5, 1.0),
    vec4(8.5,  1.5,   -0.5, 1.0),
    vec4(7.5,  1.5,   0.4999, 1.0),
    vec4(7.5,  2.5,   0.4999, 1.0),
    vec4(8.5,  2.5,   0.4999, 1.0),
    vec4(8.5,  1.5,   0.4999, 1.0),

    vec4(3.5,  1.5,   -0.5, 1.0),
    vec4(3.5,  2.5,   -0.5, 1.0),
    vec4(4.5,  2.5,   -0.5, 1.0),
    vec4(4.5,  1.5,   -0.5, 1.0),
    vec4(3.5,  1.5,   0.4999, 1.0),
    vec4(3.5,  2.5,   0.4999, 1.0),
    vec4(4.5,  2.5,   0.4999, 1.0),
    vec4(4.5,  1.5,   0.4999, 1.0),

    vec4(10.4999, 1.5,  -2.5, 1.0),
    vec4(10.4999, 2.5,  -2.5, 1.0),
    vec4(9.5,  2.5,  -2.5, 1.0),
    vec4(9.5,  1.5,  -2.5, 1.0),
    vec4(10.4999, 1.5, -3.5, 1.0),
    vec4(10.4999, 2.5, -3.5, 1.0),
    vec4(9.5,  2.5, -3.5, 1.0),
    vec4(9.5,  1.5, -3.5, 1.0),

    vec4(10.4999, 1.5,  -6.5, 1.0),
    vec4(10.4999, 2.5,  -6.5, 1.0),
    vec4(9.5,  2.5,  -6.5, 1.0),
    vec4(9.5,  1.5,  -6.5, 1.0),
    vec4(10.4999, 1.5, -7.5, 1.0),
    vec4(10.4999, 2.5, -7.5, 1.0),
    vec4(9.5,  2.5, -7.5, 1.0),
    vec4(9.5,  1.5, -7.5, 1.0),

    vec4(11.5001, 1.5,  -2.5, 1.0),
    vec4(11.5001, 2.5,  -2.5, 1.0),
    vec4(12.5,  2.5,  -2.5, 1.0),
    vec4(12.5,  1.5,  -2.5, 1.0),
    vec4(11.5001, 1.5, -3.5, 1.0),
    vec4(11.5001, 2.5, -3.5, 1.0),
    vec4(12.5,  2.5, -3.5, 1.0),
    vec4(12.5,  1.5, -3.5, 1.0),

    vec4(11.5001, 1.5,  -6.5, 1.0),
    vec4(11.5001, 2.5,  -6.5, 1.0),
    vec4(12.5,  2.5,  -6.5, 1.0),
    vec4(12.5, 1.5,  -6.5, 1.0),
    vec4(11.5001, 1.5, -7.5, 1.0),
    vec4(11.5001, 2.5, -7.5, 1.0),
    vec4(12.5,  2.5, -7.5, 1.0),
    vec4(12.5,  1.5, -7.5, 1.0),

    //classroom windows
    vec4(0.4999, -0.5,  -2.75, 1.0),
    vec4(0.4999,  0.25,  -2.75, 1.0),
	vec4(0.4999, -0.5, -3.25, 1.0),
    vec4(0.4999,  0.25, -3.25, 1.0),
    vec4(0.4999, -0.5,  -6.75, 1.0),
    vec4(0.4999,  0.25,  -6.75, 1.0),
	vec4(0.4999, -0.5, -7.25, 1.0),
    vec4(0.4999,  0.25, -7.25, 1.0),

    vec4(-0.4999, -0.5,  -2.75, 1.0),
    vec4(-0.4999,  0.25,  -2.75, 1.0),
	vec4(-0.4999, -0.5, -3.25, 1.0),
    vec4(-0.4999,  0.25, -3.25, 1.0),
	vec4(-0.4999, -0.5,  -6.75, 1.0),
    vec4(-0.4999,  0.25,  -6.75, 1.0),
	vec4(-0.4999, -0.5, -7.25, 1.0),
    vec4(-0.4999,  0.25, -7.25, 1.0),

    vec4(3.75, -0.5,  -9.5001, 1.0),
    vec4(3.75,  0.25,  -9.5001, 1.0),
    vec4(4.25,  0.25,  -9.5001, 1.0),
    vec4(4.25, -0.5,  -9.5001, 1.0),
	vec4(7.75, -0.5,  -9.5001, 1.0),
    vec4(7.75,  0.25,  -9.5001, 1.0),
    vec4(8.25,  0.25,  -9.5001, 1.0),
    vec4(8.25, -0.5,  -9.5001, 1.0),
	
	vec4(3.75, -0.5,  -10.4999, 1.0),
    vec4(3.75,  0.25,  -10.4999, 1.0),
    vec4(4.25,  0.25,  -10.4999, 1.0),
    vec4(4.25, -0.5,  -10.4999, 1.0),
	vec4(7.75, -0.5,  -10.4999, 1.0),
    vec4(7.75,  0.25,  -10.4999, 1.0),
    vec4(8.25,  0.25,  -10.4999, 1.0),
    vec4(8.25, -0.5,  -10.4999, 1.0),


    //First floor

    vec4(7.25,  1.5,    1.4999, 1.0),
	vec4(7.25,  2.25,    1.4999, 1.0),
	vec4(6.75,  1.5,    1.4999, 1.0),
    vec4(6.75,  2.25,    1.4999, 1.0),
	vec4(7.25,  1.5,    0.5001, 1.0),
    vec4(7.25,  2.25,    0.5001, 1.0),
	vec4(6.75,  1.5,    0.5001, 1.0),
    vec4(6.75,  2.25,    0.5001, 1.0),

    vec4(10.5001, 1.5,  -2.75, 1.0),
    vec4(10.5001, 2.25,  -2.75, 1.0),
	vec4(10.5001, 1.5,  -3.25, 1.0),
    vec4(10.5001, 2.25,  -3.25, 1.0),
	vec4(11.4999, 1.5,  -2.75, 1.0),
    vec4(11.4999, 2.25,  -2.75, 1.0),
	vec4(11.4999, 1.5,  -3.25, 1.0),
    vec4(11.4999, 2.25,  -3.25, 1.0),


    vec4(10.5001, 1.5,  -6.75, 1.0),
    vec4(10.5001, 2.25,  -6.75, 1.0),
	vec4(10.5001, 1.5, -7.25, 1.0),
    vec4(10.5001, 2.25, -7.25, 1.0),
	vec4(11.4999, 1.5,  -6.75, 1.0),
    vec4(11.4999, 2.25,  -6.75, 1.0),
	vec4(11.4999, 1.5, -7.25, 1.0),
    vec4(11.4999, 2.25, -7.25, 1.0),

    vec4(4.25,  1.5,    1.4999, 1.0),
	vec4(4.25,  2.25,    1.4999, 1.0),
	vec4(3.75,  1.5,    1.4999, 1.0),
    vec4(3.75,  2.25,    1.4999, 1.0),
	vec4(4.25,  1.5,    0.5001, 1.0),
    vec4(4.25,  2.25,    0.5001, 1.0),
	vec4(3.75,  1.5,    0.5001, 1.0),
    vec4(3.75,  2.25,    0.5001, 1.0),

];