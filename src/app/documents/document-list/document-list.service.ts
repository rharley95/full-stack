import { Document } from '../document.model';
import { MOCKDOCUMENTS } from '../MOCKDOCUMENTS';
import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class DocumentListService {
    documentSelected = new EventEmitter<Document>();
    documents: Document[] = [];

    constructor() {
        this.documents = MOCKDOCUMENTS;
    }

    getDocuments(): Document[] {
        return this.documents.slice();
    }

    getDocument(id: string): Document {

        // tslint:disable-next-line: prefer-const
        for (let document of this.documents) {
            if (document.id === id) {
                return document;
            }
        }

        return null;
    }

}

