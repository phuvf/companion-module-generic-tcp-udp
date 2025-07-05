import dgram from 'dgram';
import { InstanceStatus } from '@companion-module/base';

export const udpServer = {
    udpSocket: null,
    
    init: async function (self) {
        this.self = self;
        self.log('debug', `Starting UDP server...`);
        
        // Stop any existing server first
        this.stop(self);
        
        // Use the UDP listen port from the config if available, otherwise use a default
        const listenPort = self.config.udpListenPort || 7001;
        
        // Create a new socket
        this.udpSocket = dgram.createSocket('udp4');
        
        this.udpSocket.bind(listenPort);
        this.udpSocket.on('listening', () => {
            this.udpSocket.setBroadcast(true);
            const address = this.udpSocket.address();
            self.log('debug', `UDP server listening on ${address.address}:${address.port}`);
            this.self.updateStatus(InstanceStatus.Ok);
        });
        this.udpSocket.on('message', (msg, rinfo) => {
            self.log('info', `UDP received: ${msg} from ${rinfo.address}:${rinfo.port}`);
            
            // Store the received message if the option is enabled
            if (self.config.savemessage) {
                self.setVariableValues({ udp_message: msg.toString() });
            }
        });
        
        this.udpSocket.on('error', (err) => {
            self.log('error', `UDP server error: ${err.message}`);
        });
    },
    
    stop: function (self) {
        if (this.udpSocket) {
            self.log('debug', 'Stopping UDP server...');
            
            // Remove all listeners to prevent memory leaks
            this.udpSocket.removeAllListeners();
            
            // Close the socket
            this.udpSocket.close(() => {
                self.log('debug', 'UDP server stopped');
            });
            
            // Clear the reference
            this.udpSocket = null;
        }
    },
}
