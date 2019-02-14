// Code generated by protoc-gen-go. DO NOT EDIT.
// source: server.proto

package gopongmsg

import (
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type Server_Config_PaddleSide int32

const (
	Server_Config_SIDE_LEFT  Server_Config_PaddleSide = 0
	Server_Config_SIDE_RIGHT Server_Config_PaddleSide = 1
)

var Server_Config_PaddleSide_name = map[int32]string{
	0: "SIDE_LEFT",
	1: "SIDE_RIGHT",
}

var Server_Config_PaddleSide_value = map[string]int32{
	"SIDE_LEFT":  0,
	"SIDE_RIGHT": 1,
}

func (x Server_Config_PaddleSide) String() string {
	return proto.EnumName(Server_Config_PaddleSide_name, int32(x))
}

func (Server_Config_PaddleSide) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_ad098daeda4239f7, []int{0, 0, 0}
}

type Server_State_Type int32

const (
	Server_State_STATE_PLAY  Server_State_Type = 0
	Server_State_STATE_START Server_State_Type = 1
)

var Server_State_Type_name = map[int32]string{
	0: "STATE_PLAY",
	1: "STATE_START",
}

var Server_State_Type_value = map[string]int32{
	"STATE_PLAY":  0,
	"STATE_START": 1,
}

func (x Server_State_Type) String() string {
	return proto.EnumName(Server_State_Type_name, int32(x))
}

func (Server_State_Type) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_ad098daeda4239f7, []int{0, 1, 0}
}

type Server struct {
	// Types that are valid to be assigned to Msg:
	//	*Server_Config_
	//	*Server_State_
	Msg                  isServer_Msg `protobuf_oneof:"msg"`
	XXX_NoUnkeyedLiteral struct{}     `json:"-"`
	XXX_unrecognized     []byte       `json:"-"`
	XXX_sizecache        int32        `json:"-"`
}

func (m *Server) Reset()         { *m = Server{} }
func (m *Server) String() string { return proto.CompactTextString(m) }
func (*Server) ProtoMessage()    {}
func (*Server) Descriptor() ([]byte, []int) {
	return fileDescriptor_ad098daeda4239f7, []int{0}
}

func (m *Server) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Server.Unmarshal(m, b)
}
func (m *Server) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Server.Marshal(b, m, deterministic)
}
func (m *Server) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Server.Merge(m, src)
}
func (m *Server) XXX_Size() int {
	return xxx_messageInfo_Server.Size(m)
}
func (m *Server) XXX_DiscardUnknown() {
	xxx_messageInfo_Server.DiscardUnknown(m)
}

var xxx_messageInfo_Server proto.InternalMessageInfo

type isServer_Msg interface {
	isServer_Msg()
}

type Server_Config_ struct {
	Config *Server_Config `protobuf:"bytes,1,opt,name=config,proto3,oneof"`
}

type Server_State_ struct {
	State *Server_State `protobuf:"bytes,2,opt,name=state,proto3,oneof"`
}

func (*Server_Config_) isServer_Msg() {}

func (*Server_State_) isServer_Msg() {}

func (m *Server) GetMsg() isServer_Msg {
	if m != nil {
		return m.Msg
	}
	return nil
}

func (m *Server) GetConfig() *Server_Config {
	if x, ok := m.GetMsg().(*Server_Config_); ok {
		return x.Config
	}
	return nil
}

func (m *Server) GetState() *Server_State {
	if x, ok := m.GetMsg().(*Server_State_); ok {
		return x.State
	}
	return nil
}

// XXX_OneofWrappers is for the internal use of the proto package.
func (*Server) XXX_OneofWrappers() []interface{} {
	return []interface{}{
		(*Server_Config_)(nil),
		(*Server_State_)(nil),
	}
}

