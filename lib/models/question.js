// Generated by CoffeeScript 1.4.0
(function() {
  var Question,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Footnotes.Models.Question = Question = (function(_super) {

    __extends(Question, _super);

    function Question() {
      return Question.__super__.constructor.apply(this, arguments);
    }

    Question.prototype.initialize = function() {
      var raw;
      raw = this.get('children');
      this.set('children', new Footnotes.Collections.Questions(raw, [
        {
          parent: this
        }
      ]));
      return this.get('children').trigger('reset');
    };

    Question.prototype.events = {
      'error': 'alert'
    };

    Question.prototype.urlRoot = '/question_notes';

    Question.prototype.parse = function(response) {
      response.children = new Footnotes.Collections.Questions(response.children);
      return response;
    };

    return Question;

  })(Backbone.Model);

}).call(this);