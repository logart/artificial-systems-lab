TestCase("NodeTest", {
    name:"name",
    newName:"newName",
    "testOk":function () {
        assertNull(null);
    },
    "testAccesorsTypeForClass":function () {
        assertNotUndefined(Node.prototype.getName);
        assertFunction(Node.prototype.getName);
    },
    "testAccesorsTypeForObject":function () {
        var node = new Node(this.name);
        assertNotUndefined(node.getName);
        assertFunction(node.getName);
    },
    "testGetter":function () {
        var node = new Node(this.name);
        assertEquals(this.name, node.getName());
    },
    "testAccessors":function () {
        var node = new Node(this.name);
        node.setName(this.newName)
        assertEquals(this.newName, node.getName());
    }          ,
    "testAddChild": function(){
        var node = new Node(this.name);
        var child = new Node(this.newName);
        node.addChild(child);
        assertEquals(1, node.getChildNames().length);
        assertEquals(child.getName(), node.getChildNames()[0]);
    }  ,
    "testAddChildCountInternals": function(){
        var node = new Node(this.name);
        var child = new Node(this.newName);
        node.addChild(child);
        assertEquals(1, node.childs.length);
    },
    "testAddChildContentInternals": function(){
        var node = new Node(this.name);
        var child = new Node(this.newName);
        node.addChild(child);
        assertEquals(this.newName, node.childs[0].name);
    },
    "testCorrectParentSetting":function(){
        var node = new Node(this.name);
        var child = new Node(this.newName);
        node.addChild(child);
        assertEquals(this.name, child.getParentNames()[0]);
    }
})