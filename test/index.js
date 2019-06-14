var test = require('tape');
var initFastn = require('fastn');
var virtualGenericComponent = require('../virtualGenericComponent');
var virtualTextComponent = require('../virtualTextComponent');

test('render div outerHTML', function(t){
	t.plan(1);

	var fastn = initFastn({
		_generic: virtualGenericComponent
	});

	var divComponent = fastn('div');

	divComponent.render();

	t.equal(divComponent.element.outerHTML, '<div></div>');
});

test('render div with class', function(t){
	t.plan(1);

	var fastn = initFastn({
		_generic: virtualGenericComponent
	});

	var divComponent = fastn('div', { class: 'foo' });

	divComponent.render();

	t.equal(divComponent.element.outerHTML, '<div class="foo"></div>');
});

test('render div with content', function(t){
	t.plan(1);

	var fastn = initFastn({
		_generic: virtualGenericComponent,
		text: virtualTextComponent
	});

	var divComponent = fastn('div', 'bar');

	divComponent.render();

	t.equal(divComponent.element.outerHTML, '<div>bar</div>');
});

test('render div with bound', function(t){
	t.plan(1);

	var fastn = initFastn({
		_generic: virtualGenericComponent,
		text: virtualTextComponent
	});

	var divComponent = fastn('div', fastn.binding('value'))
		.attach({
			value: 'baz'
		});

	divComponent.render();

	t.equal(divComponent.element.outerHTML, '<div>baz</div>');
});

test('render div with styles', function(t){
	t.plan(1);

	var fastn = initFastn({
		_generic: virtualGenericComponent,
		text: virtualTextComponent
	});

	var divComponent = fastn('div', {
		style: {
			'border-color': 'red'
		}
	});

	divComponent.render();

	t.equal(divComponent.element.outerHTML, '<div style="border-color: red"></div>');
});

test('render complex UI', function(t){
	t.plan(1);

	var fastn = initFastn({
		_generic: virtualGenericComponent,
		text: virtualTextComponent,
		list: require('fastn/listComponent'),
		templater: require('fastn/templaterComponent')
	});

	var data = {};

	var divComponent = fastn('ul:list', {
		items: fastn.binding('lazyData|*'),
		template: () => fastn('li',
			fastn('span', fastn.binding('item.name')),
			fastn('span', fastn.binding('item.label'))
		)
	});

	divComponent.attach(data);

	setTimeout(function(){
		fastn.Model.set(data, 'lazyData', [
			{ name: 'foo', label: 'bar' }
		]);

		divComponent.render();

		t.equal(divComponent.element.outerHTML, '<ul><li><span>foo</span><span>bar</span></li></ul>');

	}, 100);
});