const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class Translator
{
	constructor(key)
	{
		this.map = {};
        this.reversemap = {};
        for (const c of alpha)
        {
            this.map[c] = key[c];
            this.reversemap[key[c]] = c;
        }
	}

    translate(char, encipher)
    {
        const translator = encipher ? this.map : this.reversemap;
        const upper = is_upper(char);
        char = char.toUpperCase();
        if (char in translator)
            char = translator[char];
        return upper? char : char.toLowerCase();
    }
}

function is_upper(char)
{
	return alpha.includes(char);
}

function translate(plaintext, key, encipher)
{
	let result = "";
    let translator = new Translator(key);
	for (var i = 0; i < plaintext.length; i++)
	{
        const c = plaintext[i];
		result += translator.translate(c, encipher);
	}
	return result;
}
