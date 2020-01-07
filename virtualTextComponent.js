var virtualDocument = require("dom-lite").document;
var textComponent = require("fastn/textComponent");

function virtualTextComponent(fastn, component, type, settings, children){
    textComponent(fastn, component, type, settings, children);
    component.createTextNode = function(text){
        var textNode = virtualDocument.createTextNode(text);
        textNode.addEventListener = () => {};
        textNode.removeEventListener = () => {};
        return textNode
    };
    return component;
};

module.exports = virtualTextComponent;