var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];                 
        var alienHouse;                    
        var ufo;                 
        var sign;  
        
        var fish;                       
        var blueDuck;                       
        
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth, groundY, '#5d43a3');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield //+cloud buddy
            
            var circle;
                for(var i = 0; i < 700; i++) {
                    circle = draw.circle(1, '#faf67d', '#dec14e', 1);
                    circle.x = canvasWidth * Math.random();
                    circle.y = groundY * Math.random();
                    background.addChild(circle);
                }
            
            var cursedMoon = draw.bitmap('img/cursedmoon.png');
            cursedMoon.x = 500;
            cursedMoon.y = 0;
            cursedMoon.scaleX = 0.4;
            cursedMoon.scaleY = 0.3;
            background.addChild(cursedMoon);
            
            var happyCloud = draw.bitmap('img/happycloudfriend.png');
            happyCloud.x = 0;
            happyCloud.y = 0;         
            happyCloud.scaleX = 0.3;
            happyCloud.scaleY = 0.3;
            background.addChild(happyCloud);
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            //I added some other stuff besides the required buildings.
            
            ufo = draw.bitmap('img/pinkufo.png');
            ufo.x = 150;
            ufo.y = -100;
            ufo.scaleX = 0.8;            
            ufo.scaleY = 0.8;               
            background.addChild(ufo);
            
            for(var fNum = 0; fNum < 150; fNum++) {
                fish = draw.bitmap('img/flyingfish.png');
                fish.scaleX = 0.05;
                fish.scaleY = 0.05;                    //am very tired type type toopity toop toop tip
                fish.x = canvasWidth * Math.random();   //(translation: figure out how you're going to put this fishys in)
                fish.y = groundY * Math.random();
                background.addChild(fish);
            }

           //Required buildings below >>>
            for(var i = 0; i < 8; i++) {
                var buildingHeights = [300, 130, 190, 175, 250, 300, 190, 250];
                var buildingColors = ['Purple', 'Indigo', 'DarkBlue', 'Teal', 'Pink', 'Red', 'Purple', 'Indigo', 'DarkBlue', 'Teal'];
                var building = draw.rect(75, buildingHeights[i], buildingColors[i], 'LightGray', 1);
                building.x = 200 * i;
                building.y = groundY - buildingHeights[i];
                background.addChild(building);
                buildings.push(building);
            }
            //Required buildings above <<<
            
            alienHouse = draw.bitmap('img/alienhouse.png');
            alienHouse.x = 1100;
            alienHouse.y = groundY - 296;
            alienHouse.scaleX = 0.6;                    
            alienHouse.scaleY = 0.6;
            background.addChild(alienHouse);
            
            // TODO 4: Part 1 - Add a tree //+something else
            tree = draw.bitmap('img/weirdtree.png');
            tree.x = 930;
            tree.y = groundY - 265;
            tree.scaleX = 0.2;
            tree.scaleY = 0.2;
            background.addChild(tree);
            
            sign = draw.bitmap('img/pinkwoodsign.png');
            sign.x = 1450;
            sign.y = groundY - 395;
            sign.scaleX = 0.3;
            sign.scaleY = 0.3;
            background.addChild(sign);
            
            /*blueDuck = draw.bitmap('img/bigblueduck.png');
            blueDuck.x = 300;
            blueDuck.y = 265;
            blueDuck.scaleX = 0.4;
            blueDuck.scaleY = 0.4;
            background.addChild(blueDuck);*/
        
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree! //+ Some other stuff...
            
            alienHouse.x = alienHouse.x - 1.5;
            if (alienHouse.x < -200) {
                alienHouse.x = canvasWidth;
            }
            
            tree.x = tree.x - 1.5;
            if (tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            sign.x = sign.x - 1.5;
            if (sign.x < -200) {
                sign.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax  //There are other things besides the required buildings here.
            
            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i];
                building.x = building.x - 1;
                if (building.x < -200) {
                    building.x = canvasWidth;
                }
            }

            ufo.x = ufo.x - 1;
            if (ufo.x < -200) {
                ufo.x = canvasWidth;
            }
            
            /*blueDuck.x = blueDuck.x - 1;
            if (blueDuck.x < -200) {            //turn into obstacle
                blueDuck.x = canvasWidth;
            }*/ 
            
        } // end of update function - DO NOT DELETE
        
        ///***Fix update and render functions; some stuff in update should be in render instead
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
   
        /*var alien = draw.bitmap('img/deadeyedalien.png');
        alien.x = -25;
        alien.y = 260;
        alien.scaleX = 0.2;       //make one of the enemies
        alien.scaleY = 0.2;
        background.addChild(alien);*/
        
        /*var alien2 = draw.bitmap('img/deadeyedalien2.png');
        alien2.x = 700;
        alien2.y = 300;
        alien2.scaleX = 0.2;      //make one of the enemies
        alien2.scaleY = 0.2;
        background.addChild(alien2);*/
        
        return background;
    };
};    

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
