import {
	ScrollingModule,
	CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
	ComponentFixture,
	fakeAsync,
	flush,
	TestBed,
	tick,
} from '@angular/core/testing';
import { IonicModule, IonImg, IonItem, IonSearchbar } from '@ionic/angular';
import { DataSourceService } from '../services/data-source.service';

import { HomePage } from './home.page';

describe('HomePage', () => {
	let component: HomePage;
	let fixture: ComponentFixture<HomePage>;
	let service: DataSourceService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HomePage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			imports: [IonicModule.forRoot(), ScrollingModule],
		}).compileComponents();

		service = TestBed.inject(DataSourceService); //No es necesario un mock en este caso

		fixture = TestBed.createComponent(HomePage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a correct number of elements in local array', () => {
		expect(component.dataProxy).toHaveSize(service.mockElements);
	});

	it('should instantiate the virtual scroll DOM component correctly and have items partially rendered', fakeAsync(() => {
		//Miramos en DOM
		tick();
		fixture.detectChanges();

		const virtualScroll = fixture.debugElement.query(
			By.directive(CdkVirtualScrollViewport)
		);
		expect(virtualScroll).toBeDefined();
		const virtualScrollItems = virtualScroll.queryAll(
			By.directive(IonItem)
		);
		//Por los parámetros que especificamos en el componente sobre el buffer, serán siempre un mínimo de 10 elementos y un máximo de 20
		expect(virtualScrollItems.length).toBeGreaterThanOrEqual(10);
		flush();
	}));

	it('should instantiate the virtual scroll component correctly and the correct data loaded', () => {
		//Miramos en componente
		expect(component.virtualScroll).toBeDefined();
		expect(component.virtualScroll).toBeInstanceOf(
			CdkVirtualScrollViewport
		);
		expect(component.virtualScroll.getDataLength()).toBe(
			service.imageWithCaptionArr.length
		);
	});

	it('should fill filterQuery after a change in search bar', fakeAsync(() => {
		tick();
		fixture.detectChanges();
		const searchBar = fixture.debugElement.query(
			By.directive(IonSearchbar)
		);
		searchBar.nativeElement.value = 'lorem';
		//Triggereamos el evento change
		searchBar.triggerEventHandler('ionChange', {
			target: searchBar.nativeElement,
		});
		tick();
		fixture.detectChanges();

		expect(component.filterQuery).toBe('lorem');
		flush();
	}));

	it('should change virtualscroll elements after a search', fakeAsync(() => {
		tick();
		fixture.detectChanges();

		//Almacenamos primero los anteriores nodos
		const virtualScroll = fixture.debugElement.query(
			By.directive(CdkVirtualScrollViewport)
		);
		expect(virtualScroll).toBeDefined();
		const virtualScrollItems = virtualScroll.queryAll(
			By.directive(IonItem)
		);

		//Cambiamos el valor
		const searchBar = fixture.debugElement.query(
			By.directive(IonSearchbar)
		);
		searchBar.nativeElement.value = 'lorem';
		//Triggereamos el evento change
		searchBar.triggerEventHandler('ionChange', {
			target: searchBar.nativeElement,
		});

		//Obtenemos los nuevos nodos
		tick();
		fixture.detectChanges();

		const newVirtualScrollItems = virtualScroll.queryAll(
			By.directive(IonItem)
		);

		//Comparamos
		expect(newVirtualScrollItems).not.toBe(virtualScrollItems);
		flush();
	}));

	it('should use placeholder img in broken url', fakeAsync(() => {
		tick();
		fixture.detectChanges();
		const virtualScrollItem = fixture.debugElement.query(
			By.directive(IonImg)
		);
		//Primero trigger del evento ionError porque en el renderizado de testing no hace el trigger
		virtualScrollItem.triggerEventHandler('ionError', {});
		fixture.detectChanges();

		expect(virtualScrollItem.attributes['ng-reflect-src']).toBe(
			'assets/placeholder500.jpg'
		);
		flush();
	}));

	afterEach(fakeAsync(() => {
		//Por si da el error de "timer still running"
		tick();
		flush();
	}));
});