type Server_Config struct {
	Side                    Server_Config_PaddleSide `protobuf:"varint,1,opt,name=side,proto3,enum=gopongmsg.Server_Config_PaddleSide" json:"side,omitempty"`
	PaddleHeight            float32                  `protobuf:"fixed32,2,opt,name=paddle_height,json=paddleHeight,proto3" json:"paddle_height,omitempty"`
	PaddleWidth             float32                  `protobuf:"fixed32,3,opt,name=paddle_width,json=paddleWidth,proto3" json:"paddle_width,omitempty"`
	BallRadius              float32                  `protobuf:"fixed32,4,opt,name=ball_radius,json=ballRadius,proto3" json:"ball_radius,omitempty"`
	MaxPaddleSpeedPerSecond float32                  `protobuf:"fixed32,5,opt,name=max_paddle_speed_per_second,json=maxPaddleSpeedPerSecond,proto3" json:"max_paddle_speed_per_second,omitempty"`
	XXX_NoUnkeyedLiteral    struct{}                 `json:"-"`
	XXX_unrecognized        []byte                   `json:"-"`
	XXX_sizecache           int32                    `json:"-"`
}

func (m *Server_Config) Reset()         { *m = Server_Config{} }
func (m *Server_Config) String() string { return proto.CompactTextString(m) }
func (*Server_Config) ProtoMessage()    {}
func (*Server_Config) Descriptor() ([]byte, []int) {
	return fileDescriptor_ad098daeda4239f7, []int{0, 0}
}

func (m *Server_Config) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Server_Config.Unmarshal(m, b)
}
func (m *Server_Config) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Server_Config.Marshal(b, m, deterministic)
}
func (m *Server_Config) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Server_Config.Merge(m, src)
}
func (m *Server_Config) XXX_Size() int {
	return xxx_messageInfo_Server_Config.Size(m)
}
func (m *Server_Config) XXX_DiscardUnknown() {
	xxx_messageInfo_Server_Config.DiscardUnknown(m)
}

var xxx_messageInfo_Server_Config proto.InternalMessageInfo

func (m *Server_Config) GetSide() Server_Config_PaddleSide {
	if m != nil {
		return m.Side
	}
	return Server_Config_SIDE_LEFT
}

func (m *Server_Config) GetPaddleHeight() float32 {
	if m != nil {
		return m.PaddleHeight
	}
	return 0
}

func (m *Server_Config) GetPaddleWidth() float32 {
	if m != nil {
		return m.PaddleWidth
	}
	return 0
}

func (m *Server_Config) GetBallRadius() float32 {
	if m != nil {
		return m.BallRadius
	}
	return 0
}

func (m *Server_Config) GetMaxPaddleSpeedPerSecond() float32 {
	if m != nil {
		return m.MaxPaddleSpeedPerSecond
	}
	return 0
}

type Server_State struct {
	Type           Server_State_Type `protobuf:"varint,1,opt,name=type,proto3,enum=gopongmsg.Server_State_Type" json:"type,omitempty"`
	LastInputIndex uint32            `protobuf:"varint,2,opt,name=last_input_index,json=lastInputIndex,proto3" json:"last_input_index,omitempty"`
	// Types that are valid to be assigned to State:
	//	*Server_State_Play_
	//	*Server_State_Start_
	State                isServer_State_State `protobuf_oneof:"state"`
	XXX_NoUnkeyedLiteral struct{}             `json:"-"`
	XXX_unrecognized     []byte               `json:"-"`
	XXX_sizecache        int32                `json:"-"`
}

func (m *Server_State) Reset()         { *m = Server_State{} }
func (m *Server_State) String() string { return proto.CompactTextString(m) }
func (*Server_State) ProtoMessage()    {}
func (*Server_State) Descriptor() ([]byte, []int) {
	return fileDescriptor_ad098daeda4239f7, []int{0, 1}
}

func (m *Server_State) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Server_State.Unmarshal(m, b)
}
func (m *Server_State) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Server_State.Marshal(b, m, deterministic)
}
func (m *Server_State) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Server_State.Merge(m, src)
}
func (m *Server_State) XXX_Size() int {
	return xxx_messageInfo_Server_State.Size(m)
}
func (m *Server_State) XXX_DiscardUnknown() {
	xxx_messageInfo_Server_State.DiscardUnknown(m)
}

var xxx_messageInfo_Server_State proto.InternalMessageInfo

func (m *Server_State) GetType() Server_State_Type {
	if m != nil {
		return m.Type
	}
	return Server_State_STATE_PLAY
}

func (m *Server_State) GetLastInputIndex() uint32 {
	if m != nil {
		return m.LastInputIndex
	}
	return 0
}

