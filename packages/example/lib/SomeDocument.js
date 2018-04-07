"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _reactfireData = require("@parti/reactfire-data");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SomeDocument = function (_React$PureComponent) {
  _inherits(SomeDocument, _React$PureComponent);

  function SomeDocument(props) {
    _classCallCheck(this, SomeDocument);

    return _possibleConstructorReturn(this, (SomeDocument.__proto__ || Object.getPrototypeOf(SomeDocument)).call(this, props));
  }

  _createClass(SomeDocument, [{
    key: "render",
    value: function render() {
      return React.createElement(
        _reactfireData.FirebaseDocumentContainer,
        {
          path: "/test/sample",
          transform: function transform(index, data) {
            return { id: index, value: data };
          }
        },
        {
          default: function _default() {
            return "default view";
          },
          loading: function loading() {
            return "loading...";
          },
          render: function render(doc) {
            return "value: " + JSON.stringify(doc);
          }
        }
      );
    }
  }]);

  return SomeDocument;
}(React.PureComponent);

SomeDocument.defaultProps = {};
exports.default = SomeDocument;