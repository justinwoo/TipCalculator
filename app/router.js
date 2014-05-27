var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.route('about', {
    path: '/about'
  });
});

export default Router;
