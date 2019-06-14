var virtualDocument = require("dom-lite").document;
var virtualNode = require("dom-lite").Node;
var genericComponent = require("fastn/genericComponent");

module.exports = function(fastn, component, type, settings, children){
	genericComponent(fastn, component, type, settings, children);

    component.createElement = function(tagName){
	    if(tagName && tagName.constructor === virtualNode.constructor){
	        return tagName;
	    }
	    return virtualDocument.createElement(tagName);
	}

    return component;
};