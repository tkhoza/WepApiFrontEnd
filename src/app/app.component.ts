import { Component,OnInit } from '@angular/core';
import { getViewData } from '../../node_modules/@angular/core/src/render3/instructions';
import { DataService } from './services/data.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Personal Details - Client';
  persons: any = [];
  newPerson: any = {};
  personId: any = null;
  isUpdate = false;
  isHidden = false;
  loading = false;

  constructor(private dataService: DataService,private toastr: ToastrService) { }
  ngOnInit(){
    this.getData();

    $('.Close').click(function(){
      $('.modal').hide();
    });
  }

  getData() {
    this.loading = true;

    this.dataService.getData()
            .subscribe(data => {
                this.persons = data
                this.loading = false;
            }, err => {
                this.loading = false;
    });

  }

  update() {
    this.loading = true;
   
    this.dataService.update(this.newPerson)
        .subscribe(data => {
            this.loading = false;
            this.newPerson = {}
            $('.modal').hide();
            
            if(data == true)
            {
              this.Success("Record was successfully updated");
            }
            else{
              this.Error("Oops something went wrong, fails to update record");
            }
        }, err => {
            this.Error("Oops something went wrong, fails to update record");
            this.loading = false;
            this.newPerson = {}
            $('.modal').hide();
     });

  }

  setModel(person) {
    this.resetCss();
    this.newPerson = person;
    this.isUpdate = true;
    $('.modal').show();
  }

  create() {
    this.dataService.create(this.newPerson)
        .subscribe(data => {
            this.loading = false;
            this.persons.push(data);
            this.newPerson = {}
            $('.modal').hide();

            if(data != null)
            {
              this.Success("Record was successfully saved");
            }
            else{
              this.Error("Oops something went wrong, fails to save record");
            }

        }, err => {
            this.Error("Oops something went wrong, fails to save record");
            this.loading = false;
            $('.modal').hide();
            this.newPerson = {};
     });

  }

  
  delete(person) {
    if(confirm("Are you sure you want to delete")) {
      this.newPerson = person;

      this.dataService.delete(this.newPerson)
        .subscribe(data => {
            this.loading = false;
            this.persons.splice(this.newPerson, 1);
            this.newPerson = {};

            if(data == true)
            {
              this.Success("Record was successfully removed");
            }
            else{
              this.Error("Oops something went wrong, fails to remove record");
            }
        }, err => {
            this.Error("Oops something went wrong, fails to remove record");
            this.loading = false;
            this.newPerson = {};
    });


    }
  }

  showCreateModal() {
    this.resetCss();
    this.newPerson = {};
    $('.modal').show();
  }

  view(person) {
    $('.Input').attr('readonly',true);
    this.isHidden = true;
    this.newPerson = person;
    this.isUpdate = true;
    $('.modal').show();
  }

  resetCss(){
    $('.Input').attr('readonly',false);
    this.isHidden = false;
  }

  Success(message: string) { 
    this.toastr.success(message, 'Successfully');
  }

  Error(message: string) { 
    this.toastr.error(message, 'Error');
  }
}
