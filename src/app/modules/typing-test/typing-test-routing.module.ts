import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypingTestPageComponent } from './components/typing-test-page/typing-test-page.component';
import { TypingTesterComponent } from './components/typing-tester/typing-tester.component';
import { TypingTestDefaultComponent } from './components/typing-test-default/typing-test-default.component';

const routes: Routes = [
    {
        path: 'typing-test',
        component: TypingTestPageComponent,
        children: [
            { path: ':id', component: TypingTesterComponent },
            { path: '', component: TypingTestDefaultComponent },
            { path: '**', redirectTo: '' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TypingTestRoutingModule { }
