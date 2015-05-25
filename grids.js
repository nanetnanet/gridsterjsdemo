var colors = ['red','blue','grey','green','yellow','brown','orange','purple'];
var gridster = null;

if (Meteor.isClient) {
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function (e) {
      Session.set('counter', Session.get('counter') + 1);
      var parent = $(e.target).parent('li');
      var color = parent[0].style.background;
      var x = parent.attr('data-sizex');
      var y = parent.attr('data-sizey');
      var template = Template.hello;
      var target = function(){return $('.xxx');}
      console.log(color+":"+x+":"+y);
      gridster.add_widget("<li data-row = '1' data-col = '1' style = 'background:"+color+"' class = 'xxx'></li>",x,y);
      Blaze.render(template,target()[0]);
      target().removeClass('xxx');
    }
  });
  Template.body.events({
     'dblclick .gridster li':function(e){
      var box=$(e.target);
      console.log(box);
      gridster.remove_widget(box);
    }
  });
  Template.body.onRendered(function(){
      gridster = $(".gridster ul").gridster().data('gridster');
      $(".gridster ul").gridster({
      widget_margins: [20, 10],
      widget_base_dimensions: [140, 140]
    }); 
  });

  Template.body.helpers({
    color:function(){
      return colors[r()];
    }
  });
}

function r(){return Math.floor(Math.random()*colors.length);}