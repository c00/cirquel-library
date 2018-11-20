import { Author } from './Author';
import { BaseResource } from './Resources';
import { Venue } from './Venue';

export interface Item {
  id?: number;
  created?: number;
  userName?: string;
  category: string;
  venueId?: number;
  resourceId: number;
  description?: string;
  itemNameId: number;

  skillLevel?: number;
  strengthLevel?: number;
  flexiLevel?: number;
  loves: number;

  otherNames: ItemName[];
  author?: Author;
  venue?: Venue;
  resource: BaseResource;
  itemName: ItemName;
  
  iLoved?: boolean; 
}

export interface ItemName {
  id?: number;
  itemId?: number;
  name: string;
  variation?: string;
  votes: number;
  displayName?: string;
}

export interface Section {
  letter: string;
  names: ItemName[];
}

export class Dictionary {
  sections: Section[] = [];
  private indices = {};

  public merge(dict: Dictionary) {
    for (let s of dict.sections) {
      if (this.indices.hasOwnProperty(s.letter)){
        //merge
        const sectionName =  s.letter
        //fuck this weird as .apply structure :(
        this.sections[this.indices[sectionName]].names.push.apply(this.sections[this.indices[sectionName]].names, s.names);
      } else {
        //add
        this.sections.push(s);
      }
    }
  }

  static fromItemNames(names: ItemName[]) {
    let d = new Dictionary();

    for( let n of names ) {
      const sectionName = n.name.substring(0, 1);

      if (!d.indices.hasOwnProperty(sectionName)) {
        d.indices[sectionName] = d.sections.length;
        d.sections.push({
          letter: sectionName,
          names: []
        });
      }

      d.sections[d.indices[sectionName]].names.push(n);
    }

    return d;
  }  
}

export interface VoteInfo {
  skill: number;
  flexi: number;
  strength: number;
  name: number;
  popularNames: ItemName[];
}