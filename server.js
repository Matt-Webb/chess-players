let getPlayerHistory = require( './modules/available.records' ).getPlayerHistory;
let getAuthHistory = require( './modules/authenticate.history' ).getAuthHistory;


// return a list of date records and urls for a player where FIDE games are available:
getPlayerHistory( 418250 )
    .then( history => console.log( history ),
            error => console.log( error ) );

// return a list of results for a player on a given date for a given player:
getAuthHistory( 418250, '01-03-2014' )
    .then( players => console.log( players ),
            error => console.log( error ) );
