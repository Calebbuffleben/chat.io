import { useEffect, useState } from "react";
import { socket } from "../socket";

const useSocket = () => {
    const socketInstance = socket();
    const [isConnected, setIsConnected] = useState(socketInstance.isConnected);

    useEffect(() => {
        socketInstance.on("connect", () => setIsConnected(true));
        socketInstance.on("disconnect", () => setIsConnected(false));

        return () => {
            socketInstance.off("connect");
            socketInstance.off("disconnect");
        }
    }, [socketInstance])

    return { socketInstance, isConnected };
}

export default useSocket;