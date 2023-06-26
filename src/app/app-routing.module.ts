import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GasPriceComponent} from "./components/gas-price/gas-price.component";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'gas-prices', component: GasPriceComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
