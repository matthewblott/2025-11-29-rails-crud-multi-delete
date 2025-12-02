import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  enable({ detail }) {
    this.element.disabled = !detail
  }
}
