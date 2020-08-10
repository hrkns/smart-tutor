import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  Title
} from '@angular/platform-browser';

import {
  TopicsRoutes
} from './components/topics/routes';

const routes: Routes = TopicsRoutes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [Title],
})

export class AppRoutingModule {}
