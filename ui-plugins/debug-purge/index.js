// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require) {
  const Origin = require('core/origin');
  const PurgeView = require('./views/purgeView');

  Origin.on('debug:ready', () => {
    Origin.trigger(`debug:addView`, { 
      name: 'purge', 
      icon: 'bomb', 
      title: Origin.l10n.t('app.purgeframework'), 
      view: PurgeView
    })
  })
});
