TestCase("GraphTest", {
    existsNodeName:"milk",
    notExistsNodeName:"meat",
    cowMilk:"cow milk",
    "testEmptySearch":function () {
        var graph = new Graph();
        assertNotUndefined(graph.search);
        assertFunction(graph.search);
        assertException(function () {
            graph.search();
        }, new NodeNotFoundException().name);
    },
    "testSearchRoot":function () {
        var graph = new Graph();
        assertException(function () {
            graph.search("mainObjectInTheMatrixWorld")
        }, new NodeNotFoundException().name);
    },
    "testAddNodeIsFunction":function () {
        assertNotUndefined(Graph.prototype.addNode);
        assertFunction(Graph.prototype.addNode);
    },

    "testSearchExistsRootNode":function () {
        var graph = new Graph();
        graph.addNode(this.existsNodeName);
        var node = graph.search(this.existsNodeName);
        assertNotUndefined(node);
        assertEquals(node.getName(), this.existsNodeName);
    },
    "testSearchNotExistsNode":function () {
        var graph = new Graph();
        assertException(function () {
            graph.search(this.notExistsNodeName)
        }, new NodeNotFoundException().name);
    },
    "testSearchExistsNode":function () {
        var graph = new Graph();
        graph.addNode(this.existsNodeName);
        graph.addNode(this.existsNodeName, this.cowMilk);
        var node = graph.search(this.cowMilk);
        assertNotUndefined(node);
        assertEquals(node.getName(), this.cowMilk);
    },
    "testPartialSearchOnExistsNode":function () {
        var graph = new Graph();
        graph.addNode(this.existsNodeName);
        graph.addNode(this.existsNodeName, this.cowMilk);
        var node = graph.search("m");
        assertNotUndefined(node);
        assertArray(node);

        var dict = [this.existsNodeName, this.cowMilk];
        (function () {
            for (var i in dict) {
                for (var j in node) {
                    var result = false;
                    if (dict[i] === node[j].getName()) {
                        result = true;
                        break;
                    }
                }
                assertTrue("expected : " + dict[i] + ", but was : " + node[j].getName(), result);
            }
        })();
    },
    "testSearchWithMultipleResult":function () {
        var graph = new Graph();
        graph.addNode("milk");
        graph.addNode("milk", "water");
        graph.addNode("water", "water1");
        graph.addNode("water", "water2");
        graph.addNode("water", "water3");
        graph.addNode("water", "water4");
        graph.addNode("milk", "sugar");
        graph.addNode("milk", "coc");
        graph.addNode("milk", "mcoc");

        var node = graph.search("a");
        assertNotUndefined(node);
        assertArray(node);

        var dict = ["water", "water1", "water2", "water3", "water4"];
        (function () {
            for (var i in dict) {
                for (var j in node) {
                    var result = false;
                    if (dict[i] === node[j].getName()) {
                        result = true;
                        break;
                    }
                }
                assertTrue("expected : " + dict[i] + ", but was : " + node[j].getName(), result);
            }
        })();
    },
    "testSearchWithOneResultShouldReturnArray":function () {
        var graph = new Graph();
        graph.addNode("milk");
        graph.addNode("milk", "water");
        graph.addNode("water", "water1");
        graph.addNode("water", "water2");
        graph.addNode("water", "water3");
        graph.addNode("water", "water4");
        graph.addNode("milk", "sugar9");
        graph.addNode("milk", "coc");
        graph.addNode("milk", "mcoc");

        var node = graph.search("9");
        assertNotUndefined(node);
        assertArray(node);

        var dict = ["sugar9"];
        (function () {
            for (var i in dict) {
                for (var j in node) {
                    var result = false;
                    if (dict[i] === node[j].getName()) {
                        result = true;
                        break;
                    }
                }
                assertTrue("expected : " + dict[i] + ", but was : " + node[j].getName(), result);
            }
        })();
    }

})
