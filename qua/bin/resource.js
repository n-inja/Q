class Resource {
	constructor(n, cb) {
		this.loadNum = n;
		this.loaded = 0;
		this.img = [];
		this.cb = cb;
		if(this.loadNum === 0) {
			this.cb(this.img);
		}
	}
	newImage(key, src) {
		this.img[key] = new Image();
        this.img[key].onload = () => {
			this.loaded++;
            if (this.loadNum === this.loaded) {
				this.cb(this.img);
			}
        }
        this.img[key].src = "bin/img/" + src;
    }
}
