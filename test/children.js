/**
 * Test dependencies.
 */

var tape = require('tape')
var vomit = require('..')
var promise = require('promises-a');


tape('should interpolate string', (test) => {
  test.plan(1)
  var label = 'hello'
  var btn = vomit`<button>${label}</button>`
  test.equal(btn.outerHTML, '<button>hello</button>')
})


tape('should interpolate element', (test) => {
  test.plan(1)
  var btn = vomit`<button>hello</button>`
  var section = vomit`<section>${btn}</section>`
  test.equal(section.outerHTML, '<section><button>hello</button></section>')
})


tape('should interpolate promise', (test) => {
	test.plan(1)
	var value = async('hello world')
	var btn = vomit`<button>${value} and others</button>`
	value.then(() => test.equal(btn.outerHTML, '<button>hello world and others</button>'))
})



/**
 * Return value after 500ms using promises.
 * 
 * @param  {Any} value
 * @return {Promise}
 * @api private
 */

function async(value) {
  var def = promise()
  setTimeout(function() {
	def.fulfill(value)
  }, 500)
  return def.promise
}