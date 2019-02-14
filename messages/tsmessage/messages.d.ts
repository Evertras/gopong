import * as $protobuf from "protobufjs";
/** Namespace gopongmsg. */
export namespace gopongmsg {

    /** Properties of a Client. */
    interface IClient {

        /** Client input */
        input?: (gopongmsg.Client.IInput|null);
    }

    /** Represents a Client. */
    class Client implements IClient {

        /**
         * Constructs a new Client.
         * @param [properties] Properties to set
         */
        constructor(properties?: gopongmsg.IClient);

        /** Client input. */
        public input?: (gopongmsg.Client.IInput|null);

        /** Client msg. */
        public msg?: "input";

        /**
         * Creates a new Client instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Client instance
         */
        public static create(properties?: gopongmsg.IClient): gopongmsg.Client;

        /**
         * Encodes the specified Client message. Does not implicitly {@link gopongmsg.Client.verify|verify} messages.
         * @param message Client message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gopongmsg.IClient, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Client message, length delimited. Does not implicitly {@link gopongmsg.Client.verify|verify} messages.
         * @param message Client message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gopongmsg.IClient, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Client message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Client
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gopongmsg.Client;

        /**
         * Decodes a Client message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Client
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gopongmsg.Client;

        /**
         * Verifies a Client message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Client message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Client
         */
        public static fromObject(object: { [k: string]: any }): gopongmsg.Client;

        /**
         * Creates a plain object from a Client message. Also converts values to other types if specified.
         * @param message Client
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gopongmsg.Client, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Client to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Client {

        /** Properties of an Input. */
        interface IInput {

            /** Input movementAxis */
            movementAxis?: (number|null);

            /** Input durationSeconds */
            durationSeconds?: (number|null);

            /** Input inputIndex */
            inputIndex?: (number|null);
        }

        /** Represents an Input. */
        class Input implements IInput {

            /**
             * Constructs a new Input.
             * @param [properties] Properties to set
             */
            constructor(properties?: gopongmsg.Client.IInput);

            /** Input movementAxis. */
            public movementAxis: number;

            /** Input durationSeconds. */
            public durationSeconds: number;

            /** Input inputIndex. */
            public inputIndex: number;

            /**
             * Creates a new Input instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Input instance
             */
            public static create(properties?: gopongmsg.Client.IInput): gopongmsg.Client.Input;

            /**
             * Encodes the specified Input message. Does not implicitly {@link gopongmsg.Client.Input.verify|verify} messages.
             * @param message Input message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gopongmsg.Client.IInput, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Input message, length delimited. Does not implicitly {@link gopongmsg.Client.Input.verify|verify} messages.
             * @param message Input message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gopongmsg.Client.IInput, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Input message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Input
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gopongmsg.Client.Input;

            /**
             * Decodes an Input message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Input
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gopongmsg.Client.Input;

            /**
             * Verifies an Input message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Input message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Input
             */
            public static fromObject(object: { [k: string]: any }): gopongmsg.Client.Input;

            /**
             * Creates a plain object from an Input message. Also converts values to other types if specified.
             * @param message Input
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gopongmsg.Client.Input, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Input to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a Server. */
    interface IServer {

        /** Server config */
        config?: (gopongmsg.Server.IConfig|null);

        /** Server state */
        state?: (gopongmsg.Server.IState|null);
    }

    /** Represents a Server. */
    class Server implements IServer {

        /**
         * Constructs a new Server.
         * @param [properties] Properties to set
         */
        constructor(properties?: gopongmsg.IServer);

        /** Server config. */
        public config?: (gopongmsg.Server.IConfig|null);

        /** Server state. */
        public state?: (gopongmsg.Server.IState|null);

        /** Server msg. */
        public msg?: ("config"|"state");

        /**
         * Creates a new Server instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Server instance
         */
        public static create(properties?: gopongmsg.IServer): gopongmsg.Server;

        /**
         * Encodes the specified Server message. Does not implicitly {@link gopongmsg.Server.verify|verify} messages.
         * @param message Server message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gopongmsg.IServer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Server message, length delimited. Does not implicitly {@link gopongmsg.Server.verify|verify} messages.
         * @param message Server message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gopongmsg.IServer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Server message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Server
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gopongmsg.Server;

        /**
         * Decodes a Server message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Server
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gopongmsg.Server;

        /**
         * Verifies a Server message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Server message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Server
         */
        public static fromObject(object: { [k: string]: any }): gopongmsg.Server;

        /**
         * Creates a plain object from a Server message. Also converts values to other types if specified.
         * @param message Server
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gopongmsg.Server, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Server to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Server {

        /** Properties of a Config. */
        interface IConfig {

            /** Config side */
            side?: (gopongmsg.Server.Config.PaddleSide|null);

            /** Config paddleHeight */
            paddleHeight?: (number|null);

            /** Config paddleWidth */
            paddleWidth?: (number|null);

            /** Config ballRadius */
            ballRadius?: (number|null);

            /** Config maxPaddleSpeedPerSecond */
            maxPaddleSpeedPerSecond?: (number|null);
        }

        /** Represents a Config. */
        class Config implements IConfig {

