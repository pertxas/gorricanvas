/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */
var imageRepository = new function() {
	// Define images
	this.background = new Image();
	this.background2 = new Image();
	this.spaceship = new Image();
	this.bulletH = new Image();
	this.bulletV = new Image();
	this.enemy = new Image();
	this.enemyBulletV = new Image();
	this.enemyBulletH = new Image();
	
	var numImages = 8;
	var numLoaded = 0;
	function imageLoaded() {
		numLoaded++;
		if (numLoaded === numImages) {
			window.init();
		}
	}
	this.background.onload = function() {
		imageLoaded();
	}
	this.background2.onload = function() {
		imageLoaded();
	}
	this.spaceship.onload = function() {
		imageLoaded();
	}
	this.bulletH.onload = function() {
		imageLoaded();
	}
	this.bulletV.onload = function() {
		imageLoaded();
	}
	this.enemy.onload = function() {
		imageLoaded();
	}
	this.enemyBulletV.onload = function() {
		imageLoaded();
	}
	this.enemyBulletH.onload = function() {
		imageLoaded();
	}
	// Set images src 
	//this.background.src = "bgnds/mirror.php";
	this.background.src = "bgnds/starry.php?d=1";
	this.background2.src = "bgnds/starry.php?d=1&t=1";
	this.spaceship.src = "imgs/FlyingPigT2.png";
	this.bulletH.src = "imgs/bulleth.png";
	this.bulletV.src = "imgs/bulletv.png";
	this.enemy.src = "imgs/PegasusT2.png";
 	this.enemyBulletV.src = "imgs/enemyBullet.png";
	this.enemyBulletH.src = "imgs/enemyBulletH.png";
} 

/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up default variables
 * that all child objects will inherit, as well as the default
 * functions.
 */
function Drawable() {
	this.init = function(x, y, w, h) {
		// Default variables
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.collidableWith = "";
	this.collidableSameWith = "";
	this.collHeight = "";
	this.collWidth = "";
	this.isColliding = false;
	this.isCollidingSame = false;
	this.type = "";
	this.typeSame = "";
	// Define abstract function to be implemented in child objects 
	this.draw = function() { };
	this.move = function() { };
	this.isCollidableSameWith = function(object) {
		return (this.collidableSameWith === object.typeSame);
	};
	this.isCollidableWith = function(object) {
		return (this.collidableWith === object.type);
	};
}

/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */
function Background() {
  this.speed = 1; // Redefine speed of the background for panning
  // Implement abstract function
  this.draw = function() {
    var numancho = Math.ceil(this.canvasWidth/this.w);
    var numalto = Math.ceil(this.canvasHeight/this.h);
    var offsetx = this.canvasWidth%this.w;
    var offsety = this.canvasHeight%this.h;
    //document.getElementById('debug').innerHTML="numalto:"+numalto+"<br/>";
    //document.getElementById('debug').innerHTML+="numancho:"+numancho+"<br/>";
    //document.getElementById('debug').innerHTML+="canvasWidth:"+this.canvasWidth+" canvasHeight:"+this.canvasHeight+"<br/>";
    //document.getElementById('debug').innerHTML+="w:"+this.w+" h:"+this.h+"<br/>";
    //document.getElementById('debug').innerHTML+="offsetx:"+offsetx+" offsety:"+offsety+"<br/>";
    //document.getElementById('debug').innerHTML+="x:"+this.x+" y:"+this.y+"<br/>";
    for (var i=0;i<numancho;i++){
      for(var j=0;j<numalto;j++){
        var newy = this.y+(this.h*j);
	var newx = this.x+(this.w*i);
        var backy = (this.y+this.h*j) - (this.h*numalto);
	var backx = (this.x+this.w*i) - (this.w*numancho);
        if (newy < this.canvasHeight) this.context.drawImage(imageRepository.background, newx, newy);
        if (backy+this.h > 0) this.context.drawImage(imageRepository.background, newx, backy);
	if (backx+this.w > 0) this.context.drawImage(imageRepository.background, backx, newy);
	if (backx+this.w > 0 && backy+this.h > 0) this.context.drawImage(imageRepository.background, backx, backy);
	//document.getElementById('debug').innerHTML+="j:"+j+" newy:"+newy+" backy:"+backy+"<br/>";
      }
    }
    // If the image scrolled off the screen, reset
    if (this.y >= this.canvasHeight)
      this.y = offsety;
    if (this.x >= this.canvasWidth)
      this.x = offsetx;
    if (this.x < 0)
      this.x = this.canvasWidth-offsetx;
    if (this.y < 0)
      this.y = this.canvasHeight-offsety;
  };
  this.move = function() {
    // Determine if the action is move action
    if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.down || KEY_STATUS.up) {
      // Update x and y according to the direction to move and
      // redraw the ship. Change the else if’s to if statements
      // to have diagonal movement.
      if (KEY_STATUS.left) {
        this.x += this.speed;
      }
      else if (KEY_STATUS.right) {
        this.x -= this.speed;
      }
      else if (KEY_STATUS.up) {
      this.y += this.speed;
      }
      else if (KEY_STATUS.down) {
        this.y -= this.speed;
      }
      // Finish by redrawing the ship
      this.draw();
    }
  };
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();

/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */

function Background2() {
  this.speed = 2; // Redefine speed of the background for panning
  // Implement abstract function
  this.draw = function() {
    this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
    var numancho = Math.ceil(this.canvasWidth/this.w);
    var numalto = Math.ceil(this.canvasHeight/this.h);
    var offsetx = this.canvasWidth%this.w;
    var offsety = this.canvasHeight%this.h;
    //document.getElementById('debug').innerHTML="numalto:"+numalto+"<br/>";
    //document.getElementById('debug').innerHTML+="numancho:"+numancho+"<br/>";
    //document.getElementById('debug').innerHTML+="canvasWidth:"+this.canvasWidth+" canvasHeight:"+this.canvasHeight+"<br/>";
    //document.getElementById('debug').innerHTML+="w:"+this.w+" h:"+this.h+"<br/>";
    //document.getElementById('debug').innerHTML+="offsetx:"+offsetx+" offsety:"+offsety+"<br/>";
    //document.getElementById('debug').innerHTML+="x:"+this.x+" y:"+this.y+"<br/>";
    for (var i=0;i<numancho;i++){
      for(var j=0;j<numalto;j++){
        var newy = this.y+(this.h*j);
	var newx = this.x+(this.w*i);
        var backy = (this.y+this.h*j) - (this.h*numalto);
	var backx = (this.x+this.w*i) - (this.w*numancho);
        if (newy < this.canvasHeight) this.context.drawImage(imageRepository.background2, newx, newy);
        if (backy+this.h > 0) this.context.drawImage(imageRepository.background2, newx, backy);
	if (backx+this.w > 0) this.context.drawImage(imageRepository.background2, backx, newy);
	if (backx+this.w > 0 && backy+this.h > 0) this.context.drawImage(imageRepository.background2, backx, backy);
	//document.getElementById('debug').innerHTML+="j:"+j+" newy:"+newy+" backy:"+backy+"<br/>";
      }
    }
    // If the image scrolled off the screen, reset
    if (this.y >= this.canvasHeight)
      this.y = offsety;
    if (this.x >= this.canvasWidth)
      this.x = offsetx;
    if (this.x < 0)
      this.x = this.canvasWidth-offsetx;
    if (this.y < 0)
      this.y = this.canvasHeight-offsety;
  };
  this.move = function() {
    // Determine if the action is move action
    if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.down || KEY_STATUS.up) {
      // Update x and y according to the direction to move and
      // redraw the ship. Change the else if’s to if statements
      // to have diagonal movement.
      if (KEY_STATUS.left) {
        this.x += this.speed;
      }
      else if (KEY_STATUS.right) {
        this.x -= this.speed;
      }
      else if (KEY_STATUS.up) {
      this.y += this.speed;
      }
      else if (KEY_STATUS.down) {
        this.y -= this.speed;
      }
      // Finish by redrawing the ship
      this.draw();
    }
  };
}

