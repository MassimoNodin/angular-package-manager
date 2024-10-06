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
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './auth.guard';
import { InvaliddataComponent } from './invaliddata/invaliddata.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'drivers', component: ListDriverComponent, canActivate: [authGuard] },
    { path: 'drivers/add', component: AddDriverComponent, canActivate: [authGuard] },
    { path: 'drivers/update', component: UpdateDriverComponent, canActivate: [authGuard] },
    { path: 'drivers/delete', component: DeleteDriverComponent, canActivate: [authGuard] },
    { path: 'packages', component: ListPackageComponent, canActivate: [authGuard] },
    { path: 'packages/add', component: AddPackageComponent, canActivate: [authGuard] },
    { path: 'packages/update', component: UpdatePackageComponent, canActivate: [authGuard] },
    { path: 'packages/delete', component: DeletePackageComponent, canActivate: [authGuard] },
    { path: 'stats', component: StatisticsComponent, canActivate: [authGuard] },
    { path: 'invalid', component: InvaliddataComponent },
    { path: '**', component: PagenotfoundComponent }
];
