/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.gopongmsg = (function() {

    /**
     * Namespace gopongmsg.
     * @exports gopongmsg
     * @namespace
     */
    var gopongmsg = {};

    gopongmsg.Config = (function() {

        /**
         * Properties of a Config.
         * @memberof gopongmsg
         * @interface IConfig
         */

        /**
         * Constructs a new Config.
         * @memberof gopongmsg
         * @classdesc Represents a Config.
         * @implements IConfig
         * @constructor
         * @param {gopongmsg.IConfig=} [properties] Properties to set
         */
        function Config(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Config instance using the specified properties.
         * @function create
         * @memberof gopongmsg.Config
         * @static
         * @param {gopongmsg.IConfig=} [properties] Properties to set
         * @returns {gopongmsg.Config} Config instance
         */
        Config.create = function create(properties) {
            return new Config(properties);
        };

        /**
         * Encodes the specified Config message. Does not implicitly {@link gopongmsg.Config.verify|verify} messages.
         * @function encode
         * @memberof gopongmsg.Config
         * @static
         * @param {gopongmsg.IConfig} message Config message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Config.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Config message, length delimited. Does not implicitly {@link gopongmsg.Config.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gopongmsg.Config
         * @static
         * @param {gopongmsg.IConfig} message Config message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Config.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Config message from the specified reader or buffer.
         * @function decode
         * @memberof gopongmsg.Config
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gopongmsg.Config} Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Config.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gopongmsg.Config();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Config message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gopongmsg.Config
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gopongmsg.Config} Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Config.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Config message.
         * @function verify
         * @memberof gopongmsg.Config
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Config.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Config message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gopongmsg.Config
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gopongmsg.Config} Config
         */
        Config.fromObject = function fromObject(object) {
            if (object instanceof $root.gopongmsg.Config)
                return object;
            return new $root.gopongmsg.Config();
        };

        /**
         * Creates a plain object from a Config message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gopongmsg.Config
         * @static
         * @param {gopongmsg.Config} message Config
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Config.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Config to JSON.
         * @function toJSON
         * @memberof gopongmsg.Config
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Config.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * PaddleSide enum.
         * @name gopongmsg.Config.PaddleSide
         * @enum {string}
         * @property {number} SIDE_LEFT=0 SIDE_LEFT value
         * @property {number} SIDE_RIGHT=1 SIDE_RIGHT value
         */
        Config.PaddleSide = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "SIDE_LEFT"] = 0;
            values[valuesById[1] = "SIDE_RIGHT"] = 1;
            return values;
        })();

        return Config;
    })();

    gopongmsg.Input = (function() {

        /**
         * Properties of an Input.
         * @memberof gopongmsg
         * @interface IInput
         * @property {number|null} [movementAxis] Input movementAxis
         * @property {number|null} [durationSeconds] Input durationSeconds
         * @property {number|null} [inputIndex] Input inputIndex
         */

        /**
         * Constructs a new Input.
         * @memberof gopongmsg
         * @classdesc Represents an Input.
         * @implements IInput
         * @constructor
         * @param {gopongmsg.IInput=} [properties] Properties to set
         */
        function Input(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Input movementAxis.
         * @member {number} movementAxis
         * @memberof gopongmsg.Input
         * @instance
         */
        Input.prototype.movementAxis = 0;

        /**
         * Input durationSeconds.
         * @member {number} durationSeconds
         * @memberof gopongmsg.Input
         * @instance
         */
        Input.prototype.durationSeconds = 0;

        /**
         * Input inputIndex.
         * @member {number} inputIndex
         * @memberof gopongmsg.Input
         * @instance
         */
        Input.prototype.inputIndex = 0;

        /**
         * Creates a new Input instance using the specified properties.
         * @function create
         * @memberof gopongmsg.Input
         * @static
         * @param {gopongmsg.IInput=} [properties] Properties to set
         * @returns {gopongmsg.Input} Input instance
         */
        Input.create = function create(properties) {
            return new Input(properties);
        };

        /**
         * Encodes the specified Input message. Does not implicitly {@link gopongmsg.Input.verify|verify} messages.
         * @function encode
         * @memberof gopongmsg.Input
         * @static
         * @param {gopongmsg.IInput} message Input message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Input.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.movementAxis != null && message.hasOwnProperty("movementAxis"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.movementAxis);
            if (message.durationSeconds != null && message.hasOwnProperty("durationSeconds"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.durationSeconds);
            if (message.inputIndex != null && message.hasOwnProperty("inputIndex"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.inputIndex);
            return writer;
        };

        /**
         * Encodes the specified Input message, length delimited. Does not implicitly {@link gopongmsg.Input.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gopongmsg.Input
         * @static
         * @param {gopongmsg.IInput} message Input message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Input.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Input message from the specified reader or buffer.
         * @function decode
         * @memberof gopongmsg.Input
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gopongmsg.Input} Input
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Input.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gopongmsg.Input();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.movementAxis = reader.float();
                    break;
                case 2:
                    message.durationSeconds = reader.float();
                    break;
                case 3:
                    message.inputIndex = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Input message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gopongmsg.Input
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gopongmsg.Input} Input
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Input.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Input message.
         * @function verify
         * @memberof gopongmsg.Input
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Input.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.movementAxis != null && message.hasOwnProperty("movementAxis"))
                if (typeof message.movementAxis !== "number")
                    return "movementAxis: number expected";
            if (message.durationSeconds != null && message.hasOwnProperty("durationSeconds"))
                if (typeof message.durationSeconds !== "number")
                    return "durationSeconds: number expected";
            if (message.inputIndex != null && message.hasOwnProperty("inputIndex"))
                if (!$util.isInteger(message.inputIndex))
                    return "inputIndex: integer expected";
            return null;
        };

        /**
         * Creates an Input message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gopongmsg.Input
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gopongmsg.Input} Input
         */
        Input.fromObject = function fromObject(object) {
            if (object instanceof $root.gopongmsg.Input)
                return object;
            var message = new $root.gopongmsg.Input();
            if (object.movementAxis != null)
                message.movementAxis = Number(object.movementAxis);
            if (object.durationSeconds != null)
                message.durationSeconds = Number(object.durationSeconds);
            if (object.inputIndex != null)
                message.inputIndex = object.inputIndex >>> 0;
            return message;
        };

        /**
         * Creates a plain object from an Input message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gopongmsg.Input
         * @static
         * @param {gopongmsg.Input} message Input
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Input.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.movementAxis = 0;
                object.durationSeconds = 0;
                object.inputIndex = 0;
            }
            if (message.movementAxis != null && message.hasOwnProperty("movementAxis"))
                object.movementAxis = options.json && !isFinite(message.movementAxis) ? String(message.movementAxis) : message.movementAxis;
            if (message.durationSeconds != null && message.hasOwnProperty("durationSeconds"))
                object.durationSeconds = options.json && !isFinite(message.durationSeconds) ? String(message.durationSeconds) : message.durationSeconds;
            if (message.inputIndex != null && message.hasOwnProperty("inputIndex"))
                object.inputIndex = message.inputIndex;
            return object;
        };

        /**
         * Converts this Input to JSON.
         * @function toJSON
         * @memberof gopongmsg.Input
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Input.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Input;
    })();

    return gopongmsg;
})();

module.exports = $root;
