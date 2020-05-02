import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { UserLayoutComponent } from '@app/shared/layouts/user-layout/user-layout.component';
import { SchedulerComponent } from './scheduler/scheduler.component';



const routes: Routes = [
    {
        path: 'user',
        component: UserLayoutComponent,
        children: [
            {
                path: 'scheduler',
                component: SchedulerComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }