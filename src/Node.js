/**
 * Created with JetBrains WebStorm.
 * User: artem
 * Date: 9/13/12
 * Time: 8:01 AM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

function Node(name) {
    this.name = name;
    this.childs = [];
    this.parents = [];
}

Node.prototype.setName = function (name) {
    this.name = name;
};

Node.prototype.getName = function () {
    return this.name;
};

Node.prototype.addChild = function (child) {
    var self = this;
    var realChild;
    if (child instanceof String) {
        realChild = new Node(parent);
    } else if (child instanceof Node) {
        realChild = child;
    } else {
        realChild = new Node(child.toString());
    }
    realChild.parents.push(self);
    self.childs.push(realChild);
};

Node.prototype.getChildNames = function () {
    var self = this;
    return (function () {
        var result = [];
        for (var i in self.childs) {
            result.push(self.childs[i].name);
        }
        return result;
    })();
};

Node.prototype.getParentNames = function () {
    var self = this;
    return (function () {
        var result = [];
        for (var i in self.parents) {
            result.push(self.parents[i].name);
        }
        return result;
    })();
};

Node.prototype.search = function (name) {
    console.log("node search '" + name + "'");
    var result = new Array();
    for (var j in this.childs) {
        if (this.childs[j].getName() && this.childs[j].getName().match(name)) {
            result.push(this.childs[j]);
            if (this.childs[j].getName() === name) {
                return this.childs[j];
            }
        }
    }

    for (var i in this.childs) {
        var searchResult = this.childs[i].search(name);
        if (searchResult instanceof Array) {

            for (var k in searchResult) {
                result.push(searchResult[k]);
            }
        } else {
            return searchResult;
        }
    }

    return result;
};

Node.prototype.removeNode = function () {
    this.parents[0].removeChild(this.name);
    this.parents = new Array();
}

Node.prototype.removeChild = function (name) {
    var self = this;
    (function () {
        var child = self.childs;
        for (var i in child) {
            if (child[i].getName() === name) {
                console.log(self.childs.splice(i, 1).length);
                break;
            }
        }
    })();
}