            /**
             * Constructs a new Config.
             * @param [properties] Properties to set
             */
            constructor(properties?: gopongmsg.Server.IConfig);

            /** Config side. */
            public side: gopongmsg.Server.Config.PaddleSide;

            /** Config paddleHeight. */
            public paddleHeight: number;

            /** Config paddleWidth. */
            public paddleWidth: number;

            /** Config ballRadius. */
            public ballRadius: number;

            /** Config maxPaddleSpeedPerSecond. */
            public maxPaddleSpeedPerSecond: number;

            /**
             * Creates a new Config instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Config instance
             */
            public static create(properties?: gopongmsg.Server.IConfig): gopongmsg.Server.Config;

            /**
             * Encodes the specified Config message. Does not implicitly {@link gopongmsg.Server.Config.verify|verify} messages.
             * @param message Config message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gopongmsg.Server.IConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Config message, length delimited. Does not implicitly {@link gopongmsg.Server.Config.verify|verify} messages.
             * @param message Config message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gopongmsg.Server.IConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Config message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Config
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gopongmsg.Server.Config;

            /**
             * Decodes a Config message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Config
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gopongmsg.Server.Config;

            /**
             * Verifies a Config message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Config message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Config
             */
            public static fromObject(object: { [k: string]: any }): gopongmsg.Server.Config;

            /**
             * Creates a plain object from a Config message. Also converts values to other types if specified.
             * @param message Config
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gopongmsg.Server.Config, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Config to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace Config {

            /** PaddleSide enum. */
            enum PaddleSide {
                SIDE_NULL = 0,
                SIDE_LEFT = 1,
                SIDE_RIGHT = 2
            }
        }

        /** Properties of a State. */
        interface IState {

            /** State type */
            type?: (gopongmsg.Server.State.Type|null);

            /** State lastInputIndex */
            lastInputIndex?: (number|null);

            /** State play */
            play?: (gopongmsg.Server.State.IPlay|null);

            /** State start */
            start?: (gopongmsg.Server.State.IStart|null);
        }

        /** Represents a State. */
        class State implements IState {

            /**
             * Constructs a new State.
             * @param [properties] Properties to set
             */
            constructor(properties?: gopongmsg.Server.IState);

            /** State type. */
            public type: gopongmsg.Server.State.Type;

            /** State lastInputIndex. */
            public lastInputIndex: number;

            /** State play. */
            public play?: (gopongmsg.Server.State.IPlay|null);

            /** State start. */
            public start?: (gopongmsg.Server.State.IStart|null);

            /** State state. */
            public state?: ("play"|"start");

            /**
             * Creates a new State instance using the specified properties.
             * @param [properties] Properties to set
             * @returns State instance
             */
            public static create(properties?: gopongmsg.Server.IState): gopongmsg.Server.State;

            /**
             * Encodes the specified State message. Does not implicitly {@link gopongmsg.Server.State.verify|verify} messages.
             * @param message State message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: gopongmsg.Server.IState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified State message, length delimited. Does not implicitly {@link gopongmsg.Server.State.verify|verify} messages.
             * @param message State message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: gopongmsg.Server.IState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a State message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns State
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gopongmsg.Server.State;

            /**
             * Decodes a State message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns State
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gopongmsg.Server.State;

            /**
             * Verifies a State message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a State message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns State
             */
            public static fromObject(object: { [k: string]: any }): gopongmsg.Server.State;

            /**
             * Creates a plain object from a State message. Also converts values to other types if specified.
             * @param message State
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gopongmsg.Server.State, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this State to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace State {

            /** Type enum. */
            enum Type {
                STATE_NULL = 0,
                STATE_PLAY = 1,
                STATE_START = 2
            }

            /** Properties of a Play. */
            interface IPlay {

                /** Play paddleLeft */
                paddleLeft?: (gopongmsg.Server.State.Play.IPaddle|null);

                /** Play paddleRight */
                paddleRight?: (gopongmsg.Server.State.Play.IPaddle|null);

                /** Play ball */
                ball?: (gopongmsg.Server.State.Play.IBall|null);
            }

            /** Represents a Play. */
            class Play implements IPlay {

                /**
                 * Constructs a new Play.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: gopongmsg.Server.State.IPlay);

                /** Play paddleLeft. */
                public paddleLeft?: (gopongmsg.Server.State.Play.IPaddle|null);

                /** Play paddleRight. */
                public paddleRight?: (gopongmsg.Server.State.Play.IPaddle|null);

                /** Play ball. */
                public ball?: (gopongmsg.Server.State.Play.IBall|null);

                /**
                 * Creates a new Play instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Play instance
                 */
                public static create(properties?: gopongmsg.Server.State.IPlay): gopongmsg.Server.State.Play;

