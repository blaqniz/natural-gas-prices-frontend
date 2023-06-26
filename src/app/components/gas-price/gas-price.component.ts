import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GasPriceService} from "../../services/gas-price.service";
import {FormControl} from "@angular/forms";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-gas-price',
  templateUrl: './gas-price.component.html',
  styleUrls: ['./gas-price.component.css']
})
export class GasPriceComponent implements OnInit {

  pageSize = environment.pageSize;
  gasPriceData: any;
  paginatedGasPrices: any[] | undefined;
  totalPages: any;
  pageNumber: any;
  selectedDate: Date = new Date();
  dateFilter: FormControl = new FormControl();

  constructor(private http: HttpClient, private gasPriceService: GasPriceService) {
  }

  ngOnInit(): void {
    console.log('Loaded *** GasPriceComponent ***');
    this.getGasPrices(0, this.pageSize);

    this.dateFilter.valueChanges.subscribe(date => {
      this.selectedDate = date;
      this.filterGasPricesByDate();
    });
  }

  getGasPrices(page: number, size: number) {
    this.gasPriceService.getGasPrices(page, size).subscribe(data => {
      this.gasPriceData = data.payload;
      this.totalPages = this.gasPriceData.totalPages;
      this.pageNumber = this.gasPriceData.pageNumber;
      this.paginatedGasPrices = this.gasPriceData.gas_prices;
      console.log(this.gasPriceData);
    });
  }

  filterGasPricesByDate() {
    const filteredGasPrices = this.gasPriceData.gas_prices.filter((gasPrice: { date: string | number | Date; }) => {
      const gasPriceDate = new Date(gasPrice.date);
      return gasPriceDate.toDateString() === this.selectedDate.toDateString();
    });
    this.paginatedGasPrices = filteredGasPrices;
  }

  onPreviousPage() {
    this.getGasPrices(this.pageNumber - 1, this.pageSize);
  }

  onNextPage() {
    this.getGasPrices(this.pageNumber + 1, this.pageSize);
  }
}