type isServer_State_State interface {
	isServer_State_State()
}

type Server_State_Play_ struct {
	Play *Server_State_Play `protobuf:"bytes,3,opt,name=play,proto3,oneof"`
}

type Server_State_Start_ struct {
	Start *Server_State_Start `protobuf:"bytes,4,opt,name=start,proto3,oneof"`
}

func (*Server_State_Play_) isServer_State_State() {}

func (*Server_State_Start_) isServer_State_State() {}

func (m *Server_State) GetState() isServer_State_State {
	if m != nil {
		return m.State
	}
	return nil
}

func (m *Server_State) GetPlay() *Server_State_Play {
	if x, ok := m.GetState().(*Server_State_Play_); ok {
		return x.Play
	}
	return nil
}

func (m *Server_State) GetStart() *Server_State_Start {
	if x, ok := m.GetState().(*Server_State_Start_); ok {
		return x.Start
	}
	return nil
}

// XXX_OneofWrappers is for the internal use of the proto package.
func (*Server_State) XXX_OneofWrappers() []interface{} {
	return []interface{}{
		(*Server_State_Play_)(nil),
		(*Server_State_Start_)(nil),
	}
}

type Server_State_Play struct {
	PaddleLeft           *Server_State_Play_Paddle `protobuf:"bytes,1,opt,name=paddle_left,json=paddleLeft,proto3" json:"paddle_left,omitempty"`
	PaddleRight          *Server_State_Play_Paddle `protobuf:"bytes,2,opt,name=paddle_right,json=paddleRight,proto3" json:"paddle_right,omitempty"`
	Ball                 *Server_State_Play_Ball   `protobuf:"bytes,3,opt,name=ball,proto3" json:"ball,omitempty"`
	XXX_NoUnkeyedLiteral struct{}                  `json:"-"`
	XXX_unrecognized     []byte                    `json:"-"`
	XXX_sizecache        int32                     `json:"-"`
}

func (m *Server_State_Play) Reset()         { *m = Server_State_Play{} }
func (m *Server_State_Play) String() string { return proto.CompactTextString(m) }
func (*Server_State_Play) ProtoMessage()    {}
func (*Server_State_Play) Descriptor() ([]byte, []int) {
	return fileDescriptor_ad098daeda4239f7, []int{0, 1, 0}
}

func (m *Server_State_Play) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Server_State_Play.Unmarshal(m, b)
}
func (m *Server_State_Play) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Server_State_Play.Marshal(b, m, deterministic)
}
func (m *Server_State_Play) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Server_State_Play.Merge(m, src)
}
func (m *Server_State_Play) XXX_Size() int {
	return xxx_messageInfo_Server_State_Play.Size(m)
}
func (m *Server_State_Play) XXX_DiscardUnknown() {
	xxx_messageInfo_Server_State_Play.DiscardUnknown(m)
}

var xxx_messageInfo_Server_State_Play proto.InternalMessageInfo

func (m *Server_State_Play) GetPaddleLeft() *Server_State_Play_Paddle {
	if m != nil {
		return m.PaddleLeft
	}
	return nil
}

func (m *Server_State_Play) GetPaddleRight() *Server_State_Play_Paddle {
	if m != nil {
		return m.PaddleRight
	}
	return nil
}

func (m *Server_State_Play) GetBall() *Server_State_Play_Ball {
	if m != nil {
		return m.Ball
	}
	return nil
}

