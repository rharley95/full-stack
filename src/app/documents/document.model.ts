export class Document {
    public documentId: string;
    public name: string;
    public description: string;
    public fileUrl: string;
    public children: Document[];

    constructor(documentId: string, name: string, description: string, fileUrl: string, children: Document[]) {
        this.documentId = documentId;
        this.name = name;
        this.description = description;
        this.fileUrl = fileUrl;
        this.children = children;
    }
}