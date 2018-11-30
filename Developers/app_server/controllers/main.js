/**
 * http://usejsdoc.org/
 */

var lineReader = require('line-reader');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/subscribedb");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    country: String,
    DOB: String
});
var User = mongoose.model("User", nameSchema);
var COUNTRY1 = '';
var queryResult = '';
var tempRes = '';


/**
 * Send the contents of an HTML page to the client.
 * @param fileName the name of the file containing the HTML page.
 * @param result the HTTP result.
 */

function sendPage(fileName, result)
{
    var html = '';
    
    // Read the file one line at a time.
    lineReader.eachLine(fileName,
        /**
         * Append each line to string html.
         * Send the contents of html to the client
         * after the last line has been read.
         * @param line the line read from the file.
         * @param last set to true after the last line.
         */
        function(line, last)
        {
            html += line + '\n';

            if (last) 
            { 
                result.send(html);
                return false; 
            }
            else
            {
                return true;
            }
        });
}

/**
 * Extract the first and last names from the request.
 * @param request the HTTP request.
 * @returns a string containing the first and last names.
 */
function getCountry(request)
{
    var country = request.param('country');
    
    return country;
}

function getFactors(request)
{
   var factors  = request.param('development');
   return factors;
}


/**
 * Send the contents of an HTML page to the client
 * with an inserted body text.
 * @param text the body text.
 * @param result the HTTP result.
 */
function sendBody(country, doc, result)
{
	console.log(doc.Country);
    var html = '<!DOCTYPE html>\n'
        + '<html lang="en-US">\n'
        + '<head>\n'
        + '    <meta charset="UTF-8">\n'
        + '    <link rel="stylesheet" href="secondPage.css">'
        + '    <title>NationPedia!!</title>\n'
        + '	   <link rel="stylesheet type="text/css" href="dc.css" />'	
        + '	   <link rel="stylesheet type="text/css" href="d3Edit.css" />'	
        + '    <script src="https://d3js.org/d3.v5.min.js"></script>'
        + '<script src="https://d3js.org/d3-scale.v2.min.js"></script>'
        + '    <link href="jquery-ui.css" rel="stylesheet">'
        + '	   <script type="text/javascript" src="jquery.js"></script>'
        + '    <script src="jquery-ui.js"></script>'
        + '<script src="d3Edit.js"></script>'
        + '    <script> $( "#tooltip" ).tooltip(); </script>'
        + '    <style>'
        + '       a.homelink{'
        + '          font-size: 40px'
        + '          font-weight: bold'
        + '       }'
        + '    </style>'
        + '</head>\n'
        + '<body>\n'
        + '<a class="homelink" id="tooltip" href="frontPage" title="Click on this link to go back to front page" >Home</a>'
        + '<br>'
        + '<div class="textClass">'
        + '<div class="countryName">'
    		+ country 
    		+ '<br>'  
        + '</div>'
	        + '<br><img class="image" src='
	        + doc.flagUrl
	        + '>' 
	        + '<br>'    
	        + '<br>'
        + '</div>'
        + '<fieldset>'
        + '<legend>Data Visualization Dashboard</legend>'
        + '<fieldset>'
        + '<legend>Human Development Index</legend>'
        + '<div id="dataType"><p>Value Plotted from 1990 to 2017</p></div>'
        + '<div id="dataType_1"><p>Time Series Plot</p></div>'
        + '<div id="dataType_2"><p>Past Five Years Plot</p></div>'
        + '</fieldset>'
        + '<fieldset>'
        + '<legend>Education Index</legend>'
        + '<div id="dataType1"><p>Value Plotted from 1990 to 2017</p></div>'
        + '<div id="dataType1_11"><p>Time Series Plot</p></div>'
        + '<div id="dataType1_12"><p>Past Five Years Plot</p></div>'
        + '</fieldset>'
        + '<fieldset>'
        + '<legend>Gross Domestic Product</legend>'
        + '<div id="dataType2"><p>Value Plotted from 1990 to 2017</p></div>'
        + '<div id="dataType2_21"><p>Time Series Plot</p></div>'
        + '<div id="dataType2_22"><p>Past Five Years Plot</p></div>'
        + '</fieldset>'
        + '<fieldset>'
        + '<legend>Life Expectancy</legend>'
        + '<div id="dataType3"><p>Value Plotted from 1990 to 2017</p></div>'
        + '<div id="dataType3_31"><p>Time Series Plot</p></div>'
        + '<div id="dataType3_32"><p>Past Five Years Plot</p></div>'
        + '</fieldset>'
        + '</fieldset>'
        + ' <script src="d3.js" type="text/javascript"></script>'
        + ' <script src="crossfilter.js" type="text/javascript"></script>'
        + ' <script src="dc.js" type="text/javascript"></script>'
        + ' <script src="queue.js" type="text/javascript"></script>'
        + '<script>'
        + 'var country = '+JSON.stringify(country)+';'
        + 'var response = '+JSON.stringify(doc)+';'
        + 'dataSelect(country, response);'
        +  '</script>'
        + '</body>\n'
        + '</html>\n';
    
    result.send(html);    
}
function fetchCountryDetails(country, result){

	mongoose.connect('mongodb://localhost:27017/mainWorldDB');
	mongoose.connection.on('open', callback1);

}

