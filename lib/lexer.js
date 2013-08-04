module.exports = function()
{
	this.types = {};

	this.type = function(name, exp)
	{
		this.types[name] = new module.exports.TokenType(name, exp);
		return this.types[name];
	}
	
	this.lex = function(input)
	{
		var tokens = [];

		// loop from start of input to end of input
		for(var offset=0; offset<input.length;)
		{
			// pass remaining input to this.match
			token = this.match(input.substr(offset));

			// if match found
			if(token)
			{
				// add token to end of tokens array
				tokens.push(token);

				// increment offset by token length
				offset += token.data.length;
			}
			// else increment offset by one
			else ++offset;
		}

		// return tokens array
		return tokens;
	}

	this.match = function(input)
	{
		// loop for each token type
		for(var type in this.token_types)
		{
			// attempt to match input with the current pattern
			var match = input.match(this.token_types[type].exp);

			// if match found and at least one capture found
			if(match && match[1])
			{
				// return Token instance
				return new module.exports.Token(this.token_types[type], data[1]);
			}
		}
	}
}

module.exports.TokenType = function(name, exp)
{
	this.name = name;
	this.exp = exp;
}

module.exports.Token = function(type, data)
{
	this.type = type;
	this.data = data;

	this.toString = function()
	{
		return this.type + ' ' + this.data;
	}
}
