# fastn-virtual-component

fastn components for rendering dom-lite nodes

## Usage

```js
var fastn = require('fastn')({
	_generic: require('fastn-virtual-component/virtualGenericComponent'),
    text: require('fastn-virtual-component/virtualTextComponent')
	templater: require('fastn-virtual-component/virtualTemplaterComponent')
});

var divComponent = fastn('div', 'bar');

divComponent.render();

divComponent.element.outerHTML; // -> '<div>bar</div>'
```