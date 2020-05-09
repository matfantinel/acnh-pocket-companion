import { NgModule } from '@angular/core';
import { CoolHeaderComponent } from './cool-header/cool-header.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [CoolHeaderComponent],
    imports: [IonicModule.forRoot()],
    exports: [CoolHeaderComponent]
})
export class ComponentsModule {}