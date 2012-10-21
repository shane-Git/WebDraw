var c;
var ctx;
var MidX;
var MidY;

Init();

function Init()
{
	c=document.getElementById("myCanvas");
	ctx=c.getContext("2d");
	var width = c.width;
	var height = c.height;
	MidX = parseInt(width/2);
	MidY = parseInt(height/2);
	DrawPoint(MidX,MidY);
}

function DrawPoint(x,y)
{
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+1,y+1);
	ctx.stroke();
}

function DrawPointMid(x,y)
{
	DrawPoint(x+MidX,-y+MidY);
}

function DDALine(x0,y0,x1,y1)
{
	DrawPointMid(x0,y0);
	DrawPointMid(x1,y1);
	var slope=(y1-y0)/(x1-x0);
	var deltaX = x1-x0;
	var deltaY = y1-y0;
	var xDraw=x0;
	var yDraw=y0;
	var xCal=x0;
	var yCal=y0;
	var step;
	if(slope<=1 && slope >0)
	{
		if(deltaX>0)
		{
			step = 1;
		}
		else
		{
			step = -1;
		}
		function test0()
		{
			var i=0;
			(
				function()
				{
					if(i>=Math.abs(deltaX)){return;}
					xDraw += step;
					yCal = yCal + step * slope;
					yDraw = parseInt(yCal + step * 0.5);
					DrawPointMid(xDraw,yDraw)
					i++;
					window.setTimeout(arguments.callee,20);
				}
			)();
		}
		test0();
	}
	else if(slope>0)
	{
		if(deltaY>0)
		{
			step = 1;
		}
		else
		{
			step = -1;
		}
		function test1()
		{
			var i=0;
			(
				function()
				{
					if(i>=Math.abs(deltaY)){return;}
					yDraw += step;
					xCal = xCal + step * 1/slope;
					xDraw = parseInt(xCal + step * 0.5);
					DrawPointMid(xDraw,yDraw)
					i++;
					window.setTimeout(arguments.callee,20);
				}
			)();
		}
		test1();
	}
	else if(slope<0 && slope<=-1)
	{	
		if(deltaY>0)
		{
			step = 1;
		}
		else
		{
			step = -1;
		}
		function test2()
		{
			var i=0;
			(
				function()
				{
					if(i>=Math.abs(deltaY)){return;}
					yDraw += step;
					xCal = xCal + step * 1/slope;
					xDraw = parseInt(xCal - step * 0.5);
					DrawPointMid(xDraw,yDraw)
					i++;
					window.setTimeout(arguments.callee,20);
				}
			)();
		}
		test2();
	}
	else if(slope>-1)
	{
//		console.log("enter"+x0+y0+x1+y1+slope);
		if(deltaX>0)
		{
			step = 1;
		}
		else
		{
			step = -1;
		}
		function test3()
		{
			var i=0;
			(
				function()
				{
					if(i>=Math.abs(deltaX)){return;}
					xDraw += step;
					yCal = yCal + step * slope;
					yDraw = parseInt(yCal - step * 0.5);
					DrawPointMid(xDraw,yDraw)
					i++;
					window.setTimeout(arguments.callee,20);
				}
			)();
		}
		test3();
	}
}

function BresenhamLine(x0,y0,x1,y1)
{
	DrawPointMid(x0,y0);
	DrawPointMid(x1,y1);
	var deltaX = x1-x0;
	var deltaY = y1-y0;
	var DeltaX=Math.abs(deltaX);
	var DeltaY=Math.abs(deltaY);
	var xDraw = x0;
	var yDraw = y0;
	var stepDraw = 1;

	if(DeltaX >= DeltaY)
	{
		if(deltaX>0)
		{
			step = 1;
		}
		else
		{
			step = -1;
		}
		if(deltaY>0)
		{
			stepDraw = 1;
		}
		else
		{
			stepDraw = -1;
		}
		var p = 2 * DeltaY - DeltaX;
		function test0()
		{
			var i=0;
			(
				function()
				{
					if(i>=Math.abs(deltaX)){return;}
					xDraw += step;
					if(p<0)
					{
						p = p + 2 * DeltaY;
					}
					else
					{
						yDraw += stepDraw;
						p = p + 2 * DeltaY - 2 * DeltaX;
					}
					DrawPointMid(xDraw,yDraw)
					i++;
					window.setTimeout(arguments.callee,20);
				}
			)();
		}
		test0();
	}
	else
	{
		if(deltaY>0)
		{
			step = 1;
		}
		else
		{
			step = -1;
		}
		if(deltaX>0)
		{
			stepDraw = 1;
		}
		else
		{
			stepDraw = -1;
		}
		var p = 2 * DeltaX - DeltaY;
		function test1()
		{
			var i=0;
			(
				function()
				{
					if(i>=Math.abs(deltaY)){return;}
					yDraw += step;
					if(p<0)
					{
						p = p + 2 * DeltaX;
					}
					else
					{
						xDraw += stepDraw;
						p = p + 2 * DeltaX - 2 * DeltaY;
					}
					DrawPointMid(xDraw,yDraw)
					i++;
					window.setTimeout(arguments.callee,20);
				}
			)();
		}
		test1();
	}
}

