TestCase("StringMatchTest", {
    existsNodeName:"milk",
    notExistsNodeName:"meat",
    cowMilk:"cow milk",
    "testEmptySearch":function () {
        assertNotNull("str".match("s"));
        assertNotNull("str".match("st"));
        assertNotNull("str".match("str"));
    },
    "testEmptySearch2":function () {
        assertNotNull("(str)".match("\\("));
        assertNotNull("(str)".match("\\(s"));
        assertNotNull("(str)".match("\\(st"));
        assertNotNull("(str)".match("\\(str"));
        assertNotNull("(str)".match("\\(str\\)"));
        assertNotNull("(str)".match("(str)"));
    },
    "testEmptySearch3":function () {
        function escapeSymbols(stringToConvert) {
            var str = stringToConvert.replace("\\", "\\\\").
                replace("(", "\\(").
                replace(")", "\\)").
                replace("[", "\\[").
                replace("]", "\\]").
                replace("{", "\\{").
                replace("}", "\\}").
                replace("?", "\\?").
                replace(".", "\\.").
                replace("$", "\\$").
                replace("+", "\\+").
                replace("*", "\\*").
                replace("^", "\\^");
            return str;
        }

        String.prototype.match = function (regExp, secondTime) {
            var _match = String.prototype.match;
            var escaped = escapeSymbols(regExp);
            return _match(escaped);
        }

        assertNotNull("a (str)".match("a"));
        assertNotNull("a (str)".match("a "));
        assertNotNull("a (str)".match("a ("));
        assertNotNull("a (str)".match("a (s"));
        assertNotNull("a (str)".match("a (st"));
        assertNotNull("a (str)".match("a (str"));
        assertNotNull("a (str)".match("a (str)"));
        assertNotNull("a (str)".match("a (str)"));
    }

});