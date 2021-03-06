import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'app/shared/shared.module'
import { hotelRoutes, hotelPages } from './hotel.routes'
import { NgxAmapModule } from 'ngx-amap'
import { HotelService } from 'app/services/hotel.service'
import { RoomService } from 'app/services/room.service'
import { OrderService } from 'app/services/order.service'
import { HotelFilterComponent } from './hotel-list/hotel-filter/hotel-filter.component'
import { SplashesService } from 'app/services/splashes.service'
import { AdvertisementsService } from 'app/services/advertisements.service'
import { CommentService } from 'app/services/commnet.service'

@NgModule({
  imports: [SharedModule, RouterModule.forChild(hotelRoutes), NgxAmapModule],
  declarations: [...hotelPages, HotelFilterComponent],
  providers: [
    HotelService,
    RoomService,
    OrderService,
    AdvertisementsService,
    SplashesService,
    CommentService
  ]
})
export class HotelPageModule {}
