import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ViewChild } from '@angular/core';
import {
	DataSourceService,
	ImageWithCaption,
} from '../services/data-source.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	dataProxy: Array<ImageWithCaption> = [];
	filterQuery: string = '';

	@ViewChild(CdkVirtualScrollViewport)
	virtualScroll: CdkVirtualScrollViewport;

	constructor(private dataSourceSrv: DataSourceService) {
		this.getFilteredData();
	}

	getFilteredData() {
		const data = this.dataSourceSrv.getData(this.filterQuery);
		this.dataProxy = [...data];
	}

	search(event?: any) {
		this.filterQuery = '';
		if (event !== undefined && event.target !== null) {
			this.filterQuery = event.target.value.toLowerCase();
		}

		this.getFilteredData();

		//Scroll to top para el virtual scroll
		this.virtualScroll.scrollToIndex(0, 'smooth');
	}
}
