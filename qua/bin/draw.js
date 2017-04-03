class DrawElement {
	constructor(key, cx, cy, x, y) {
		this.key = key;
		this.cx = cx;
		this.cy = cy;
		this.x = x;
		this.y = y;
	}
}

class DrawManager {
    constructor(ctx, img) {
        this.ctx = ctx;
		this.ctx.msImageSmoothingEnabled = false;
		this.ctx.webkitImageSmoothingEnabled = false;
		this.ctx.imageSmoothingEnabled = false;
        this.img = img;
        this.ctx.font = "32px '美咲ゴシック'";
		this.layer = new Array(15);
		for(let i = 0; i < 15; i++) {
			this.layer[i] = new Array();
		}
    }
	pushElem(elem, depth) {
		if(depth >= 0 && depth < 15) {
			this.layer[depth].push(elem);
		}
	}
	draw() {
		this.drawRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT, "#000000");
		this.layer.forEach((layerElem) => {
			layerElem.forEach((drawElem) => {
				this.drawCip(drawElem.key, CIPSIZE, drawElem.cx, drawElem.cy, drawElem.x, drawElem.y);
			});
		});
		for(let i = 0; i < 15; i++) {
			this.layer[i] = new Array();
		}
	}
    drawRect(x, y, width, height, color) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.rect(x, y, width, height);
        this.ctx.fill();
    }
    drawClearRect(x, y, width, height, color, alfa) {
        this.ctx.globalAlpha = alfa;
        this.drawRect(x, y, width, height, color);
        this.ctx.globalAlpha = 1.0;
    }
    drawStrokeRect(x, y, width, height, color) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(x, y, width, height);
    }
    drawLine(x1, y1, x2, y2, color) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
    drawTriangle(x1, y1, x2, y2, x3, y3, color) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.fill();
    }
    drawPoint(x, y, color) {
        this.drawRect(x, y, 1, 1, color);
    }
    drawCircle(x, y, r, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.arc(x, y, r, 0, Math.PI * 2, false);
        this.ctx.stroke();
    }
    drawImage(key, sx, sy, sw, sh, dx, dy, dw, dh) {
        sx = Math.floor(sx);
        sy = Math.floor(sy);
        sw = Math.floor(sw);
        sh = Math.floor(sh);
        dx = Math.floor(dx);
        dy = Math.floor(dy);
        dw = Math.floor(dw);
        dh = Math.floor(dh);
        this.ctx.drawImage(this.img[key], sx, sy, sw, sh, dx, dy, dw, dh);
    }
    drawCip(key, cipSize, cx, cy, x, y) {
        this.drawImage(key, cipSize * cx, cipSize * cy, cipSize, cipSize, x, y, cipSize * MULTI, cipSize * MULTI);
    }
    drawRotateImage(key, x, y, rad) {
        this.ctx.rotate(rad);
        let X, Y;
        X = x * Math.cos(rad) + y * Math.sin(rad);
        Y = -x * Math.sin(rad) + y * Math.cos(rad);
        this.ctx.drawImage(this.img[key], X - this.img[key].width / 2, Y - this.img[key].height / 2);
        this.ctx.rotate(-rad);
    }
}
