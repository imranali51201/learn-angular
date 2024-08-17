import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard.component';
import { LoginPage } from './pages/login/login.component';
import { Layout } from './layout/layout.component';
import { PrivateGuard } from './guards/private/private.guard';
import { PublicGuard } from './guards/public/public.guard';
import { NotFoundPage } from './pages/not-found/not-found.component';
import { TodosPage } from './pages/todos/todos.component';

export const routes: Routes = [
  { path: 'login', component: LoginPage, canActivate: [PublicGuard] },
  {
    path: '', component: Layout, canActivate: [PrivateGuard],
    children: [
      { path: "", component: DashboardPage },
      { path: "todos", component: TodosPage }
    ]
  },
  { path: "**", component: NotFoundPage }
];
