import { makeAutoObservable } from 'mobx';

import { IDevice } from './types';

class DeviceStore {
  private _devices: IDevice[];
  private _page: number;
  private _totalCount: number;
  private _limit: number;

  constructor() {
    this._devices = [];

    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;

    makeAutoObservable(this);
  }

  setDevices(devices: IDevice[]) {
    this._devices = devices;
  }

  setPage(page: number) {
    this._page = page;
  }

  setTotalCount(count: number) {
    this._totalCount = count;
  }

  get devices(): IDevice[] {
    return this._devices;
  }

  get page(): number {
    return this._page;
  }

  get totalCount(): number {
    return this._totalCount;
  }

  get limit(): number {
    return this._limit;
  }
}

export default DeviceStore;
