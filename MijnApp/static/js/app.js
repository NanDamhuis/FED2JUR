// Namespace
var APP = APP || {};

// Anonymous self invoking function
(function () {
    "use strict";
    


    APP.schedule = {
       
    };

    APP.ranking = { 
        
    };

    APP.pool = {
        
        
    };
    

    // Controller Object
    APP.controller = {
        init: function () {
            APP.router.init();
        }
    };

    APP.spinner = {
        spinner: {
            spinnerObject: document.getElementById("loader"), 
            show: function () {
                this.spinnerObject.className = "spin";
            },
            hide: function () {
                this.spinnerObject.className ="stopspin";
            }
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
                '/pool': function() {
                    APP.page.pool();
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

        ranking: function () {
            Transparency.render(qwery('[data-route=schedule')[0], APP.schedule);
            APP.router.change();    

        },

        schedule: function () {

            APP.spinner.spinner.show();
            promise.get('https://api.leaguevine.com/v1/games/?season_id=20167&tournament_id=19389').then(function(error, text, xhr) {
            if (error) {
              console.log('Error ' + xhr.status);
              // Stop met de functie
              return ;
            }


// Dit is een manier van Koop en mij

            var objectParse = JSON.parse(text);
            var data = objectParse.objects; 
            console.log("data " + data)
            console.log("hoe lang is mijn object? " + data.length)

             var teamData = [] //new Array;
            for (var i = 0; i < data.length; i++) {

                
                var team1 = data[i].team_1.name;  
                var team2 = data[i].team_2.name;
                var startTime = data[i].start_time;
                console.log(i + " - ", data[i].team_1.name);
                teamData.push({team1: team1, team2: team2, startTime: startTime});
                  

            } //end: for loop pools

            APP.spinner.spinner.hide();
            Transparency.render(qwery('[data-route=schedule')[0], teamData);
            APP.router.change();



        });


         
        },

        pool: function () {
        
            APP.spinner.spinner.show();
           promise.get('https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=8ec88ebf01').then(function(error, text, xhr) {
                if (error) {
                  console.log('Error ' + xhr.status);
                  // Stop met de functie
                  return;
                }

                //Dit is een simpelere manier van Joost

                var parsedObject = JSON.parse(text);

                APP.pool = parsedObject.objects;

                 APP.spinner.spinner.hide();

                 Transparency.render(qwery('[data-route=pool')[0], parsedObject.objects); 
        


            });


            APP.router.change();  
 
        }
    }

    
    // DOM ready
    domready(function () {
        // Kickstart application
        APP.controller.init();
    });


// Functie voert zichzelf uit tussen de (). 
})();