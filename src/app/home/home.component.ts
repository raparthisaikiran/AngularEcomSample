import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { HttpResponse } from "@angular/common/http";
import { takeUntil } from 'rxjs/operators';
import { timer } from 'rxjs/internal/observable/timer';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filter_key:string="";
  filtered_products = []
  products = []
  destroy$ = timer(5000);
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{  
      console.log(res);  
      this.products = res.body;  
    }) 
  }
  public firstPage() {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }
  public previousPage() {

    if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }

  }
  public nextPage() {
    if (this.apiService.next !== undefined && this.apiService.next !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }
  }
  public lastPage() {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }

  public filter(){
    console.log(this.filter_key);
    let data=this.filter_key
    if(this.filter_key){
      this.products=this.products.filter((product)=>{
        return product.name.toLowerCase().indexOf(data.toLowerCase())>-1||
        product.description.toLowerCase().indexOf(data.toLowerCase())>-1
      })
    }
  }

}