type Server_State_Play_Paddle struct {
	Center               float32  `protobuf:"fixed32,1,opt,name=center,proto3" json:"center,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Server_State_Play_Paddle) Reset()         { *m = Server_State_Play_Paddle{} }
func (m *Server_State_Play_Paddle) String() string { return proto.CompactTextString(m) }
func (*Server_State_Play_Paddle) ProtoMessage()    {}
func (*Server_State_Play_Paddle) Descriptor() ([]byte, []int) {
	return fileDescriptor_ad098daeda4239f7, []int{0, 1, 0, 0}
}

func (m *Server_State_Play_Paddle) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Server_State_Play_Paddle.Unmarshal(m, b)
}
func (m *Server_State_Play_Paddle) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Server_State_Play_Paddle.Marshal(b, m, deterministic)
}
func (m *Server_State_Play_Paddle) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Server_State_Play_Paddle.Merge(m, src)
}
func (m *Server_State_Play_Paddle) XXX_Size() int {
	return xxx_messageInfo_Server_State_Play_Paddle.Size(m)
}
func (m *Server_State_Play_Paddle) XXX_DiscardUnknown() {
	xxx_messageInfo_Server_State_Play_Paddle.DiscardUnknown(m)
}

var xxx_messageInfo_Server_State_Play_Paddle proto.InternalMessageInfo

func (m *Server_State_Play_Paddle) GetCenter() float32 {
	if m != nil {
		return m.Center
	}
	return 0
}

type Server_State_Play_Ball struct {
	CenterX              float32  `protobuf:"fixed32,1,opt,name=center_x,json=centerX,proto3" json:"center_x,omitempty"`
	CenterY              float32  `protobuf:"fixed32,2,opt,name=center_y,json=centerY,proto3" json:"center_y,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Server_State_Play_Ball) Reset()         { *m = Server_State_Play_Ball{} }
func (m *Server_State_Play_Ball) String() string { return proto.CompactTextString(m) }
func (*Server_State_Play_Ball) ProtoMessage()    {}
func (*Server_State_Play_Ball) Descriptor() ([]byte, []int) {
	return fileDescriptor_ad098daeda4239f7, []int{0, 1, 0, 1}
}

func (m *Server_State_Play_Ball) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Server_State_Play_Ball.Unmarshal(m, b)
}
func (m *Server_State_Play_Ball) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Server_State_Play_Ball.Marshal(b, m, deterministic)
}
func (m *Server_State_Play_Ball) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Server_State_Play_Ball.Merge(m, src)
}
func (m *Server_State_Play_Ball) XXX_Size() int {
	return xxx_messageInfo_Server_State_Play_Ball.Size(m)
}
func (m *Server_State_Play_Ball) XXX_DiscardUnknown() {
	xxx_messageInfo_Server_State_Play_Ball.DiscardUnknown(m)
}

var xxx_messageInfo_Server_State_Play_Ball proto.InternalMessageInfo

func (m *Server_State_Play_Ball) GetCenterX() float32 {
	if m != nil {
		return m.CenterX
	}
	return 0
}

func (m *Server_State_Play_Ball) GetCenterY() float32 {
	if m != nil {
		return m.CenterY
	}
	return 0
}

