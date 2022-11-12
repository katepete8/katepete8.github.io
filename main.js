const WINDOW_PERCENT_X = 0.8;
const WINDOW_PERCENT_Y = 0.8;
let WINDOW_X;
let WINDOW_Y;
let WINDOW_WIDTH;
let WINDOW_HEIGHT;
let BUCKET_WIDTH;
let RESOURCE_WIDTH;
let UNIT_SIZE;
let resourceList;
let resource1; 
let resource2;
let resource3;
let bucketList;
let bucket1;
let bucket2;
let bucket3;
const MODELS = {slots: "Slots Model", resources: "Resources Model"};
let currentModel = MODELS.slots;

// slots model: 3 buckets, 5 resources
const SLOTS_ITEM_SIZE = 3;
const SLOTS_BUCKET_CAPACITY = 3;
let slotsB1;
let slotsB2;
let slotsB3;
let slotsR1; 
let slotsR2; 
let slotsR3;
let slotsR4; 
let slotsR5; 

// resources model: 1 bucket, 7 resources
const R_BUCKET_CAPACITY = 9;
let resourcesB1;
let resourcesR1;
let resourcesR2; 
let resourcesR3;
let resourcesR4; 
let resourcesR5; 
let resourcesR6; 
let resourcesR7; 

function setup() {
    createCanvas(windowWidth, windowHeight);
    var infoPopup = document.getElementById("infoPopup");
    document.getElementById("resetButton").onclick = resetApp;
    document.getElementById("modelButton").onclick = switchModel;
    document.getElementById("infoButton").onclick = function() {
        infoPopup.style.display = "block";
    }
    document.getElementById("closeButton").onclick = function() { 
        infoPopup.style.display = "none"; 
    }
    
    window.onclick = function(event) {
        if (event.target == infoPopup) {
            infoPopup.style.display = "none";
        }
    }
    setWindowSizes();
    createObjects();
}

function resetApp() {
    resizeCanvas(windowWidth, windowHeight, 1000);
    setWindowSizes();
    createObjects();
    redraw();
}

function switchModel() {
    if (currentModel == MODELS.slots) {
        currentModel = MODELS.resources;        
    } else {
        currentModel = MODELS.slots;
    }
    document.getElementById("modelText").innerHTML = currentModel;
    resetApp();
}

function setWindowSizes() {
    WINDOW_WIDTH = windowWidth * WINDOW_PERCENT_X;
    WINDOW_HEIGHT = windowHeight * WINDOW_PERCENT_Y;
    MENU_BAR_HEIGHT = 0.08 * windowHeight;
    
    WINDOW_X = windowWidth * 0.5 * (1 - WINDOW_PERCENT_X);
    WINDOW_Y = windowHeight * 0.7 * (1 - WINDOW_PERCENT_Y);
    
    BUCKET_WIDTH = 0.12 * WINDOW_WIDTH;
    RESOURCE_WIDTH = 0.98 * BUCKET_WIDTH;
    UNIT_SIZE = 0.07 * WINDOW_HEIGHT;
}

function createObjects() {
    let canvasMidX = windowWidth / 2;
    let canvasMidY = windowHeight / 2;
    
    resourceList = [];
    bucketList = [];
    
    if (currentModel == MODELS.slots) {
        slotsR1 = new Resource(canvasMidX - 3 * BUCKET_WIDTH, WINDOW_Y + 0.4 * WINDOW_HEIGHT, RESOURCE_WIDTH, SLOTS_ITEM_SIZE, 173, 82, 1);
        slotsR2 = new Resource(canvasMidX - 1.75 * BUCKET_WIDTH, WINDOW_Y + 0.1 * WINDOW_HEIGHT, RESOURCE_WIDTH, SLOTS_ITEM_SIZE, 11, 72, 2);
        slotsR3 = new Resource(canvasMidX - 1 * BUCKET_WIDTH, WINDOW_Y + 0.4 * WINDOW_HEIGHT, RESOURCE_WIDTH, SLOTS_ITEM_SIZE, 266, 48, 3);
        slotsR4 = new Resource(canvasMidX + 0.5 * BUCKET_WIDTH, WINDOW_Y + 0.15 * WINDOW_HEIGHT, RESOURCE_WIDTH, SLOTS_ITEM_SIZE, 231, 57, 4);
        slotsR5 = new Resource(canvasMidX + 2 * BUCKET_WIDTH, WINDOW_Y + 0.3 * WINDOW_HEIGHT, RESOURCE_WIDTH, SLOTS_ITEM_SIZE, 30, 49, 5);
        
        slotsB1 = new Bucket(canvasMidX - 2 * BUCKET_WIDTH, WINDOW_Y + 0.7 * WINDOW_HEIGHT, BUCKET_WIDTH, SLOTS_BUCKET_CAPACITY, 0);
        slotsB2 = new Bucket(canvasMidX - 0.5 * BUCKET_WIDTH, WINDOW_Y + 0.7 * WINDOW_HEIGHT, BUCKET_WIDTH, SLOTS_BUCKET_CAPACITY, 0);
        slotsB3 = new Bucket(canvasMidX + 1 * BUCKET_WIDTH, WINDOW_Y + 0.7 * WINDOW_HEIGHT, BUCKET_WIDTH, SLOTS_BUCKET_CAPACITY, 0);
        
        resourceList.push(slotsR1); 
        resourceList.push(slotsR2); 
        resourceList.push(slotsR3);
        resourceList.push(slotsR4);
        resourceList.push(slotsR5);
        
        bucketList.push(slotsB1);
        bucketList.push(slotsB2);
        bucketList.push(slotsB3);
    } else {
        resourcesR1 = new Resource(canvasMidX - 3.5 * BUCKET_WIDTH, WINDOW_Y + 0.2 * WINDOW_HEIGHT, RESOURCE_WIDTH, 2, 173, 82, 1);
        resourcesR2 = new Resource(canvasMidX - 2 * BUCKET_WIDTH, WINDOW_Y + 0.3 * WINDOW_HEIGHT, RESOURCE_WIDTH, 3, 11, 72, 2);
        resourcesR3 = new Resource(canvasMidX - 0.3 * BUCKET_WIDTH, WINDOW_Y + 0.1 * WINDOW_HEIGHT, RESOURCE_WIDTH, 1, 266, 48, 3);
        resourcesR4 = new Resource(canvasMidX + 1 * BUCKET_WIDTH, WINDOW_Y + 0.2 * WINDOW_HEIGHT, RESOURCE_WIDTH, 2, 211, 57, 4);
        resourcesR5 = new Resource(canvasMidX + 2.5 * BUCKET_WIDTH, WINDOW_Y + 0.3 * WINDOW_HEIGHT, RESOURCE_WIDTH, 3, 30, 49, 5);
        resourcesR6 = new Resource(canvasMidX - 2.5 * BUCKET_WIDTH, WINDOW_Y + 0.7 * WINDOW_HEIGHT, RESOURCE_WIDTH, 1, 4, 43, 6);
        resourcesR7 = new Resource(canvasMidX + 1.5 * BUCKET_WIDTH, WINDOW_Y + 0.6 * WINDOW_HEIGHT, RESOURCE_WIDTH, 3, 255, 49, 7);
        
        resourcesB1 = new Bucket(canvasMidX - 0.5 * BUCKET_WIDTH, WINDOW_Y + 0.3 * WINDOW_HEIGHT, BUCKET_WIDTH, R_BUCKET_CAPACITY, 0);
        
        resourceList.push(resourcesR1); 
        resourceList.push(resourcesR2); 
        resourceList.push(resourcesR3);
        resourceList.push(resourcesR4);
        resourceList.push(resourcesR5);
        resourceList.push(resourcesR6);
        resourceList.push(resourcesR7);
        bucketList.push(resourcesB1);
    } 
}

