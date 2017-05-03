var Rebase = require('re-base');
var config = {
  apiKey: "AIzaSyAm_FmmDoWzTJe5z1kmxiiK5eAdlyNWO94",
  authDomain: "friendlychat-1805d.firebaseapp.com",
  databaseURL: "https://friendlychat-1805d.firebaseio.com",
  projectId: "friendlychat-1805d",
  storageBucket: "friendlychat-1805d.appspot.com",
  messagingSenderId: "950106372629"
};

var base = Rebase.createClass(config);

export default base;
