/*
 * select persist
 * Internal implemenetation of Anki Persist that allows selection of the default mode.
 * If this were to be made more public facing, it might be best to change the
 * method names to be the exact same as the original...
 */

import { LOGGER } from './logger';

export type SPersistType = 'window' | 'sessionStorage';

const _persistenceKey = 'github.com/Aquafina-water-bottle/jp-mining-note/';

export interface SPersistInterface {
  //isAvailable(): boolean;

  /*
   * Checks whether persistence stores the key or not.
   */
  has(key: string): boolean;

  /*
   * Retrieves the value associated with the key. If no value
   * is associated to the given key, null is returned.
export function selectPersist(types: SPeristType[] = ["sessionStorage", "window"]): SPersistItemInterface | null {   */
  get(key: string): null | any;

  /* Persists the key-value pair. */
  set(key: string, value: any): void;

  ///* Removes the key-value pair, and returns the value. */
  pop(key: string): any;

  ///* Retrieves all keys in storage. */
  //keys(): string[];

  ///* Removes all previously persisted key-value pairs. */
  //clear(): void;

  /* Whether persistence can only store string */
  onlyStoresStrings(): boolean;

  getType(): SPersistType;
}

//interface SPersistGlobalInterface {
//  /* Removes all previously persisted key-value pairs. */
//  clear(): void;
//
//  isAvailable(): boolean;
//}

export class SPersistSessionStorage implements SPersistInterface {
  constructor() {}

  isAvailable() {
    return (
      globalThis.sessionStorage !== null && typeof globalThis.sessionStorage === 'object'
    );
  }

  has(key: string) {
    return globalThis.sessionStorage.getItem(_persistenceKey + key) !== null;
  }

  get(key: string): null | any {
    return globalThis.sessionStorage.getItem(_persistenceKey + key);
  }

  set(key: string, value: string) {
    globalThis.sessionStorage.setItem(_persistenceKey + key, value);
  }

  pop(key: string): any {
    const item = this.get(key);
    globalThis.sessionStorage.removeItem(_persistenceKey + key);
    return item;
  }

  onlyStoresStrings() {
    return true;
  }

  getType(): SPersistType {
    return 'sessionStorage';
  }
}

class SPersistObj implements SPersistInterface {
  private storage: Record<string, any>;

  constructor(obj: object) {
    (obj as any)[_persistenceKey] = {}
    this.storage = (obj as any)[_persistenceKey];
  }

  //isAvailable() {
  //  return this.storage !== null && typeof this.storage === 'object';
  //}

  has(key: string) {
    return key in this.storage;
  }

  get(key: string): null | any {
    if (this.has(key)) {
      return this.storage[key];
    }
    return null;
  }

  set(key: string, value: any) {
    this.storage[key] = value;
  }

  pop(key: string): any {
    const item = this.storage[key]
    delete this.storage[key]
    return item;
  }

  onlyStoresStrings() {
    return false;
  }

  getType(): SPersistType {
    return 'window';
  }
}
LOGGER.debug('spersist control');
// wrappers to ensure that these are defined only once
if (
  !('_SPersist_sessionStorage' in window) &&
  globalThis.sessionStorage !== null &&
  typeof globalThis.sessionStorage === 'object'
) {
  (window as any)._SPersist_sessionStorage = new SPersistSessionStorage();
  LOGGER.debug('Initializing _SPersist_sessionStorage');
}

//if (!('_SPersist_windowKey' in window)) {
//  if (typeof (window as any).py === 'object') {
//    LOGGER.debug('Initializing _SPersist_windowKey.py');
//    (window as any)._SPersist_windowKey = new SPersistObj((window as any).py);
//  } else {
//    // if titleStartIndex > 0, window.location is useful
//    // logic taken exactly from the original anki persistence
//    let titleStartIndex = window.location.toString().indexOf('title');
//    let titleContentIndex = window.location.toString().indexOf('main', titleStartIndex);
//    if (
//      titleStartIndex > 0 &&
//      titleContentIndex > 0 &&
//      titleContentIndex - titleStartIndex < 10
//    ) {
//      LOGGER.debug('Initializing _SPersist_windowKey.qt');
//      (window as any)._SPersist_windowKey = new SPersistObj((window as any).qt);
//    }
//  }
//}

if (!('_SPersist_windowKey' in window)) {
  if (typeof (window as any).py === 'object') {
    LOGGER.debug('Initializing _SPersist_windowKey.py');
    (window as any)._SPersist_windowKey = new SPersistObj((window as any).py);
  } else if (typeof (window as any).qt === 'object') {
    LOGGER.debug('Initializing _SPersist_windowKey.qt');
    (window as any)._SPersist_windowKey = new SPersistObj((window as any).qt);
  }
}

const persistObjs = {
  sessionStorage: (window as any)._SPersist_sessionStorage,
  window: (window as any)._SPersist_windowKey,
};

/* this function removes the need for isAvailable(), since it will be null if not available */
export function selectPersist(...types: SPersistType[]): SPersistInterface | null {
  if (types.length === 0) {
    types = ["sessionStorage", "window"];
  }
  for (const t of types) {
    if (typeof persistObjs[t] !== 'undefined') {
      return persistObjs[t];
    }
  }
  return null;
}

//export function clearAllPersists() {
//  for (const persistObj of Object.values(persistObjs)) {
//    if (persistObj.isAvailable()) {
//      persistObj.clear();
//    }
//  }
//}