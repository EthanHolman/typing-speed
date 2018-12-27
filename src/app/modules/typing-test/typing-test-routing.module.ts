import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypingTestPageComponent } from './components/typing-test-page/typing-test-page.component';

const routes: Routes = [
    {
        path: 'typing-test',
        component: TypingTestPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TypingTestRoutingModule { }
