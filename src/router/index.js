import { Home } from '../pages/Home';
import { ApplicationInstance } from '../pages/ApplictationInstance';
import { ApplicationType } from '../pages/ApplicationType';
import  ApplicationType1  from '../pages/ApplicationType1';
import { Binding } from '../pages/Binding';
import { Metadata } from '../pages/Metadata';

export const routes = [
    {path: '/home', component: Home, exact: true},
    {path: '/applicationType', component: ApplicationType, exact: true},
    {path: '/applicationInstance', component: ApplicationInstance, exact: true},
    {path: '/binding', component: Binding, exact: true},
    {path: '/metadata', component: Metadata, exact: true},
]