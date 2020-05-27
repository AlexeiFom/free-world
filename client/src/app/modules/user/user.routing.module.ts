import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { UserLayoutComponent } from '@app/shared/components/layouts/user-layout/user-layout.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { MedicineComponent } from './medicine/medicine.component';
import { NewsComponent } from './news/news.component';
import { WeatherComponent } from './weather/weather.component';
import { HomeComponent } from './home/home.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { AuthGuardService } from '@app/shared/services/auth-guard.service';

const routes: Routes = [
    {
        path: 'user',
        component: UserLayoutComponent,
        canActivate:[AuthGuardService],
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'scheduler',
                component: SchedulerComponent
            },
            {
                path: 'medicine',
                component: MedicineComponent
            },
            {
                path: 'news',
                component: NewsComponent
            },
            {
                path: 'weather',
                component: WeatherComponent
            },
            {
                path: 'google-map',
                component: GoogleMapComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }