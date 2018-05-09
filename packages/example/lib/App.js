"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

require("./App.css");

var _reactfireProvider = require("@parti/reactfire-provider");

var _reactfireAuth = require("@parti/reactfire-auth");

var _SomeDocument = require("./SomeDocument");

var _SomeDocument2 = _interopRequireDefault(_SomeDocument);

var _SomeCollection = require("./SomeCollection");

var _SomeCollection2 = _interopRequireDefault(_SomeCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        _reactfireProvider.FirebaseProvider,
        {
          apiKey: process.env.REACT_APP_FB_API_KEY || "",
          authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN || "",
          databaseURL: process.env.REACT_APP_FB_DATABASE_URL || "",
          projectId: process.env.REACT_APP_FB_PROJECT_ID || "",
          storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET || "",
          messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID || ""
        },
        React.createElement(
          "div",
          { className: "App" },
          React.createElement(
            "h1",
            null,
            "This is a user"
          ),
          React.createElement(
            _reactfireAuth.FirebaseUserContainer,
            null,
            {
              render: function render(user) {
                return JSON.stringify(user);
              }
            }
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            null,
            "This is a document"
          ),
          React.createElement(_SomeDocument2.default, null)
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            null,
            "Collection"
          ),
          React.createElement(_SomeCollection2.default, null)
        ),
        React.createElement(
          _reactfireProvider.FirebaseConsumer,
          null,
          function (app) {
            var q = app.firestore().collection("test");
            console.log(q);
            return null;
          }
        )
      );
    }
  }]);

  return App;
}(React.Component);

exports.default = App;