                /**
                 * Encodes the specified Play message. Does not implicitly {@link gopongmsg.Server.State.Play.verify|verify} messages.
                 * @param message Play message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: gopongmsg.Server.State.IPlay, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Play message, length delimited. Does not implicitly {@link gopongmsg.Server.State.Play.verify|verify} messages.
                 * @param message Play message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: gopongmsg.Server.State.IPlay, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Play message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Play
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gopongmsg.Server.State.Play;

                /**
                 * Decodes a Play message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Play
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gopongmsg.Server.State.Play;

                /**
                 * Verifies a Play message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Play message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Play
                 */
                public static fromObject(object: { [k: string]: any }): gopongmsg.Server.State.Play;

                /**
                 * Creates a plain object from a Play message. Also converts values to other types if specified.
                 * @param message Play
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: gopongmsg.Server.State.Play, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Play to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace Play {

                /** Properties of a Paddle. */
                interface IPaddle {

                    /** Paddle center */
                    center?: (number|null);
                }

                /** Represents a Paddle. */
                class Paddle implements IPaddle {

                    /**
                     * Constructs a new Paddle.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: gopongmsg.Server.State.Play.IPaddle);

                    /** Paddle center. */
                    public center: number;

                    /**
                     * Creates a new Paddle instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Paddle instance
                     */
                    public static create(properties?: gopongmsg.Server.State.Play.IPaddle): gopongmsg.Server.State.Play.Paddle;

                    /**
                     * Encodes the specified Paddle message. Does not implicitly {@link gopongmsg.Server.State.Play.Paddle.verify|verify} messages.
                     * @param message Paddle message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: gopongmsg.Server.State.Play.IPaddle, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Paddle message, length delimited. Does not implicitly {@link gopongmsg.Server.State.Play.Paddle.verify|verify} messages.
                     * @param message Paddle message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: gopongmsg.Server.State.Play.IPaddle, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Paddle message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Paddle
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gopongmsg.Server.State.Play.Paddle;

                    /**
                     * Decodes a Paddle message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Paddle
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gopongmsg.Server.State.Play.Paddle;

                    /**
                     * Verifies a Paddle message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Paddle message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Paddle
                     */
                    public static fromObject(object: { [k: string]: any }): gopongmsg.Server.State.Play.Paddle;

                    /**
                     * Creates a plain object from a Paddle message. Also converts values to other types if specified.
                     * @param message Paddle
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: gopongmsg.Server.State.Play.Paddle, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Paddle to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Ball. */
                interface IBall {

                    /** Ball centerX */
                    centerX?: (number|null);

                    /** Ball centerY */
                    centerY?: (number|null);
                }

                /** Represents a Ball. */
                class Ball implements IBall {

                    /**
                     * Constructs a new Ball.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: gopongmsg.Server.State.Play.IBall);

                    /** Ball centerX. */
                    public centerX: number;

                    /** Ball centerY. */
                    public centerY: number;

                    /**
                     * Creates a new Ball instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Ball instance
                     */
                    public static create(properties?: gopongmsg.Server.State.Play.IBall): gopongmsg.Server.State.Play.Ball;

                    /**
                     * Encodes the specified Ball message. Does not implicitly {@link gopongmsg.Server.State.Play.Ball.verify|verify} messages.
                     * @param message Ball message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: gopongmsg.Server.State.Play.IBall, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Ball message, length delimited. Does not implicitly {@link gopongmsg.Server.State.Play.Ball.verify|verify} messages.
                     * @param message Ball message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: gopongmsg.Server.State.Play.IBall, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Ball message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Ball
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gopongmsg.Server.State.Play.Ball;

                    /**
                     * Decodes a Ball message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Ball
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gopongmsg.Server.State.Play.Ball;

                    /**
                     * Verifies a Ball message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Ball message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Ball
                     */
                    public static fromObject(object: { [k: string]: any }): gopongmsg.Server.State.Play.Ball;

                    /**
                     * Creates a plain object from a Ball message. Also converts values to other types if specified.
                     * @param message Ball
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: gopongmsg.Server.State.Play.Ball, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Ball to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a Start. */
            interface IStart {

                /** Start secondsRemaining */
                secondsRemaining?: (number|null);
            }

            /** Represents a Start. */
            class Start implements IStart {

                /**
                 * Constructs a new Start.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: gopongmsg.Server.State.IStart);

                /** Start secondsRemaining. */
                public secondsRemaining: number;

                /**
                 * Creates a new Start instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Start instance
                 */
                public static create(properties?: gopongmsg.Server.State.IStart): gopongmsg.Server.State.Start;

                /**
                 * Encodes the specified Start message. Does not implicitly {@link gopongmsg.Server.State.Start.verify|verify} messages.
                 * @param message Start message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: gopongmsg.Server.State.IStart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Start message, length delimited. Does not implicitly {@link gopongmsg.Server.State.Start.verify|verify} messages.
                 * @param message Start message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: gopongmsg.Server.State.IStart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Start message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Start
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gopongmsg.Server.State.Start;

                /**
                 * Decodes a Start message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Start
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gopongmsg.Server.State.Start;

                /**
                 * Verifies a Start message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Start message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Start
                 */
                public static fromObject(object: { [k: string]: any }): gopongmsg.Server.State.Start;

                /**
                 * Creates a plain object from a Start message. Also converts values to other types if specified.
                 * @param message Start
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: gopongmsg.Server.State.Start, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Start to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
