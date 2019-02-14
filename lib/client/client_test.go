package client

import (
	"testing"

	gopongmsg "github.com/Evertras/gopong/messages/gomessage"
	"github.com/golang/protobuf/proto"
)

func genMarshalableMessage() *gopongmsg.Server {
	return &gopongmsg.Server{
		Msg: &gopongmsg.Server_State_{
			State: &gopongmsg.Server_State{
				LastInputIndex: 3,
				State: &gopongmsg.Server_State_Play_{
					Play: &gopongmsg.Server_State_Play{
						Ball: &gopongmsg.Server_State_Play_Ball{
							CenterX: 0.5,
							CenterY: 0.4,
						},
						PaddleLeft: &gopongmsg.Server_State_Play_Paddle{
							Center: 0.3,
						},
						PaddleRight: &gopongmsg.Server_State_Play_Paddle{
							Center: 0.8,
						},
					},
				},
				Type: gopongmsg.Server_State_STATE_PLAY,
			},
		},
	}
}

func BenchmarkClientMarshalServerProto(b *testing.B) {
	msg := genMarshalableMessage()
	dataLength := -1

	for i := 0; i < b.N; i++ {
		data, err := proto.Marshal(msg)

		if err != nil {
			b.Fatal(err)
		}

		dataLength = len(data)
	}

	b.Logf("Message length: %d", dataLength)
}
