/**
* @description : testing quadtree principle
*
* @author cxts  <couchaux.thomas@gmail.com>
* @github https://github.com/cxTs
* @date 10/06/2020
* @required Quadtree.js, Vector.js, misc.js, Draw.js
* @param {VOID} none
* @return {VOID} Draws 500 points randomly set and the quadtree sections in which their stocked
*                a rectangle following the mouse movement (as a collision check zone) make points become red
*                as it's overing them
*
**/



// SETUP
let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
//let boundary = new Rectangle(200, 200, 200, 200);
let qt = new Quadtree(boundary, 5);


// the collision check zone following the mouse
let zone = new Rectangle(150, 150, 50, 50);
for(let i = 0; i < 500; i++) {
    let p = new Point(getRandom(width), getRandom(height));
    qt.insert(p);
    // qt.display(ctx);
    // p.location.display(ctx, 2, true, false, p.color);
}


let found;

/**
* @description : called by window.requestAniamtionFrame(), draw the entire animation on canvas
* @param NONE
* @return {VOID}
*
**/
function draw() {
    clear();
    // if their is object in the "zone" boundary, it's a collision and it's populate array found with it
    found = qt.query(zone);
    // display the quadtree zone boundary (in light green), for the purpose of the test
    qt.display(ctx);

    for(let f of found) {
        // display the points found in "zone" in red
        f.location.display(ctx, 2, true, false, "#F00");
    }
    // display the mouse following "zone" (in light blue)
    zone.display(ctx, "#05F");
    window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);



// mouse event handlers

// insert a new point in quadtree, live subdivision of the quadtree could be observed
document.onclick = function(e) {
    qt.insert(new Point(e.clientX, e.clientY));
}

// make the check square zone follow the mouse
document.onmousemove = function(e) {
    zone.x = e.clientX;
    zone.y = e.clientY;
}
