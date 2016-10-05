const request = require( 'request' );
const cheerio = require( 'cheerio' );

getPlayerHistory = id => {

return new Promise( ( fullfil, reject ) => {

  request( {
    url: "https://ratings.fide.com/hist.phtml?event=" + id,
}, ( err, res, body ) => {

    if ( !err && res.statusCode === 200 ) {

      let history = [];
      let $ = cheerio.load( body );

      $( '.tur' ).each( ( i, elem ) => {
        var url = $( elem ).attr( 'href' );
        var start = url.indexOf( 'rating_period=' ) + 14;
        var end = start + 10;
        var period = url.substring( start, end );

        history.push( { url: url, period: period, date: new Date( period ).valueOf() } );
      } );

      fullfil( history );

    } else {
      reject( new Error( error ) );
    }

  } );
} );

};

module.exports = {
    getPlayerHistory
};
