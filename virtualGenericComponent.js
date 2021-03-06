var virtualDocument = require("dom-lite").document;
var virtualNode = require("dom-lite").Node;
var genericComponent = require("fastn/genericComponent");

module.exports = function(fastn, component, type, settings, children){
	component = genericComponent(fastn, component, type, settings, children);

    if(!component){
        return;
    }

    component.createElement = function(tagName){
	    if(tagName && tagName.constructor === virtualNode.constructor){
	        return tagName;
	    }
	    var element = virtualDocument.createElement(tagName);
        element.addEventListener = () => {};
        element.removeEventListener = () => {};
        return element;
	}

    return component;
};