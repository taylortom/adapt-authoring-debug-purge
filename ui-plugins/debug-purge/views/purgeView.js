// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require){
  var Origin = require('core/origin');
  var OriginView = require('core/views/originView');

  var PurgeView = OriginView.extend({
    tagName: 'div',
    className: 'purge',
    events: {
      'click button.purge': 'onPurgeClicked'
    },

    onPurgeClicked: function(e) {
      e.preventDefault();
      Origin.Notify.confirm({
        type: 'warning',
        title: 'Purge content',
        html: 'This will permanently remove all content data on this site.',
        destructive: true,
        callback: async data => {
          if(!data.isConfirmed) {
            return;
          }
          try {
            await $.post('api/content/purge');
            Origin.Notify.alert({ type: 'success', text: 'Content purged' });
          } catch(e) {
            Origin.Notify.alert({ type: 'error', text: e.responseJSON.message });
          }
        }
      });
    }
  }, {
    template: 'purge'
  });

  return PurgeView;
});
