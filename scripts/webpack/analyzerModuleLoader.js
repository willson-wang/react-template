const loaderUtils = require('loader-utils')

module.exports = function(source) {
    const options = loaderUtils.getOptions(this)
    console.log('options', options)
    console.log(this.resourcePath)
    return source
}