function draw() {
    background(255);
    
    push();
    colorMode(RGB);
    fill(255,255,255);
    strokeWeight(0);
    rect(WINDOW_X, WINDOW_Y, WINDOW_WIDTH, WINDOW_HEIGHT);
    pop();
    
    let resourceHoverFlag = false;
    
    // bucket updates
    for (let i = 0; i < bucketList.length; i++) {
        bucketList[i].over();
        bucketList[i].show();
    }
    
    // resource updates
    for (let i = 0; i < resourceList.length; i++) {
        
        // only select top shown block
        if (!resourceHoverFlag) {
            resourceHoverFlag = resourceList[i].over(); 
            
        } else {
            resourceList[i].rollover = false;
        }
        resourceList[i].update();  
    }

    // display resources in buckets first
    for (let i = resourceList.length - 1; i >= 0; i--) {
        if (resourceList[i].inBucket) {
            resourceList[i].show();
        }
    }
    for (let i = resourceList.length - 1; i >= 0; i--) {
        if (!resourceList[i].inBucket) {
            resourceList[i].show();
        }
    }
    
    // outer background drawn on top
    push(); 
    fill(25);
    strokeWeight(0);
    rect(0,0, WINDOW_X - 2, windowHeight);
    rect(WINDOW_X + WINDOW_WIDTH + 2, 0, WINDOW_X - 2, windowHeight);
    rect(0,0, windowWidth, WINDOW_Y - 2 - MENU_BAR_HEIGHT);
    rect(0, WINDOW_Y + WINDOW_HEIGHT + 2, windowWidth, WINDOW_Y - 2);
    strokeWeight(5);
    line(WINDOW_X, WINDOW_Y, WINDOW_X + WINDOW_WIDTH, WINDOW_Y);
    line(WINDOW_X, WINDOW_Y, WINDOW_X, WINDOW_Y + WINDOW_HEIGHT);
    line(WINDOW_X + WINDOW_WIDTH, WINDOW_Y, WINDOW_X + WINDOW_WIDTH, WINDOW_Y + WINDOW_HEIGHT);
    line(WINDOW_X, WINDOW_Y + WINDOW_HEIGHT, WINDOW_X + WINDOW_WIDTH, WINDOW_Y + WINDOW_HEIGHT);
    pop();
    
    // menu bar created last
    push();
    fill(70);
    strokeWeight(5);
    rect(WINDOW_X, WINDOW_Y - MENU_BAR_HEIGHT, WINDOW_WIDTH, MENU_BAR_HEIGHT);
    pop();    
}

function mousePressed() {
    for (let i = 0; i < resourceList.length; i++) {
        resourceList[i].pressed();
    }
}

function mouseReleased() {
    
    for (let i = 0; i < resourceList.length; i++) {
        resourceList[i].released();
        for (let j = 0; j < bucketList.length; j++) {
            if (bucketList[j].isColliding(resourceList[i])) {
                bucketList[j].addResource(resourceList[i]);
            }
            bucketList[j].released();
        }
    } 
}

function windowResized() {
    resetApp(); // resets everything
}}