// Set Background to inherit properties from Drawable
Background2.prototype = new Drawable();

/**
 * Creates the Bullet object which the ship fires. The bullets are
 * drawn on the "main" canvas.
 */
function Bullet(object) {	
	this.alive = false; // Is true if the bullet is currently in use
	var self = object;
	/*
	 * Sets the bullet values
	 */
	this.spawn = function(x, y, speed, d, id) {
		this.x = x;
		this.y = y;
		this.d = d;
		this. id = id;
		this.speed = speed;
		this.alive = true;
		if (this.d==3 || this.d==0) {
		  this.spriteWidth = imageRepository.bulletV.width;
		  this.spriteHeight = imageRepository.bulletV.height;
		}
		else {
		  this.spriteWidth = imageRepository.bulletH.width;
		  this.spriteHeight = imageRepository.bulletH.height;
		}
		this.collX = this.x;
		this.collY = this.y;
		this.collWidth = this.spriteWidth;
		this.collHeight = this.spriteHeight;
	};

	/*
	 * Uses a "drity rectangle" to erase the bullet and moves it.
	 * Returns true if the bullet moved off the screen, indicating that
	 * the bullet is ready to be cleared by the pool, otherwise draws
	 * the bullet.
	 */
	this.draw = function() {
	  if (this.d==3 || this.d==0) this.context.clearRect(this.x, this.y, imageRepository.bulletV.width, imageRepository.bulletV.height);
	  else this.context.clearRect(this.x, this.y, imageRepository.bulletH.width, imageRepository.bulletH.height);
	    if (KEY_STATUS.left) {
	      this.x += 1;
	      this.collX += 1;
	    }
	    else if (KEY_STATUS.right) {
	      this.x -= 1;
	      this.collX -= 1;
	    }
	    else if (KEY_STATUS.up) {
	      this.y += 1;
	      this.collY += 1;
	    }
	    else if (KEY_STATUS.down) {
	      this.y -= 1;
	      this.collY -= 1;
	    }
		if (this.isColliding) {
			return true;
		}
		else if (this.d==3) { //up
		    this.y -= this.speed;
		    this.collY -= this.speed;
		    if (this.y <= 0 - this.h) {
			return true;
		    }
		    if (self === "bullet") this.context.drawImage(imageRepository.bulletV, this.x, this.y);
		    else if (self === "enemyBullet") this.context.drawImage(imageRepository.enemyBulletV, this.x, this.y);
		}
		else if (this.d==0) { //down
		  this.y += this.speed;
		  this.collY += this.speed;
		  if (this.y >= this.canvasHeight) {
		    return true;
		  }
		  if (self === "bullet") this.context.drawImage(imageRepository.bulletV, this.x, this.y);
		  else if (self === "enemyBullet") this.context.drawImage(imageRepository.enemyBulletV, this.x, this.y);
		}
		else if (this.d==1) { //left
		  this.x -= this.speed;
		  this.collX -= this.speed;
		  if (this.x <= 0 - this.w) {
			return true;
		  }
		  if (self === "bullet") this.context.drawImage(imageRepository.bulletH, this.x, this.y);
		  else if (self === "enemyBullet") this.context.drawImage(imageRepository.enemyBulletH, this.x, this.y);
		}
		else if (this.d==2) { //right
		  this.x += this.speed;
		  this.collX += this.speed;
		  if (this.x >= this.canvasWidth) {
			return true;
		  }
		  if (self === "bullet") this.context.drawImage(imageRepository.bulletH, this.x, this.y);
		  else if (self === "enemyBullet") this.context.drawImage(imageRepository.enemyBulletH, this.x, this.y);
		}
		return false;
	};
	
	/*
	 * Resets the bullet values
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
		this.isColliding = false;
	};
}
Bullet.prototype = new Drawable();

/**
 * QuadTree object.
 *
 * The quadrant indexes are numbered as below:
 *     |
 *  1  |  0
 * ----+----
 *  2  |  3
 *     |
 */
function QuadTree(boundBox, lvl) {
	var maxObjects = 10;
	this.bounds = boundBox || {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	var objects = [];
	this.nodes = [];
	var level = lvl || 0;
	var maxLevels = 5;
	
	/*
	 * Clears the quadTree and all nodes of objects
	 */
	this.clear = function() {
		objects = [];
		
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].clear();
		}
		
		this.nodes = [];
	};
	
	/*
	 * Get all objects in the quadTree
	 */	
	this.getAllObjects = function(returnedObjects) {
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].getAllObjects(returnedObjects);
		}
		
		for (var i = 0, len = objects.length; i < len; i++) {
			returnedObjects.push(objects[i]);
		}
		
		return returnedObjects;
	};
	
	/*
	 * Return all objects that the object could collide with
	 */
	this.findObjects = function(returnedObjects, obj) {
		if (typeof obj === "undefined") {
			console.log("UNDEFINED OBJECT");
			return;
		}
		
		var index = this.getIndex(obj);
		if (index != -1 && this.nodes.length) {
			this.nodes[index].findObjects(returnedObjects, obj);
		}
		
		for (var i = 0, len = objects.length; i < len; i++) {
			returnedObjects.push(objects[i]);
		}
		
		return returnedObjects;
	};
		
	/*
	 * Insert the object into the quadTree. If the tree
	 * excedes the capacity, it will split and add all
	 * objects to their corresponding nodes.
	 */
	this.insert = function(obj) {
		if (typeof obj === "undefined") {
			return;
		}
		
		if (obj instanceof Array) {
			for (var i = 0, len = obj.length; i < len; i++) {
				this.insert(obj[i]);
			}
			
			return;
		}
		
		if (this.nodes.length) {
			var index = this.getIndex(obj);
			// Only add the object to a subnode if it can fit completely 
			// within one
			if (index != -1) {
				this.nodes[index].insert(obj);
				
				return;
			}
		}
		
		objects.push(obj);
		
		// Prevent infinite splitting
		if (objects.length > maxObjects && level < maxLevels) {
			if (this.nodes[0] == null) {
				this.split();
			}
			
			var i = 0;
			while (i < objects.length) {
				
				var index = this.getIndex(objects[i]);
				if (index != -1) {
					this.nodes[index].insert((objects.splice(i,1))[0]);
				}
				else {
					i++;
				}
			}
		}
	};
	
	/*
	 * Determine which node the object belongs to. -1 means
	 * object cannot completely fit within a node and is part
	 * of the current node
	 */
	this.getIndex = function(obj) {
		
		var index = -1;
		var verticalMidpoint = this.bounds.x + this.bounds.width / 2;
		var horizontalMidpoint = this.bounds.y + this.bounds.height / 2;
		
		// Object can fit completely within the top quadrant
		var topQuadrant = (obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint);
		// Object can fit completely within the bottom quandrant
		var bottomQuadrant = (obj.y > horizontalMidpoint);
	
		// Object can fit completely within the left quadrants
		if (obj.x < verticalMidpoint && 
				obj.x + obj.width < verticalMidpoint) {
			if (topQuadrant) {
				index = 1;
			}
			else if (bottomQuadrant) {
				index = 2;
			}
		}
		// Object can fix completely within the right quandrants
		else if (obj.x > verticalMidpoint) {
			if (topQuadrant) {
				index = 0;
			}
			else if (bottomQuadrant) {
				index = 3;
			}
		}
		
		return index;
	};
	
	/* 
	 * Splits the node into 4 subnodes
	 */
	this.split = function() {
		// Bitwise or [html5rocks]
		var subWidth = (this.bounds.width / 2) | 0;
		var subHeight = (this.bounds.height / 2) | 0;
		
		this.nodes[0] = new QuadTree({
			x: this.bounds.x + subWidth,
			y: this.bounds.y,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[1] = new QuadTree({
			x: this.bounds.x,
			y: this.bounds.y,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[2] = new QuadTree({
			x: this.bounds.x,
			y: this.bounds.y + subHeight,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[3] = new QuadTree({
			x: this.bounds.x + subWidth,
			y: this.bounds.y + subHeight,
			width: subWidth,
			height: subHeight
		}, level+1);
	};
}

/**
 * Custom Pool object. Holds Bullet objects to be managed to prevent
 * garbage collection. 
 * The pool works as follows:
 * - When the pool is initialized, it populates an array with 
 *   Bullet objects.
 * - When the pool needs to create a new object for use, it looks at
 *   the last item in the array and checks to see if it is currently
 *   in use or not. If it is in use, the pool is full. If it is 
 *   not in use, the pool "spawns" the last item in the array and 
 *   then pops it from the end and pushed it back onto the front of
 *   the array. This makes the pool have free objects on the back 
 *   and used objects in the front.
 * - When the pool animates its objects, it checks to see if the 
 *   object is in use (no need to draw unused objects) and if it is, 
 *   draws it. If the draw() function returns true, the object is 
 *   ready to be cleaned so it "clears" the object and uses the 
 *   array function splice() to remove the item from the array and 
 *   pushes it to the back.
 * Doing this makes creating/destroying objects in the pool 
 * constant.
 */
function Pool(maxSize) {
	var size = maxSize; // Max bullets allowed in the pool
	var pool = [];
	
	this.getPool = function() {
		var obj = [];
		for (var i = 0; i < size; i++) {
			if (pool[i].alive) {
				obj.push(pool[i]);
			}
		}
		return obj;
	}
	/*
	 * Populates the pool array with Bullet objects
	 */
	this.init = function(object) {
		if (object == "bullet") {
			for (var i = 0; i < size; i++) {
				// Initalize the object
				var bullet = new Bullet("bullet");
				bullet.init(0,0, imageRepository.bulletV.width, imageRepository.bulletV.height);
				bullet.collidableWith = "enemy";
				bullet.collidableSameWith = "none";
				bullet.type = "bullet";
				bullet.typeSame = "bullet";
				pool[i] = bullet;
			}
		}
		else if (object == "enemy") {
			for (var i = 0; i < size; i++) {
				var enemy = new Enemy();
				enemy.init(0,0, imageRepository.enemy.width, imageRepository.enemy.height);
				//enemy.collidableWith = "enemy";
				//enemy.type = "enemy";
				pool[i] = enemy;
			}
		}
		else if (object == "enemyBullet") {
			for (var i = 0; i < size; i++) {
				var bullet = new Bullet("enemyBullet");
				bullet.init(0,0, imageRepository.enemyBulletV.width, imageRepository.enemyBulletV.height);
				bullet.collidableWith = "ship";
				bullet.collidableSameWith = "none";
				bullet.type = "enemyBullet";
				bullet.typeSame = "enemyBullet";
				pool[i] = bullet;
			}
		}
	};
	
	/*
	 * Grabs the last item in the list and initializes it and
	 * pushes it to the front of the array.
	 */
	this.get = function(x, y, speed, dir, id) {
		if(!pool[size - 1].alive) {
			pool[size - 1].spawn(x, y, speed, dir, id);
			pool.unshift(pool.pop());
		}
	};
	
	/*
	 * Used for the ship to be able to get two bullets at once. If
	 * only the get() function is used twice, the ship is able to
	 * fire and only have 1 bullet spawn instead of 2.
	 */
	this.getTwo = function(x1, y1, speed1, x2, y2, speed2, dir, id1, id2) {
		if(!pool[size - 1].alive && 
		   !pool[size - 2].alive) {
				this.get(x1, y1, speed1, dir, id1);
				this.get(x2, y2, speed2, dir, id2);
			 }
	};
	
	/*
	 * Draws any in use Bullets. If a bullet goes off the screen,
	 * clears it and pushes it to the front of the array.
	 */
	this.animate = function() {
		for (var i = 0; i < size; i++) {
			// Only draw until we find a bullet that is not alive
			if (pool[i].alive) {
				if (pool[i].draw()) {
					pool[i].clear();
					pool.push((pool.splice(i,1))[0]);
				}
			}
			else
				break;
		}
	};
}

/**
 * Create the Ship object that the player controls. The ship is
 * drawn on the "ship" canvas and uses dirty rectangles to move
 * around the screen.
 */
function Ship() {
	this.speed = 0;
	this.bulletPool = new Pool(30);
	this.bulletPool.init("bullet");
	var fireRate = 15;
	var counter = 0;
	this.collidableWith = "enemyBullet";
	this.collidableSameWith ="enemy";
	this.type = "ship";
	this.typeSame="ship"
	this.spriteWidth = imageRepository.spaceship.width/3;
	this.spriteHeight = imageRepository.spaceship.height/4;
	this.collX = this.x+10;
	this.collY = this.y+10;
	this.collWidth = this.spriteWidth-20;
	this.collHeight = this.spriteHeight-20;
	this.animCounter = 0;
	this.dir = 0;
	this.draw = function() {
	  counter++;
	  if (KEY_STATUS.left) {
            this.dir = 1;
          }
          else if (KEY_STATUS.right) {
            this.dir = 2;
          }
          else if (KEY_STATUS.up) {
            this.dir = 3;
          }
          else if (KEY_STATUS.down) {
            this.dir = 0;
          }
	  this.animCounter=(this.animCounter+1)%120;
	  this.step=Math.floor(this.animCounter/30);
	  if (this.step==3) this.step=1;
	  //document.getElementById('debugShip').innerHTML="animCounter: "+this.animCounter+" step:"+this.step+"<br/>";
	  this.context.clearRect(this.x,this.y,this.spriteWidth,this.spriteHeight);
	  this.context.drawImage(imageRepository.spaceship, this.spriteWidth*this.step,this.spriteHeight*this.dir,this.spriteWidth,this.spriteHeight, this.x, this.y,this.spriteWidth,this.spriteHeight);
	  if (KEY_STATUS.space && counter >= fireRate) {
			this.fire();
			counter = 0;
		}
	};
	/*
	 * Fires two bullets
	 */
	this.fire = function() {
	  //this.bulletPool.getTwo(this.x+Math.floor(this.spriteWidth/3), this.y, 3, this.x+Math.floor(this.spriteWidth*2/3), this.y, 3, this.dir);
	  this.bulletPool.get(this.x+Math.floor(this.spriteWidth/2), this.y+Math.floor(this.spriteHeight/2), 3, this.dir, 0);
	};
}
Ship.prototype = new Drawable();

/**
 * Create the Enemy ship object.
 */
function Enemy() {
	var percentFire = .01;
	var chance = 0;
	var counter = 0;
	this.alive = false;
	this.collidableWith = "bullet";
	this.collidableSameWith = "enemy";
	this.type = "enemy";
	this.typeSame = "enemy";
	this.animCounter = 0;
	this.dir = 0;
	this.spriteWidth = imageRepository.enemy.width/3;
	this.spriteHeight = imageRepository.enemy.height/4;
	/*
	 * Sets the Enemy values
	 */
	this.spawn = function(x, y, speed, dir, id) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.speedX = 0;
		this.speedY = speed;
		this.dir = dir;
		this.alive = true;
		this.isColliding=false;
		this.isCollidingSame=false;
		this.id = id;
		this.collX = x+35;
		this.collY = y+35;
		this.collWidth = this.spriteWidth-70;
		this.collHeight = this.spriteHeight-70;
	};

	/*
	 * Move the enemy
	 */
	this.draw = function() {
	  counter++;
	  this.context.clearRect(this.x,this.y,this.spriteWidth,this.spriteHeight);
	  
	  if (this.isCollidingSame) {
	    var canary=0;
	    while (this.isCollidingSame && canary<100){
		canary++;
		//document.getElementById('debug').innerHTML+='canary:'+canary+'<br/>';
		if (canary>10) return true;
		if (this.dir==0) {
		  this.y-= this.speed;
		  this.collY-= this.speed;
		}
		else if (this.dir==1) {
		  this.x += this.speed;
		  this.collX += this.speed;
		  //this.dir=2;
		}
		else if (this.dir==2) {
		  this.x -= this.speed;
		  this.collX -= this.speed;
		  //this.dir=1;
		}
		else if (this.dir==3) {
		  this.y += this.speed;
		  this.collY += this.speed;
		  //this.dir=0;
		}
		this.isCollidingSame=false;
		detectCollisionSame();
	    }
	    if (this.dir==0) this.dir=3;
	    else if (this.dir==1) this.dir=2;
	    else if (this.dir==2) this.dir=1;
	    else if (this.dir==3) this.dir=0;
	  }
	  
	  
	  if (this.dir==0) { //down
	    this.y += this.speed;
		this.collY += this.speed;
	  }
	  if (this.dir==1) { //left
	    this.x -= this.speed;
		this.collX -= this.speed;
	  }
	  if (this.dir==2) { //right
	    this.x += this.speed;
		this.collX += this.speed;
	  }
	  if (this.dir==3) { //up
	    this.y -= this.speed;
		this.collY -= this.speed;
	  }
	  
	  if (KEY_STATUS.left) {
	    this.x += 1;
	    this.collX += 1;
          }
      else if (KEY_STATUS.right) {
	    this.x -= 1;
		this.collX -= 1;
          }
      else if (KEY_STATUS.up) {
	    this.y += 1;
		this.collY += 1;
          }
      else if (KEY_STATUS.down) {
	    this.y -= 1;
		this.collY -= 1;
	  }
      
	  if (this.x > this.canvasWidth+this.spriteWidth) {
	      //this.x=0-this.spriteWidth;
		  return true;
	    }
	  if (this.x < 0-this.spriteWidth) {
	      //this.x=this.canvasWidth;
		  return true;
	    }
	  if (this.y > this.canvasHeight+this.spriteHeight) {
	      //this.y=0-this.spriteHeight;
		  return true;
	    }
	  if (this.y < 0-this.spriteHeight) {
	      //this.y=this.canvasHeight;
		  return true;
	    }

	  this.animCounter=(this.animCounter+1)%120;
	  this.step=Math.floor(this.animCounter/30);
	  if (this.step==3) this.step=1;
	  //document.getElementById('debug').innerHTML="x: "+this.x+" y:"+this.y+" coll:"+this.isColliding+"<br/>";
	  if (!this.isColliding) {
	    this.context.drawImage(imageRepository.enemy, this.spriteWidth*this.step,this.spriteHeight*this.dir,this.spriteWidth,this.spriteHeight, this.x, this.y,this.spriteWidth,this.spriteHeight);
		//this.context.rect(this.collX,this.collY,this.collWidth,this.collHeight);
		//this.context.lineWidth = 1;
		//this.context.strokeStyle = 'red';
		//this.context.stroke();
	    // Enemy has a chance to shoot every movement
	    chance = Math.floor(Math.random()*101);
	    if (chance/100 < percentFire) {
	      this.fire();
	    }
	    return false;
	  }
	  else {//alert("collision");
	    game.playerScore += 100;
	    return true;
	  }
	};

	/*
	 * Fires a bullet
	 */
	this.fire = function() {
		game.enemyBulletPool.get(this.x+Math.floor(this.spriteWidth/2), this.y+Math.floor(this.spriteHeight/2), 3, this.dir, 0);
	}

	/*
	 * Resets the enemy values
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.alive = false;
	};
}
Enemy.prototype = new Drawable();

/**
 * Creates the Game object which will hold all objects and data for
 * the game.
 */
function Game() {
	/*
	 * Gets canvas information and context and sets up all game
	 * objects.
	 * Returns true if the canvas is supported and false if it
	 * is not. This is to stop the animation script from constantly
	 * running on older browsers.
	 */
	this.init = function() {
		// Get the canvas element
		this.bgCanvas = document.getElementById('background');
		this.bgCanvas.width = window.innerWidth;
		this.bgCanvas.height = window.innerHeight;
		this.bg2Canvas = document.getElementById('background2');
		this.bg2Canvas.width = window.innerWidth;
		this.bg2Canvas.height = window.innerHeight;
		this.shipCanvas = document.getElementById('ship');
		this.shipCanvas.width = window.innerWidth;
		this.shipCanvas.height = window.innerHeight;
		this.mainCanvas = document.getElementById('main');
		this.mainCanvas.width = window.innerWidth;
		this.mainCanvas.height = window.innerHeight;
		
		// Test to see if canvas is supported
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
			this.bg2Context = this.bg2Canvas.getContext('2d');
			this.shipContext = this.shipCanvas.getContext('2d');
			this.mainContext = this.mainCanvas.getContext('2d');
			// Initialize objects to contain their context and canvas
			// information
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;
			
			Background2.prototype.context = this.bg2Context;
			Background2.prototype.canvasWidth = this.bg2Canvas.width;
			Background2.prototype.canvasHeight = this.bg2Canvas.height;
			
			Ship.prototype.context = this.shipContext;
			Ship.prototype.canvasWidth = this.shipCanvas.width;
			Ship.prototype.canvasHeight = this.shipCanvas.height;
			
			Bullet.prototype.context = this.mainContext;
			Bullet.prototype.canvasWidth = this.mainCanvas.width;
			Bullet.prototype.canvasHeight = this.mainCanvas.height;
			
			Enemy.prototype.context = this.mainContext;
			Enemy.prototype.canvasWidth = this.mainCanvas.width;
			Enemy.prototype.canvasHeight = this.mainCanvas.height;
			
			// Initialize the background object
			this.background = new Background();
			this.background.init(0,0,imageRepository.background.width,imageRepository.background.height); // Set draw point to 0,0
			this.background2 = new Background2();
			this.background2.init(0,0,imageRepository.background2.width,imageRepository.background2.height); // Set draw point to 0,0
			// Initialize the ship object
			this.ship = new Ship();
			// Set the ship to start near the bottom middle of the canvas
			var shipStartX = this.shipCanvas.width/2-Math.floor(imageRepository.spaceship.width/6);
			var shipStartY = this.shipCanvas.height/2-Math.floor(imageRepository.spaceship.height/8);
			this.ship.init(shipStartX, shipStartY, imageRepository.spaceship.width,
			               imageRepository.spaceship.height,0);
			// Initialize the enemy pool object
			this.enemyPool = new Pool(30);
			this.enemyPool.init("enemy");
			this.spawnWave();
			
			this.enemyBulletPool = new Pool(50);
			this.enemyBulletPool.init("enemyBullet");
			// Start QuadTree
			this.quadTree = new QuadTree({x:0,y:0,width:this.mainCanvas.width,height:this.mainCanvas.height});
			this.playerScore = 0;
			this.playerLives = 3;
			this.lastEnemy = 0;
			return true;
		} else {
			return false;
		}
	};
	this.spawnWave = function() {
	  this.enemyPool.get(0,0,0,0,this.lastEnemy++);
	  this.enemyPool.get(0,400,0,3,this.lastEnemy++);
	  this.enemyPool.get(200,200,0,2,this.lastEnemy++);
	  this.enemyPool.get(200,0,0,3,this.lastEnemy++);
	}
	this.spawnEnemy = function() {//alert(Math.random(0,200));
		var newDir = Math.floor(Math.random()*4);
		var newX = 0;
		var newY = 0;
		var newSpeed = 2;
		var spriteHeight = this.enemyPool.getPool()[0].spriteHeight;
		var spriteWidth = this.enemyPool.getPool()[0].spriteHeight;
		//document.getElementById('debug').innerHTML="spriteWidth: "+spriteWidth+" spriteHeight:"+spriteHeight+"<br/>";
		if (newDir == 0) { //down
			newX = Math.floor(Math.random()*this.bgCanvas.width);
			newY = 0 - spriteHeight;
		}
		else if (newDir == 1) { //left
			newX = 0 - spriteWidth;
			newY = Math.floor(Math.random()*this.bgCanvas.height);
		}
		else if (newDir == 2) { //right
			newX = this.bgCanvas.width;
			newY = Math.floor(Math.random()*this.bgCanvas.height);
		}
		else if (newDir == 3) { //up
			newX = Math.floor(Math.random()*this.bgCanvas.width);
			newY = this.bgCanvas.height;
		}
		//document.getElementById('debug').innerHTML="newX: "+newX+" newY:"+newY+" newDir:"+newDir+"<br/>";
		this.enemyPool.get(newX,newY,newSpeed,newDir,this.lastEnemy++);
	  //this.enemyPool.get(100,100,1,3);
	}
	// Start the animation loop
	this.start = function() {
	  this.background.draw();
	  this.background2.draw();
	  this.ship.draw();
          animate();
	};
}

/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
function animate() {
  document.getElementById('score').innerHTML = game.playerScore;
  document.getElementById('lives').innerHTML = game.playerLives;
  // Insert objects into quadtree
  game.quadTree.clear();
  game.quadTree.insert(game.ship);
  game.quadTree.insert(game.ship.bulletPool.getPool());
  game.quadTree.insert(game.enemyPool.getPool());
  game.quadTree.insert(game.enemyBulletPool.getPool());
  
  detectCollision();
  detectCollisionSame();
  // No more enemies
  //if (game.enemyPool.getPool().length === 0) {
    //game.enemyBulletPool.init("enemyBullet");
    //game.spawnWave();
  //}
  if (game.enemyPool.getPool().length < 2) {
    game.spawnEnemy();
  }
  //document.getElementById('debug').innerHTML="bulletPool:"+game.ship.bulletPool.getPool().length+"<br/>";
  //document.getElementById('debug').innerHTML+="enemybulletPool:"+game.enemyBulletPool.getPool().length+"<br/>";
  //document.getElementById('debug').innerHTML+="enemyPool:"+game.enemyPool.getPool().length+"<br/>";
  
  requestAnimFrame( animate );
  game.background.move();
  game.background2.move();
  game.ship.draw();
  game.ship.bulletPool.animate();
  game.enemyPool.animate();
  game.enemyBulletPool.animate();
}

function detectCollision() {
	var objects = [];
	game.quadTree.getAllObjects(objects);

	for (var x = 0, len = objects.length; x < len; x++) {		
		game.quadTree.findObjects(obj = [], objects[x]);
		
		for (y = 0, length = obj.length; y < length; y++) {

			// DETECT COLLISION ALGORITHM
			if (objects[x].collidableWith === obj[y].type &&
				(objects[x].collX < obj[y].collX + obj[y].collWidth &&
			     objects[x].collX + objects[x].collWidth > obj[y].collX &&
				 objects[x].collY < obj[y].collY + obj[y].collHeight &&
				 objects[x].collY + objects[y].collHeight > obj[y].collY)) {
				objects[x].isColliding = true;
				obj[y].isColliding = true;
				//document.getElementById('debug').innerHTML+="coll_X:"+objects[x].type+"<br/>";
				//document.getElementById('debug').innerHTML+="coll_Y:"+obj[y].type+"<br/>";
			}
		}
	}
};

function detectCollisionSame() {
	var objects = [];
	game.quadTree.getAllObjects(objects);

	for (var x = 0, len = objects.length; x < len; x++) {		
		game.quadTree.findObjects(obj = [], objects[x]);
		
		for (y = 0, length = obj.length; y < length; y++) {

			// DETECT COLLISION ALGORITHM
			if (objects[x].id !== obj[y].id && objects[x].collidableSameWith === obj[y].typeSame &&
				(objects[x].x < obj[y].x + obj[y].spriteWidth &&
			     objects[x].x + objects[x].spriteWidth > obj[y].x &&
				 objects[x].y < obj[y].y + obj[y].spriteHeight &&
				 objects[x].y + objects[y].spriteHeight > obj[y].y)) {
				objects[x].isCollidingSame = true;
				obj[y].isCollidingSame = true;
				//document.getElementById('debug').innerHTML="coll_X:"+objects[x].type+" id:"+objects[x].id+" x:"+objects[x].x+" y:"+objects[x].y+" spriteWidth:"+objects[x].spriteWidth+" spriteHeight:"+objects[x].spriteHeight+"<br/>";
				//document.getElementById('debug').innerHTML+="coll_Y:"+obj[y].type+" id:"+obj[y].id+" x:"+obj[y].x+" y:"+obj[y].y+" spriteWidth:"+obj[y].spriteWidth+" spriteHeight:"+obj[y].spriteHeight+"<br/>";
			}
		}
	}
};

/** * requestAnim shim layer by Paul Irish
* Finds the first API that works to optimize the animation loop,
* otherwise defaults to setTimeout(). */
window.requestAnimFrame = (function(){
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(/* function */ callback, /* DOMElement */ element){ window.setTimeout(callback, 1000 / 60); }; 
})();

/**
 * Initialize the Game and starts it.
 */
var game = new Game();

function init() {
  if(game.init())
    game.start();
}

// The keycodes that will be mapped when a user presses a button.
// Original code by Doug McInnes
KEY_CODES = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
}

// Creates the array to hold the KEY_CODES and sets all their values
// to false. Checking true/flase is the quickest way to check status
// of a key press and which one was pressed when determining
// when to move and which direction.
KEY_STATUS = {};
for (code in KEY_CODES) {
  KEY_STATUS[KEY_CODES[code]] = false;
}
/**
 * Sets up the document to listen to onkeydown events (fired when
 * any key on the keyboard is pressed down). When a key is pressed,
 * it sets the appropriate direction to true to let us know which
 * key it was.
 */
document.onkeydown = function(e) {
  // Firefox and opera use charCode instead of keyCode to
  // return which key was pressed.
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
	e.preventDefault();
	KEY_STATUS[KEY_CODES[keyCode]] = true;
  }
}
/**
 * Sets up the document to listen to ownkeyup events (fired when
 * any key on the keyboard is released). When a key is released,
 * it sets teh appropriate direction to false to let us know which
 * key it was.
 */
document.onkeyup = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
}


function insideTriangle(mouseX,mouseY,aX,aY,bX,bY,cX,cY) {
    if (fAB(mouseX,mouseY,aX,aY,bX,bY)*fBC(mouseX,mouseY,bX,bY,cX,cY)>0 && fBC(mouseX,mouseY,bX,bY,cX,cY)*fCA(mouseX,mouseY,cX,cY,aX,aY)>0) { return true }
    else { return false}
}

function fAB(mouseX,mouseY,aX,aY,bX,bY) {
    return (eval((mouseY-aY)*(bX-aX)-(mouseX-aX)*(bY-aY)))
}
function fBC(mouseX,mouseY,bX,bY,cX,cY) {
    return (eval((mouseY-bY)*(cX-bX)-(mouseX-bX)*(cY-bY)))
}
function fCA(mouseX,mouseY,cX,cY,aX,aY) {
    return (eval((mouseY-cY)*(aX-cX)-(mouseX-cX)*(aY-cY)))
}


function setKeys(posx,posy,cv){
  KEY_STATUS = {};
  for (code in KEY_CODES) {
    KEY_STATUS[KEY_CODES[code]] = false;
  }
  if (insideTriangle(posx,posy,0,0,cv.width,0,cv.width/2,cv.height/2)) KEY_STATUS.up=true;
  else if (insideTriangle(posx,posy,cv.width,0,cv.width,cv.height,cv.width/2,cv.height/2)) KEY_STATUS.right=true;
  else if (insideTriangle(posx,posy,cv.width,cv.height,0,cv.height,cv.width/2,cv.height/2)) KEY_STATUS.down=true;
  else KEY_STATUS.left=true;
  //if (insideTriangle(posx,posy,0,cv.height,0,0,cv.width/2,cv.height/2)) KEY_STATUS.left=true;
}
var canvas = document.getElementById('ship');
canvas.addEventListener('mousemove', function(evt) {
		  var rect = canvas.getBoundingClientRect();
		  var mousePosx = evt.clientX - rect.left;
		  var mousePosy = evt.clientY - rect.top;
		  setKeys(mousePosx,mousePosy,canvas);
		}, false);
canvas.addEventListener('mousedown', function(evt) {
  KEY_STATUS.space=true;
}, false);
canvas.addEventListener('mouseup', function(evt) {
  KEY_STATUS.space=false;
}, false);