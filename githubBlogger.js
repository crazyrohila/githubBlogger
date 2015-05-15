Tasks = new Mongo.Collection("articles");

if (Meteor.isClient) {
  Template.body.helpers({
    articles: function () {
      return Tasks.find({});
    }
  });

  Template.select.helpers({
    tags: [
      { option: "Drupal" },
      { option: "Meteor" },
      { option: "Angular" }
    ]
  });

  Template.body.events({
    "submit .add-article": function (event) {
      // This function is called when the new task form is submitted

      var title = event.target.title.value;
      var body = event.target.body.value;
      var tag = event.target.category.value;
      var author = event.target.author.value;

      Tasks.insert({
        title: title,
        body: body,
        author: author,
        categary: tag,
        date: new Date()
      });

      // Reload the page
      window.location.reload();
      // Clear form
      // for (var i = event.target.elements.length - 1; i >= 0; i--) {
      //   if (event.target.elements[i].name = "submit") {
      //     return;
      //   }
      //   event.target.elements[i].value = "";
      // };
      // event.target.text.value = "";

      // Prevent default form submit
      return false;
    },
    "click .remove": function(event) {
      Tasks.remove(this._id);
    }
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
    // code to run on server at startup
  });
}
