import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [
        MatButtonModule, 
        MatCheckboxModule, 
        MatCardModule, 
        MatInputModule, 
        MatIconModule,
        MatGridListModule,
        MatTabsModule,
        MatToolbarModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatRadioModule,
        MatBottomSheetModule,
        MatSnackBarModule,
        MatExpansionModule
    ],
    exports: [
        MatButtonModule, 
        MatCheckboxModule, 
        MatCardModule,
        MatInputModule, 
        MatIconModule,
        MatGridListModule,
        MatTabsModule,
        MatToolbarModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatRadioModule,
        MatBottomSheetModule,
        MatSnackBarModule,
        MatExpansionModule
    ]
})
export class MaterialModule{

}