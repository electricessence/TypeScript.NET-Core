(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "../Types", "../Collections/LinkedNodeList", "../Collections/Queue", "../Disposable/ObjectPool", "../Environment"], function (require, exports) {
    "use strict";
    var Types_1 = require("../Types");
    var LinkedNodeList_1 = require("../Collections/LinkedNodeList");
    var Queue_1 = require("../Collections/Queue");
    var ObjectPool_1 = require("../Disposable/ObjectPool");
    var Environment_1 = require("../Environment");
    var requestTick;
    var flushing = false;
    function flush() {
        var entry;
        while (entry = immediateQueue.first) {
            var task = entry.task, domain = entry.domain, context_1 = entry.context, args = entry.args;
            entry.canceller();
            if (domain)
                domain.enter();
            runSingle(task, domain, context_1, args);
        }
        while (laterQueue.tryDequeue(function (task) {
            runSingle(task);
        })) { }
        flushing = false;
    }
    var immediateQueue = new LinkedNodeList_1.LinkedNodeList();
    var laterQueue = new Queue_1.Queue();
    var entryPool = new ObjectPool_1.ObjectPool(40, function () { return ({}); }, function (o) {
        o.task = null;
        o.domain = null;
        o.context = null;
        if (o.args)
            o.args.length = 0;
        o.args = null;
        o.canceller = null;
    });
    function runSingle(task, domain, context, params) {
        try {
            task.apply(context, params);
        }
        catch (e) {
            if (Environment_1.isNodeJS) {
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }
                throw e;
            }
            else {
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }
        if (domain) {
            domain.exit();
        }
    }
    function requestFlush() {
        if (!flushing) {
            flushing = true;
            requestTick();
        }
    }
    function deferImmediate(task, context, args) {
        var entry = entryPool.take();
        entry.task = task;
        entry.domain = Environment_1.isNodeJS && process['domain'];
        entry.context = context;
        entry.args = args && args.slice();
        entry.canceller = function () {
            if (!entry)
                return false;
            var r = Boolean(immediateQueue.removeNode(entry));
            entryPool.add(entry);
            return r;
        };
        immediateQueue.addNode(entry);
        requestFlush();
        return {
            cancel: entry.canceller,
            dispose: function () { entry && entry.canceller(); }
        };
    }
    exports.deferImmediate = deferImmediate;
    function runAfterDeferred(task) {
        laterQueue.enqueue(task);
        requestFlush();
    }
    exports.runAfterDeferred = runAfterDeferred;
    if (Environment_1.isNodeJS) {
        requestTick = function () {
            process.nextTick(flush);
        };
    }
    else if (typeof setImmediate === Types_1.Type.FUNCTION) {
        if (typeof window !== Types_1.Type.UNDEFINED) {
            requestTick = setImmediate.bind(window, flush);
        }
        else {
            requestTick = function () {
                setImmediate(flush);
            };
        }
    }
    else if (typeof MessageChannel !== Types_1.Type.UNDEFINED) {
        var channel_1 = new MessageChannel();
        channel_1.port1.onmessage = function () {
            requestTick = requestPortTick_1;
            channel_1.port1.onmessage = flush;
            flush();
        };
        var requestPortTick_1 = function () {
            channel_1.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick_1();
        };
    }
    else {
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = deferImmediate;
});
//# sourceMappingURL=deferImmediate.js.map