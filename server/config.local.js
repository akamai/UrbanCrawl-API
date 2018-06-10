module.exports = {
	"restApiRoot": '/v2',
	"host": process.env.HOST || '0.0.0.0',
	"port": process.env.PORT || 3000,
  "remoting": {
    "context": false,
    "rest": {
      "handleErrors": false,
      "normalizeHttpPath": false,
      "xml": false,
      "supportedTypes": ["application/json"]
    },
    "json": {
      "strict": false,
      "limit": "100kb"
    },
    "urlencoded": {
      "extended": true,
      "limit": "100kb"
    },
    "cors": false,
    "sharedMethods": {
      "*": false
    }
  }
};
