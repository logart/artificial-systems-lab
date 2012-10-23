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
    },
    "testSearchWithSpace":function () {
        var graph = new Graph();
        graph.addNode("milk");
        graph.addNode("milk", "water");
        graph.addNode("water", "wat er1");
        graph.addNode("water", "wate r2");
        graph.addNode("water", "wate r3");
        graph.addNode("water", "wate r4");
        graph.addNode("milk", "sugar 9");
        graph.addNode("milk", "coc");
        graph.addNode("milk", "mcoc");

        var node = graph.search("9");
        assertNotUndefined(node);
        assertArray(node);

        var dict = ["sugar 9"];
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
    "testSearchWithBrackets":function () {
        var graph = new Graph();
        graph.addNode("apple devices");
        graph.addNode("apple devices", "iphone");
        graph.addNode("apple devices", "ipad");
        graph.addNode("apple devices", "ipod");
        graph.addNode("apple devices", "mac");

        graph.addNode("iphone", "iphone classic");
        graph.addNode("iphone", "iphone 3");
        graph.addNode("iphone", "iphone 4");
        graph.addNode("iphone", "iphone 5");

        graph.addNode("ipad", "ipad classic");
        graph.addNode("ipad", "ipad 2");
        graph.addNode("ipad", "ipad 3");

        graph.addNode("ipod", "ipod classic");
        graph.addNode("ipod", "ipod hdd");
        graph.addNode("ipod", "ipod 4");
        graph.addNode("ipod", "ipod 5");

        graph.addNode("mac", "mac book");
        graph.addNode("mac", "mac mini");

        graph.addNode("iphone 3", "iphone 3 classic");
        graph.addNode("iphone 3", "iphone 3 retina");

        graph.addNode("iphone 4", "iphone 4 classic");
        graph.addNode("iphone 4", "iphone 4 s");

        graph.addNode("ipad 2", "ipad 2 classic");
        graph.addNode("ipad 2", "ipad 2 retina");

        graph.addNode("ipod classic", "ipod classic mini");
        graph.addNode("ipod classic", "ipod classic nano");
        graph.addNode("ipod classic", "ipod classic full");

        graph.addNode("ipod hdd", "ipod hdd mini");
        graph.addNode("ipod hdd", "ipod hdd nano");
        graph.addNode("ipod hdd", "ipod hdd full");

        graph.addNode("ipod 4", "ipod 4 mini");
        graph.addNode("ipod 4", "ipod 4 nano");
        graph.addNode("ipod 4", "ipod 4 full");

        graph.addNode("ipod 5", "ipod 5 mini");
        graph.addNode("ipod 5", "ipod 5 nano");
        graph.addNode("ipod 5", "ipod 5 full");

        graph.addNode("mac book", "mac book pro");
        graph.addNode("mac book", "mac book air");

        graph.addNode("mac book pro", "mac book pro 13");
        graph.addNode("mac book pro", "mac book pro 15");
        graph.addNode("mac book pro", "mac book pro 17");

        graph.addNode("mac book air", "mac book air 13");
        graph.addNode("mac book air", "mac book air 15");
        graph.addNode("mac book air", "mac book air 17");


        graph.addNode("mac mini", "mac mini $500");
        graph.addNode("mac mini", "mac mini $700");

        graph.addNode("mac book pro 13", "mac book pro 13 (X48UFOWJDHFN3RWEJH)");
        graph.addNode("mac book pro 13", "mac book pro 13 (X48UFOSDLKFJSDLKDS)");
        graph.addNode("mac book pro 13", "mac book pro 13 (X48UFOWSADHASKJDHA)");
        graph.addNode("mac book pro 13", "mac book pro 13 (X48UFOWJASRLDKSADK)");

        graph.addNode("mac book pro 15", "mac book pro 15 (X57JDOWJDHFN3RWEJH)");
        graph.addNode("mac book pro 15", "mac book pro 15 (X57JDOSDLKFJSDLKDS)");
        graph.addNode("mac book pro 15", "mac book pro 15 (X57JDOWSADHASKJDHA)");
        graph.addNode("mac book pro 15", "mac book pro 15 (X57JDOWJASRLDKSADK)");

        graph.addNode("mac book pro 17", "mac book pro 17 (X77SDHWJDHFN3RWEJH)");
        graph.addNode("mac book pro 17", "mac book pro 17 (X77SDHSDLKFJSDLKDS)");
        graph.addNode("mac book pro 17", "mac book pro 17 (X77SDHWSADHASKJDHA)");
        graph.addNode("mac book pro 17", "mac book pro 17 (X77SDHWJASRLDKSADK)");

        graph.addNode("mac book air 13", "mac book air 13 (A84SDLKFJWJDHFN3RWEJH)");
        graph.addNode("mac book air 13", "mac book air 13 (A84SDLKFJSDLKFJSDLKDS)");
        graph.addNode("mac book air 13", "mac book air 13 (A84SDLKFJWSADHASKJDHA)");
        graph.addNode("mac book air 13", "mac book air 13 (A84SDLKFJWJASRLDKSADK)");

        graph.addNode("mac book air 15", "mac book air 15 (A56SDLKFJ57DHFN3RWEJH)");
        graph.addNode("mac book air 15", "mac book air 15 (A56SDLKFJSDLKFJSDLKDS)");
        graph.addNode("mac book air 15", "mac book air 15 (A56SDLKFJWSADHASKJDHA)");
        graph.addNode("mac book air 15", "mac book air 15 (A56SDLKFJWJASRLDKSADK)");

        var node = graph.search("mac book pro 17 (X77SDHWJASRLDKSADK)");
        assertNotUndefined(node);
        assertArray(node);

        var dict = ["mac book pro 17 (X77SDHWJASRLDKSADK)"];
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
    "testRemoveNode":function () {
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

        var result = graph.removeNode("water");

        assertNotUndefined(result);
        assertTrue(result);

        var node = graph.search("milk");
        assertNotUndefined(node);
        assertFalse(node instanceof Array);
        assertFunction(node.getName);
        assertFunction(node.getChildNames);

        var childNames = node.getChildNames();
        (function () {
            for (var i in childNames) {
                var dict = ["sugar9", "coc", "mcoc"];
                for (var j in dict) {
                    var result = false;
                    if (dict[j] === childNames[i]) {
                        result = true;
                        break;
                    }
                }
                assertTrue("expected : " + childNames[i] + ", but was : " + dict[j], result);
            }
        })();
    }


})
