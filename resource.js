// Resource draggable representation
// Adapted from draggable.js from Daniel Shiffman <http://www.shiffman.net>

class Resource {
    constructor(x, y, w, size, ch, sat, id) {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the shape?
        this.inBucket = undefined; // -1 for no bucket; 0 indexed buckets otherwise
        this.placingIn = undefined;
        this.removingFrom = undefined;
        this.lockedInBucket = false;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = size * UNIT_SIZE;
        this.ch = ch; //color hue
        this.sat = sat; //color saturation
        this.id = id;
        this.size = size;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    over() {
        // Is mouse over object
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }
        return this.rollover;
    }

    update() {
        // Adjust location if being dragged
        if (this.lockedInBucket) {
            console.log(this.size, "size locked in a bucket");
        }
        if (this.dragging && !this.lockedInBucket) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    flagForPlacement(b) {
        this.placingIn = b;
    } 

    placeInBucket(b) {
        if (this.placingIn != undefined && this.inBucket == undefined) {
            this.x = b.x + 2.5;
            this.y = b.y + UNIT_SIZE * (b.capacity - b.amountHeld) - 1;
            this.inBucket = b;
            this.lockedInBucket = false;
          }
    } 
    
    lockResource() {
        console.log("locking");
        this.lockedInBucket = true;
    }
    
    unlockResource() {
        this.lockedInBucket = false;
    }
    
    show() {
        stroke(0);
        // Different fill based on state
        colorMode(HSB);
        strokeWeight(0);
        if (this.dragging) {
            fill(this.ch, this.sat, 50);
        } else if (this.rollover) {
            fill(this.ch, this.sat, 75);
        } else {
            fill(this.ch, this.sat, 100);
        }
        rect(this.x, this.y, this.w, this.h);
      }

    pressed() {
        // Did I click on the rectangle?
        if (this.rollover && !this.lockedInBucket) {
            if (this.inBucket != undefined) {
                // want to remove from bucket
                this.removingFrom = this.inBucket;
                this.inBucket.removeResource(this);
                this.inBucket = undefined;
                this.placingIn = undefined;
            }
            this.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }

    released() {
        // Quit dragging
        this.dragging = false;
        this.removingFrom = undefined;
    }
}// Resource draggable representation
// Adapted from draggable.js from Daniel Shiffman <http://www.shiffman.net>

class Resource {
    constructor(x, y, w, size, ch, sat, id) {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the shape?
        this.inBucket = undefined; // -1 for no bucket; 0 indexed buckets otherwise
        this.placingIn = undefined;
        this.removingFrom = undefined;
        this.lockedInBucket = false;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = size * UNIT_SIZE;
        this.ch = ch; //color hue
        this.sat = sat; //color saturation
        this.id = id;
        this.size = size;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    over() {
        // Is mouse over object
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }
        return this.rollover;
    }

    update() {
        // Adjust location if being dragged
        if (this.lockedInBucket) {
            console.log(this.size, "size locked in a bucket");
        }
        if (this.dragging && !this.lockedInBucket) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    flagForPlacement(b) {
        this.placingIn = b;
    } 

    placeInBucket(b) {
        if (this.placingIn != undefined && this.inBucket == undefined) {
            this.x = b.x + 2;
            this.y = b.y + UNIT_SIZE * (b.capacity - b.amountHeld) - 1;
            this.inBucket = b;
            this.lockedInBucket = false;
          }
    } 
    
    lockResource() {
        console.log("locking");
        this.lockedInBucket = true;
    }
    
    unlockResource() {
        this.lockedInBucket = false;
    }
    
    show() {
        stroke(0);
        // Different fill based on state
        colorMode(HSB);
        strokeWeight(0);
        if (this.dragging) {
            fill(this.ch, this.sat, 50);
        } else if (this.rollover) {
            fill(this.ch, this.sat, 75);
        } else {
            fill(this.ch, this.sat, 100);
        }
        rect(this.x, this.y, this.w, this.h);
      }

    pressed() {
        // Did I click on the rectangle?
        if (this.rollover && !this.lockedInBucket) {
            if (this.inBucket != undefined) {
                // want to remove from bucket
                this.removingFrom = this.inBucket;
                this.inBucket.removeResource(this);
                this.inBucket = undefined;
                this.placingIn = undefined;
            }
            this.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }

    released() {
        // Quit dragging
        this.dragging = false;
        this.removingFrom = undefined;
    }
}
