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

class Charfreq
{
    constructor(char, freq)
    {
        this.char = char;
        this.freq = freq;
    }
}

function is_upper(char)
{
	return alpha.includes(char);
}

function is_alpha(char)
{
    return is_upper(char.toUpperCase());
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

function sort_charfreqs(charfreqs)
{
    charfreqs.sort((a,b)=>{ return b.freq - a.freq; });
}

function standard_charfreqs()
{
    const freqs =
		[0.07984, 0.01511, 0.02504, 0.04260, 0.12452, 0.02262, 0.02013,
		 0.06384, 0.0700, 0.00131, 0.00741, 0.03961, 0.02629, 0.06876,
		 0.07691, 0.01741, 0.00107, 0.05912, 0.06333, 0.09058, 0.02844,
		 0.01056, 0.02304, 0.00159, 0.02028, 0.00057];

    let charfreqs = [];
    for (var i = 0; i < freqs.length; i++)
        charfreqs.push(new Charfreq(alpha[i], freqs[i]));

    sort_charfreqs(charfreqs);

    return charfreqs;
}

function find_key(ciphertext)
{
    let len = 0;
    let charcounts = {};
    for (const c of alpha)
        charcounts[c] = 0;

    for (const c of ciphertext)
    {
        if (is_alpha(c))
        {
            charcounts[c.toUpperCase()]++;
            len++;
        }
    }

    let charfreqs = [];
    for (const c of alpha)
        charfreqs.push(new Charfreq(c, charcounts[c]/len));

    sort_charfreqs(charfreqs);
    return charfreqs;
}
