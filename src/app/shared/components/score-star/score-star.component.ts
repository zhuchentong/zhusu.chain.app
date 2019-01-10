import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-score-star',
  templateUrl: './score-star.component.html',
  styleUrls: ['./score-star.component.scss']
})
export class ScoreStarComponent implements OnInit {
  @Input()
  public star: number
  @Input()
  public color = 'gray'
  @Input()
  public count = 5

  private leftCount
  private rightCount
  private hasHalf: boolean
  private array = Array

  // constructor() {}

  public ngOnInit() {
    this.leftCount = Math.floor(this.star)
    this.hasHalf = this.star % 1 > 0
    this.rightCount = this.count - (this.hasHalf ? 1 : 0) - this.leftCount
  }
}