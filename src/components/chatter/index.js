const $ = require('jquery');

export default {
  name: 'chatter',



  data() {
    return {
      message: 'Hey @bob and @joe, you\'re going to (flip) when you check out http://www.cnn.com and http://www.theverge.com',
      loading: false,
      emoticonLimit: 15,
      webtask: 'https://wt-7abb8e587f67c0479d2721fbbd244dba-0.run.webtask.io/getTitle',
      mentionExpr: /\@([a-zA-Z0-9_-]*)/g,
      emoticonExpr: /\(([a-zA-Z0-9]*)\)/g,
      urlExpr: /(https?:\/\/[^\s]+)/g,
      results: '',
      output: ''
    }
  },



  methods: {


    textSubmit() {

      // Make sure there is something in the input field
      if(this.message.length > 0){

        // Wipes out previous results and creates the structure for new results
        this.results = this._resultConstructor();

        // Send the value to be parsed.
        // When complete, assigns the results to the output box in the UI
        this.parseMessage().then( () =>{
          this.output = JSON.stringify(this.results, null, '  ');
        });
      }
    },


    parseMessage(){
      let promises = [];
      let result;

      // Loop through any results that match the mentions regex and push them to results
      while( (result = this.mentionExpr.exec(this.message)) !== null ){
        this.results.mentions.push(result[1]);
      }

      // Loop through any results that match the emoticons regex and push them to results
      while( (result = this.emoticonExpr.exec(this.message)) !== null ){

        // Emoticons of only a certain length are allowed
        if(result[1].length <= this.emoticonLimit){
          this.results.emoticons.push(result[1]);
        }
      }

      // Loop through any results that match the url regex and push them to the promises array
      while( (result = this.urlExpr.exec(this.message)) !== null ){

        // Calls the _getTitle helper method and passes it the result. This is a promise.
        promises.push( this._getTitle(result[1]) );
      }

      // If there are promsies, that means that the response is now asynchronous.
      // To account for if there are no promises in the promises array, this promise is immediately resolved.
      return new Promise( (resolve, reject) =>{
        if(promises.length > 0){

          // Show the loading spinner since it'll take a second or two to get the respone(s)
          this.loading = true;

          // There could be multiple urls/promises, so have to wait for them to all be resolved.
          // Once done, assign the result of the promises to the results and resolve.
          Promise.all(promises).then( values => {

            // It's possible that an invalid url was given.
            // The project wasn't specific as to what should happen in this case, so I went ahead and noted some error detection.
            values.map( v => {
              if(v.hasOwnProperty('error')) {
                console.error('There was an error with a url submitted to getTitle: ', v.error);
              }
            });

            this.results.links = values;
            this.loading = false;
            resolve();
          });
        } else {
          resolve();
        }
      });
    },


    _resultConstructor() {
      return {
        mentions: [],
        emoticons: [],
        links: []
      };
    },


    _getTitle(url) {
      return new Promise( (resolve, reject) => {
        $.post({
          url: this.webtask,
          data: { url },
        }).then( data => {
          resolve(data);
        });
      });
    }


  }



};
