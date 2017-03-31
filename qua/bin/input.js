class InputKey {
    constructor() {
		this.keyInput = new Array();
		this.keyLock = new Array();
		const keyDown = (e) => {
		    this.keyInput[e.keyCode] = true;
		};
		const keyUp = (e) => {
		    this.keyInput[e.keyCode] = false;
		    this.keyLock[e.keyCode] = false;
		};
		const reset = (e) => {
		    this.keyInput.length = 0;
		    this.keyLock.length = 0;
		}
        if (window.addEventListener) {
            document.addEventListener("keydown", keyDown, true);
            document.addEventListener("keyup", keyUp, true);
            window.addEventListener("blur", reset, true);
        }
    }
    isDownToggle(key_code) {
        if (this.keyInput[key_code] && !this.keyLock[key_code]) {
            this.keyLock[key_code] = true;
            return true;
        }
        return false;
    }
    isDown(key_code) {
        if (this.keyInput[key_code]) {
            this.keyLock[key_code] = true;
            return true;
        }
        return false;
    }
}

class InputMouse {
	constructor(windowProp) {
		this.mouseInput = new Array(2);
		this.mouseInputLock = new Array(2);
		this.mouseX = 0;
		this.mouseY = 0;
		this.windowProp = windowProp;
		const mouseDown = (e) => {
			if(e.button === 0) {
				this.mouseInput[0] = true;
			}
			else if(e.button === 2) {
				this.mouseInput[1] = true;
			}
		};
		const mouseUp = (e) => {
			if(e.button === 0) {
				this.mouseInput[0] = false;
				this.mouseInputLock[0] = false;
			}
			else if(e.button === 2) {
				this.mouseInput[1] = false;
				this.mouseInputLock[1] = false;
			}
		};
		const mouseMove = (e) => {
			this.mouseX = e.offsetX;
			this.mouseY = e.offsetY;
		};
		if (window.addEventListener) {
            document.addEventListener("mousedown", mouseDown, true);
            document.addEventListener("mouseup", mouseUp, true);
            window.addEventListener("mousemove", mouseMove, true);
        }
	}
	isMouseLeftDown() {
		return this.mouseInput[0];
	}
	isMouseLeftToggle() {
		if(this.mouseInput[0] && !this.mouseInputLock[0]) {
			this.mouseInputLock[0] = true;
			return true;
		}
		else {
			return false;
		}
	}
	isMouseRightDown() {
		return this.mouseInput[1];
	}
	isMouseRightToggle() {
		if(this.mouseInput[1] && !this.mouseInputLock[1]) {
			this.mouseInputLock[1] = true;
			return true;
		}
		else {
			return false;
		}
	}
}
