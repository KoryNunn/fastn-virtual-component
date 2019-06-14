var virtualDocument = require("dom-lite").document;
var textComponent = require("fastn/textComponent");

function virtualTextComponent(fastn, component, type, settings, children){
    textComponent(fastn, component, type, settings, children);
    component.createTextNode = function(text){
        return virtualDocument.createTextNode(text);
    };
    return component;
};

module.exports = virtualTextComponent;