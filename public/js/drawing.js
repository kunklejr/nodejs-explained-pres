var green = '#8CC84B';

// event loop
var paper = Raphael('event-loop', 1000, 800);
var loop = paper.circle(460, 400, 180);
loop.attr("stroke", green);
loop.attr("stroke-width", 5);

var loopLabel = paper.text(460, 400, "Event Loop");
loopLabel.attr("stroke", '#000');
loopLabel.attr("fill", '#FFF');
loopLabel.attr('font', 'Arial');
loopLabel.attr('font-size', 50);

for (var i = 0; i < 10; i++) {
	var queue = paper.rect(50, 370 + (i * 20), 150, 20);
	queue.attr("stroke", green);
	queue.attr("stroke-width", 5);	
}

var queueLabel = paper.text(125, 280, "Event\nQueue");
queueLabel.attr("stroke", '#000');
queueLabel.attr("fill", '#FFF');
queueLabel.attr('font', 'Arial');
queueLabel.attr('font-size', 50);

for (var i = 0; i < 5; i++) {
	var thread = paper.circle(800 + (i * 10), 440 + (i * 20), 75);
	thread.attr("stroke", green);
	thread.attr("stroke-width", 5);	
}

var threadLabel = paper.text(800, 280, "Thread\nPool");
threadLabel.attr("stroke", '#000');
threadLabel.attr("fill", '#FFF');
threadLabel.attr('font', 'Arial');
threadLabel.attr('font-size', 50);
