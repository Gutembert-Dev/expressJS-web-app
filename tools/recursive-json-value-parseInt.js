module.exports = function recursiveParseInt(json){
	var list = []
    return Object.entries(json).reduce((acc, [key, value]) => {
	    acc[key] = isNaN(+value) ? value : +value
	    if (typeof value === 'object'){
	    	for(var object of value) {
	    	    list.push(recursiveParseInt(object))
			}
			acc[key] = list
		}
	    return acc
    },{})
}