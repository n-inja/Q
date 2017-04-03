class Game {
    constructor(dm, ik, im) {
        this.drawManager = dm;
        this.inputKey = ik;
        this.inputMouse = im;
        this.t = 0;
        this.player = null;
        this.block = new Array();
        this.set();
    }
    set() {
        this.t = 0;
        this.player = new Player(0, 0, 0);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.block.push(new Block(i, j, 0, 5));
            }
        }
    }
    update() {
        this.player.update(this.inputKey, this.drawManager);
        this.block.forEach((e) => {
            e.update(Math.floor(this.player.x), Math.floor(this.player.y), this.drawManager);
        })
        this.drawManager.draw();
        this.t++;
    }
}

class Player {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.t = 0;
        this.dir = 0;
    }
    update(pk, dm) {
        this.walking = false;
        if (pk.isDown(65) && pk.isDown(87)) {
            this.y += 0.1;
            this.dir = 2;
            this.walking = true;
        }
        if (pk.isDown(87) && pk.isDown(68)) {
            this.x += 0.1;
            this.dir = 3;
            this.walking = true;
        }
        if (pk.isDown(68) && pk.isDown(83)) {
            this.y -= 0.1;
            this.dir = 0;
            this.walking = true;
        }
        if (pk.isDown(83) && pk.isDown(65)) {
            this.x -= 0.1;
            this.dir = 1;
            this.walking = true;
        }
        let pos = trans2D(this.x, this.y, this.z);
        if (this.walking) {
            dm.pushElem(new DrawElement("CHARA", Math.floor(this.t / 8) % 4, this.dir, pos.x - CIPSIZE * MULTI / 2, pos.y - CIPSIZE * MULTI / 8 * 5), 9);
        } else {
            dm.pushElem(new DrawElement("CHARA", 0, this.dir, pos.x - CIPSIZE * MULTI / 2, pos.y - CIPSIZE * MULTI / 8 * 5), 9);
        }
        this.t++;
    }
}

class Block {
    constructor(x, y, z, id) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.id = id;
        this.t = 0;
    }
    update(x, y, dm) {
        let pos = trans2D(this.x, this.y, this.z);
        if (Math.abs(this.x - x) + Math.abs(this.y - y) < 12) {
			let fog = Math.abs(this.x - x) + Math.abs(this.y - y) - 3;
			if(fog < 0) {
				fog = 0;
			}
        	dm.pushElem(new DrawElement("MAP", this.id, 0, pos.x - CIPSIZE * MULTI / 2, pos.y), 14 - Math.abs(this.x + this.y) + Math.abs(x + y) - 9);
            dm.pushElem(new DrawElement("MAP", fog, 1, pos.x - CIPSIZE * MULTI / 2, pos.y), 14 - Math.abs(this.x + this.y) + Math.abs(x + y) - 9);
        }
        this.t++;
    }
}

//右手系
const trans2D = (x, y, z) => {
    let ans = {
        x: 0,
        y: 0
    };
    ans.x = WINDOW_WIDTH / 2 + (x - y) * CIPSIZE * MULTI / 2;
    ans.y = WINDOW_HEIGHT/8*7 + (-(x + y) / 2 - z) * CIPSIZE * MULTI / 2;
    return ans;
};