function BresenhamCircle(x0,y0,r)
{
	DrawPointMid(x0,y0);
	var xDraw = 0;
	var yDraw = r;
	var p = 5/4 - r;
	DrawPointMid(x0+xDraw,y0+yDraw);
	DrawPointMid(x0+yDraw,y0+xDraw);
	DrawPointMid(x0+xDraw,y0-yDraw);
	DrawPointMid(x0-yDraw,y0+xDraw);
	function test0()
	{
		(
			function()
			{
				if(xDraw>=yDraw){return;}
				xDraw++;
				if(p<0)
				{
					p = p + 2 * xDraw + 1;
				}
				else
				{
					yDraw--;
					p = p + 2 * xDraw + 1 - 2 * yDraw;
				}
				DrawPointMid(x0+xDraw,y0+yDraw);
				DrawPointMid(x0+yDraw,y0+xDraw);
				DrawPointMid(x0+xDraw,y0-yDraw);
				DrawPointMid(x0+yDraw,y0-xDraw);
				DrawPointMid(x0-xDraw,y0+yDraw);
				DrawPointMid(x0-yDraw,y0+xDraw);
				DrawPointMid(x0-xDraw,y0-yDraw);
				DrawPointMid(x0-yDraw,y0-xDraw);
				window.setTimeout(arguments.callee,20);
			}
		)();
	}
	test0();
}

function BresenhamEllipse(x0,y0,rx,ry)
{
	DrawPointMid(x0,y0);
	var xDraw = 0;
	var yDraw = ry;
	var stage = 0;
	var rxSquare = rx * rx;
	var rySquare = ry * ry;
	var p = rySquare - rxSquare * ry + 0.25 * rxSquare;
	DrawPointMid(x0,y0+ry);
	DrawPointMid(x0,y0-ry);
	DrawPointMid(x0+rx,y0);
	DrawPointMid(x0-rx,y0);
	function test0()
	{
		(
			function()
			{
				if(rySquare * xDraw >= rxSquare * yDraw)
				{
					stage = 1;
					p = rySquare * (xDraw + 1) * (xDraw + 1) + rxSquare * (yDraw-0.5) * (yDraw-0.5) - rxSquare * rySquare;
					return;
				}
				xDraw++;
				if(p<0)
				{
					p = rySquare * xDraw * xDraw + rxSquare * (yDraw - 0.5) * (yDraw - 0.5) - rxSquare * rySquare;
				}
				else
				{
					yDraw--;
					p = rySquare * xDraw * xDraw + rxSquare * (yDraw - 0.5) * (yDraw - 0.5) - rxSquare * rySquare;
				}
				DrawPointMid(x0+xDraw,y0+yDraw);
				DrawPointMid(x0+xDraw,y0-yDraw);
				DrawPointMid(x0-xDraw,y0+yDraw);
				DrawPointMid(x0-xDraw,y0-yDraw);
//				console.log("1");
				window.setTimeout(arguments.callee,20);
			}
		)();
	}
	test0();
	function test1()
	{
		(
			function()
			{
				if(yDraw < 0 ){return;}
				else if(stage ==1)
				{
					yDraw--;
					if(p<0)
					{
						xDraw++;
						p = rySquare * (xDraw + 0.5) * (xDraw + 0.5) + rxSquare * yDraw * yDraw - rxSquare * rySquare;
					}
					else
					{	
						p = rySquare * (xDraw + 0.5) * (xDraw + 0.5) + rxSquare * yDraw * yDraw - rxSquare * rySquare;
					}
					DrawPointMid(x0+xDraw,y0+yDraw);
					DrawPointMid(x0+xDraw,y0-yDraw);
					DrawPointMid(x0-xDraw,y0+yDraw);
					DrawPointMid(x0-xDraw,y0-yDraw);
//					console.log("2");
				}
				window.setTimeout(arguments.callee,20);
			}
		)();
	}
	test1();
}

function DrawDemo()
{
	DDALine(10,10,20,20);
	DDALine(10,10,20,30);
	DDALine(10,10,30,20);

	DDALine(-10,-10,-20,-20);
	DDALine(-10,-10,-20,-30);
	DDALine(-10,-10,-30,-20);

	DDALine(-10,10,-20,20);
	DDALine(-10,10,-20,30);
	DDALine(-10,10,-30,20);

	DDALine(10,-10,20,-20);
	DDALine(10,-10,20,-30);
	DDALine(10,-10,30,-20);

	DDALine(0,0,50,0);
	DDALine(0,0,-50,0);
	DDALine(0,0,0,50);
	DDALine(0,0,0,-50);

	BresenhamCircle(0,0,20);

	BresenhamEllipse(0,0,80,60);
	BresenhamEllipse(0,0,60,80);
}

function DrawAxis()
{
	DDALine(0,0,90,0);
	DDALine(0,0,-90,0);
	DDALine(0,0,0,90);
	DDALine(0,0,0,-90);
}