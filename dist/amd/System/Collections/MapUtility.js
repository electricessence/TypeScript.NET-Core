define(["require","exports"],function(r,n){"use strict";function e(r,n){var e=r||{};for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t]);return e}function t(r,n){var e=r||{};for(var t in n)n.hasOwnProperty(t)&&!e.hasOwnProperty(t)&&(e[t]=n[t]);return e}function o(r){return e({},r)}function i(r,n){return e(o(r),n)}function u(r,n){for(var e in r)n.hasOwnProperty(e)||delete r[e]}n.apply=e,n.ensure=t,n.copy=o,n.merge=i,n.trim=u});
//# sourceMappingURL=MapUtility.js.map