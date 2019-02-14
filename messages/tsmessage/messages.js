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

    gopongmsg.Client = (function() {

        /**
         * Properties of a Client.
         * @memberof gopongmsg
         * @interface IClient
         * @property {gopongmsg.Client.IInput|null} [input] Client input
         */

        /**
         * Constructs a new Client.
         * @memberof gopongmsg
         * @classdesc Represents a Client.
         * @implements IClient
         * @constructor
         * @param {gopongmsg.IClient=} [properties] Properties to set
         */
        function Client(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Client input.
         * @member {gopongmsg.Client.IInput|null|undefined} input
         * @memberof gopongmsg.Client
         * @instance
         */
        Client.prototype.input = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Client msg.
         * @member {"input"|undefined} msg
         * @memberof gopongmsg.Client
         * @instance
         */
        Object.defineProperty(Client.prototype, "msg", {
            get: $util.oneOfGetter($oneOfFields = ["input"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Client instance using the specified properties.
         * @function create
         * @memberof gopongmsg.Client
         * @static
         * @param {gopongmsg.IClient=} [properties] Properties to set
         * @returns {gopongmsg.Client} Client instance
         */
        Client.create = function create(properties) {
            return new Client(properties);
        };

        /**
         * Encodes the specified Client message. Does not implicitly {@link gopongmsg.Client.verify|verify} messages.
         * @function encode
         * @memberof gopongmsg.Client
         * @static
         * @param {gopongmsg.IClient} message Client message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Client.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.input != null && message.hasOwnProperty("input"))
                $root.gopongmsg.Client.Input.encode(message.input, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Client message, length delimited. Does not implicitly {@link gopongmsg.Client.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gopongmsg.Client
         * @static
         * @param {gopongmsg.IClient} message Client message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Client.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Client message from the specified reader or buffer.
         * @function decode
         * @memberof gopongmsg.Client
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gopongmsg.Client} Client
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Client.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gopongmsg.Client();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.input = $root.gopongmsg.Client.Input.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Client message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gopongmsg.Client
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gopongmsg.Client} Client
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Client.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Client message.
         * @function verify
         * @memberof gopongmsg.Client
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Client.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.input != null && message.hasOwnProperty("input")) {
                properties.msg = 1;
                {
                    var error = $root.gopongmsg.Client.Input.verify(message.input);
                    if (error)
                        return "input." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Client message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gopongmsg.Client
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gopongmsg.Client} Client
         */
        Client.fromObject = function fromObject(object) {
            if (object instanceof $root.gopongmsg.Client)
                return object;
            var message = new $root.gopongmsg.Client();
            if (object.input != null) {
                if (typeof object.input !== "object")
                    throw TypeError(".gopongmsg.Client.input: object expected");
                message.input = $root.gopongmsg.Client.Input.fromObject(object.input);
            }
            return message;
        };

        /**
         * Creates a plain object from a Client message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gopongmsg.Client
         * @static
         * @param {gopongmsg.Client} message Client
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Client.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.input != null && message.hasOwnProperty("input")) {
                object.input = $root.gopongmsg.Client.Input.toObject(message.input, options);
                if (options.oneofs)
                    object.msg = "input";
            }
            return object;
        };

        /**
         * Converts this Client to JSON.
         * @function toJSON
         * @memberof gopongmsg.Client
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Client.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        Client.Input = (function() {

            /**
             * Properties of an Input.
             * @memberof gopongmsg.Client
             * @interface IInput
             * @property {number|null} [movementAxis] Input movementAxis
             * @property {number|null} [durationSeconds] Input durationSeconds
             * @property {number|null} [inputIndex] Input inputIndex
             */

            /**
             * Constructs a new Input.
             * @memberof gopongmsg.Client
             * @classdesc Represents an Input.
             * @implements IInput
             * @constructor
             * @param {gopongmsg.Client.IInput=} [properties] Properties to set
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
             * @memberof gopongmsg.Client.Input
             * @instance
             */
            Input.prototype.movementAxis = 0;

            /**
             * Input durationSeconds.
             * @member {number} durationSeconds
             * @memberof gopongmsg.Client.Input
             * @instance
             */
            Input.prototype.durationSeconds = 0;

            /**
             * Input inputIndex.
             * @member {number} inputIndex
             * @memberof gopongmsg.Client.Input
             * @instance
             */
            Input.prototype.inputIndex = 0;

            /**
             * Creates a new Input instance using the specified properties.
             * @function create
             * @memberof gopongmsg.Client.Input
             * @static
             * @param {gopongmsg.Client.IInput=} [properties] Properties to set
             * @returns {gopongmsg.Client.Input} Input instance
             */
            Input.create = function create(properties) {
                return new Input(properties);
            };

            /**
             * Encodes the specified Input message. Does not implicitly {@link gopongmsg.Client.Input.verify|verify} messages.
             * @function encode
             * @memberof gopongmsg.Client.Input
             * @static
             * @param {gopongmsg.Client.IInput} message Input message or plain object to encode
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
             * Encodes the specified Input message, length delimited. Does not implicitly {@link gopongmsg.Client.Input.verify|verify} messages.
             * @function encodeDelimited
             * @memberof gopongmsg.Client.Input
             * @static
             * @param {gopongmsg.Client.IInput} message Input message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Input.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Input message from the specified reader or buffer.
             * @function decode
             * @memberof gopongmsg.Client.Input
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {gopongmsg.Client.Input} Input
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Input.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gopongmsg.Client.Input();
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
             * @memberof gopongmsg.Client.Input
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {gopongmsg.Client.Input} Input
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
             * @memberof gopongmsg.Client.Input
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
             * @memberof gopongmsg.Client.Input
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gopongmsg.Client.Input} Input
             */
            Input.fromObject = function fromObject(object) {
                if (object instanceof $root.gopongmsg.Client.Input)
                    return object;
                var message = new $root.gopongmsg.Client.Input();
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
             * @memberof gopongmsg.Client.Input
             * @static
             * @param {gopongmsg.Client.Input} message Input
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
             * @memberof gopongmsg.Client.Input
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Input.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Input;
        })();

        return Client;
    })();

    gopongmsg.Server = (function() {

        /**
         * Properties of a Server.
         * @memberof gopongmsg
         * @interface IServer
         * @property {gopongmsg.Server.IConfig|null} [config] Server config
         * @property {gopongmsg.Server.IState|null} [state] Server state
         */

        /**
         * Constructs a new Server.
         * @memberof gopongmsg
         * @classdesc Represents a Server.
         * @implements IServer
         * @constructor
         * @param {gopongmsg.IServer=} [properties] Properties to set
         */
        function Server(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Server config.
         * @member {gopongmsg.Server.IConfig|null|undefined} config
         * @memberof gopongmsg.Server
         * @instance
         */
        Server.prototype.config = null;

        /**
         * Server state.
         * @member {gopongmsg.Server.IState|null|undefined} state
         * @memberof gopongmsg.Server
         * @instance
         */
        Server.prototype.state = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Server msg.
         * @member {"config"|"state"|undefined} msg
         * @memberof gopongmsg.Server
         * @instance
         */
        Object.defineProperty(Server.prototype, "msg", {
            get: $util.oneOfGetter($oneOfFields = ["config", "state"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Server instance using the specified properties.
         * @function create
         * @memberof gopongmsg.Server
         * @static
         * @param {gopongmsg.IServer=} [properties] Properties to set
         * @returns {gopongmsg.Server} Server instance
         */
        Server.create = function create(properties) {
            return new Server(properties);
        };

        /**
         * Encodes the specified Server message. Does not implicitly {@link gopongmsg.Server.verify|verify} messages.
         * @function encode
         * @memberof gopongmsg.Server
         * @static
         * @param {gopongmsg.IServer} message Server message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Server.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.config != null && message.hasOwnProperty("config"))
                $root.gopongmsg.Server.Config.encode(message.config, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.state != null && message.hasOwnProperty("state"))
                $root.gopongmsg.Server.State.encode(message.state, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Server message, length delimited. Does not implicitly {@link gopongmsg.Server.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gopongmsg.Server
         * @static
         * @param {gopongmsg.IServer} message Server message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Server.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Server message from the specified reader or buffer.
         * @function decode
         * @memberof gopongmsg.Server
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gopongmsg.Server} Server
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Server.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gopongmsg.Server();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.config = $root.gopongmsg.Server.Config.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.state = $root.gopongmsg.Server.State.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Server message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gopongmsg.Server
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gopongmsg.Server} Server
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Server.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Server message.
         * @function verify
         * @memberof gopongmsg.Server
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Server.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.config != null && message.hasOwnProperty("config")) {
                properties.msg = 1;
                {
                    var error = $root.gopongmsg.Server.Config.verify(message.config);
                    if (error)
                        return "config." + error;
                }
            }
            if (message.state != null && message.hasOwnProperty("state")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    var error = $root.gopongmsg.Server.State.verify(message.state);
                    if (error)
                        return "state." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Server message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gopongmsg.Server
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gopongmsg.Server} Server
         */
        Server.fromObject = function fromObject(object) {
            if (object instanceof $root.gopongmsg.Server)
                return object;
            var message = new $root.gopongmsg.Server();
            if (object.config != null) {
                if (typeof object.config !== "object")
                    throw TypeError(".gopongmsg.Server.config: object expected");
                message.config = $root.gopongmsg.Server.Config.fromObject(object.config);
            }
            if (object.state != null) {
                if (typeof object.state !== "object")
                    throw TypeError(".gopongmsg.Server.state: object expected");
                message.state = $root.gopongmsg.Server.State.fromObject(object.state);
            }
            return message;
        };

        /**
         * Creates a plain object from a Server message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gopongmsg.Server
         * @static
         * @param {gopongmsg.Server} message Server
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Server.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.config != null && message.hasOwnProperty("config")) {
                object.config = $root.gopongmsg.Server.Config.toObject(message.config, options);
                if (options.oneofs)
                    object.msg = "config";
            }
            if (message.state != null && message.hasOwnProperty("state")) {
                object.state = $root.gopongmsg.Server.State.toObject(message.state, options);
                if (options.oneofs)
                    object.msg = "state";
            }
            return object;
        };

        /**
         * Converts this Server to JSON.
         * @function toJSON
         * @memberof gopongmsg.Server
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Server.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        Server.Config = (function() {

            /**
             * Properties of a Config.
             * @memberof gopongmsg.Server
             * @interface IConfig
             * @property {gopongmsg.Server.Config.PaddleSide|null} [side] Config side
             * @property {number|null} [paddleHeight] Config paddleHeight
             * @property {number|null} [paddleWidth] Config paddleWidth
             * @property {number|null} [ballRadius] Config ballRadius
             * @property {number|null} [maxPaddleSpeedPerSecond] Config maxPaddleSpeedPerSecond
             */

            /**
             * Constructs a new Config.
             * @memberof gopongmsg.Server
             * @classdesc Represents a Config.
             * @implements IConfig
             * @constructor
             * @param {gopongmsg.Server.IConfig=} [properties] Properties to set
             */
            function Config(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Config side.
             * @member {gopongmsg.Server.Config.PaddleSide} side
             * @memberof gopongmsg.Server.Config
             * @instance
             */
            Config.prototype.side = 0;

            /**
             * Config paddleHeight.
             * @member {number} paddleHeight
             * @memberof gopongmsg.Server.Config
             * @instance
             */
            Config.prototype.paddleHeight = 0;

            /**
             * Config paddleWidth.
             * @member {number} paddleWidth
             * @memberof gopongmsg.Server.Config
             * @instance
             */
            Config.prototype.paddleWidth = 0;

            /**
             * Config ballRadius.
             * @member {number} ballRadius
             * @memberof gopongmsg.Server.Config
             * @instance
             */
            Config.prototype.ballRadius = 0;

            /**
             * Config maxPaddleSpeedPerSecond.
             * @member {number} maxPaddleSpeedPerSecond
             * @memberof gopongmsg.Server.Config
             * @instance
             */
            Config.prototype.maxPaddleSpeedPerSecond = 0;

            /**
             * Creates a new Config instance using the specified properties.
             * @function create
             * @memberof gopongmsg.Server.Config
             * @static
             * @param {gopongmsg.Server.IConfig=} [properties] Properties to set
             * @returns {gopongmsg.Server.Config} Config instance
             */
            Config.create = function create(properties) {
                return new Config(properties);
            };

            /**
             * Encodes the specified Config message. Does not implicitly {@link gopongmsg.Server.Config.verify|verify} messages.
             * @function encode
             * @memberof gopongmsg.Server.Config
             * @static
             * @param {gopongmsg.Server.IConfig} message Config message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Config.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.side != null && message.hasOwnProperty("side"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.side);
                if (message.paddleHeight != null && message.hasOwnProperty("paddleHeight"))
                    writer.uint32(/* id 2, wireType 5 =*/21).float(message.paddleHeight);
                if (message.paddleWidth != null && message.hasOwnProperty("paddleWidth"))
                    writer.uint32(/* id 3, wireType 5 =*/29).float(message.paddleWidth);
                if (message.ballRadius != null && message.hasOwnProperty("ballRadius"))
                    writer.uint32(/* id 4, wireType 5 =*/37).float(message.ballRadius);
                if (message.maxPaddleSpeedPerSecond != null && message.hasOwnProperty("maxPaddleSpeedPerSecond"))
                    writer.uint32(/* id 5, wireType 5 =*/45).float(message.maxPaddleSpeedPerSecond);
                return writer;
            };

            /**
             * Encodes the specified Config message, length delimited. Does not implicitly {@link gopongmsg.Server.Config.verify|verify} messages.
             * @function encodeDelimited
             * @memberof gopongmsg.Server.Config
             * @static
             * @param {gopongmsg.Server.IConfig} message Config message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Config.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Config message from the specified reader or buffer.
             * @function decode
             * @memberof gopongmsg.Server.Config
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {gopongmsg.Server.Config} Config
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Config.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gopongmsg.Server.Config();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.side = reader.int32();
                        break;
                    case 2:
                        message.paddleHeight = reader.float();
                        break;
                    case 3:
                        message.paddleWidth = reader.float();
                        break;
                    case 4:
                        message.ballRadius = reader.float();
                        break;
                    case 5:
                        message.maxPaddleSpeedPerSecond = reader.float();
                        break;
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
             * @memberof gopongmsg.Server.Config
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {gopongmsg.Server.Config} Config
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
             * @memberof gopongmsg.Server.Config
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Config.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.side != null && message.hasOwnProperty("side"))
                    switch (message.side) {
                    default:
                        return "side: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.paddleHeight != null && message.hasOwnProperty("paddleHeight"))
                    if (typeof message.paddleHeight !== "number")
                        return "paddleHeight: number expected";
                if (message.paddleWidth != null && message.hasOwnProperty("paddleWidth"))
                    if (typeof message.paddleWidth !== "number")
                        return "paddleWidth: number expected";
                if (message.ballRadius != null && message.hasOwnProperty("ballRadius"))
                    if (typeof message.ballRadius !== "number")
                        return "ballRadius: number expected";
                if (message.maxPaddleSpeedPerSecond != null && message.hasOwnProperty("maxPaddleSpeedPerSecond"))
                    if (typeof message.maxPaddleSpeedPerSecond !== "number")
                        return "maxPaddleSpeedPerSecond: number expected";
                return null;
            };

            /**
             * Creates a Config message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gopongmsg.Server.Config
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gopongmsg.Server.Config} Config
             */
            Config.fromObject = function fromObject(object) {
                if (object instanceof $root.gopongmsg.Server.Config)
                    return object;
                var message = new $root.gopongmsg.Server.Config();
                switch (object.side) {
                case "SIDE_NULL":
                case 0:
                    message.side = 0;
                    break;
                case "SIDE_LEFT":
                case 1:
                    message.side = 1;
                    break;
                case "SIDE_RIGHT":
                case 2:
                    message.side = 2;
                    break;
                }
                if (object.paddleHeight != null)
                    message.paddleHeight = Number(object.paddleHeight);
                if (object.paddleWidth != null)
                    message.paddleWidth = Number(object.paddleWidth);
                if (object.ballRadius != null)
                    message.ballRadius = Number(object.ballRadius);
                if (object.maxPaddleSpeedPerSecond != null)
                    message.maxPaddleSpeedPerSecond = Number(object.maxPaddleSpeedPerSecond);
                return message;
            };

            /**
             * Creates a plain object from a Config message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gopongmsg.Server.Config
             * @static
             * @param {gopongmsg.Server.Config} message Config
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Config.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.side = options.enums === String ? "SIDE_NULL" : 0;
                    object.paddleHeight = 0;
                    object.paddleWidth = 0;
                    object.ballRadius = 0;
                    object.maxPaddleSpeedPerSecond = 0;
                }
                if (message.side != null && message.hasOwnProperty("side"))
                    object.side = options.enums === String ? $root.gopongmsg.Server.Config.PaddleSide[message.side] : message.side;
                if (message.paddleHeight != null && message.hasOwnProperty("paddleHeight"))
                    object.paddleHeight = options.json && !isFinite(message.paddleHeight) ? String(message.paddleHeight) : message.paddleHeight;
                if (message.paddleWidth != null && message.hasOwnProperty("paddleWidth"))
                    object.paddleWidth = options.json && !isFinite(message.paddleWidth) ? String(message.paddleWidth) : message.paddleWidth;
                if (message.ballRadius != null && message.hasOwnProperty("ballRadius"))
                    object.ballRadius = options.json && !isFinite(message.ballRadius) ? String(message.ballRadius) : message.ballRadius;
                if (message.maxPaddleSpeedPerSecond != null && message.hasOwnProperty("maxPaddleSpeedPerSecond"))
                    object.maxPaddleSpeedPerSecond = options.json && !isFinite(message.maxPaddleSpeedPerSecond) ? String(message.maxPaddleSpeedPerSecond) : message.maxPaddleSpeedPerSecond;
                return object;
            };

            /**
             * Converts this Config to JSON.
             * @function toJSON
             * @memberof gopongmsg.Server.Config
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Config.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * PaddleSide enum.
             * @name gopongmsg.Server.Config.PaddleSide
             * @enum {string}
             * @property {number} SIDE_NULL=0 SIDE_NULL value
             * @property {number} SIDE_LEFT=1 SIDE_LEFT value
             * @property {number} SIDE_RIGHT=2 SIDE_RIGHT value
             */
            Config.PaddleSide = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "SIDE_NULL"] = 0;
                values[valuesById[1] = "SIDE_LEFT"] = 1;
                values[valuesById[2] = "SIDE_RIGHT"] = 2;
                return values;
            })();

            return Config;
        })();

        Server.State = (function() {

            /**
             * Properties of a State.
             * @memberof gopongmsg.Server
             * @interface IState
             * @property {gopongmsg.Server.State.Type|null} [type] State type
             * @property {number|null} [lastInputIndex] State lastInputIndex
             * @property {gopongmsg.Server.State.IPlay|null} [play] State play
             * @property {gopongmsg.Server.State.IStart|null} [start] State start
             */

            /**
             * Constructs a new State.
             * @memberof gopongmsg.Server
             * @classdesc Represents a State.
             * @implements IState
             * @constructor
             * @param {gopongmsg.Server.IState=} [properties] Properties to set
             */
            function State(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * State type.
             * @member {gopongmsg.Server.State.Type} type
             * @memberof gopongmsg.Server.State
             * @instance
             */
            State.prototype.type = 0;

            /**
             * State lastInputIndex.
             * @member {number} lastInputIndex
             * @memberof gopongmsg.Server.State
             * @instance
             */
            State.prototype.lastInputIndex = 0;

            /**
             * State play.
             * @member {gopongmsg.Server.State.IPlay|null|undefined} play
             * @memberof gopongmsg.Server.State
             * @instance
             */
            State.prototype.play = null;

            /**
             * State start.
             * @member {gopongmsg.Server.State.IStart|null|undefined} start
             * @memberof gopongmsg.Server.State
             * @instance
             */
            State.prototype.start = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * State state.
             * @member {"play"|"start"|undefined} state
             * @memberof gopongmsg.Server.State
             * @instance
             */
            Object.defineProperty(State.prototype, "state", {
                get: $util.oneOfGetter($oneOfFields = ["play", "start"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new State instance using the specified properties.
             * @function create
             * @memberof gopongmsg.Server.State
             * @static
             * @param {gopongmsg.Server.IState=} [properties] Properties to set
             * @returns {gopongmsg.Server.State} State instance
             */
            State.create = function create(properties) {
                return new State(properties);
            };

            /**
             * Encodes the specified State message. Does not implicitly {@link gopongmsg.Server.State.verify|verify} messages.
             * @function encode
             * @memberof gopongmsg.Server.State
             * @static
             * @param {gopongmsg.Server.IState} message State message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            State.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                if (message.lastInputIndex != null && message.hasOwnProperty("lastInputIndex"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.lastInputIndex);
                if (message.play != null && message.hasOwnProperty("play"))
                    $root.gopongmsg.Server.State.Play.encode(message.play, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.start != null && message.hasOwnProperty("start"))
                    $root.gopongmsg.Server.State.Start.encode(message.start, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified State message, length delimited. Does not implicitly {@link gopongmsg.Server.State.verify|verify} messages.
             * @function encodeDelimited
             * @memberof gopongmsg.Server.State
             * @static
             * @param {gopongmsg.Server.IState} message State message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            State.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a State message from the specified reader or buffer.
             * @function decode
             * @memberof gopongmsg.Server.State
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {gopongmsg.Server.State} State
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            State.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gopongmsg.Server.State();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type = reader.int32();
                        break;
                    case 2:
                        message.lastInputIndex = reader.uint32();
                        break;
                    case 3:
                        message.play = $root.gopongmsg.Server.State.Play.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.start = $root.gopongmsg.Server.State.Start.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a State message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof gopongmsg.Server.State
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {gopongmsg.Server.State} State
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            State.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a State message.
             * @function verify
             * @memberof gopongmsg.Server.State
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            State.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.lastInputIndex != null && message.hasOwnProperty("lastInputIndex"))
                    if (!$util.isInteger(message.lastInputIndex))
                        return "lastInputIndex: integer expected";
                if (message.play != null && message.hasOwnProperty("play")) {
                    properties.state = 1;
                    {
                        var error = $root.gopongmsg.Server.State.Play.verify(message.play);
                        if (error)
                            return "play." + error;
                    }
                }
                if (message.start != null && message.hasOwnProperty("start")) {
                    if (properties.state === 1)
                        return "state: multiple values";
                    properties.state = 1;
                    {
                        var error = $root.gopongmsg.Server.State.Start.verify(message.start);
                        if (error)
                            return "start." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a State message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gopongmsg.Server.State
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gopongmsg.Server.State} State
             */
            State.fromObject = function fromObject(object) {
                if (object instanceof $root.gopongmsg.Server.State)
                    return object;
                var message = new $root.gopongmsg.Server.State();
                switch (object.type) {
                case "STATE_NULL":
                case 0:
                    message.type = 0;
                    break;
                case "STATE_PLAY":
                case 1:
                    message.type = 1;
                    break;
                case "STATE_START":
                case 2:
                    message.type = 2;
                    break;
                }
                if (object.lastInputIndex != null)
                    message.lastInputIndex = object.lastInputIndex >>> 0;
                if (object.play != null) {
                    if (typeof object.play !== "object")
                        throw TypeError(".gopongmsg.Server.State.play: object expected");
                    message.play = $root.gopongmsg.Server.State.Play.fromObject(object.play);
                }
                if (object.start != null) {
                    if (typeof object.start !== "object")
                        throw TypeError(".gopongmsg.Server.State.start: object expected");
                    message.start = $root.gopongmsg.Server.State.Start.fromObject(object.start);
                }
                return message;
            };

            /**
             * Creates a plain object from a State message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gopongmsg.Server.State
             * @static
             * @param {gopongmsg.Server.State} message State
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            State.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.type = options.enums === String ? "STATE_NULL" : 0;
                    object.lastInputIndex = 0;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.gopongmsg.Server.State.Type[message.type] : message.type;
                if (message.lastInputIndex != null && message.hasOwnProperty("lastInputIndex"))
                    object.lastInputIndex = message.lastInputIndex;
                if (message.play != null && message.hasOwnProperty("play")) {
                    object.play = $root.gopongmsg.Server.State.Play.toObject(message.play, options);
                    if (options.oneofs)
                        object.state = "play";
                }
                if (message.start != null && message.hasOwnProperty("start")) {
                    object.start = $root.gopongmsg.Server.State.Start.toObject(message.start, options);
                    if (options.oneofs)
                        object.state = "start";
                }
                return object;
            };

            /**
             * Converts this State to JSON.
             * @function toJSON
             * @memberof gopongmsg.Server.State
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            State.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Type enum.
             * @name gopongmsg.Server.State.Type
             * @enum {string}
             * @property {number} STATE_NULL=0 STATE_NULL value
             * @property {number} STATE_PLAY=1 STATE_PLAY value
             * @property {number} STATE_START=2 STATE_START value
             */
            State.Type = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "STATE_NULL"] = 0;
                values[valuesById[1] = "STATE_PLAY"] = 1;
                values[valuesById[2] = "STATE_START"] = 2;
                return values;
            })();

            State.Play = (function() {

                /**
                 * Properties of a Play.
                 * @memberof gopongmsg.Server.State
                 * @interface IPlay
                 * @property {gopongmsg.Server.State.Play.IPaddle|null} [paddleLeft] Play paddleLeft
                 * @property {gopongmsg.Server.State.Play.IPaddle|null} [paddleRight] Play paddleRight
                 * @property {gopongmsg.Server.State.Play.IBall|null} [ball] Play ball
                 */

                /**
                 * Constructs a new Play.
                 * @memberof gopongmsg.Server.State
                 * @classdesc Represents a Play.
                 * @implements IPlay
                 * @constructor
                 * @param {gopongmsg.Server.State.IPlay=} [properties] Properties to set
                 */
                function Play(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Play paddleLeft.
                 * @member {gopongmsg.Server.State.Play.IPaddle|null|undefined} paddleLeft
                 * @memberof gopongmsg.Server.State.Play
                 * @instance
                 */
                Play.prototype.paddleLeft = null;

                /**
                 * Play paddleRight.
                 * @member {gopongmsg.Server.State.Play.IPaddle|null|undefined} paddleRight
                 * @memberof gopongmsg.Server.State.Play
                 * @instance
                 */
                Play.prototype.paddleRight = null;

                /**
                 * Play ball.
                 * @member {gopongmsg.Server.State.Play.IBall|null|undefined} ball
                 * @memberof gopongmsg.Server.State.Play
                 * @instance
                 */
                Play.prototype.ball = null;

                /**
                 * Creates a new Play instance using the specified properties.
                 * @function create
                 * @memberof gopongmsg.Server.State.Play
                 * @static
                 * @param {gopongmsg.Server.State.IPlay=} [properties] Properties to set
                 * @returns {gopongmsg.Server.State.Play} Play instance
                 */
                Play.create = function create(properties) {
                    return new Play(properties);
                };

                /**
                 * Encodes the specified Play message. Does not implicitly {@link gopongmsg.Server.State.Play.verify|verify} messages.
                 * @function encode
                 * @memberof gopongmsg.Server.State.Play
                 * @static
                 * @param {gopongmsg.Server.State.IPlay} message Play message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Play.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.paddleLeft != null && message.hasOwnProperty("paddleLeft"))
                        $root.gopongmsg.Server.State.Play.Paddle.encode(message.paddleLeft, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.paddleRight != null && message.hasOwnProperty("paddleRight"))
                        $root.gopongmsg.Server.State.Play.Paddle.encode(message.paddleRight, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.ball != null && message.hasOwnProperty("ball"))
                        $root.gopongmsg.Server.State.Play.Ball.encode(message.ball, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Play message, length delimited. Does not implicitly {@link gopongmsg.Server.State.Play.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof gopongmsg.Server.State.Play
                 * @static
                 * @param {gopongmsg.Server.State.IPlay} message Play message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Play.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Play message from the specified reader or buffer.
                 * @function decode
                 * @memberof gopongmsg.Server.State.Play
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {gopongmsg.Server.State.Play} Play
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Play.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gopongmsg.Server.State.Play();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.paddleLeft = $root.gopongmsg.Server.State.Play.Paddle.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.paddleRight = $root.gopongmsg.Server.State.Play.Paddle.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.ball = $root.gopongmsg.Server.State.Play.Ball.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Play message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof gopongmsg.Server.State.Play
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {gopongmsg.Server.State.Play} Play
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Play.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Play message.
                 * @function verify
                 * @memberof gopongmsg.Server.State.Play
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Play.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.paddleLeft != null && message.hasOwnProperty("paddleLeft")) {
                        var error = $root.gopongmsg.Server.State.Play.Paddle.verify(message.paddleLeft);
                        if (error)
                            return "paddleLeft." + error;
                    }
                    if (message.paddleRight != null && message.hasOwnProperty("paddleRight")) {
                        var error = $root.gopongmsg.Server.State.Play.Paddle.verify(message.paddleRight);
                        if (error)
                            return "paddleRight." + error;
                    }
                    if (message.ball != null && message.hasOwnProperty("ball")) {
                        var error = $root.gopongmsg.Server.State.Play.Ball.verify(message.ball);
                        if (error)
                            return "ball." + error;
                    }
                    return null;
                };

                /**
                 * Creates a Play message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof gopongmsg.Server.State.Play
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {gopongmsg.Server.State.Play} Play
                 */
                Play.fromObject = function fromObject(object) {
                    if (object instanceof $root.gopongmsg.Server.State.Play)
                        return object;
                    var message = new $root.gopongmsg.Server.State.Play();
                    if (object.paddleLeft != null) {
                        if (typeof object.paddleLeft !== "object")
                            throw TypeError(".gopongmsg.Server.State.Play.paddleLeft: object expected");
                        message.paddleLeft = $root.gopongmsg.Server.State.Play.Paddle.fromObject(object.paddleLeft);
                    }
                    if (object.paddleRight != null) {
                        if (typeof object.paddleRight !== "object")
                            throw TypeError(".gopongmsg.Server.State.Play.paddleRight: object expected");
                        message.paddleRight = $root.gopongmsg.Server.State.Play.Paddle.fromObject(object.paddleRight);
                    }
                    if (object.ball != null) {
                        if (typeof object.ball !== "object")
                            throw TypeError(".gopongmsg.Server.State.Play.ball: object expected");
                        message.ball = $root.gopongmsg.Server.State.Play.Ball.fromObject(object.ball);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Play message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof gopongmsg.Server.State.Play
                 * @static
                 * @param {gopongmsg.Server.State.Play} message Play
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Play.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.paddleLeft = null;
                        object.paddleRight = null;
                        object.ball = null;
                    }
                    if (message.paddleLeft != null && message.hasOwnProperty("paddleLeft"))
                        object.paddleLeft = $root.gopongmsg.Server.State.Play.Paddle.toObject(message.paddleLeft, options);
                    if (message.paddleRight != null && message.hasOwnProperty("paddleRight"))
                        object.paddleRight = $root.gopongmsg.Server.State.Play.Paddle.toObject(message.paddleRight, options);
                    if (message.ball != null && message.hasOwnProperty("ball"))
                        object.ball = $root.gopongmsg.Server.State.Play.Ball.toObject(message.ball, options);
                    return object;
                };

                /**
                 * Converts this Play to JSON.
                 * @function toJSON
                 * @memberof gopongmsg.Server.State.Play
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Play.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                Play.Paddle = (function() {

                    /**
                     * Properties of a Paddle.
                     * @memberof gopongmsg.Server.State.Play
                     * @interface IPaddle
                     * @property {number|null} [center] Paddle center
                     */

                    /**
                     * Constructs a new Paddle.
                     * @memberof gopongmsg.Server.State.Play
                     * @classdesc Represents a Paddle.
                     * @implements IPaddle
                     * @constructor
                     * @param {gopongmsg.Server.State.Play.IPaddle=} [properties] Properties to set
                     */
                    function Paddle(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Paddle center.
                     * @member {number} center
                     * @memberof gopongmsg.Server.State.Play.Paddle
                     * @instance
                     */
                    Paddle.prototype.center = 0;

                    /**
                     * Creates a new Paddle instance using the specified properties.
                     * @function create
                     * @memberof gopongmsg.Server.State.Play.Paddle
                     * @static
                     * @param {gopongmsg.Server.State.Play.IPaddle=} [properties] Properties to set
                     * @returns {gopongmsg.Server.State.Play.Paddle} Paddle instance
                     */
                    Paddle.create = function create(properties) {
                        return new Paddle(properties);
                    };

                    /**
                     * Encodes the specified Paddle message. Does not implicitly {@link gopongmsg.Server.State.Play.Paddle.verify|verify} messages.
                     * @function encode
                     * @memberof gopongmsg.Server.State.Play.Paddle
                     * @static
                     * @param {gopongmsg.Server.State.Play.IPaddle} message Paddle message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Paddle.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.center != null && message.hasOwnProperty("center"))
                            writer.uint32(/* id 1, wireType 5 =*/13).float(message.center);
                        return writer;
                    };

                    /**
                     * Encodes the specified Paddle message, length delimited. Does not implicitly {@link gopongmsg.Server.State.Play.Paddle.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof gopongmsg.Server.State.Play.Paddle
                     * @static
                     * @param {gopongmsg.Server.State.Play.IPaddle} message Paddle message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Paddle.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Paddle message from the specified reader or buffer.
                     * @function decode
                     * @memberof gopongmsg.Server.State.Play.Paddle
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {gopongmsg.Server.State.Play.Paddle} Paddle
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Paddle.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gopongmsg.Server.State.Play.Paddle();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.center = reader.float();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Paddle message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof gopongmsg.Server.State.Play.Paddle
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {gopongmsg.Server.State.Play.Paddle} Paddle
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Paddle.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Paddle message.
                     * @function verify
                     * @memberof gopongmsg.Server.State.Play.Paddle
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Paddle.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.center != null && message.hasOwnProperty("center"))
                            if (typeof message.center !== "number")
                                return "center: number expected";
                        return null;
                    };

                    /**
                     * Creates a Paddle message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof gopongmsg.Server.State.Play.Paddle
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {gopongmsg.Server.State.Play.Paddle} Paddle
                     */
                    Paddle.fromObject = function fromObject(object) {
                        if (object instanceof $root.gopongmsg.Server.State.Play.Paddle)
                            return object;
                        var message = new $root.gopongmsg.Server.State.Play.Paddle();
                        if (object.center != null)
                            message.center = Number(object.center);
                        return message;
                    };

                    /**
                     * Creates a plain object from a Paddle message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof gopongmsg.Server.State.Play.Paddle
                     * @static
                     * @param {gopongmsg.Server.State.Play.Paddle} message Paddle
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Paddle.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.center = 0;
                        if (message.center != null && message.hasOwnProperty("center"))
                            object.center = options.json && !isFinite(message.center) ? String(message.center) : message.center;
                        return object;
                    };

                    /**
                     * Converts this Paddle to JSON.
                     * @function toJSON
                     * @memberof gopongmsg.Server.State.Play.Paddle
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Paddle.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Paddle;
                })();

                Play.Ball = (function() {

                    /**
                     * Properties of a Ball.
                     * @memberof gopongmsg.Server.State.Play
                     * @interface IBall
                     * @property {number|null} [centerX] Ball centerX
                     * @property {number|null} [centerY] Ball centerY
                     */

                    /**
                     * Constructs a new Ball.
                     * @memberof gopongmsg.Server.State.Play
                     * @classdesc Represents a Ball.
                     * @implements IBall
                     * @constructor
                     * @param {gopongmsg.Server.State.Play.IBall=} [properties] Properties to set
                     */
                    function Ball(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Ball centerX.
                     * @member {number} centerX
                     * @memberof gopongmsg.Server.State.Play.Ball
                     * @instance
                     */
                    Ball.prototype.centerX = 0;

                    /**
                     * Ball centerY.
                     * @member {number} centerY
                     * @memberof gopongmsg.Server.State.Play.Ball
                     * @instance
                     */
                    Ball.prototype.centerY = 0;

                    /**
                     * Creates a new Ball instance using the specified properties.
                     * @function create
                     * @memberof gopongmsg.Server.State.Play.Ball
                     * @static
                     * @param {gopongmsg.Server.State.Play.IBall=} [properties] Properties to set
                     * @returns {gopongmsg.Server.State.Play.Ball} Ball instance
                     */
                    Ball.create = function create(properties) {
                        return new Ball(properties);
                    };

                    /**
                     * Encodes the specified Ball message. Does not implicitly {@link gopongmsg.Server.State.Play.Ball.verify|verify} messages.
                     * @function encode
                     * @memberof gopongmsg.Server.State.Play.Ball
                     * @static
                     * @param {gopongmsg.Server.State.Play.IBall} message Ball message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Ball.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.centerX != null && message.hasOwnProperty("centerX"))
                            writer.uint32(/* id 1, wireType 5 =*/13).float(message.centerX);
                        if (message.centerY != null && message.hasOwnProperty("centerY"))
                            writer.uint32(/* id 2, wireType 5 =*/21).float(message.centerY);
                        return writer;
                    };

                    /**
                     * Encodes the specified Ball message, length delimited. Does not implicitly {@link gopongmsg.Server.State.Play.Ball.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof gopongmsg.Server.State.Play.Ball
                     * @static
                     * @param {gopongmsg.Server.State.Play.IBall} message Ball message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Ball.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Ball message from the specified reader or buffer.
                     * @function decode
                     * @memberof gopongmsg.Server.State.Play.Ball
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {gopongmsg.Server.State.Play.Ball} Ball
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Ball.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gopongmsg.Server.State.Play.Ball();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.centerX = reader.float();
                                break;
                            case 2:
                                message.centerY = reader.float();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Ball message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof gopongmsg.Server.State.Play.Ball
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {gopongmsg.Server.State.Play.Ball} Ball
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Ball.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Ball message.
                     * @function verify
                     * @memberof gopongmsg.Server.State.Play.Ball
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Ball.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.centerX != null && message.hasOwnProperty("centerX"))
                            if (typeof message.centerX !== "number")
                                return "centerX: number expected";
                        if (message.centerY != null && message.hasOwnProperty("centerY"))
                            if (typeof message.centerY !== "number")
                                return "centerY: number expected";
                        return null;
                    };

                    /**
                     * Creates a Ball message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof gopongmsg.Server.State.Play.Ball
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {gopongmsg.Server.State.Play.Ball} Ball
                     */
                    Ball.fromObject = function fromObject(object) {
                        if (object instanceof $root.gopongmsg.Server.State.Play.Ball)
                            return object;
                        var message = new $root.gopongmsg.Server.State.Play.Ball();
                        if (object.centerX != null)
                            message.centerX = Number(object.centerX);
                        if (object.centerY != null)
                            message.centerY = Number(object.centerY);
                        return message;
                    };

                    /**
                     * Creates a plain object from a Ball message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof gopongmsg.Server.State.Play.Ball
                     * @static
                     * @param {gopongmsg.Server.State.Play.Ball} message Ball
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Ball.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.centerX = 0;
                            object.centerY = 0;
                        }
                        if (message.centerX != null && message.hasOwnProperty("centerX"))
                            object.centerX = options.json && !isFinite(message.centerX) ? String(message.centerX) : message.centerX;
                        if (message.centerY != null && message.hasOwnProperty("centerY"))
                            object.centerY = options.json && !isFinite(message.centerY) ? String(message.centerY) : message.centerY;
                        return object;
                    };

                    /**
                     * Converts this Ball to JSON.
                     * @function toJSON
                     * @memberof gopongmsg.Server.State.Play.Ball
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Ball.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Ball;
                })();

                return Play;
            })();

            State.Start = (function() {

                /**
                 * Properties of a Start.
                 * @memberof gopongmsg.Server.State
                 * @interface IStart
                 * @property {number|null} [secondsRemaining] Start secondsRemaining
                 */

                /**
                 * Constructs a new Start.
                 * @memberof gopongmsg.Server.State
                 * @classdesc Represents a Start.
                 * @implements IStart
                 * @constructor
                 * @param {gopongmsg.Server.State.IStart=} [properties] Properties to set
                 */
                function Start(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Start secondsRemaining.
                 * @member {number} secondsRemaining
                 * @memberof gopongmsg.Server.State.Start
                 * @instance
                 */
                Start.prototype.secondsRemaining = 0;

                /**
                 * Creates a new Start instance using the specified properties.
                 * @function create
                 * @memberof gopongmsg.Server.State.Start
                 * @static
                 * @param {gopongmsg.Server.State.IStart=} [properties] Properties to set
                 * @returns {gopongmsg.Server.State.Start} Start instance
                 */
                Start.create = function create(properties) {
                    return new Start(properties);
                };

                /**
                 * Encodes the specified Start message. Does not implicitly {@link gopongmsg.Server.State.Start.verify|verify} messages.
                 * @function encode
                 * @memberof gopongmsg.Server.State.Start
                 * @static
                 * @param {gopongmsg.Server.State.IStart} message Start message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Start.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.secondsRemaining != null && message.hasOwnProperty("secondsRemaining"))
                        writer.uint32(/* id 1, wireType 5 =*/13).float(message.secondsRemaining);
                    return writer;
                };

                /**
                 * Encodes the specified Start message, length delimited. Does not implicitly {@link gopongmsg.Server.State.Start.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof gopongmsg.Server.State.Start
                 * @static
                 * @param {gopongmsg.Server.State.IStart} message Start message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Start.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Start message from the specified reader or buffer.
                 * @function decode
                 * @memberof gopongmsg.Server.State.Start
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {gopongmsg.Server.State.Start} Start
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Start.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gopongmsg.Server.State.Start();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.secondsRemaining = reader.float();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Start message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof gopongmsg.Server.State.Start
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {gopongmsg.Server.State.Start} Start
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Start.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Start message.
                 * @function verify
                 * @memberof gopongmsg.Server.State.Start
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Start.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.secondsRemaining != null && message.hasOwnProperty("secondsRemaining"))
                        if (typeof message.secondsRemaining !== "number")
                            return "secondsRemaining: number expected";
                    return null;
                };

                /**
                 * Creates a Start message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof gopongmsg.Server.State.Start
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {gopongmsg.Server.State.Start} Start
                 */
                Start.fromObject = function fromObject(object) {
                    if (object instanceof $root.gopongmsg.Server.State.Start)
                        return object;
                    var message = new $root.gopongmsg.Server.State.Start();
                    if (object.secondsRemaining != null)
                        message.secondsRemaining = Number(object.secondsRemaining);
                    return message;
                };

                /**
                 * Creates a plain object from a Start message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof gopongmsg.Server.State.Start
                 * @static
                 * @param {gopongmsg.Server.State.Start} message Start
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Start.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.secondsRemaining = 0;
                    if (message.secondsRemaining != null && message.hasOwnProperty("secondsRemaining"))
                        object.secondsRemaining = options.json && !isFinite(message.secondsRemaining) ? String(message.secondsRemaining) : message.secondsRemaining;
                    return object;
                };

                /**
                 * Converts this Start to JSON.
                 * @function toJSON
                 * @memberof gopongmsg.Server.State.Start
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Start.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Start;
            })();

            return State;
        })();

        return Server;
    })();

    return gopongmsg;
})();

module.exports = $root;
