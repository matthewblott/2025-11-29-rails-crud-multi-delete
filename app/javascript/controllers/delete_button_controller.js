import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  bulkDelete(e) {
    e.preventDefault()
    this.dispatch("submit")
  }

  enable({ detail }) {
    this.element.disabled = !detail
  }
}