function callback1 (err, doc){
    console.log("connection established");

    mongoose.connection.db.collection('worldMapInfo', callback2);
    }

function callback2(err, docs) {
	//console.log(COUNTRY1);
    if(err) return console.log(err);
    docs.find({countryName: COUNTRY1}).each(callback3);
    }

function callback3 (err, doc){
	
    if(err) return console.log(err);
    else{
    if(doc != null){
    		//console.log(doc);
          storeValues(doc);
    }
        
    }
    }

function storeValues(doc){
	
	
	try{
		sendBody(COUNTRY1, doc, tempRes);
	}
	catch(ex){
		
	}
}

function delayFunction(){
	//console.log("Neeraj");
	console.log(queryResult);
}

/*
 * GET Front page.
 */
module.exports.frontPage = function(request, result) 
{
    sendPage('./app_server/views/frontPage.html', result);
};



/*
 * GET home page.
 */
module.exports.home = function(request, result) 
{
    sendPage('./app_server/views/firstHTML.html', result);
};

/*
 * GET text fields page.
 */
module.exports.get_about = function(request, result) 
{
    sendPage('./app_server/views/about.html', result);
};
module.exports.get_account = function(request, result) 
{
    sendPage('./app_server/views/account.html', result);
};

module.exports.get_subscribe = function(request, result) 
{
    sendPage('./app_server/views/subscribe.html', result);
};

module.exports.get_second_page = function(request, result) 
{
    sendPage('./app_server/views/secondPage.html', result);
};



module.exports.get_worldMap = function(request, result)
{
	sendPage('./app_server/views/worldMapHover.html', result);
};
module.exports.get_countryDetails = function(request, result)
{
	sendPage('./app_server/views/countryDetails.html', result);
};

module.exports.get_countryForm = function(request, result)
{
	sendPage('./app_server/views/selectCountry.html', result);
};
module.exports.get_devpage = function(request, result)
{
	sendPage('./app_server/views/devpage.html', result);
};
module.exports.get_edashboard = function(request,result)
{
	sendPage('./app_server/views/electricitydashboard.html',result)
};
module.exports.get_cdashboard = function(request,result)
{
	sendPage('./app_server/views/communicationdashboard.html',result)
};
module.exports.get_pdashboard = function(request,result)
{
	sendPage('./app_server/views/populationdashboard.html',result)
};
module.exports.post_second_page = function(request, result) 
{
	var country = getCountry(request);
	COUNTRY1 = country;
	tempRes = result;
	fetchCountryDetails(country, result);
	
	
};
module.exports.post_add_user = function(request,result)
{
	
	var myData = new User(request.body);
	User.find({email : myData.email}, function (err, docs) {
        if (docs.length){
            result.send('<script>alert("User exists already")</script>');
        	
        }else{
            myData.save();
            result.send('<script>alert("User subscribed Succesfully")</script>');
        }
         
    });
};

module.exports.get_showuser = function(request, result) 
{
	
    var mail = request.query.email;    
    console.log(mail);
    User.find( { email : mail },'firstName lastName email mobile country DOB', function(err, doc) {
                         if (err) {
                             result.send("Find failed.");
                         }
                         else {
                             result.send("FirstName: "+doc[0].firstName+"</br>"+"LastName: "+doc[0].lastName
                            		 +"</br>"+"Email ID: "+doc[0].email+"</br>"+"Mobile: "+doc[0].mobile
                            		 +"</br>"+"country: "+doc[0].country+"</br>"+"DOB: "+doc[0].DOB
                            		 );
                         }
    });
   
};
module.exports.get_deleteuser = function(request, result) 
{
	
    var mail = request.query.email; 
    
    User.find({email : mail}, function (err, docs) {
        if (docs.length){
        	User.remove( { email : mail }, function(err, doc) {
                if (err) {
                	result.send('<script>alert("Delete Failed")</script>');
                }
                else {
                    result.send('<script>alert("User successfully unsubscribed")</script>');
                }
        	});
            
           
        }
        else{
            result.send('<script>alert("User not in database")</script>');

        }
    });
    
   
};
module.exports.get_userlist = function(request,result)
{
	
	 User.find( {},{}, function(err, doc) {
         if (err) {
             result.send('<script>alert("Find Failed")</script>');
         }
         else {
        	 result.render('userlist', { "userlist" : doc });
         }
	 });
};

module.exports.get_update = function(request,result){
	//console.log(request.query.email);
	var mail = request.query.email;
	
	sendPage('./app_server/views/update.html', result);
	
};

module.exports.post_updateuser = function(request,result)
{

	var mail = request.body.email;
	
	
	User.findOneAndUpdate({email: mail}, request.body, function (err, user) {
		
		result.send(user)
	//	result.send('<script>alert("Update Succesful")</script>');
	});

	//result.send('<script>alert("Update Succesful")</script>');
};
