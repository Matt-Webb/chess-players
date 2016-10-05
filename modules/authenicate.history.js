const request = require( 'request' ).defaults( {
  jar: true
} );
const cheerio = require( 'cheerio' );
const cookieJar = request.jar();
const config = require( './config/app' );

getAuthHistory = ( id, date ) => {

  return new Promise( ( fullfil, reject ) => {

    request( {
        url: config.login.url,
        method: "POST",
        form: {
          fd_user: config.login.user.username,
          fd_password: config.login.user.password
        },
        jar: cookieJar
      },
      ( err, res, body ) => {

        if ( !err && res.statusCode === 200 ) {

          request.get( {
              url: config.history.url + id + '&rating_period=' + date + '&t=0',
              header: response.headers,
              jar: cookieJar
            }, ( err, res, body ) => {

              if ( !err && res.statusCode === 200 ) {
                let $ = cheerio.load( body );
                let counter = 1;
                let player = {};
                let players = [];

                $( 'td.list4:not([colspan])' ).each( function ( i, elem ) {

                  let data = $( elem );

                  if ( counter === 1 ) {
                    // create player record:
                    player.colour = ( data.find( 'img' ).attr( 'src' ).indexOf( 'wh.gif' ) > -1 ) ? 'w' : 'b';
                    player.name = data.text().trim();
                  }

                  if ( counter === 11 ) {
                    // reset counter:
                    counter = 1;
                    players.push( player );
                    player = {};
                  } else {
                    counter++;
                  }
                } );
                // return list of players:
                fullfil( players );
              } else {
                reject( new Error( err ) );
              }
            } else {
              reject( new Error( err ) );
            }
          } );
      } );
  } );
};

module.exports = {
    getAuthHistory
};
