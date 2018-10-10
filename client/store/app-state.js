/*
 * 与业务无关的状态
 */
import { observable, computed, action, autorun } from 'mobx' // eslint-disable-line

export class AppState {
  @observable count = 0

  @observable name = 'Wilson'

  @computed
  get msg() {
    return `${this.name} say count is ${this.count}`
  }

  @action
  add() {
    this.count += 1
  }

  @action
  changeName(name) {
    this.name = name
  }
}

const appState = new AppState()

export default appState
