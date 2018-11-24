import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SpeedTestPageComponent } from "./components/speed-test-page/speed-test-page.component";

const routes: Routes = [
	{
		path: 'speedtest',
		component: SpeedTestPageComponent
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SpeedTestRoutingModule { }
