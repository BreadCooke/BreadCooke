let actimg = [];
let imglist = [];
let transition = [false];
let n = [1];

async function setup () {
	imglist[0] = ['Background.png', 'rocks.png', 'Rename.png'];
	//all first images in imglist should be a descriptor of what that section is about
	//for example if the grouping is about the sun, the title image may be a darkened sun shot with "sun" overlayed on top
	let first;
	first = await loadImage(imglist[0][0]);
	actimg.push([]);
	createCanvas(windowWidth - 20, windowHeight - 185);
	background(36, 36, 46);
	for (let i = 0; i < imglist.length; i ++) {
		actimg[i][0] = new picture(width / 2, width / 2, height / 2, 200, 200, first, 255);
		actimg[i][1] = new picture(width / 2, width / 2, height / 2, 200, 200, first, 255);
	}
	//initial images on row 0
	rectMode(CENTER);
	imageMode(CENTER);
	noStroke();
	//permanent changes to the formatting
}

function draw () {
	background(36, 36, 46);
	for (let i = 0; i < actimg.length; i ++) {
		fill(31, 31, 41);
		rect(width / 2, actimg[i][0].y, width, actimg[i][0].h);
		if (transition[i] == true && actimg[i][0].x > actimg[i][0].desx) {
			actimg[i][0].x -= 10.2;
			actimg[i][1].x -= 10.2;
			actimg[i][0].a += 5.1;
			actimg[i][1].a -= 5.1;
		} else if (transition[i] == true && actimg[i][0].x <= actimg[i][0].desx) {
			actimg[i][0].x = actimg[i][0].desx
			actimg[i][0].a = 255;
			actimg[i][1].img = null;
			transition[i] = false;
		}
	}
	//transistion between images for ALL values
	actimg[0][0].display();
	actimg[0][1].display();
	push();
	fill(212, 198, 176);
	rect(width / 2, 200, 100, 40, 20);
	textAlign(CENTER);
	fill(36, 36, 46);
	text("Proceed", width / 2, 205);
	pop();
}

function mousePressed () {
	print("X: " + floor(mouseX) + "\nY: " + floor(mouseY) + "\n\n");
	for (let i = 0; i < imglist.length; i ++) {
		if (imglist[i].length == 0) continue;
		if (n[i] === undefined || imglist[i][n[i]] === undefined) {
			n[i] = 0;
		}
		if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > 180 && mouseY < 220) {
			loadnew(i, imglist[i][n[i]], width / 2, height / 2, 200);
			n[i] ++;
		}
	}
}

class picture {
	constructor (x, desx, y, w, h, img, a) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.img = img;
		this.a = a;
		this.desx = desx;
	}
	display () {
		if (!this.img) return;
		push();
		fill(26, 26, 36, this.a)
		rect(this.x, this.y, this.w + 60, this.h, 20);
		tint(255, this.a);
		image(this.img, this.x, this.y, this.w, this.h);
		pop();
	}
}

function itrans (rowi, img, desx, desy, h) {
	let tw = img.width;
	let th = img.height;
	let sf = th/tw;
	th = 200;
	tw = th / sf;
	push();
	let temp = actimg[rowi][0];
	actimg[rowi][0] = new picture(desx + 510, desx, desy, tw, th, img, 0);
	actimg[rowi][1] = temp;
	pop();
	transition[rowi] = true;
}

async function loadnew (rowi, path, desx, desy, h) {
	let img;
	img = await loadImage(path);
	itrans (rowi, img, desx, desy, h);
}
