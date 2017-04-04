(function(root, factory) {
    root.Ix = factory();
} (window || global || this, function() {
    return require('../dist/cjs/Ix');
}));