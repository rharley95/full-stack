export class Message {
    public messageId: string;
    public subject: string;
    public msgText: string;
    public senderUrl: string;

    constructor(messageId: string, subject: string, msgText: string, senderUrl: string) {
        this.messageId = messageId;
        this.subject = subject;
        this.msgText = msgText;
        this.senderUrl = senderUrl;
    }
}
