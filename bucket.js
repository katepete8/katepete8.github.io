class Bucket {
    constructor(x, y, w, c, i) {
        this.rollover = false; // Is the mouse over the shape?
        this.addingResource = undefined;
        this.filled = false;
        this.amountHeld = 0;
        this.numberResourcesHeld = 0;
        this.capacity = c;
        this.index = i;
        this.resourceStack = [];
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = c * UNIT_SIZE; 
    }
    

    
    over() {
        // Is mouse over object
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }
    }
    
    isColliding(r) {
        let middleX = r.x + r.w / 2;
        let middleY = r.y + r.h / 2;
        return (middleX > this.x && middleX < this.x + this.w && middleY > this.y && middleY < this.y + this.h);
    }

    show() {
        stroke(0);
        strokeWeight(5);
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        push();
        if (!this.filled) {
            fill(255);
            strokeWeight(0);
            rect(this.x + 2.5, this.y - 4, BUCKET_WIDTH - 5, 10);
        } else {
            stroke(0);
            strokeWeight(5);
            line(this.x, this.y - 3, this.x + BUCKET_WIDTH, this.y - 3);
        }
        pop();
    }
    
    addResource(r) {
        if (this.capacity - this.amountHeld < r.size || (r.placingIn != undefined) || (r.removingFrom != undefined)) { 
            //bucket cannot hold resource or resource already locked
            return false;
        }
        this.addingResource = r;
        r.flagForPlacement(this);  
    }
    
    // remove from bucket if at the top of the bucket
    removeResource(r) {
        console.log("removing: ", r.id);
        let topResource = this.resourceStack.pop();
        if (topResource.id == r.id) {
            this.amountHeld = this.amountHeld - r.size;
            console.log("amount held: ", this.amountHeld);
            this.filled = false;
            this.numberResourcesHeld -= 1;
            
            // unlock next element in stack if it exists
            if (this.numberResourcesHeld > 0) {
                let newTopResource = this.resourceStack.pop();
                newTopResource.unlockResource();
                this.resourceStack.push(newTopResource);
            } 
        } else {
            this.resourceStack.push(topResource);
        }
    }
    
    released() {
        if (this.addingResource != undefined) {            
            // lock previous element if it exists
            if (this.numberResourcesHeld > 0) {
                console.log(this.resourceStack);
                let prevResource = this.resourceStack.pop();
                prevResource.lockResource();
                this.resourceStack.push(prevResource);
            }
            this.resourceStack.push(this.addingResource);
            
            this.numberResourcesHeld += 1;
            this.amountHeld += this.addingResource.size;
            this.addingResource.placeInBucket(this);
            this.addingResource = undefined;
        }
        if (this.amountHeld == this.capacity) {
            this.filled = true;
        }
    }
}
    
