var context = require.context('./src', true, /-test$/);
console.log('-----------', context.keys().forEach(context));

context.keys().forEach(context);
