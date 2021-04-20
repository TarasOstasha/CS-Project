import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {  RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainHeaderComponent } from './header/main-header.component';

//import { HeaderComponent } from 'src/app/parts/header/header.component';
//import { FooterComponent } from 'src/app/parts/footer/footer.component';
// material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
    declarations: [
        MainComponent,
        MainHeaderComponent
        //HeaderComponent,
        //FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
           { path: '', component: MainComponent }
        ]),
    
        MatGridListModule,
        MatButtonModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDividerModule,
        MatRippleModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatListModule,
        ReactiveFormsModule
    ]
})


export class MainModule {}