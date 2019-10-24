const nameRegExp = /^.*?(?:(?=^[#>:*].+)|(?= +[#>:*].+)|$)/;
const descsRegExp = /(?:^| )>(.+?)(?= +[#>:*]|$)/g;
const urlsRegExp = /(?:^| ):(.+?)(?= +[#>:*]|$)/g;
const tagsRegExp = /(?:^| )#(.+?)(?= +[#>:*]|$)/g;
const wildcardsRegExp = /(?:^| )\*(.+?)(?= +[#>:*]|$)/g;

export interface ParsedInputResult {
	name: string;
	desc: string[];
	url: string[];
	tags: string[];
	wildcard: string[];
}

// From: https://stackoverflow.com/a/54326240/3369753
const execMulti = (str: string, r: RegExp) => {
	let m: Nullable<RegExpExecArray>;
	const res: string[] = [];

	// eslint-disable-next-line no-cond-assign
	while (m = r.exec(str)) {
		res.push(m[1]);
	}

	return res;
};

/**
 * Parse input string into various matches.
 */
const parseSearchInput = (input: string): ParsedInputResult => ({
	name: (nameRegExp.exec(input) || [])[0] || '',
	desc: execMulti(input, descsRegExp),
	url: execMulti(input, urlsRegExp),
	tags: execMulti(input, tagsRegExp),
	wildcard: execMulti(input, wildcardsRegExp),
});

export default parseSearchInput;