type Server_State_Start struct {
	SecondsRemaining     float32  `protobuf:"fixed32,1,opt,name=seconds_remaining,json=secondsRemaining,proto3" json:"seconds_remaining,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Server_State_Start) Reset()         { *m = Server_State_Start{} }
func (m *Server_State_Start) String() string { return proto.CompactTextString(m) }
func (*Server_State_Start) ProtoMessage()    {}
func (*Server_State_Start) Descriptor() ([]byte, []int) {
	return fileDescriptor_ad098daeda4239f7, []int{0, 1, 1}
}

func (m *Server_State_Start) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Server_State_Start.Unmarshal(m, b)
}
func (m *Server_State_Start) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Server_State_Start.Marshal(b, m, deterministic)
}
func (m *Server_State_Start) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Server_State_Start.Merge(m, src)
}
func (m *Server_State_Start) XXX_Size() int {
	return xxx_messageInfo_Server_State_Start.Size(m)
}
func (m *Server_State_Start) XXX_DiscardUnknown() {
	xxx_messageInfo_Server_State_Start.DiscardUnknown(m)
}

var xxx_messageInfo_Server_State_Start proto.InternalMessageInfo

func (m *Server_State_Start) GetSecondsRemaining() float32 {
	if m != nil {
		return m.SecondsRemaining
	}
	return 0
}

func init() {
	proto.RegisterEnum("gopongmsg.Server_Config_PaddleSide", Server_Config_PaddleSide_name, Server_Config_PaddleSide_value)
	proto.RegisterEnum("gopongmsg.Server_State_Type", Server_State_Type_name, Server_State_Type_value)
	proto.RegisterType((*Server)(nil), "gopongmsg.Server")
	proto.RegisterType((*Server_Config)(nil), "gopongmsg.Server.Config")
	proto.RegisterType((*Server_State)(nil), "gopongmsg.Server.State")
	proto.RegisterType((*Server_State_Play)(nil), "gopongmsg.Server.State.Play")
	proto.RegisterType((*Server_State_Play_Paddle)(nil), "gopongmsg.Server.State.Play.Paddle")
	proto.RegisterType((*Server_State_Play_Ball)(nil), "gopongmsg.Server.State.Play.Ball")
	proto.RegisterType((*Server_State_Start)(nil), "gopongmsg.Server.State.Start")
}

func init() { proto.RegisterFile("server.proto", fileDescriptor_ad098daeda4239f7) }

var fileDescriptor_ad098daeda4239f7 = []byte{
	// 548 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x8c, 0x54, 0xc1, 0x6e, 0xd3, 0x40,
	0x10, 0x4d, 0x52, 0xc7, 0xa5, 0xe3, 0x36, 0x98, 0x3d, 0x50, 0x63, 0x40, 0xb4, 0xc9, 0x81, 0x4a,
	0x95, 0x0c, 0x0a, 0x54, 0x5c, 0x7a, 0x49, 0x68, 0x4a, 0x22, 0xe5, 0x10, 0xad, 0x2d, 0x41, 0x4f,
	0x2b, 0x37, 0xde, 0x38, 0x96, 0x1c, 0xdb, 0x5a, 0x6f, 0x21, 0xf9, 0x10, 0xbe, 0x82, 0xdf, 0xe2,
	0x0f, 0xf8, 0x01, 0xb4, 0xb3, 0xdb, 0x80, 0x84, 0x52, 0x71, 0x89, 0x34, 0x6f, 0xde, 0xcc, 0x6c,
	0xde, 0x7b, 0x09, 0x1c, 0xd6, 0x5c, 0x7c, 0xe5, 0x22, 0xa8, 0x44, 0x29, 0x4b, 0x72, 0x90, 0x96,
	0x55, 0x59, 0xa4, 0xab, 0x3a, 0xed, 0xfe, 0xda, 0x07, 0x3b, 0xc4, 0x1e, 0xe9, 0x83, 0x3d, 0x2f,
	0x8b, 0x45, 0x96, 0x7a, 0xcd, 0x93, 0xe6, 0x99, 0xd3, 0xf7, 0x82, 0x2d, 0x2d, 0xd0, 0x94, 0xe0,
	0x23, 0xf6, 0xc7, 0x0d, 0x6a, 0x98, 0xe4, 0x0d, 0xb4, 0x6b, 0x19, 0x4b, 0xee, 0xb5, 0x70, 0xe4,
	0xf8, 0xdf, 0x91, 0x50, 0xb5, 0xc7, 0x0d, 0xaa, 0x79, 0xfe, 0xf7, 0x16, 0xd8, 0x7a, 0x0b, 0xf9,
	0x00, 0x56, 0x9d, 0x25, 0x1c, 0xaf, 0x75, 0xfa, 0xbd, 0x5d, 0xd7, 0x82, 0x59, 0x9c, 0x24, 0x39,
	0x0f, 0xb3, 0x84, 0x53, 0x1c, 0x20, 0x3d, 0x38, 0xaa, 0x10, 0x63, 0x4b, 0x9e, 0xa5, 0x4b, 0x89,
	0xc7, 0x5b, 0xf4, 0x50, 0x83, 0x63, 0xc4, 0xc8, 0x29, 0x98, 0x9a, 0x7d, 0xcb, 0x12, 0xb9, 0xf4,
	0xf6, 0x90, 0xe3, 0x68, 0xec, 0xb3, 0x82, 0xc8, 0x2b, 0x70, 0x6e, 0xe3, 0x3c, 0x67, 0x22, 0x4e,
	0xb2, 0xbb, 0xda, 0xb3, 0x90, 0x01, 0x0a, 0xa2, 0x88, 0x90, 0x4b, 0x78, 0xbe, 0x8a, 0xd7, 0xcc,
	0xec, 0xa9, 0x2b, 0xce, 0x13, 0x56, 0x71, 0xc1, 0x6a, 0x3e, 0x2f, 0x8b, 0xc4, 0x6b, 0xe3, 0xc0,
	0xf1, 0x2a, 0x5e, 0x9b, 0x27, 0x2a, 0xc2, 0x8c, 0x8b, 0x10, 0xdb, 0xdd, 0x73, 0x80, 0x3f, 0x4f,
	0x27, 0x47, 0x70, 0x10, 0x4e, 0xae, 0x46, 0x6c, 0x3a, 0xba, 0x8e, 0xdc, 0x06, 0xe9, 0x00, 0x60,
	0x49, 0x27, 0x9f, 0xc6, 0x91, 0xdb, 0xf4, 0x7f, 0x5a, 0xd0, 0x46, 0xa9, 0xc8, 0x5b, 0xb0, 0xe4,
	0xa6, 0xba, 0x97, 0xe5, 0xc5, 0x0e, 0x45, 0x83, 0x68, 0x53, 0x71, 0x8a, 0x4c, 0x72, 0x06, 0x6e,
	0x1e, 0xd7, 0x92, 0x65, 0x45, 0x75, 0xa7, 0x3e, 0x13, 0xbe, 0x46, 0x49, 0x8e, 0x68, 0x47, 0xe1,
	0x13, 0x05, 0x4f, 0x14, 0x4a, 0xfa, 0x60, 0x55, 0x79, 0xbc, 0x41, 0x31, 0x9c, 0xdd, 0xbb, 0x67,
	0x79, 0xbc, 0x19, 0x37, 0x28, 0x72, 0xc9, 0x05, 0x5a, 0x2c, 0x24, 0xea, 0xe3, 0xf4, 0x5f, 0xee,
	0x1a, 0x0a, 0x15, 0xc9, 0x18, 0x2d, 0xa4, 0xff, 0xa3, 0x05, 0x96, 0xda, 0x43, 0xae, 0xc0, 0x88,
	0xce, 0x72, 0xbe, 0x90, 0x26, 0x5b, 0xbd, 0x87, 0x4e, 0x1b, 0xc7, 0x29, 0xe8, 0xb9, 0x29, 0x5f,
	0x48, 0x72, 0xbd, 0xb5, 0x53, 0x6c, 0x2d, 0xff, 0xcf, 0x35, 0xe6, 0x3c, 0xc5, 0x58, 0x5c, 0x80,
	0xa5, 0x0c, 0x36, 0x0a, 0x9c, 0x3e, 0x38, 0x3f, 0x54, 0x49, 0x40, 0xba, 0x7f, 0x02, 0xb6, 0xde,
	0x46, 0x9e, 0x82, 0x3d, 0xe7, 0x85, 0xe4, 0x02, 0xbf, 0x49, 0x8b, 0x9a, 0xca, 0xbf, 0x04, 0x4b,
	0xf1, 0xc9, 0x33, 0x78, 0xa4, 0x11, 0xb6, 0x36, 0x8c, 0x7d, 0x5d, 0x7f, 0xf9, 0xab, 0xb5, 0x31,
	0x91, 0x35, 0xad, 0x1b, 0xff, 0x3d, 0xba, 0x2f, 0x24, 0x39, 0x87, 0x27, 0x3a, 0x5d, 0x35, 0x13,
	0x7c, 0x15, 0x67, 0x45, 0x56, 0xa4, 0x66, 0x8f, 0x6b, 0x1a, 0xf4, 0x1e, 0xef, 0xbe, 0x06, 0x4b,
	0xc5, 0x00, 0xc3, 0x14, 0x0d, 0xa2, 0x11, 0x9b, 0x4d, 0x07, 0x37, 0x6e, 0x83, 0x3c, 0x06, 0x47,
	0xd7, 0x61, 0x34, 0xa0, 0x91, 0xdb, 0x1c, 0xee, 0x9b, 0x9f, 0xe9, 0xb0, 0x0d, 0x7b, 0xab, 0x3a,
	0xbd, 0xb5, 0xf1, 0x7f, 0xe0, 0xdd, 0xef, 0x00, 0x00, 0x00, 0xff, 0xff, 0xd4, 0x4f, 0x95, 0xd7,
	0x17, 0x04, 0x00, 0x00,
}
