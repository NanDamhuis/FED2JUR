// Namespace
var APP = APP || {};

// Anonymous self invoking function
(function () {
    "use strict";
    


    APP.schedule = {
       
    };

    APP.ranking = {
        
    };

    APP.game = {
        
    };
    

    // Controller Object
    APP.controller = {
        init: function () {
            APP.router.init();
        }
    };

    // Router Object
    APP.router = {
        init: function () {
            routie({
                 
                '/schedule': function() {
                APP.page.schedule();
                },
                '/ranking': function() {
                    APP.page.ranking();
                },
                '/game': function() {
                    APP.page.game();
                },
               
                '*': function() {
                    APP.page.ranking();
                }
            });
        },

        change: function () {
                        // Route = #/schedule - 2 karakters = schedule
            var route = window.location.hash.slice(2),
                    // Zoekt alle sections met een data-route
                sections = qwery('section[data-route]'),
                section = qwery('[data-route=' + route + ']')[0];  
                
                console.log(window.location.hash.slice(2));
            // Show active section, hide all other
            if (section) {
                // Loopt door alle sections heen
                for (var i=0; i < sections.length; i++){
                    // Class active wordt weggehaald
                    sections[i].classList.remove('active');
                }
                // Geselecteerde section, schedule, wordt class active aan toegevoegd
                section.classList.add('active');
            }
            // Default route
            if (!route) {
                sections[0].classList.add('active');
            }
        }
    };

    // Pages
    APP.page = {
        home: function () {
            Transparency.render(qwery('[data-route=home')[0], APP.home);
            APP.router.change();
        },

        schedule: function () {
            Transparency.render(qwery('[data-route=schedule')[0], APP.schedule);
            APP.router.change();    

        },

        ranking: function () {
            Transparency.render(qwery('[data-route=ranking')[0], APP.ranking);
            APP.router.change();
        },

        game: function () {
        
           promise.get('https://api.leaguevine.com/v1/pools/?tournament_id=19389').then(function(error, text, xhr) {
            if (error) {
              console.log('Error ' + xhr.status);
              // Stop met de functie
              return ;
            }

            var objectParse = JSON.parse(text);  
            Transparency.render(qwery('[data-route=game')[0], APP.game); 
            APP.router.change();    

            for (var i in objectParse.objects[0].standings) {
                // Met dank aan deze thread: http://stackoverflow.com/questions/3010840/loop-through-array-in-javascript
               console.log("Games Played: " + objectParse.objects[0].standings[i]["games_played"]);
            }

            console.log("Connectie test - ID = " + objectParse.objects[0]["id"] + " van Poule: " + objectParse.objects[0]["name"] );
            });




            //     promise.get('https://api.leaguevine.com/v1/pools/?tournament_id=19389').then(function(error, text, xhr) {
            //     if (error) {
            //       console.log('Error ' + xhr.status);
            //       // Stop met de functie
            //       return;
            //     }
            //     var parsedObject = JSON.parse(text);          
            //     Transparency.render(qwery('[data-route=league')[0], APP.game);
            //     // console.log('The page contains ' + text.length + ' character(s).');
            //     // console.log(text);
            //     for(var i = 0; i < parsedObject.objects.length; i++) {
            //         APP.game = parsedObject.objects[i];
            //         console.log(parsedObject.objects[i].name);
            //     }
            // });
 
        }
    }

    
    // DOM ready
    domready(function () {
        // Kickstart application
        APP.controller.init();
    });


// Functie voert zichzelf uit tussen de (). 
})();