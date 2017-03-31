class Game {
    constructor(dm, ik, im) {
        this.drawManager = dm;
        this.inputKey = ik;
        this.inputMouse = im;
        this.t = 0;
        this.player = null;
        this.set();
    }
    set() {
        this.t = 0;
        this.player = new Player(0, 0, 0);
    }
    update() {
        this.player.update(this.InputKey, this.drawManager);
        this.drawManager.draw();
        this.t++;
    }
}

class Player {
    constructor(x, y, z) {
        this.x = -10;
        this.y = y;
        this.z = z;
        this.t = 0;
    }
    update(pk, dm) {
		this.x += 0.02;
        let pos = trans2D(this.x, this.y, this.z);
        dm.pushElem(new DrawElement("CHARA", Math.floor(this.t/10)%4, 0, pos.x, pos.y), 5);
        this.t++;
    }
}

//右手系
const trans2D = (x, y, z) => {
    let ans = {
        x: 0,
        y: 0
    };
    ans.x = WINDOW_WIDTH / 2 + (x - y) * CIPSIZE / 2;
    ans.y = WINDOW_HEIGHT / 2 + ((x + y)/2 - z) * CIPSIZE / 2;
    return ans;
};
