#### [Parsing hashtags and adding URLs](http://www.simonwhatley.co.uk/examples/twitter/prototype/)

        String.prototype.parseHashtag = function() {
        	return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
        		var tag = t.replace("#","WOW")
        		return t.link(tag);
        	});
        };
