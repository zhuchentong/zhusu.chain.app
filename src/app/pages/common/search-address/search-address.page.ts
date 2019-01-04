import { Component, OnInit } from '@angular/core'
import {
  AmapAutocompleteService,
  AmapPlaceSearchWrapper,
  AmapPlaceSearchService
} from 'ngx-amap'
import { LoggerService } from '@ngx-toolkit/logger'
import { Store } from '@ngxs/store'
import { UpdateLocationAction } from 'app/store/action/location.action'
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-search-address',
  templateUrl: './search-address.page.html',
  styleUrls: ['./search-address.page.scss']
})
export class SearchAddressPage implements OnInit {
  private placeSearch: AmapPlaceSearchWrapper
  private result: any[]
  constructor(
    private AmapAutocomplete: AmapAutocompleteService,
    private AmapPlaceSearch: AmapPlaceSearchService,
    private navCtrl: NavController,
    private store: Store,
    private logger: LoggerService
  ) {}

  public async ngOnInit() {
    // 获取位置信息
    const location = this.store.selectSnapshot(state => state.location)
    const city = location.city ? location.city.name : ''
    this.AmapPlaceSearch.of({
      city
    }).then(placeSearch => {
      this.placeSearch = placeSearch
    })
  }

  /**
   * 搜索地点
   * @param value 
   */
  private onSearchChange(value) {
    if (!value) {
      this.result = []
      return
    }

    this.placeSearch.search(value).then(({ status, result }) => {
      if (status === 'complete' && result.info === 'OK') {
        this.result = result.poiList.pois
      }
    })
  }

  /**
   * 选择城市
   * @param item
   */
  private onSelectAddress(item) {
    this.store.dispatch(
      new UpdateLocationAction({
        address: item.name,
        position: {
          latitude: item.location.latitude,
          longitude: item.location.longitude
        }
      })
    )
    this.navCtrl.goBack()
  }
}