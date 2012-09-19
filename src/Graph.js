/**
 * Created with JetBrains WebStorm.
 * User: artem
 * Date: 9/13/12
 * Time: 10:17 AM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

function Graph() {
    this.root = new Node("mainObjectInTheMatrixWorld");
}

Graph.prototype.addNode = function (parent, name) {

    if (arguments.length < 1) {
        throw new ToFewParametersPassedAsArgument();
    }

    if (arguments.length == 1) {
        //adding root node
        this.root.addChild(parent);
    } else {
        var parentNode;
        if (parent instanceof String) {
            parentNode = this.root.search(parent);
        } else if (parent instanceof Node) {
            parentNode = this.root.search(parent.getName());
        } else {
            parentNode = this.root.search(parent.toString());
        }
        if (parentNode != null) {
            parentNode.addChild(name);
        } else {
            throw NodeNotFoundException()
        }
    }
};

Graph.prototype.search = function (name) {
    var result = this.root.search(name);
    if (!result || result == null || (result instanceof Array && result.length == 0)) {
        throw new NodeNotFoundException();
    } else {
        return result;
    }
}
