import {Injectable} from '@angular/core';
import PouchDB from "pouchdb";

//let PouchDB = require('pouchdb');


@Injectable()
export class Database {  
    private _db;
    private _collections;

    initDB() {
        console.log('init DB');
        this._db = new PouchDB('collections', { adapter: 'websql' });
        window["PouchDB"] = PouchDB;
    }
    
    add(collection) {  
        return this._db.post(collection);
    } 
    
    update(collection) {  
        return this._db.put(collection);
    }
    
    delete(collection) {  
        return this._db.remove(collection);
    }
    
    getCollections() {  
    
        if (!this._collections) {
            return this._db.allDocs({ include_docs: true})
                .then(docs => {
    
                    // Each row has a .doc object and we just want to send an 
                    // array of birthday objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.
    
                    this._collections = docs.rows.map(row => {
                        return row.doc;
                    });
    
                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true})
                        .on('change', this.onDatabaseChange);
    
                    return this._collections;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this._collections);
        }
    }

    private onDatabaseChange = (change) => {  
        var index = this.findIndex(this._collections, change.id);
        var collection = this._collections[index];
        console.log('change detected');
        if (change.deleted) {
            console.log('delete detected');
            if (collection) {
                this._collections.splice(index, 1); // delete
            }
        } else {
            if (collection && collection._id === change.id) {
                this._collections[index] = change.doc; // update
            } else {
                this._collections.splice(index, 0, change.doc) // insert
            }
        }
    }
    
    // Binary search, the array is by default sorted by _id.
    private findIndex(array, id) {  
        var low = 0, high = array.length, mid;
        while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
    }


}