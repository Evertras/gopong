// Code generated by protoc-gen-go. DO NOT EDIT.
// source: config.proto

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

type Config_PaddleSide int32

const (
	Config_SIDE_LEFT  Config_PaddleSide = 0
	Config_SIDE_RIGHT Config_PaddleSide = 1
)

var Config_PaddleSide_name = map[int32]string{
	0: "SIDE_LEFT",
	1: "SIDE_RIGHT",
}

var Config_PaddleSide_value = map[string]int32{
	"SIDE_LEFT":  0,
	"SIDE_RIGHT": 1,
}

func (x Config_PaddleSide) String() string {
	return proto.EnumName(Config_PaddleSide_name, int32(x))
}

func (Config_PaddleSide) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_3eaf2c85e69e9ea4, []int{0, 0}
}

type Config struct {
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Config) Reset()         { *m = Config{} }
func (m *Config) String() string { return proto.CompactTextString(m) }
func (*Config) ProtoMessage()    {}
func (*Config) Descriptor() ([]byte, []int) {
	return fileDescriptor_3eaf2c85e69e9ea4, []int{0}
}

func (m *Config) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Config.Unmarshal(m, b)
}
func (m *Config) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Config.Marshal(b, m, deterministic)
}
func (m *Config) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Config.Merge(m, src)
}
func (m *Config) XXX_Size() int {
	return xxx_messageInfo_Config.Size(m)
}
func (m *Config) XXX_DiscardUnknown() {
	xxx_messageInfo_Config.DiscardUnknown(m)
}

var xxx_messageInfo_Config proto.InternalMessageInfo

func init() {
	proto.RegisterEnum("gopongmsg.Config_PaddleSide", Config_PaddleSide_name, Config_PaddleSide_value)
	proto.RegisterType((*Config)(nil), "gopongmsg.Config")
}

func init() { proto.RegisterFile("config.proto", fileDescriptor_3eaf2c85e69e9ea4) }

var fileDescriptor_3eaf2c85e69e9ea4 = []byte{
	// 103 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0xe2, 0x49, 0xce, 0xcf, 0x4b,
	0xcb, 0x4c, 0xd7, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0xe2, 0x4c, 0xcf, 0x2f, 0xc8, 0xcf, 0x4b,
	0xcf, 0x2d, 0x4e, 0x57, 0x32, 0xe5, 0x62, 0x73, 0x06, 0x4b, 0x29, 0x69, 0x73, 0x71, 0x05, 0x24,
	0xa6, 0xa4, 0xe4, 0xa4, 0x06, 0x67, 0xa6, 0xa4, 0x0a, 0xf1, 0x72, 0x71, 0x06, 0x7b, 0xba, 0xb8,
	0xc6, 0xfb, 0xb8, 0xba, 0x85, 0x08, 0x30, 0x08, 0xf1, 0x71, 0x71, 0x81, 0xb9, 0x41, 0x9e, 0xee,
	0x1e, 0x21, 0x02, 0x8c, 0x49, 0x6c, 0x60, 0x83, 0x8c, 0x01, 0x01, 0x00, 0x00, 0xff, 0xff, 0x9c,
	0x2b, 0xc9, 0x5b, 0x58, 0x00, 0x00, 0x00,
}
