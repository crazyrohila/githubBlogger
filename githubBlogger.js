Posts = new Mongo.Collection("articles");

if (Meteor.isClient) {
  Template.body.helpers({
    articles: function () {
      return Posts.find({});
    }
  });

  Template.article.helpers({
    userIsAuthor: function () {
      if(this.author_id == Meteor.userId()) {
        return true;
      }
      return false;
    }
  });

  Template.select.helpers({
    tags: [
      { option: "Drupal" },
      { option: "Meteor" },
      { option: "Angular" }
    ]
  });
console.log(Meteor);
  Template.body.events({
    "submit .add-article": function (event) {
      if (!Meteor.userId()) {
        throw new Meteor.Error("Please login first.");
      }
      else {
        var title = event.target.title.value;
        var body = event.target.body.value;
        var tag = event.target.category.value;
        var author = Meteor.user().username;

        Posts.insert({
          title: title,
          body: body,
          author: author,
          categary: tag,
          date: new Date(),
          author_id: Meteor.userId()
        });

        // Reload the page
        window.location.reload();
      }

      return false;
    },
    "click .remove": function(event) {
      if (!Meteor.userId()) {
        throw new Meteor.Error("Don't be a jerk.");
      }
      else {
        Posts.remove(this._id);
      }
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  // Template.article.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Posts._ensureIndex({
        title: 'text',
        body: 'text',
        category: 'text',
        author: 'text'
    }, {
        name: 'article_search'
    });
  });
}
