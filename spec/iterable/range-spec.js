"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var test = require("tape");
var range_1 = require("../../dist/cjs/iterable/range");
test('range produces correct sequence', function (t) {
    var rangeSequence = range_1.range(1, 100);
    var expected = 0;
    try {
        for (var rangeSequence_1 = __values(rangeSequence), rangeSequence_1_1 = rangeSequence_1.next(); !rangeSequence_1_1.done; rangeSequence_1_1 = rangeSequence_1.next()) {
            var item = rangeSequence_1_1.value;
            expected++;
            t.equal(expected, item);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (rangeSequence_1_1 && !rangeSequence_1_1.done && (_a = rangeSequence_1.return)) _a.call(rangeSequence_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    t.equal(100, expected);
    t.end();
    var e_1, _a;
});
//# sourceMappingURL=range-spec.js.map