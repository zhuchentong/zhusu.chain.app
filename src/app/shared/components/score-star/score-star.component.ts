import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-score-star',
  templateUrl: './score-star.component.html',
  styleUrls: ['./score-star.component.scss']
})
export class ScoreStarComponent implements OnInit {
  @Input()
  public star: number
  @Output()
  public starChange = new EventEmitter<number>()
  @Input()
  public color = 'gray'
  @Input()
  public size = '22px'
  @Input()
  public count = 5
  @Input()
  public edit = false

  private leftCount
  private rightCount
  private hasHalf: boolean

  public ngOnInit() {
    this.getStarCount()
  }

  /**
   * 计算星数
   */
  public getStarCount() {
    this.leftCount = Math.floor(this.star)
    this.hasHalf = this.star % 1 > 0
    this.rightCount = this.count - (this.hasHalf ? 1 : 0) - this.leftCount
  }

  /**
   * 更新评分
   * @param star
   */
  private onUpdateStar(star) {
    this.star = star + 1
    this.getStarCount()
    this.starChange.emit(this.star)
  }

  /**
   * 生成序列
   * @param count
   */
  private convertArray(count) {
    return Array.from(new Array(count), (val, index) => index)
  }
}
