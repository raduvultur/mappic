import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SQLite } from 'ionic-native';
import 'rxjs/add/operator/map';

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class Collection {
  name: string;
  id: number;
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

@Injectable()
export class Database {

  private storage: SQLite;
  private isOpen: boolean;
    
  constructor(public http: Http) {
    console.log('Hello Database Provider');
    if(!this.isOpen) {
        this.storage = new SQLite();
        this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
            this.storage.executeSql("CREATE TABLE IF NOT EXISTS settings (key TEXT KEY, value TEXT)", []);
            this.storage.executeSql("CREATE TABLE IF NOT EXISTS collections (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)", []);
            this.storage.executeSql("CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, collection_id INTEGER, url TEXT, title TEXT)", []);
            
            this.isOpen = true;
        });
    }    
  }
  
  public getCollections() {
    return new Promise((resolve, reject) => {
        this.storage.executeSql("SELECT * FROM collections", []).then((data) => {
            let collections = [];
            if(data.rows.length > 0) {
                for(let i = 0; i < data.rows.length; i++) {
                    collections.push({
                        id: data.rows.item(i).id,
                        name: data.rows.item(i).name
                    });
                }
            }
            resolve(collections);
        }, (error) => {
            reject(error);
        });
    });
  }
  
  public createCollection(name: string) {
    return new Promise((resolve, reject) => {
        this.storage.executeSql("INSERT INTO collections (name) VALUES (?)", [name]).then((data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
  } 
  
  public removeCollection(id: number) {
    new Promise((resolve, reject) => {
        this.storage.executeSql("DELETE FROM collections WHERE id=?", [id]).then(() => {},
        (error) => {
            reject(error);
        });
    });
  }  

}
