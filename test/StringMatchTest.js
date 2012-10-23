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

        String.prototype.match = (function () {
            var _match = String.prototype.match;
            return function (regExp){
                var escaped = escapeSymbols(regExp);
                _match.call(this, escaped);
            }
        })();

        assertNotNull("a (str)".match("a"));
        assertNotNull("a (str)".match("a "));
        assertNotNull("a (str)".match("a ("));
        assertNotNull("a (str)".match("a (s"));
        assertNotNull("a (str)".match("a (st"));
        assertNotNull("a (str)".match("a (str"));
        assertNotNull("a (str)".match("a (str)"));
        assertNotNull("a (str)".match("a (str) "));
    }

});