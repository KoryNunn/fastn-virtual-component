var virtualDocument = require("dom-lite").document;
var virtualNode = require("dom-lite").Node;
var templaterComponent = require("fastn/templaterComponent");

module.exports = function(fastn, component, type, settings, children){
    settings.tagName = component._tagName || type;

    templaterComponent(fastn, component, type, settings, children);

    component.render = function(tagName){
        var element;
        component.emptyElement = virtualDocument.createTextNode('');
        if(component._currentComponent){
            component._currentComponent.render();
            element = component._currentComponent.element;
        }
        component.element = element || component.emptyElement;
        component.emit('render');
        return component;
    }

    return component;
};