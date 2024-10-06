import { Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { IndexComponent } from './index/index.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { ListDriverComponent } from './list-driver/list-driver.component';
import { ListPackageComponent } from './list-package/list-package.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { StatisticsComponent } from './statistics/statistics.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'drivers', component: ListDriverComponent},
    { path: 'drivers/add', component: AddDriverComponent },
    { path: 'drivers/update', component: UpdateDriverComponent },
    { path: 'drivers/delete', component: DeleteDriverComponent },
    { path: 'packages', component: ListPackageComponent},
    { path: 'packages/add', component: AddPackageComponent },
    { path: 'packages/update', component: UpdatePackageComponent },
    { path: 'packages/delete', component: DeletePackageComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: '**', component: PagenotfoundComponent }
];
