module.exports = (function capitalize(){
    return function(str){
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
})()