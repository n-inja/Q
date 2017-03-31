const rnd = (n) => {
    return Math.floor(Math.random() * n);
};

const range = (x, y) => { //[min, max)
    let min = x > y ? y : x;
    let max = x > y ? x : y;
    return rnd(x - y) + y;
}

const Dist = (x1, y1, x2, y2) => {
	let ans = Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
	return ans === ans ? ans : 0;
}

const WINDOW_HEIGHT = 512, WINDOW_WIDTH = 512, MULTI = 4, CIPSIZE = 24;

window.onload = function() {
    let screenCanvas, ctx, img, windowProp = {scale : 0};
    screenCanvas = document.getElementById('can');
    screenCanvas.width = 512;
    screenCanvas.height = 512;
	(window.onresize = function() {
	    let cv = document.querySelector("#can");
	    let rect = document.body.getBoundingClientRect();
	    let scaleW = rect.width / cv.width;
	    let scaleH = rect.height / cv.height;
	    windowProp.scale = scaleW < scaleH ? scaleW : scaleH;
	    cv.style.transform = "scale(" + windowProp.scale + ", " + windowProp.scale + ")";
	    cv.style.position = "fixed";
	    cv.style.left = ((windowProp.scale - 1) * cv.width / 2 + (rect.width - cv.width * windowProp.scale) / 2) + "px";
	    cv.style.top = ((windowProp.scale - 1) * cv.height / 2 + (rect.height - cv.height * windowProp.scale) / 2) + "px";
	})();
    ctx = screenCanvas.getContext('2d');
	img = new Resource(2, function(loadedImg) {
		let game = new Game(new DrawManager(ctx, loadedImg), new InputKey(), new InputMouse(windowProp));
		let cnt = 0, b = false;
		setInterval(() => {
			game.update();
		}, 1000/60);
	});
	img.newImage("CHARA", "player.png");
	img.newImage("MAP", "block.png");
};


openWindow = (url, name) => {
    location.href = url;
}
