import { Injectable } from '@angular/core'
import { NetService } from 'app/utils/net.service'
import { hotelController } from 'app/config/service/hotel.controller'
import { User } from 'app/models/user.model'
import { Observable } from 'rxjs'
import { Store } from '@ngxs/store'
import { HotelEnum } from 'app/config/enum.config'
import { PageService } from 'app/utils/page.service'
import { Hotel } from 'app/models/hotel.model'

@Injectable()
export class HotelService {
  constructor(private net: NetService, private store: Store) {}

  /**
   * 获取用户
   */
  public getHotelList(
    {
      name,
      level,
      type,
      tags
    }: { name?; level?; type: HotelEnum; tags: string },
    { page }: { page?: PageService }
  ): Observable<Hotel[]> {
    // TODO:tags应传入数组
    // 获取位置信息
    const location = this.store.selectSnapshot(state => state.location)

    return this.net.send({
      service: hotelController.getHotelList,
      model: Hotel,
      page,
      params: {
        name,
        type,
        tags: [tags],
        minGrand: level && level.length > 0 ? Math.min(...level) : null,
        maxGrand: level && level.length > 0 ? Math.max(...level) : null
        // TODO: 测试屏蔽位置
        // lat: location.position.latitude,
        // lng: location.position.longitude
      }
    })
  }

  /**
   * 获取产品信息
   */
  public getHotel(id): Observable<Hotel> {
    return this.net.send({
      service: hotelController.getHotel,
      model: Hotel,
      append: [id]
    })
  }
}
