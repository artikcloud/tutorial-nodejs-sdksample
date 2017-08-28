// This is a modified code snip from the SDK sample:
// https://github.com/artikcloud/artikcloud-js/blob/master/docs/MessagesApi.md#getLastNormalizedMessages

// import the ARTIKCloud library
var ArtikCloud = require('artikcloud-js');

// configuration file to simplify retrieving the device ID and device token
var Config = require('./config.json');

// configure client to set the oauth2 access_token or use the device_token here
var defaultClient = ArtikCloud.ApiClient.instance;

// configure with oauth2 access_token or use the device_token
var artikcloud_oauth = defaultClient.authentications['artikcloud_oauth'];
artikcloud_oauth.accessToken = Config['device_token'] 


// get reference to Messages API
var api = new ArtikCloud.MessagesApi();

// request parameters when making API call.
var opts = { 
  'count': 1, // {Number} Number of items to return per query.
  'sdids': Config['device_id'] // {String} Comma separated list of source device IDs (minimum: 1).
};


/**
* Callback function after making API call
* 
* @param error - error object
* @param data - response data from server
* @param response - header response data
* 
* 	Example Response:
*   -------------------------------------
	{ 
	  "count": 1,
	  "size": 1,
	  "data": [
	    {
	      "cts": 1503943447709,
	      "ts": 1503943447709,
	      "mid": "1df4e2e2784e48b1a225892e574fe12e",
	      "sdid": "a12345f ... ",
	      "sdtid": "dt856e54302a294fba80414b87eb7b79a3",
	      "uid": "u12345f ... ",
	      "mv": 1,
	      "data": {
	        "temp": 10
	      }
	    }
	  ],
	  "sdids": "a12345f ... "
	}
*   -------------------------------------
* 
*/

var callback = function(error, data, response) {

  if (error) {
    console.error(error);
  } else {
    console.log('< API Response:\n', JSON.stringify(data));
  }

};

console.log("> Making API call with data: " + JSON.stringify(opts));

//make api call
api.getLastNormalizedMessages(opts, callback);

